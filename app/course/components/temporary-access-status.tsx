"use client";

import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { Clock, WarningCircle, CheckCircle } from "iconoir-react";
import type { CourseEnrollment } from "@/lib/types";

interface TemporaryAccessStatusProps {
  enrollment: CourseEnrollment | null;
}

export function TemporaryAccessStatus({
  enrollment,
}: TemporaryAccessStatusProps) {
  if (!enrollment?.metadata.is_temporary) {
    return null;
  }

  const expiresAt = enrollment.metadata.expires_at;
  const temporarySource = enrollment.metadata.temporary_source;

  if (!expiresAt) {
    return null;
  }

  const now = new Date();
  const expirationDate = new Date(expiresAt);
  const isExpired = now > expirationDate;

  // Calculate days remaining
  const daysRemaining = Math.max(
    0,
    Math.ceil(
      (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    ),
  );
  const hoursRemaining = Math.max(
    0,
    Math.ceil((expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60)),
  );

  const formatExpiration = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = () => {
    if (isExpired) {
      return (
        <Badge variant="accent">
          <WarningCircle className="mr-1 h-3 w-3" />
          Expired
        </Badge>
      );
    }

    if (daysRemaining <= 1) {
      return (
        <Badge variant="default">
          <Clock className="mr-1 h-3 w-3" />
          Expires Soon
        </Badge>
      );
    }

    return (
      <Badge variant="success">
        <CheckCircle className="mr-1 h-3 w-3" />
        Active
      </Badge>
    );
  };

  const getTimeRemainingText = () => {
    if (isExpired) {
      return "Access expired";
    }

    if (daysRemaining === 0 && hoursRemaining > 0) {
      return `${hoursRemaining} hour${hoursRemaining !== 1 ? "s" : ""} remaining`;
    }

    return `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} remaining`;
  };

  return (
    <Card
      className="border-swiss-red/20 bg-swiss-red/[0.025] dark:border-swiss-red/30 dark:bg-swiss-red/5 p-4"
      data-testid="temporary-access-status"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="font-semibold">Temporary Access</h3>
            {getStatusBadge()}
          </div>
          <p className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">
            You have full access to all course content.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{getTimeRemainingText()}</span>
            </div>
            <div>Expires: {formatExpiration(expirationDate)}</div>
          </div>
          {temporarySource && (
            <div className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
              Code: {temporarySource}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
