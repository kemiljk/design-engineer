"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Card } from "@/app/components/ui/card";
import { toast } from "sonner";
import { Clock, Gift, CheckCircle } from "iconoir-react";

interface TemporaryAccessRedeemProps {
  onRedeemSuccess?: () => void;
}

export function TemporaryAccessRedeem({
  onRedeemSuccess,
}: TemporaryAccessRedeemProps) {
  const [code, setCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [validating, setValidating] = useState(false);
  const [codeStatus, setCodeStatus] = useState<{
    isValid: boolean;
    reason?: string;
  } | null>(null);

  const validateCode = async (codeToValidate: string) => {
    if (codeToValidate.length < 3) {
      setCodeStatus(null);
      return;
    }

    setValidating(true);
    try {
      const response = await fetch(
        `/api/course/temporary-access/check/${codeToValidate}`,
      );
      const data = await response.json();

      setCodeStatus({
        isValid: data.isValid,
        reason: data.reason,
      });
    } catch (error) {
      setCodeStatus(null);
    } finally {
      setValidating(false);
    }
  };

  const handleCodeChange = (value: string) => {
    const cleanCode = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setCode(cleanCode);
    setCodeStatus(null);

    if (cleanCode.length >= 6) {
      validateCode(cleanCode);
    }
  };

  const redeemCode = async () => {
    if (!code.trim()) {
      toast.error("Please enter an access code");
      return;
    }

    setRedeeming(true);
    try {
      const response = await fetch("/api/course/temporary-access/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Access code redeemed successfully!");
        setCode("");
        setCodeStatus(null);
        onRedeemSuccess?.();
      } else {
        toast.error(data.error || "Failed to redeem code");
      }
    } catch (error) {
      toast.error("Error redeeming code. Please try again.");
    } finally {
      setRedeeming(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      redeemCode();
    }
  };

  const getCodeStatusBadge = () => {
    if (validating) {
      return <Badge variant="default">Checking...</Badge>;
    }

    if (!codeStatus || code.length < 6) {
      return null;
    }

    if (codeStatus.isValid) {
      return (
        <Badge variant="success">
          <CheckCircle className="mr-1 h-3 w-3" />
          Valid Code
        </Badge>
      );
    } else {
      return (
        <Badge variant="accent">{codeStatus.reason || "Invalid Code"}</Badge>
      );
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
          <Gift className="text-swiss-red h-5 w-5" />
          Have a Temporary Access Code?
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Redeem a code to get 7 days of full access to all course content.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Access Code</label>
          <div className="relative">
            <Input
              data-testid="access-code-input"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your code (e.g., ABC12345)"
              className="font-mono uppercase"
              maxLength={12}
              disabled={redeeming}
            />
            {getCodeStatusBadge() && (
              <div className="absolute top-1/2 right-2 -translate-y-1/2">
                {getCodeStatusBadge()}
              </div>
            )}
          </div>
        </div>

        <Button
          data-testid="redeem-code-button"
          onClick={redeemCode}
          isDisabled={
            redeeming ||
            !code.trim() ||
            (codeStatus !== null && codeStatus.isValid === false)
          }
          className="w-full"
        >
          {redeeming ? "Redeeming..." : "Redeem Access Code"}
        </Button>

        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          <div className="mb-1 flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>Codes are single-use and expire after 7 days</span>
          </div>
          <p>
            Full access includes all tracks: Design, Engineering, and
            Convergence content
          </p>
        </div>
      </div>
    </Card>
  );
}
