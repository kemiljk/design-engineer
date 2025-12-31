"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { BannerProvider } from "./components/banner-context";

const clerkLightVariables = {
  colorPrimary: "#ff4400",
  colorDanger: "#dc2626",
  colorBackground: "#ffffff",
  colorInputBackground: "#fafafa",
  colorInputText: "#000000",
  colorText: "#000000",
  colorTextSecondary: "#404040",
  colorNeutral: "#525252",
  borderRadius: "0px",
  fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
};

const clerkDarkVariables = {
  colorPrimary: "#ff4400",
  colorDanger: "#dc2626",
  colorBackground: "#0a0a0a",
  colorInputBackground: "#171717",
  colorInputText: "#ffffff",
  colorText: "#ffffff",
  colorTextSecondary: "#fafafa",
  colorNeutral: "#a3a3a3",
  borderRadius: "0px",
  fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
};

const clerkLightElements = {
  card: "shadow-none border rounded-none",
  navbar: "rounded-none",
  navbarButton: "rounded-none",
  headerTitle: "font-bold text-black",
  headerSubtitle: "text-neutral-600",
  socialButtonsBlockButton: "rounded-none",
  socialButtonsBlockButtonText: "font-medium",
  formButtonPrimary: "rounded-none font-medium",
  formFieldInput: "rounded-none",
  formFieldLabel: "font-medium",
  footerActionLink: "text-swiss-red hover:text-swiss-red/80",
  identityPreviewEditButton: "text-swiss-red hover:text-swiss-red/80",
  userButtonPopoverCard: "shadow-lg rounded-none border-neutral-200",
  userButtonPopoverActionButton: "rounded-none",
  userButtonPopoverActionButtonText: "text-black",
  userButtonPopoverActionButtonIcon: "text-neutral-600",
  userButtonPopoverFooter: "hidden",
  userPreviewMainIdentifier: "font-medium text-black",
  userPreviewSecondaryIdentifier: "text-neutral-600",
  avatarBox: "rounded-none",
  badge: "rounded-none",
  menuButton: "rounded-none",
  menuList: "rounded-none",
  menuItem: "rounded-none",
};

const clerkDarkElements = {
  card: "shadow-none border rounded-none border-neutral-800",
  navbar: "rounded-none",
  navbarButton: "rounded-none",
  headerTitle: "font-bold text-white",
  headerSubtitle: "text-neutral-300",
  socialButtonsBlockButton: "rounded-none",
  socialButtonsBlockButtonText: "font-medium",
  formButtonPrimary: "rounded-none font-medium",
  formFieldInput: "rounded-none",
  formFieldLabel: "font-medium",
  footerActionLink: "text-swiss-red hover:text-swiss-red/80",
  identityPreviewEditButton: "text-swiss-red hover:text-swiss-red/80",
  userButtonPopoverCard: "shadow-lg rounded-none border-neutral-800",
  userButtonPopoverActionButton: "rounded-none",
  userButtonPopoverActionButtonText: "!text-white",
  userButtonPopoverActionButtonIcon: "!text-neutral-300",
  userButtonPopoverFooter: "hidden",
  userPreviewMainIdentifier: "font-medium !text-white",
  userPreviewSecondaryIdentifier: "!text-neutral-300",
  avatarBox: "rounded-none",
  badge: "rounded-none",
  menuButton: "rounded-none",
  menuList: "rounded-none",
  menuItem: "rounded-none",
};

function ClerkThemeWrapper({
  children,
  signInFallbackRedirectUrl,
  signUpFallbackRedirectUrl,
}: {
  children: React.ReactNode;
  signInFallbackRedirectUrl?: string;
  signUpFallbackRedirectUrl?: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <ClerkProvider
      signInFallbackRedirectUrl={signInFallbackRedirectUrl}
      signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
      appearance={{
        baseTheme: isDark ? dark : undefined,
        variables: isDark ? clerkDarkVariables : clerkLightVariables,
        elements: isDark ? clerkDarkElements : clerkLightElements,
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export function Providers({
  children,
  signInFallbackRedirectUrl,
  signUpFallbackRedirectUrl,
}: {
  children: React.ReactNode;
  signInFallbackRedirectUrl?: string;
  signUpFallbackRedirectUrl?: string;
}) {
  return (
    <NextThemesProvider attribute="class">
      <ClerkThemeWrapper
        signInFallbackRedirectUrl={signInFallbackRedirectUrl}
        signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
      >
        <BannerProvider>
          {children}
          <Toaster richColors position="bottom-center" />
        </BannerProvider>
      </ClerkThemeWrapper>
    </NextThemesProvider>
  );
}
