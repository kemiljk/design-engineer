import React from "react";
import { Resend } from "resend";
import { cosmic } from "@/lib/cosmic";
import { Chip } from "@nextui-org/chip";

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
      <article className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-20 text-foreground md:flex-row">
        {emails.map((email, index) => (
          <div key={index}>
            <div className="text-sm text-zinc-700 dark:text-zinc-300 md:border-r md:border-zinc-200 md:pr-4 md:dark:border-zinc-700">
              <Chip variant="bordered" className="text-xs">
                {new Date(email?.data?.created_at).toLocaleString() ?? ""}
              </Chip>
            </div>
            <div className="prose prose-zinc dark:prose-invert">
              {/* Remove specified colors and fix broken link */}
              {email?.data?.html && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: email.data.html
                      .replace(/style="color:#?([0-9a-fA-F]+);?"/g, "")
                      .replace(
                        /<a href="\[(.*?)\]\((.*?)\)" style="color:#067df7;text-decoration:none" target="_blank"><img src="(.*?)" style="display:block;outline:none;border:none;text-decoration:none;border-radius:8px" width="100%" \/><\/a>/g,
                        '<a href="$2"><img src="$3" style="display:block;outline:none;border:none;text-decoration:none;border-radius:8px" width="100%" /></a>',
                      )
                      .replace(/\bvide\b/g, "via"),
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
