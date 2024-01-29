"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cosmic } from "@/lib/cosmic";

export default function SubmitJobForm({
  industries,
  locations,
}: {
  industries: any[];
  locations: any[];
}) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formFocus, setFormFocus] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [url, setURL] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [industry, setIndustry] = React.useState("");

  const isValidURL = (value: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(value);
  };

  const handleFocus = () => setFormFocus(true);
  const handleBlur = () => setFormFocus(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const newJobCompany = {
      title: company,
      status: "published",
      type: "companies",
      slug: company.toLowerCase().replace(/ /g, "-"),
    };

    try {
      setIsSubmitting(true);

      let company;
      try {
        // Try to find the company
        const getCo = await cosmic.objects.findOne({
          slug: newJobCompany.slug,
        });

        company = getCo.object;
      } catch (error: any) {
        // If the company doesn't exist, insert a new one
        if (error.status === 404) {
          await fetch("/api/insert-company", {
            method: "POST",
            body: JSON.stringify({
              company: newJobCompany,
            }),
          });

          // Fetch the newly created company
          const getCo = await cosmic.objects.findOne({
            slug: newJobCompany.slug,
            props: "slug",
          });

          company = getCo.object;
        } else {
          throw error;
        }
      }

      const newJobSubmission = {
        title: title,
        status: "draft",
        type: "jobs",
        slug: title.toLowerCase().replace(/ /g, "-") + "-" + Date.now(),
        metadata: {
          company: company.id,
          industry: industry,
          location: location,
          description: summary,
          url: url,
        },
      };
      console.log(newJobSubmission);
      await fetch("/api/job-submission", {
        method: "POST",
        body: JSON.stringify({
          submission: newJobSubmission,
        }),
      });
      await fetch("/api/send-job-submission", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });
      await fetch("/api/receive-job-submission", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          title: title,
          company: company.title,
        }),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setEmail("");
        setTitle("");
        setCompany("");
        setLocation("");
        setIndustry("");
        setURL("");
        setSummary("");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={sendEmail}
      autoFocus
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="mb-3 flex flex-col gap-3 overflow-visible">
        {isSubmitted ? (
          <div>Submitted!</div>
        ) : (
          <>
            <Input
              type="name"
              placeholder="Your name"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              name="reply_to"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex w-full items-center gap-4">
              <Input
                type="text"
                placeholder="Job role"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="flex w-full items-center gap-4">
              <Select
                name="location"
                required
                onValueChange={(e) => setLocation(e)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Job location (main)"
                    defaultValue={location}
                  />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => {
                    return (
                      <SelectItem key={location.id} value={location.id}>
                        {location.title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Select onValueChange={(e) => setIndustry(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Job industry"
                    defaultValue={industry}
                  />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry.id} value={industry.id}>
                      {industry.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              type="text"
              placeholder="Job posting URL"
              name="url"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              required
            />
            {url && !isValidURL(url) && (
              <div className="text-red-500">Please enter a valid URL</div>
            )}
            <Textarea
              placeholder="Job description summary"
              name="message"
              aria-label="Your summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
            <Button
              variant="primary"
              type="submit"
              name="Submit message"
              aria-label="Submit message"
              className="mx-auto disabled:opacity-50 md:w-max"
              disabled={isSubmitting}
            >
              {isSubmitted ? "Sent!" : isSubmitting ? "Sending" : "Submit job"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
