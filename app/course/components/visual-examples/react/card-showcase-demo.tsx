"use client";

import React, { useState } from "react";
import { ExampleWrapper } from "../base/example-wrapper";

// Card compound components
interface CardProps {
  variant?: "default" | "elevated" | "outlined";
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function Card({
  variant = "default",
  interactive = false,
  className = "",
  children,
  onClick,
}: CardProps) {
  const variants = {
    default: "bg-white dark:bg-neutral-800 shadow-sm",
    elevated: "bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl",
    outlined:
      "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700",
  };

  return (
    <article
      className={`rounded-xl overflow-hidden transition-all duration-200 ${variants[variant]} ${interactive ? "cursor-pointer hover:-translate-y-1" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </article>
  );
}

function CardMedia({
  src,
  alt,
  aspectRatio = "16/9",
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
}) {
  return (
    <div
      className="bg-neutral-200 dark:bg-neutral-700"
      style={{ aspectRatio }}
    >
      <div className="flex h-full w-full items-center justify-center text-neutral-400">
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>;
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-1 text-base font-semibold text-neutral-900 dark:text-white">
      {children}
    </h3>
  );
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
      {children}
    </p>
  );
}

function CardActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 border-t border-neutral-100 p-4 dark:border-neutral-700">
      {children}
    </div>
  );
}

export function CardShowcaseDemo() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ExampleWrapper
      title="Card Component"
      description="Composable cards with variants and interactive states"
    >
      <div className="space-y-8">
        {/* Variants */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Variants
          </h4>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card variant="default">
              <CardBody>
                <CardTitle>Default</CardTitle>
                <CardDescription>Basic card with subtle shadow</CardDescription>
              </CardBody>
            </Card>
            <Card variant="elevated">
              <CardBody>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>More prominent shadow</CardDescription>
              </CardBody>
            </Card>
            <Card variant="outlined">
              <CardBody>
                <CardTitle>Outlined</CardTitle>
                <CardDescription>Border instead of shadow</CardDescription>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Composition Example */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Composition
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Full card with all slots */}
            <Card variant="elevated">
              <CardMedia src="" alt="Product image" />
              <CardBody>
                <CardTitle>Product Card</CardTitle>
                <CardDescription>
                  A complete card with media, body, and actions. Each section is
                  a separate component.
                </CardDescription>
              </CardBody>
              <CardActions>
                <button
                  onClick={() => toggleLike(1)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    likes[1]
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  {likes[1] ? "♥ Liked" : "♡ Like"}
                </button>
                <button className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Add to Cart
                </button>
              </CardActions>
            </Card>

            {/* Minimal card */}
            <Card variant="outlined">
              <CardBody>
                <CardTitle>Minimal Card</CardTitle>
                <CardDescription>
                  Only using CardBody—no media or actions. Composition lets you
                  use only what you need.
                </CardDescription>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div>
                    <div className="text-sm font-medium text-neutral-900 dark:text-white">
                      Author Name
                    </div>
                    <div className="text-xs text-neutral-500">2 min read</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Interactive Cards */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Interactive Cards
          </h4>
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((id) => (
              <Card
                key={id}
                variant="elevated"
                interactive
                onClick={() => setSelectedCard(id)}
                className={
                  selectedCard === id
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : ""
                }
              >
                <CardBody>
                  <CardTitle>Card {id}</CardTitle>
                  <CardDescription>
                    Click to select. Interactive cards respond to hover and click.
                  </CardDescription>
                  {selectedCard === id && (
                    <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      Selected
                    </span>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>Composition pattern:</strong> Card, CardMedia, CardBody,
            CardTitle, CardDescription, and CardActions are all separate
            components. Use only what you need—the structure adapts to your
            content.
          </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}

