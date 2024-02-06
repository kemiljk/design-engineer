import React from "react";
import { Resend } from "resend";
import { cosmic } from "@/lib/cosmic";
import { Chip } from "@nextui-org/react";

interface EmailProps {
  title: string;
}

const Updates = async () => {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
  const getEmailIds = await cosmic.objects.find({
    type: "emails",
  });

  let emails: any[] = [];
  try {
    emails = await Promise.all(
      getEmailIds.objects.map(async (emailId: EmailProps) => {
        return resend.emails.get(emailId.title);
      }),
    );
  } catch (error) {
    console.log(error);
  }

  emails.sort(
    (a, b) =>
      new Date(b.data.created_at).getTime() -
      new Date(a.data.created_at).getTime(),
  );

  return (
    <section>
      <article className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-20 text-foreground md:flex-row">
        {emails.map((email, index) => (
          <div key={index}>
            <div className="text-sm text-zinc-700 dark:text-zinc-300 md:border-r md:border-zinc-200 md:pr-4 md:dark:border-zinc-700">
              <Chip variant="bordered" className="text-xs">
                {new Date(email?.data?.created_at).toLocaleString() ?? ""}
              </Chip>
            </div>
            <div className="prose dark:prose-invert prose-zinc">
              {/* Remove specified colors and fix broken link */}
              {email?.data?.html && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: email.data.html.replace(
                      /style="color:#?(000000|067df7);?"/g,
                      ''
                    ).replace(
                      /\[(.*?)\]\(https:\/\/x\.com\/dxe_xyz\/status\/(\d+)\?s=20\)/g,
                      '<a href="https://x.com/dxe_xyz/status/$2?s=20">$1</a>'
                    ),
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Updates;
