"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Copy, RefreshCw, CheckCircle, XCircle, Users } from "lucide-react";

// Admin user ID
const ADMIN_USER_ID = "user_2YfwsgLf6sxplrtpJw2z3n805R3";

interface TemporaryAccessCode {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  metadata: {
    code: string;
    access_level: string;
    expires_at: string;
    created_at: string;
    used_at?: string;
    used_by_user_id?: string;
    status: "active" | "used" | "expired";
  };
}

export default function TemporaryAccessAdmin() {
  const { user, isLoaded } = useUser();
  const [codes, setCodes] = useState<TemporaryAccessCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [count, setCount] = useState(5);
  const [expiresInDays, setExpiresInDays] = useState(7);

  // Check if user is admin
  const isAdmin = isLoaded && user?.id === ADMIN_USER_ID;

  const fetchCodes = async () => {
    try {
      const response = await fetch("/api/admin/temporary-access");
      const data = await response.json();

      if (data.success) {
        setCodes(data.codes);
      } else {
        toast.error("Failed to fetch codes");
      }
    } catch (error) {
      toast.error("Error fetching codes");
    } finally {
      setLoading(false);
    }
  };

  const createCodes = async () => {
    setCreating(true);
    try {
      const response = await fetch("/api/admin/temporary-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count,
          expiresInDays,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Created ${count} temporary access code(s)`);
        await fetchCodes();

        // Copy all new codes to clipboard
        const newCodes = data.codes
          .map((code: TemporaryAccessCode) => code.metadata.code)
          .join("\n");
        await navigator.clipboard.writeText(newCodes);
        toast.info("New codes copied to clipboard");
      } else {
        toast.error(data.error || "Failed to create codes");
      }
    } catch (error) {
      toast.error("Error creating codes");
    } finally {
      setCreating(false);
    }
  };

  const cleanupExpired = async () => {
    try {
      const response = await fetch(
        "/api/admin/temporary-access?action=cleanup",
      );
      const data = await response.json();

      if (data.success) {
        toast.success(
          `Cleaned up ${data.codesCleaned} expired codes and ${data.enrollmentsCleaned} expired enrollments`,
        );
        await fetchCodes();
      } else {
        toast.error("Failed to cleanup");
      }
    } catch (error) {
      toast.error("Error during cleanup");
    }
  };

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="success">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "used":
        return (
          <Badge variant="default">
            <Users className="mr-1 h-3 w-3" />
            Used
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="accent">
            <XCircle className="mr-1 h-3 w-3" />
            Expired
          </Badge>
        );
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchCodes();
    }
  }, [isAdmin]);

  if (!isLoaded) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8">
        <Card className="p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this admin panel.
          </p>
        </Card>
      </div>
    );
  }

  const activeCount = codes.filter(
    (c) => c.metadata.status === "active",
  ).length;
  const usedCount = codes.filter((c) => c.metadata.status === "used").length;
  const expiredCount = codes.filter(
    (c) => c.metadata.status === "expired",
  ).length;

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Temporary Access Admin</h1>
          <p className="text-muted-foreground">
            Manage temporary access codes for the course
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={cleanupExpired} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Cleanup Expired
          </Button>
          <Button onClick={fetchCodes} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Statistics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{codes.length}</div>
            <div className="text-muted-foreground text-sm">Total Codes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {activeCount}
            </div>
            <div className="text-muted-foreground text-sm">Active Codes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{usedCount}</div>
            <div className="text-muted-foreground text-sm">Used Codes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {expiredCount}
            </div>
            <div className="text-muted-foreground text-sm">Expired Codes</div>
          </div>
        </div>
      </Card>

      {/* Create Codes */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Create New Temporary Access Codes
        </h2>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Codes</label>
            <Input
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e: any) => setCount(parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Expires In (Days)</label>
            <Input
              type="number"
              min="1"
              max="365"
              value={expiresInDays}
              onChange={(e: any) =>
                setExpiresInDays(parseInt(e.target.value) || 7)
              }
            />
          </div>
          <div className="flex items-end">
            <Button
              onClick={createCodes}
              disabled={creating}
              className="w-full"
            >
              {creating
                ? "Creating..."
                : `Create ${count} Code${count !== 1 ? "s" : ""}`}
            </Button>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          <p>
            • Each code provides 7 days of full access to all course content
          </p>
          <p>• Codes are single-use and will be marked as used when redeemed</p>
          <p>• New codes will be automatically copied to your clipboard</p>
        </div>
      </Card>

      {/* Manage Codes */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Manage Temporary Access Codes
        </h2>
        {loading ? (
          <div className="py-8 text-center">Loading codes...</div>
        ) : codes.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            No temporary access codes found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Used By</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell className="font-mono">
                      {code.metadata.code}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(code.metadata.status)}
                    </TableCell>
                    <TableCell>
                      {formatDate(code.metadata.created_at)}
                    </TableCell>
                    <TableCell>
                      {formatDate(code.metadata.expires_at)}
                    </TableCell>
                    <TableCell>
                      {code.metadata.used_by_user_id ? (
                        <code className="bg-muted rounded px-2 py-1 text-xs">
                          {code.metadata.used_by_user_id}
                        </code>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => copyCode(code.metadata.code)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
