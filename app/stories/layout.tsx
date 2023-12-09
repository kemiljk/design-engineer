import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="mx-auto w-full p-4 md:px-16 lg:px-24">
        <div className="flex w-full flex-col items-center md:mt-0">
          <section>{children}</section>
        </div>
      </div>
    </main>
  );
}

export default Layout;
