export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-full min-h-dvh place-items-center overflow-hidden p-4">
      {children}
    </div>
  );
}
