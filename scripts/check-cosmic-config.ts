
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { cosmic } from "../lib/cosmic";

async function checkConfig() {
  try {
    const config = await cosmic.objects
      .findOne({ type: "config", slug: "config" })
      .props("slug,title,metadata")
      .depth(1);

    console.log("Config Metadata:", JSON.stringify(config.object.metadata, null, 2));

    const availability = await cosmic.objects
      .findOne({ type: "course-availability", slug: "availability" })
      .props("metadata")
      .depth(1);
    
    console.log("Availability Metadata:", JSON.stringify(availability.object.metadata, null, 2));
  } catch (error) {
    console.error("Error fetching config:", error);
  }
}

checkConfig();
