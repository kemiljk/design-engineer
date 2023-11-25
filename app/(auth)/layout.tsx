import { BlurShape } from "../components/blur-shape";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-between overflow-hidden p-4 md:px-16 md:pt-16 lg:px-24 lg:pt-24">
      <div className="absolute inset-0 grid place-content-center">
        <BlurShape />
      </div>
      {children}
    </div>
  );
}
