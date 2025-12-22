"use client";

import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { clsx } from "clsx";

type Platform = "ios" | "android" | "web" | "macos";

type IconSize = {
  name: string;
  size: number;
  scale?: string;
  use: string;
};

const ICON_SIZES: Record<Platform, IconSize[]> = {
  ios: [
    { name: "iPhone Notification", size: 20, scale: "2x, 3x", use: "Notifications" },
    { name: "iPhone Settings", size: 29, scale: "2x, 3x", use: "Settings" },
    { name: "iPhone Spotlight", size: 40, scale: "2x, 3x", use: "Spotlight search" },
    { name: "iPhone App", size: 60, scale: "2x, 3x", use: "Home screen" },
    { name: "iPad Notification", size: 20, scale: "1x, 2x", use: "Notifications" },
    { name: "iPad Settings", size: 29, scale: "1x, 2x", use: "Settings" },
    { name: "iPad Spotlight", size: 40, scale: "1x, 2x", use: "Spotlight" },
    { name: "iPad App", size: 76, scale: "1x, 2x", use: "Home screen" },
    { name: "iPad Pro App", size: 83.5, scale: "2x", use: "Home screen" },
    { name: "App Store", size: 1024, scale: "1x", use: "App Store listing" },
  ],
  android: [
    { name: "LDPI", size: 36, use: "~120dpi devices" },
    { name: "MDPI", size: 48, use: "~160dpi (baseline)" },
    { name: "HDPI", size: 72, use: "~240dpi devices" },
    { name: "XHDPI", size: 96, use: "~320dpi devices" },
    { name: "XXHDPI", size: 144, use: "~480dpi devices" },
    { name: "XXXHDPI", size: 192, use: "~640dpi devices" },
    { name: "Play Store", size: 512, use: "Play Store listing" },
    { name: "Adaptive Icon", size: 108, use: "Foreground (with safe zone)" },
  ],
  web: [
    { name: "Favicon (ICO)", size: 16, use: "Browser tab" },
    { name: "Favicon (ICO)", size: 32, use: "Browser tab" },
    { name: "Apple Touch Icon", size: 180, use: "iOS home screen" },
    { name: "Android Chrome", size: 192, use: "Android home screen" },
    { name: "Android Chrome", size: 512, use: "Splash screen" },
    { name: "MS Tile", size: 150, use: "Windows tile" },
    { name: "MS Tile (Large)", size: 310, use: "Windows large tile" },
    { name: "Open Graph", size: 1200, use: "Social sharing (1200×630)" },
  ],
  macos: [
    { name: "16pt", size: 16, scale: "1x, 2x", use: "Finder, Dock (small)" },
    { name: "32pt", size: 32, scale: "1x, 2x", use: "Finder" },
    { name: "128pt", size: 128, scale: "1x, 2x", use: "Finder (large)" },
    { name: "256pt", size: 256, scale: "1x, 2x", use: "Finder, App Store" },
    { name: "512pt", size: 512, scale: "1x, 2x", use: "App Store" },
  ],
};

const PLATFORM_INFO: Record<Platform, { name: string; format: string; notes: string }> = {
  ios: {
    name: "iOS",
    format: "PNG (no alpha for App Store)",
    notes: "Use asset catalogs. No rounded corners (system applies them).",
  },
  android: {
    name: "Android",
    format: "PNG (WebP supported)",
    notes: "Use adaptive icons for Android 8+. Keep safe zone for foreground.",
  },
  web: {
    name: "Web",
    format: "PNG, ICO, SVG",
    notes: "Include multiple sizes in manifest.json. Consider SVG favicon.",
  },
  macos: {
    name: "macOS",
    format: "PNG or ICNS",
    notes: "Use .icns bundle or asset catalog. Include all sizes for sharp display.",
  },
};

export default function IconGenerator() {
  const [platform, setPlatform] = useState<Platform>("ios");
  const [baseSize, setBaseSize] = useState(1024);
  const [copied, setCopied] = useState<string | null>(null);

  const sizes = ICON_SIZES[platform];
  const info = PLATFORM_INFO[platform];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateManifest = () => {
    if (platform === "web") {
      const icons = [192, 512].map((size) => ({
        src: `/icons/icon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: "image/png",
        purpose: "any maskable",
      }));
      return JSON.stringify({ icons }, null, 2);
    }
    return "";
  };

  const generateAssetCatalog = () => {
    if (platform === "ios") {
      return `// Contents.json for AppIcon.appiconset
{
  "images": [
    ${sizes
      .filter((s) => s.size !== 1024)
      .map(
        (s) => `{
      "filename": "icon-${s.size}@${s.scale?.split(",")[0] || "1x"}.png",
      "idiom": "${s.name.includes("iPad") ? "ipad" : "iphone"}",
      "scale": "${s.scale?.split(",")[0] || "1x"}",
      "size": "${s.size}x${s.size}"
    }`
      )
      .join(",\n    ")}
  ],
  "info": { "author": "xcode", "version": 1 }
}`;
    }
    return "";
  };

  return (
    <div className="space-y-8">
      {/* Platform Selection */}
      <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <h2 className="mb-4 text-lg font-bold">Platform</h2>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(ICON_SIZES) as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={clsx(
                "rounded-none px-4 py-2 text-sm font-medium transition-colors",
                platform === p
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              )}
            >
              {PLATFORM_INFO[p].name}
            </button>
          ))}
        </div>

        {/* Platform Info */}
        <div className="mt-4 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <span className="text-neutral-500">Format:</span>{" "}
              <span className="font-medium">{info.format}</span>
            </div>
            <div>
              <span className="text-neutral-500">Note:</span>{" "}
              <span className="text-neutral-600 dark:text-neutral-400">{info.notes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Size Table */}
      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="border-b border-neutral-200 p-4 dark:border-neutral-800 sm:p-6">
          <h2 className="text-lg font-bold">Required Sizes</h2>
          <p className="mt-1 text-sm text-neutral-500">
            All sizes needed for {info.name} app icons
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800">
                <th className="px-4 py-3 text-left font-medium text-neutral-600 dark:text-neutral-400">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-neutral-600 dark:text-neutral-400">
                  Size (px)
                </th>
                {platform === "ios" || platform === "macos" ? (
                  <th className="px-4 py-3 text-left font-medium text-neutral-600 dark:text-neutral-400">
                    Scale
                  </th>
                ) : null}
                <th className="px-4 py-3 text-left font-medium text-neutral-600 dark:text-neutral-400">
                  Use
                </th>
                <th className="px-4 py-3 text-right font-medium text-neutral-600 dark:text-neutral-400">
                  Preview
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, i) => (
                <tr
                  key={`${size.name}-${size.size}`}
                  className="border-b border-neutral-100 dark:border-neutral-800"
                >
                  <td className="px-4 py-3 font-medium">{size.name}</td>
                  <td className="px-4 py-3 font-mono">{size.size}×{size.size}</td>
                  {platform === "ios" || platform === "macos" ? (
                    <td className="px-4 py-3 text-neutral-500">{size.scale || "-"}</td>
                  ) : null}
                  <td className="px-4 py-3 text-neutral-500">{size.use}</td>
                  <td className="px-4 py-3 text-right">
                    <div
                      className="ml-auto border border-neutral-200 bg-gradient-to-br from-swiss-red to-neutral-900 dark:border-neutral-700"
                      style={{
                        width: `${Math.min(size.size, 48)}px`,
                        height: `${Math.min(size.size, 48)}px`,
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Code Snippets */}
      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        {platform === "web" && (
          <div className="min-w-0 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">manifest.json</h3>
              <button
                onClick={() => handleCopy(generateManifest(), "manifest")}
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                {copied === "manifest" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-neutral-50 p-4 font-mono text-xs dark:bg-neutral-800">
              {generateManifest()}
            </pre>
          </div>
        )}

        {platform === "web" && (
          <div className="min-w-0 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">HTML Head Tags</h3>
              <button
                onClick={() =>
                  handleCopy(
                    `<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">`,
                    "html"
                  )
                }
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                {copied === "html" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-neutral-50 p-4 font-mono text-xs dark:bg-neutral-800">
              {`<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">`}
            </pre>
          </div>
        )}

        {platform === "ios" && (
          <div className="min-w-0 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">Asset Catalog (Contents.json)</h3>
              <button
                onClick={() => handleCopy(generateAssetCatalog(), "asset")}
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                {copied === "asset" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-lg bg-neutral-50 p-4 font-mono text-xs dark:bg-neutral-800">
              {generateAssetCatalog()}
            </pre>
          </div>
        )}

        {platform === "android" && (
          <div className="min-w-0 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6 lg:col-span-2">
            <h3 className="mb-4 font-bold">Directory Structure</h3>
            <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-neutral-50 p-4 font-mono text-xs dark:bg-neutral-800">
              {`res/
├── mipmap-ldpi/
│   └── ic_launcher.png (36×36)
├── mipmap-mdpi/
│   └── ic_launcher.png (48×48)
├── mipmap-hdpi/
│   └── ic_launcher.png (72×72)
├── mipmap-xhdpi/
│   └── ic_launcher.png (96×96)
├── mipmap-xxhdpi/
│   └── ic_launcher.png (144×144)
├── mipmap-xxxhdpi/
│   └── ic_launcher.png (192×192)
└── mipmap-anydpi-v26/
    └── ic_launcher.xml (adaptive icon)`}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
