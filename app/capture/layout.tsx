/**
 * Minimal Layout for Capture Routes
 *
 * Navigation is hidden via pathname check in the Nav component.
 * This layout just passes children through without any chrome.
 */

export default function CaptureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
