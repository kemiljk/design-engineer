import React from "react";
import CommentsPresence from "../components/comments/comments-presence";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <CommentsPresence roomId="stories-canvas">
        <div className="mx-auto w-full p-4 md:px-16 lg:px-24">
          <div className="flex w-full flex-col items-center md:mt-0">
            <section>{children}</section>
          </div>
        </div>
      </CommentsPresence>
    </main>
  );
}

export default Layout;
