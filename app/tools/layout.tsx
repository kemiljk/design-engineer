import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="mx-auto w-full p-4 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-10">
          <div className="flex w-full max-w-3xl flex-col items-center md:mt-0">
            <section className="mt-8 w-full min-w-full max-w-3xl lg:min-w-[48rem]">
              {children}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Layout;
