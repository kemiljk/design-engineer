import "server-only";

import { cache } from "react";
import { cosmic } from "./cosmic";
import * as Type from "./types";
import { nanoid } from "nanoid";

/**
 * Create a new temporary access code
 */
export async function createTemporaryAccessCode(
  expiresInDays: number = 7,
): Promise<Type.TemporaryAccessCode> {
  const code = nanoid(8).toUpperCase();
  const slug = `temp-access-${code}`;

  // Calculate expiration date (7 days from now)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  const result = await cosmic.objects.insertOne({
    type: "temporary-access-codes",
    title: `Temporary Access: ${code}`,
    slug,
    metadata: {
      code,
      access_level: "full",
      expires_at: expiresAt.toISOString(),
      created_at: new Date().toISOString(),
      status: "active",
    },
  });

  return result.object;
}

/**
 * Get a temporary access code by its code value
 */
export const getTemporaryAccessCode = cache(
  async (code: string): Promise<Type.TemporaryAccessCode | null> => {
    try {
      const { objects } = await cosmic.objects
        .find({
          type: "temporary-access-codes",
          "metadata.code": code,
        })
        .props("id,slug,title,created_at,metadata")
        .depth(1)
        .limit(1);

      if (!objects || objects.length === 0) {
        return null;
      }

      return objects[0];
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 404
      ) {
        return null;
      }
      console.error("Error fetching temporary access code:", error);
      return null;
    }
  },
);

/**
 * Check if a temporary access code is valid and can be used
 */
export async function validateTemporaryAccessCode(code: string): Promise<{
  isValid: boolean;
  codeData?: Type.TemporaryAccessCode;
  reason?: string;
}> {
  const codeData = await getTemporaryAccessCode(code);

  if (!codeData) {
    return { isValid: false, reason: "Code not found" };
  }

  // Check if code is already used
  if (codeData.metadata.status === "used") {
    return { isValid: false, reason: "Code already used" };
  }

  // Check if code is expired
  const now = new Date();
  const expiresAt = new Date(codeData.metadata.expires_at);
  if (now > expiresAt) {
    return { isValid: false, reason: "Code expired" };
  }

  return { isValid: true, codeData };
}

/**
 * Redeem a temporary access code for a user
 */
export async function redeemTemporaryAccessCode(
  code: string,
  userId: string,
): Promise<{
  success: boolean;
  enrollment?: Type.CourseEnrollment;
  reason?: string;
}> {
  // First validate the code
  const validation = await validateTemporaryAccessCode(code);
  if (!validation.isValid) {
    return { success: false, reason: validation.reason };
  }

  const codeData = validation.codeData!;

  try {
    // Mark the code as used
    await cosmic.objects.updateOne(codeData.id, {
      metadata: {
        ...codeData.metadata,
        status: "used",
        used_at: new Date().toISOString(),
        used_by_user_id: userId,
      },
    });

    // Create temporary enrollment
    const enrollmentSlug = `temp-enrollment-${userId}-${nanoid(8)}`;

    // Calculate expiration date (7 days from now for the enrollment)
    const enrollmentExpiresAt = new Date(codeData.metadata.expires_at);

    const enrollmentResult = await cosmic.objects.insertOne({
      type: "course-enrollments",
      title: `Temporary Enrollment: ${userId}`,
      slug: enrollmentSlug,
      metadata: {
        user_id: userId,
        product_id: "temporary_full",
        access_level: "full",
        status: "active",
        is_temporary: true,
        temporary_source: code,
        expires_at: enrollmentExpiresAt.toISOString(),
        created_at: new Date().toISOString(),
      },
    });

    return {
      success: true,
      enrollment: enrollmentResult.object,
    };
  } catch (error) {
    console.error("Error redeeming temporary access code:", error);
    return { success: false, reason: "Failed to redeem code" };
  }
}

/**
 * Get all temporary access codes (for admin)
 */
export async function getAllTemporaryAccessCodes(): Promise<
  Type.TemporaryAccessCode[]
> {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: "temporary-access-codes",
      })
      .props("id,slug,title,created_at,metadata")
      .depth(1)
      .sort("-created_at")
      .limit(100);

    return objects || [];
  } catch (error: unknown) {
    console.error("Error fetching temporary access codes:", error);
    return [];
  }
}

/**
 * Check if a user has a temporary enrollment that's still valid
 */
export const getUserTemporaryEnrollment = cache(
  async (userId: string): Promise<Type.CourseEnrollment | null> => {
    try {
      const { objects } = await cosmic.objects
        .find({
          type: "course-enrollments",
          "metadata.user_id": userId,
          "metadata.is_temporary": true,
        })
        .props("id,slug,title,created_at,metadata")
        .depth(1)
        .limit(1);

      if (!objects || objects.length === 0) {
        return null;
      }

      const enrollment = objects[0];

      // Check if the temporary enrollment is expired
      if (enrollment.metadata.expires_at) {
        const now = new Date();
        const expiresAt = new Date(enrollment.metadata.expires_at);
        if (now > expiresAt) {
          // Mark as expired
          await cosmic.objects.updateOne(enrollment.id, {
            metadata: {
              ...enrollment.metadata,
              status: "expired",
            },
          });
          return null;
        }
      }

      return enrollment;
    } catch (error: unknown) {
      console.error("Error fetching user temporary enrollment:", error);
      return null;
    }
  },
);

/**
 * Clean up expired temporary access codes and enrollments
 */
export async function cleanupExpiredTemporaryAccess(): Promise<{
  codesCleaned: number;
  enrollmentsCleaned: number;
}> {
  const now = new Date().toISOString();
  let codesCleaned = 0;
  let enrollmentsCleaned = 0;

  try {
    // Clean up expired codes
    const expiredCodes = await cosmic.objects
      .find({
        type: "temporary-access-codes",
        "metadata.expires_at": { $lt: now },
        "metadata.status": "active",
      })
      .props("id");

    if (expiredCodes.objects && expiredCodes.objects.length > 0) {
      for (const code of expiredCodes.objects) {
        await cosmic.objects.updateOne(code.id, {
          metadata: {
            status: "expired",
          },
        });
        codesCleaned++;
      }
    }

    // Clean up expired temporary enrollments
    const expiredEnrollments = await cosmic.objects
      .find({
        type: "course-enrollments",
        "metadata.is_temporary": true,
        "metadata.expires_at": { $lt: now },
        "metadata.status": "active",
      })
      .props("id");

    if (expiredEnrollments.objects && expiredEnrollments.objects.length > 0) {
      for (const enrollment of expiredEnrollments.objects) {
        await cosmic.objects.updateOne(enrollment.id, {
          metadata: {
            status: "expired",
          },
        });
        enrollmentsCleaned++;
      }
    }
  } catch (error) {
    console.error("Error cleaning up expired temporary access:", error);
  }

  return { codesCleaned, enrollmentsCleaned };
}
