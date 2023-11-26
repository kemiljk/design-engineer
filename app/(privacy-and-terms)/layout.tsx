import React from "react";
import SectionTitle from "../components/section-title";

function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <main>
      <div className="mx-auto w-full p-4 pt-16 md:p-16 lg:max-w-5xl lg:p-24">
        <div className="flex flex-col items-center gap-10">
          <div className="mt-8 flex w-full flex-col items-center md:mt-0">
            <section className="mt-8">{children}</section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Layout;
