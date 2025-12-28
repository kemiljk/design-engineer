"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X, Plus, AlertCircle, CheckCircle } from "lucide-react";

const platforms = [
  { value: "web", label: "Web" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
];

const tracks = [
  { value: "design", label: "Design Track" },
  { value: "engineering", label: "Engineering Track" },
  { value: "convergence", label: "Convergence Track" },
];

const suggestedTechnologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Figma",
  "Swift",
  "SwiftUI",
  "UIKit",
  "Kotlin",
  "Jetpack Compose",
  "Material Design",
  "Framer Motion",
  "GSAP",
];

export function SubmitProjectForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [platform, setPlatform] = useState("");
  const [track, setTrack] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");

  const addTechnology = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
    }
    setTechInput("");
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/course/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          track,
          description,
          thumbnailUrl,
          projectUrl: projectUrl || undefined,
          githubUrl: githubUrl || undefined,
          videoUrl: videoUrl || undefined,
          technologies,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit project");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/course/dashboard");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-none border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950/30">
        <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
        <h2 className="mt-4 text-xl font-bold text-green-800 dark:text-green-200">
          Project Submitted!
        </h2>
        <p className="mt-2 text-green-700 dark:text-green-300">
          Your project has been submitted for review. We&apos;ll notify you once it&apos;s approved.
        </p>
        <p className="mt-4 text-sm text-green-600">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-none border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Platform */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Platform <span className="text-swiss-red">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {platforms.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPlatform(p.value)}
              className={`border px-4 py-3 text-sm font-medium transition-colors ${
                platform === p.value
                  ? "border-swiss-red bg-swiss-red/10 text-swiss-red"
                  : "border-neutral-200 bg-white hover:border-swiss-red dark:border-neutral-700 dark:bg-neutral-800"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Track */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Track <span className="text-swiss-red">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {tracks.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTrack(t.value)}
              className={`border px-4 py-3 text-sm font-medium transition-colors ${
                track === t.value
                  ? "border-swiss-red bg-swiss-red/10 text-swiss-red"
                  : "border-neutral-200 bg-white hover:border-swiss-red dark:border-neutral-700 dark:bg-neutral-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Project Description <span className="text-swiss-red">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project, what you built, and what you learned..."
          rows={5}
          required
          minLength={50}
          className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-swiss-red focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
        <p className="mt-1 text-xs text-neutral-500">
          Minimum 50 characters. {description.length}/50
        </p>
      </div>

      {/* Thumbnail URL */}
      <div>
        <label htmlFor="thumbnailUrl" className="mb-2 block text-sm font-medium">
          Thumbnail URL <span className="text-swiss-red">*</span>
        </label>
        <input
          id="thumbnailUrl"
          type="url"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="https://example.com/screenshot.png"
          required
          className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-swiss-red focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
        <p className="mt-1 text-xs text-neutral-500">
          A screenshot or preview image of your project (use a service like Imgur or Cloudinary)
        </p>
      </div>

      {/* Project URL */}
      <div>
        <label htmlFor="projectUrl" className="mb-2 block text-sm font-medium">
          Live Project URL
        </label>
        <input
          id="projectUrl"
          type="url"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          placeholder="https://myproject.com"
          className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-swiss-red focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      {/* GitHub URL */}
      <div>
        <label htmlFor="githubUrl" className="mb-2 block text-sm font-medium">
          GitHub Repository
        </label>
        <input
          id="githubUrl"
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/username/repo"
          className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-swiss-red focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      {/* Video URL */}
      <div>
        <label htmlFor="videoUrl" className="mb-2 block text-sm font-medium">
          Demo Video URL
        </label>
        <input
          id="videoUrl"
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className="w-full border border-neutral-200 bg-white px-4 py-3 text-sm placeholder:text-neutral-400 focus:border-swiss-red focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      {/* Technologies */}
      <div>
        <label className="mb-2 block text-sm font-medium">Technologies Used</label>
        
        {/* Selected Technologies */}
        {technologies.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1 bg-swiss-red/10 px-2 py-1 text-sm text-swiss-red"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="hover:text-swiss-red/70"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add Technology Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechnology(techInput);
              }
            }}
            placeholder="Add a technology..."
            className="flex-1 border border-neutral-200 bg-white px-4 py-2 text-sm placeholder:text-neutral-400 focus:border-swiss-red focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
          />
          <button
            type="button"
            onClick={() => addTechnology(techInput)}
            className="border border-neutral-200 px-3 py-2 hover:border-swiss-red dark:border-neutral-700"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Suggested Technologies */}
        <div className="mt-3">
          <p className="mb-2 text-xs text-neutral-500">Quick add:</p>
          <div className="flex flex-wrap gap-1">
            {suggestedTechnologies
              .filter((t) => !technologies.includes(t))
              .slice(0, 8)
              .map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => addTechnology(tech)}
                  className="bg-neutral-100 px-2 py-1 text-xs text-neutral-600 hover:bg-swiss-red/10 hover:text-swiss-red dark:bg-neutral-800 dark:text-neutral-400"
                >
                  + {tech}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <button
          type="submit"
          disabled={isSubmitting || !platform || !track || description.length < 50 || !thumbnailUrl}
          className="flex w-full items-center justify-center gap-2 bg-swiss-red px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit for Review"
          )}
        </button>
        <p className="mt-3 text-center text-xs text-neutral-500">
          Your project will be reviewed before appearing in the public gallery
        </p>
      </div>
    </form>
  );
}
