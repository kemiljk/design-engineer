import React from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
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
    <form onSubmit={sendEmail} onFocus={handleFocus} onBlur={handleBlur}>
      <div className="mb-3 flex flex-col gap-3">
        {isSubmitted ? (
          <div>Submitted!</div>
        ) : (
          <>
            <Input
              size="md"
              autoFocus
              type="name"
              label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
            />
            <Input
              size="md"
              type="email"
              label="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <hr />
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Job Details
            </p>
            <div className="flex flex-col md:flex-row w-full items-center gap-4">
              <Input
                size="md"
                type="text"
                label="Job role"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isRequired
              />
              <Input
                size="md"
                type="text"
                label="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                isRequired
              />
            </div>
            <div className="flex flex-col md:flex-row w-full items-center gap-4">
              <Select
                size="md"
                label="Location (main)"
                value={location}
                className="w-full"
                isRequired
                items={locations}
                selectedKeys={[location]}
                onChange={(e) => setLocation(e.target.value)}
                popoverProps={{
                  classNames: {
                    base: "before:bg-default-200",
                    content: "p-0 border-small border-divider bg-background",
                  },
                }}
              >
                {(location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.title}
                  </SelectItem>
                )}
              </Select>
              <Select
                size="md"
                label="Industry"
                className="w-full"
                isRequired
                value={industry}
                items={industries}
                selectedKeys={[industry]}
                onChange={(e) => setIndustry(e.target.value)}
              >
                {(industry) => (
                  <SelectItem key={industry.id} value={industry.id}>
                    {industry.title}
                  </SelectItem>
                )}
              </Select>
            </div>
            <Input
              size="md"
              type="text"
              label="Job posting URL"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              isRequired
            />
            {url && !isValidURL(url) && (
              <div className="text-red-500">Please enter a valid URL</div>
            )}
            <Textarea
              label="Job description summary"
              aria-label="Your summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              isRequired
            />
            <Button
              color="primary"
              type="submit"
              name="Submit message"
              aria-label="Submit message"
              className="mx-auto disabled:opacity-50 md:w-max"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitted ? "Sent!" : isSubmitting ? "Sending" : "Submit job"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
