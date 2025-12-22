import { cookies } from "next/headers";

const PREVIEW_TOKEN = process.env.COURSE_PREVIEW_TOKEN;
const PREVIEW_COOKIE_NAME = "dxe_preview";

/**
 * Check if a preview token is valid
 */
export function isValidPreviewToken(token: string | null): boolean {
  if (!PREVIEW_TOKEN || !token) return false;
  return token === PREVIEW_TOKEN;
}

/**
 * Check if the current request has preview access
 * Checks both URL parameter and cookie
 */
export async function hasPreviewAccess(
  searchParams?: { preview?: string }
): Promise<boolean> {
  // Check URL parameter first
  if (searchParams?.preview && isValidPreviewToken(searchParams.preview)) {
    return true;
  }

  // Check cookie
  const cookieStore = await cookies();
  const previewCookie = cookieStore.get(PREVIEW_COOKIE_NAME);

  if (previewCookie && isValidPreviewToken(previewCookie.value)) {
    return true;
  }

  return false;
}

/**
 * Get preview access level if preview mode is active
 */
export async function getPreviewAccessLevel(
  searchParams?: { preview?: string }
): Promise<"full" | null> {
  const hasAccess = await hasPreviewAccess(searchParams);
  return hasAccess ? "full" : null;
}
