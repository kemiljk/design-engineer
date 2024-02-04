import React from "react";
import SectionTitle from "../components/section-title";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="mx-auto w-full p-4 pt-16 md:p-16 lg:p-24">
        <div className="flex flex-col items-center gap-10">
          <div className="mt-8 flex w-full max-w-5xl flex-col items-center md:mt-0">
            <SectionTitle>Jobs</SectionTitle>
            <p className="text-zinc-500 dark:text-zinc-400">
              The latest jobs for Design Engineers
            </p>
            <section className="mt-8">{children}</section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Layout;
