import React from "react";
import SectionTitle from "../components/section-title";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="mx-auto w-full p-4 md:p-16 lg:max-w-5xl lg:p-24">
        <div className="flex flex-col items-center gap-10">
          <div className="mt-8 flex w-full flex-col items-center md:mt-0">
            <SectionTitle>About</SectionTitle>
            <p className="text-zinc-500 dark:text-zinc-400">
              Learn more about d×e
            </p>
            <section className="mt-8">{children}</section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Layout;
