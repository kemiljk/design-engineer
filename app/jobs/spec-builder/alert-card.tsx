import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { cn } from "@/lib/utils";

export default function AlertCard({
  title,
  message,
  className,
  button,
}: {
  title: string;
  message: string;
  className?: string;
  button?: React.ReactNode;
}) {
  return (
    <Card className={cn(`${className} w-full`)} shadow="none">
      <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
        <div className="px-4 py-5">
          <h3 className="font-display font-semibold">{title}</h3>
          <div className="flex flex-col gap-3 pt-2 text-sm text-foreground-500">
            <p>{message}</p>
          </div>
        </div>
      </CardBody>
      {button && (
        <CardFooter>
          <div className="flex w-full items-center justify-end">{button}</div>
        </CardFooter>
      )}
    </Card>
  );
}
