"use client";

import { ExternalLink, Github, Video, Clock, CheckCircle, Sparkles } from "lucide-react";
import type { GalleryProject } from "@/lib/types";
import Image from "next/image";

interface GalleryProjectCardProps {
  project: GalleryProject;
  showStatus?: boolean;
}

const platformLabels = {
  web: "Web",
  ios: "iOS",
  android: "Android",
};

const trackLabels = {
  design: "Design",
  engineering: "Engineering",
  convergence: "Convergence",
};

const statusConfig = {
  pending: {
    label: "Pending Review",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  approved: {
    label: "Published",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  featured: {
    label: "Featured",
    icon: Sparkles,
    className: "bg-swiss-red/10 text-swiss-red",
  },
  rejected: {
    label: "Rejected",
    icon: Clock,
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
};

export function GalleryProjectCard({ project, showStatus = false }: GalleryProjectCardProps) {
  const { metadata } = project;
  const status = statusConfig[metadata.status];
  const StatusIcon = status.icon;

  return (
    <div className="group overflow-hidden border border-neutral-200 bg-white transition-colors hover:border-swiss-red dark:border-neutral-800 dark:bg-neutral-900">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {metadata.thumbnail_url ? (
          <Image
            src={metadata.thumbnail_url}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-400">
            No preview
          </div>
        )}
        
        {/* Status Badge */}
        {showStatus && (
          <div className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-medium ${status.className}`}>
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </div>
        )}

        {/* Featured Badge */}
        {!showStatus && metadata.status === "featured" && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-swiss-red px-2 py-1 text-xs font-medium text-white">
            <Sparkles className="h-3 w-3" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Tags */}
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            {platformLabels[metadata.platform]}
          </span>
          <span className="bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            {trackLabels[metadata.track]}
          </span>
        </div>

        {/* Author */}
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          by {metadata.user_name}
        </p>

        {/* Description */}
        <p className="mt-2 line-clamp-3 text-sm text-neutral-600 dark:text-neutral-300">
          {metadata.description}
        </p>

        {/* Technologies */}
        {metadata.technologies && metadata.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {metadata.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="bg-neutral-50 px-1.5 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {tech}
              </span>
            ))}
            {metadata.technologies.length > 4 && (
              <span className="px-1.5 py-0.5 text-xs text-neutral-400">
                +{metadata.technologies.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="mt-4 flex gap-2">
          {metadata.project_url && (
            <a
              href={metadata.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-swiss-red hover:underline"
            >
              <ExternalLink className="h-3 w-3" />
              View Project
            </a>
          )}
          {metadata.github_url && (
            <a
              href={metadata.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-neutral-600 hover:text-swiss-red dark:text-neutral-400"
            >
              <Github className="h-3 w-3" />
              Code
            </a>
          )}
          {metadata.video_url && (
            <a
              href={metadata.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-neutral-600 hover:text-swiss-red dark:text-neutral-400"
            >
              <Video className="h-3 w-3" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
