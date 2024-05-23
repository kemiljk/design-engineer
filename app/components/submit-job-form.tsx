"use client";

import React, { useEffect } from "react";
import { StyledButton as Button } from "@/app/components/styled-button";
import { Input, Textarea } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { cosmic } from "@/lib/cosmic";
import { useUser } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";
import SpecBuilderFunction from "../jobs/spec-builder/spec-builder";

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
  const [contactEmail, setContactEmail] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [locationTitle, setLocationTitle] = React.useState("");
  const [industryTitle, setIndustryTitle] = React.useState("");
  const [extraDetails, setExtraDetails] = React.useState("");

  const handleFocus = () => setFormFocus(true);
  const handleBlur = () => setFormFocus(false);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setName(user?.fullName || "");
      setEmail(user?.primaryEmailAddress?.emailAddress || "");
    }
  }, [user]);

  const locationTitleToId = locations.reduce((acc, location) => {
    acc[location.title] = location.id;
    return acc;
  }, {});

  const industryTitleToId = industries.reduce((acc, industry) => {
    acc[industry.title] = industry.id;
    return acc;
  }, {});

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
          url: `https://${url}`,
          contact_email: contactEmail,
        },
      };
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
        setSummary("");
        setLocation("");
        setIndustry("");
        setURL("");
        setContactEmail("");
        setExtraDetails("");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={sendEmail} onFocus={handleFocus} onBlur={handleBlur}>
        <div className="relative mb-3 flex flex-col gap-4">
          {isSubmitted ? (
            <div>Submitted!</div>
          ) : (
            <>
              <div className="sticky top-20 z-50 flex w-full justify-end">
                <Button
                  color="primary"
                  variant="stylised"
                  type="submit"
                  name="Submit message"
                  aria-label="Submit message"
                  className="disabled:opacity-50 md:w-max"
                  isDisabled={isSubmitting}
                  disabled={
                    name === "" ||
                    email === "" ||
                    title === "" ||
                    company === "" ||
                    location === "" ||
                    industry === "" ||
                    url === ""
                  }
                  isLoading={isSubmitting}
                >
                  {isSubmitted
                    ? "Sent!"
                    : isSubmitting
                      ? "Sending"
                      : "Submit job"}
                </Button>
              </div>
              <div className="flex w-full flex-col items-start gap-4">
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
              </div>
              <Divider className="my-4" />
              <p className="font-display text-lg font-bold text-gray-700 dark:text-gray-300">
                Job Details
              </p>
              <div className="flex w-full flex-col items-start gap-4 md:flex-row">
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
              <div className="flex w-full flex-col items-start gap-4 md:flex-row">
                <Autocomplete
                  size="md"
                  label="Location (main)"
                  value={location}
                  className="w-full"
                  isRequired
                  defaultItems={locations}
                  onInputChange={(e) => {
                    setLocation(locationTitleToId[e]);
                    setLocationTitle(e);
                  }}
                >
                  {(location) => (
                    <AutocompleteItem key={location.id} value={location.id}>
                      {location.title}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  size="md"
                  label="Industry"
                  className="w-full"
                  isRequired
                  value={industry}
                  defaultItems={industries}
                  onInputChange={(e) => {
                    setIndustry(industryTitleToId[e]);
                    setIndustryTitle(e);
                  }}
                >
                  {(industry) => (
                    <AutocompleteItem key={industry.id} value={industry.id}>
                      {industry.title}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
              <Input
                size="md"
                type="url"
                label="External Job Posting URL"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                isRequired
              />
              <Input
                size="md"
                type="email"
                label="Contact email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <Textarea
                size="md"
                type="text"
                label="Extra details"
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
              />
            </>
          )}
        </div>
      </form>
      <div>
        <SpecBuilderFunction
          jobRole={title}
          company={company}
          location={locationTitle}
          industry={industryTitle}
          url={url}
          contactEmail={contactEmail}
          extraDetails={extraDetails}
          onInputChanged={setSummary}
        />
      </div>
    </>
  );
}
