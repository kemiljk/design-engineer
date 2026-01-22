import "server-only";
import { cookies } from "next/headers";

const PREVIEW_COOKIE_NAME = "dxe_preview";

/**
 * Get the preview token from environment
 * Read at runtime to ensure it's available in serverless functions
 */
function getPreviewToken(): string | undefined {
  return process.env.COURSE_PREVIEW_TOKEN;
}

/**
 * Check if a preview token is valid
 */
import { validateTemporaryAccessCode } from "./temporary-access";

/**
 * Check if a preview token is valid
 */
export async function isValidPreviewToken(
  token: string | null,
): Promise<boolean> {
  const PREVIEW_TOKEN = getPreviewToken();
  if (!token) return false;

  // Check environment token
  if (PREVIEW_TOKEN && token === PREVIEW_TOKEN) return true;

  // Check temporary access code
  const { isValid } = await validateTemporaryAccessCode(token);
  return isValid;
}

/**
 * Check if the current request has preview access
 * Checks both URL parameter and cookie
 */
export async function hasPreviewAccess(searchParams?: {
  preview?: string;
}): Promise<boolean> {
  // Check URL parameter first
  if (
    searchParams?.preview &&
    (await isValidPreviewToken(searchParams.preview))
  ) {
    return true;
  }

  // Check cookie
  const cookieStore = await cookies();
  const previewCookie = cookieStore.get(PREVIEW_COOKIE_NAME);

  if (previewCookie && (await isValidPreviewToken(previewCookie.value))) {
    return true;
  }

  return false;
}

/**
 * Get preview access level if preview mode is active
 */
export async function getPreviewAccessLevel(searchParams?: {
  preview?: string;
}): Promise<"full" | null> {
  const hasAccess = await hasPreviewAccess(searchParams);
  return hasAccess ? "full" : null;
}
