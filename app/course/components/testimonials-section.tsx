import { getApprovedTestimonials } from "@/lib/cosmic";
import { Quote } from "iconoir-react";
import { TrackLogo } from "@/app/components/track-logo";

export async function TestimonialsSection() {
  const testimonials = await getApprovedTestimonials(8);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="container-page">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="heading-subsection mb-2">
              What Our Students Say
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Hear from design engineers who&apos;ve completed the course
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.metadata.user_name}
                photoUrl={testimonial.metadata.user_photo_url}
                role={testimonial.metadata.user_role}
                company={testimonial.metadata.user_company}
                content={testimonial.metadata.content}
                track={testimonial.metadata.track_completed}
                platform={testimonial.metadata.platform_completed}
                isFeatured={testimonial.metadata.status === "featured"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  photoUrl?: string;
  role?: string;
  company?: string;
  content: string;
  track: "design" | "engineering" | "convergence";
  platform: "web" | "ios" | "android";
  isFeatured?: boolean;
}

function TestimonialCard({
  name,
  photoUrl,
  role,
  company,
  content,
  track,
  platform,
  isFeatured,
}: TestimonialCardProps) {
  const trackName = track === "design" 
    ? "Design" 
    : track === "engineering" 
      ? "Engineering" 
      : "Convergence";

  return (
    <div
      className={`relative flex flex-col border p-6 transition-colors ${
        isFeatured
          ? "border-swiss-red/30 bg-swiss-red/[0.02] dark:bg-swiss-red/5"
          : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/50"
      }`}
    >
      {/* Quote Icon */}
      <Quote className="absolute right-4 top-4 h-8 w-8 text-neutral-200 dark:text-neutral-700" />

      {/* Content */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
        &ldquo;{content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              className="h-10 w-10 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center bg-neutral-200 text-sm font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-white">
              {name}
            </p>
            {(role || company) && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {role}
                {role && company && " at "}
                {company}
              </p>
            )}
          </div>
        </div>

        {/* Track Badge */}
        <div className="flex items-center gap-1.5" title={`Completed ${trackName} Track (${platform.toUpperCase()})`}>
          <TrackLogo track={track} platform={platform} size={20} />
          <span className="text-xs text-neutral-400">{trackName}</span>
        </div>
      </div>
    </div>
  );
}

