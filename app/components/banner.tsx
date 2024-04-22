"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowRightIcon, XIcon } from "lucide-react";
import Markdown from "react-markdown";

export default function Banner({
  link,
  message,
  button_label,
  modified_at,
}: {
  link: string;
  message: string;
  button_label: string;
  modified_at: string;
}) {
  const [bannerHidden, setBannerHidden] = useState(() => {
    const hiddenInStorage = localStorage.getItem("bannerHidden") === "true";
    const modifiedAtInStorage = localStorage.getItem("bannerModifiedAt");
    return hiddenInStorage && modifiedAtInStorage === modified_at;
  });

  useEffect(() => {
    if (bannerHidden) {
      localStorage.setItem("bannerHidden", "true");
      localStorage.setItem("bannerModifiedAt", modified_at);
    }
  }, [bannerHidden, modified_at]);

  return (
    !bannerHidden && (
      <div className="sticky z-[999999] flex w-full items-center gap-x-3 border-b-1 border-divider bg-gradient-to-r from-default-100 via-primary-100 to-success-100 px-6 py-2 sm:px-3.5 sm:before:flex-1">
        <Link className="text-small text-primary-800" href={link}>
          <Markdown>{message}</Markdown>
        </Link>
        <Button
          as={Link}
          className="group relative h-9 overflow-hidden bg-transparent text-small font-normal text-primary-800"
          color="default"
          endContent={
            <ArrowRightIcon
              className="flex-none outline-none transition-transform group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
              width={16}
            />
          }
          href={link}
          style={{
            border: "solid 2px transparent",
            backgroundImage: `linear-gradient(hsl(var(--nextui-primary-50)), hsl(var(--nextui-success-50))), linear-gradient(to right, #A3E635, #22D3EE)`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
          variant="bordered"
        >
          {button_label}
        </Button>
        <div className="flex flex-1 justify-end">
          <Button
            isIconOnly
            aria-label="Close Banner"
            className="-m-1 text-primary-800"
            size="sm"
            variant="light"
            onClick={() => setBannerHidden(true)}
          >
            <XIcon aria-hidden="true" className="text-default-500" width={20} />
          </Button>
        </div>
      </div>
    )
  );
}
