"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  Mail,
  ArrowRight,
  Flash,
  Activity,
  Heart,
  Check,
  RefreshDouble,
  Send,
  Xmark,
  AtSign,
  Message,
  Calendar,
  Bell,
  CheckCircle,
  Settings,
  User,
  HelpCircle,
  ChatBubble,
  Repeat,
  ShareIos,
  SunLight,
  HalfMoon,
} from "iconoir-react";
import { cn } from "@/lib/utils";

// Hide Next.js devtools
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    html, body { margin: 0 !important; padding: 0 !important; overflow: hidden !important; }
    [data-nextjs-dialog-overlay], [data-nextjs-dialog], nextjs-portal,
    #__next-build-indicator, [data-nextjs-toast] { display: none !important; }
  `;
  document.head.appendChild(style);
}

// ============================================
// 1. Border Beam
// ============================================

function BorderBeam({
  size = 50,
  duration = 6,
  borderWidth = 1.5,
}: {
  size?: number;
  duration?: number;
  borderWidth?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
      style={
        { "--border-beam-width": `${borderWidth}px` } as React.CSSProperties
      }
    >
      <motion.div
        className="absolute aspect-square"
        style={{
          width: size * 1.5,
          offsetPath: `rect(0 auto auto 0 round ${size * 1.5}px)`,
          background: `radial-gradient(ellipse 50% 80% at 50% 50%, #ffaa40, #9c40ff 50%, transparent 80%)`,
        }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      />
    </div>
  );
}

function BorderBeamCaptureDemo() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg">
      <BorderBeam size={120} duration={12} borderWidth={1.5} />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <Flash className="h-5 w-5 text-amber-500" />
          <span className="text-base font-semibold text-neutral-900">
            Join the waitlist
          </span>
        </div>
        <p className="text-sm text-neutral-500">
          Get early access to our design engineering course.
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="h-10 w-full rounded-lg border border-neutral-200 bg-neutral-50 pr-4 pl-10 text-sm"
              readOnly
            />
          </div>
          <button className="flex h-10 items-center gap-1.5 rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white">
            Subscribe <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 2. Motion Feedback
// ============================================

function FeedbackCaptureDemo() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        await new Promise((r) => setTimeout(r, 1500));
        if (!mounted) break;
        setState("loading");
        await new Promise((r) => setTimeout(r, 1200));
        if (!mounted) break;
        setState("success");
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;
        setState("idle");
        await new Promise((r) => setTimeout(r, 1500));
        if (!mounted) break;
        setState("loading");
        await new Promise((r) => setTimeout(r, 1200));
        if (!mounted) break;
        setState("error");
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;
        setState("idle");
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.button
      animate={state === "error" ? { x: [-3, 3, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition-colors",
        state === "success"
          ? "bg-emerald-500"
          : state === "error"
            ? "bg-red-500"
            : "bg-neutral-900",
      )}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" /> FloppyDisk Changes
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <RefreshDouble className="h-5 w-5 animate-spin" />
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check className="h-5 w-5" /> Saved!
          </motion.span>
        )}
        {state === "error" && (
          <motion.span
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Xmark className="h-5 w-5" /> Failed
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ============================================
// 3. Motion Relationships (Dropdown)
// ============================================

const menuItems = [
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications", badge: 3 },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Support" },
];

function RelationshipsCaptureDemo() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      await new Promise((r) => setTimeout(r, 800));
      while (mounted) {
        setIsOpen(true);
        await new Promise((r) => setTimeout(r, 3000));
        if (!mounted) break;
        setIsOpen(false);
        await new Promise((r) => setTimeout(r, 1500));
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center pt-8">
      <div className="relative">
        <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 text-[10px] font-bold text-white">
            K
          </div>
          Account
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              style={{ transformOrigin: "top center" }}
              className="absolute top-full left-1/2 mt-2 w-52 -translate-x-1/2 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl"
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  <item.icon className="h-4 w-4 text-neutral-400" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================
// 4. Stagger Choreography
// ============================================

const notifications = [
  {
    title: "New Message",
    sub: "Sarah sent you a photo",
    icon: Message,
    color: "bg-indigo-500",
  },
  {
    title: "Meeting Reminder",
    sub: "Team Standup in 15m",
    icon: Calendar,
    color: "bg-emerald-500",
  },
  {
    title: "Email Received",
    sub: "Project Update: Q4",
    icon: Mail,
    color: "bg-blue-500",
  },
  {
    title: "System Alert",
    sub: "Backup completed",
    icon: CheckCircle,
    color: "bg-amber-500",
  },
];

function ChoreographyCaptureDemo() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        await new Promise((r) => setTimeout(r, 5000));
        if (!mounted) break;
        setKey((k) => k + 1);
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full max-w-sm space-y-2">
      {notifications.map((item, i) => (
        <motion.div
          key={`${key}-${i}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: i * 0.12,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: i * 0.12 + 0.15,
              duration: 0.4,
              type: "spring" as const,
              stiffness: 260,
              damping: 20,
            }}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-white",
              item.color,
            )}
          >
            <item.icon className="h-4 w-4" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-neutral-900">
              {item.title}
            </p>
            <p className="truncate text-xs text-neutral-500">{item.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// 5. Button States
// ============================================

function ButtonStatesCaptureDemo() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;
        setState("loading");
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;
        setState("success");
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;
        setState("idle");
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex h-14 min-w-[200px] items-center justify-center gap-2 rounded-2xl px-8 text-base font-semibold text-white shadow-lg transition-all",
        state === "success"
          ? "bg-emerald-500 shadow-emerald-500/30"
          : "bg-linear-to-r from-indigo-500 to-purple-600 shadow-indigo-500/30",
      )}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Send className="h-5 w-5" /> Send Message
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <RefreshDouble className="h-6 w-6 animate-spin" />
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check className="h-6 w-6" /> Sent!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ============================================
// 6. Toggle Switch - Day/Night
// ============================================

function ToggleSwitchCaptureDemo() {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        await new Promise((r) => setTimeout(r, 3500));
        if (!mounted) break;
        setIsOn((v) => !v);
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className="relative flex h-48 w-80 items-center justify-center overflow-hidden rounded-3xl"
      style={{
        background: isOn
          ? "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)"
          : "linear-gradient(180deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
        transition: "background 0.8s ease",
      }}
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {isOn ? (
          // Night - stars
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: 2 + (i % 3),
                  height: 2 + (i % 3),
                  left: `${5 + ((i * 17) % 90)}%`,
                  top: `${5 + ((i * 23) % 90)}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
            <motion.div
              className="absolute top-6 right-8 text-3xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              🌙
            </motion.div>
          </>
        ) : (
          // Day - sun
          <>
            <motion.div
              className="absolute top-6 left-8 text-3xl"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              ☀️
            </motion.div>
            <motion.div
              className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </>
        )}
      </div>

      {/* Toggle */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <button
          onClick={() => setIsOn(!isOn)}
          className="relative p-1 transition-all duration-300"
          style={{
            width: 80,
            height: 44,
            borderRadius: 22,
            background: isOn
              ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
              : "linear-gradient(180deg, #f5f5f4 0%, #e7e5e4 100%)",
            boxShadow: isOn
              ? "0 0 24px rgba(99, 102, 241, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)"
              : "inset 0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          <motion.div
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              background: "white",
              boxShadow:
                "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
            animate={{ x: isOn ? 36 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOn ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isOn ? (
                <HalfMoon className="size-4 text-indigo-600" />
              ) : (
                <SunLight className="size-4 text-amber-500" />
              )}
            </motion.div>
          </motion.div>
        </button>
        <span
          className={cn(
            "text-sm font-semibold transition-colors",
            isOn ? "text-white" : "text-amber-900",
          )}
        >
          {isOn ? "Night Mode" : "Day Mode"}
        </span>
      </div>
    </div>
  );
}

// ============================================
// 7. Like Button - Social Card
// ============================================

function LikeButtonCaptureDemo() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(127);
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;
        // Like
        setParticles(Array.from({ length: 8 }, (_, i) => Date.now() + i));
        setIsLiked(true);
        setLikeCount(128);
        setTimeout(() => setParticles([]), 700);
        await new Promise((r) => setTimeout(r, 3000));
        if (!mounted) break;
        // Unlike
        setIsLiked(false);
        setLikeCount(127);
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="relative w-full max-w-80 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-neutral-100 p-4">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-linear-to-br from-indigo-500 to-purple-600 p-0.5">
          <div className="h-full w-full rounded-full bg-white p-0.5">
            <div className="h-full w-full rounded-full bg-linear-to-br from-indigo-500 to-purple-600" />
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-neutral-900">Design Engineer</p>
          <p className="text-xs text-neutral-500">@designengineer • 2h</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[15px] leading-relaxed text-neutral-600">
          Just shipped a beautiful new animation library! The spring physics
          make everything feel so much more alive. 🚀✨
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-neutral-100 px-2 py-2">
        {/* Like button */}
        <button className="group relative flex items-center gap-2 rounded-3xl px-3 py-2 transition-colors hover:bg-pink-50">
          {/* Particle burst */}
          <AnimatePresence>
            {particles.map((id, i) => (
              <motion.div
                key={id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: 2,
                  opacity: 0,
                  x: Math.cos((i / 8) * Math.PI * 2) * 30,
                  y: Math.sin((i / 8) * Math.PI * 2) * 30,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" as const }}
                className="absolute top-1/2 left-3 -translate-y-1/2"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  background: "#ec4899",
                }}
              />
            ))}
          </AnimatePresence>

          <motion.div
            animate={isLiked ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
          >
            <Heart
              className={cn(
                "size-[20px] transition-all duration-200",
                isLiked
                  ? "fill-pink-500 text-pink-500"
                  : "text-neutral-400 group-hover:text-pink-500",
              )}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.span
              key={likeCount}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "text-sm font-medium tabular-nums transition-colors",
                isLiked ? "text-pink-600" : "text-neutral-500",
              )}
            >
              {likeCount}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Other actions */}
        <button className="flex items-center gap-2 rounded-3xl px-3 py-2 text-neutral-400 transition-colors hover:bg-blue-50 hover:text-blue-500">
          <ChatBubble className="size-[18px]" />
          <span className="text-sm font-medium">24</span>
        </button>

        <button className="flex items-center gap-2 rounded-3xl px-3 py-2 text-neutral-400 transition-colors hover:bg-emerald-50 hover:text-emerald-500">
          <Repeat className="size-[18px]" />
          <span className="text-sm font-medium">8</span>
        </button>

        <button className="rounded-3xl px-3 py-2 text-neutral-400 transition-colors hover:bg-blue-50 hover:text-blue-500">
          <ShareIos className="size-[18px]" />
        </button>
      </div>
    </div>
  );
}

// ============================================
// 8. Micro-Validation
// ============================================

function MicroValidationCaptureDemo() {
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<
    "idle" | "checking" | "available" | "unavailable"
  >("idle");

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        // Type "karl"
        for (const char of "karl") {
          if (!mounted) break;
          setUsername((u) => u + char);
          await new Promise((r) => setTimeout(r, 150));
        }
        await new Promise((r) => setTimeout(r, 300));
        if (!mounted) break;
        setStatus("checking");
        await new Promise((r) => setTimeout(r, 800));
        if (!mounted) break;
        setStatus("unavailable");
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;
        // Clear and type "designer"
        setUsername("");
        setStatus("idle");
        await new Promise((r) => setTimeout(r, 500));
        for (const char of "designer") {
          if (!mounted) break;
          setUsername((u) => u + char);
          await new Promise((r) => setTimeout(r, 120));
        }
        await new Promise((r) => setTimeout(r, 300));
        if (!mounted) break;
        setStatus("checking");
        await new Promise((r) => setTimeout(r, 800));
        if (!mounted) break;
        setStatus("available");
        await new Promise((r) => setTimeout(r, 2500));
        if (!mounted) break;
        setUsername("");
        setStatus("idle");
        await new Promise((r) => setTimeout(r, 1000));
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="relative">
        <AtSign className="absolute top-3.5 left-4 h-5 w-5 text-neutral-400" />
        <input
          value={username}
          readOnly
          placeholder="username"
          className={cn(
            "h-12 w-full rounded-xl border-2 bg-white pr-12 pl-12 text-sm font-medium transition-colors",
            status === "available"
              ? "border-emerald-500"
              : status === "unavailable"
                ? "border-red-500"
                : "border-neutral-200",
          )}
        />
        <div className="absolute top-3.5 right-4">
          <AnimatePresence mode="wait">
            {status === "checking" && (
              <motion.div
                key="check"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RefreshDouble className="h-5 w-5 animate-spin text-neutral-400" />
              </motion.div>
            )}
            {status === "available" && (
              <motion.div
                key="ok"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="h-5 w-5 text-emerald-500" />
              </motion.div>
            )}
            {status === "unavailable" && (
              <motion.div
                key="no"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Xmark className="h-5 w-5 text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {status === "available" && (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs font-medium text-emerald-600"
          >
            Username available!
          </motion.p>
        )}
        {status === "unavailable" && (
          <motion.p
            key="no"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs font-medium text-red-600"
          >
            Username already taken
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// 9. Notification Bell - Complex Layered Animation
// ============================================

function NotificationBellCaptureDemo() {
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);
  const [particles, setParticles] = useState<
    { id: number; angle: number; distance: number }[]
  >([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<
    { id: number; text: string }[]
  >([]);

  const notificationTexts = [
    "New message from Sarah",
    "Meeting in 15 minutes",
    "Your order shipped!",
    "2 new followers",
  ];

  useEffect(() => {
    let mounted = true;
    const cycle = async () => {
      while (mounted) {
        await new Promise((r) => setTimeout(r, 1500));
        if (!mounted) break;

        // Trigger the bell
        setIsActive(true);

        // Add ripples
        const rippleIds = [Date.now(), Date.now() + 1, Date.now() + 2];
        setRipples(rippleIds);

        // Add particles
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
          id: Date.now() + i,
          angle: (i / 12) * 360,
          distance: 40 + Math.random() * 20,
        }));
        setParticles(newParticles);

        // Increment count and add notification
        setNotificationCount((c) => c + 1);
        setNotifications((n) => [
          {
            id: Date.now(),
            text: notificationTexts[n.length % notificationTexts.length],
          },
          ...n.slice(0, 2),
        ]);

        // Clean up after animation
        await new Promise((r) => setTimeout(r, 600));
        if (!mounted) break;
        setIsActive(false);
        setRipples([]);
        setParticles([]);

        // Wait before next cycle
        await new Promise((r) => setTimeout(r, 2000));
        if (!mounted) break;

        // Reset for loop
        if (notificationCount >= 3) {
          setNotificationCount(0);
          setNotifications([]);
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
    };
    cycle();
    return () => {
      mounted = false;
    };
  }, [notificationCount]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Bell Container */}
      <div className="relative">
        {/* Ripple rings */}
        <AnimatePresence>
          {ripples.map((id, i) => (
            <motion.div
              key={id}
              className="absolute top-1/2 left-1/2 rounded-full border-2 border-amber-400"
              initial={{
                width: 60,
                height: 60,
                x: "-50%",
                y: "-50%",
                opacity: 0.8,
              }}
              animate={{ width: 140, height: 140, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-amber-400"
              initial={{ x: "-50%", y: "-50%", scale: 0 }}
              animate={{
                x: Math.cos((p.angle * Math.PI) / 180) * p.distance - 4,
                y: Math.sin((p.angle * Math.PI) / 180) * p.distance - 4,
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* Glow effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/30 blur-xl"
          animate={{ scale: isActive ? 1.5 : 1, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Bell button */}
        <motion.button
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30"
          animate={
            isActive
              ? {
                  rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                  scale: [1, 1.1, 1],
                }
              : { rotate: 0, scale: 1 }
          }
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Bell className="h-8 w-8 text-white" fill="currentColor" />

          {/* Notification badge */}
          <AnimatePresence>
            {notificationCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md"
              >
                {notificationCount}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Stacked Notifications */}
      <div className="relative h-24 w-64">
        <AnimatePresence>
          {notifications.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{
                opacity: 1 - i * 0.3,
                y: i * 8,
                scale: 1 - i * 0.05,
                zIndex: 10 - i,
              }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute inset-x-0 top-0 rounded-xl border border-neutral-200 bg-white p-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                  <Bell className="h-4 w-4 text-amber-600" />
                </div>
                <p className="flex-1 truncate text-sm font-medium text-neutral-900">
                  {notif.text}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================
// Example Map & Client
// ============================================

export const EXAMPLE_MAP: Record<string, React.ComponentType> = {
  "border-beam": BorderBeamCaptureDemo,
  feedback: FeedbackCaptureDemo,
  relationships: RelationshipsCaptureDemo,
  choreography: ChoreographyCaptureDemo,
  "button-states": ButtonStatesCaptureDemo,
  "toggle-switch": ToggleSwitchCaptureDemo,
  "like-button": LikeButtonCaptureDemo,
  "micro-validation": MicroValidationCaptureDemo,
  "notification-bell": NotificationBellCaptureDemo,
};

export function CaptureClient({ exampleId }: { exampleId: string }) {
  const [isReady, setIsReady] = useState(false);
  const ExampleComponent = EXAMPLE_MAP[exampleId];

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!ExampleComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Example Not Found</h1>
          <p className="mt-2 text-neutral-400">ID: {exampleId}</p>
          <p className="mt-4 text-xs text-neutral-600">
            {Object.keys(EXAMPLE_MAP).join(", ")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-neutral-100 p-16">
      <div
        className="sr-only"
        data-capture-ready={isReady}
        data-example-id={exampleId}
      />
      <ExampleComponent />
    </div>
  );
}
