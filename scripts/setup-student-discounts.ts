import { cosmic } from "../lib/cosmic";

async function setupStudentDiscountsType() {
  console.log("Setting up student-discounts object type in Cosmic...\n");

  try {
    // Check if the object type already exists
    try {
      const existingTypes = await cosmic.objectTypes.find();
      const exists = existingTypes.object_types?.some(
        (type: { slug: string }) => type.slug === "student-discounts"
      );

      if (exists) {
        console.log("✓ student-discounts object type already exists");
        console.log("  Skipping creation...\n");
        return;
      }
    } catch (error) {
      // Continue to create if check fails
    }

    // Create the object type
    const result = await cosmic.objectTypes.insertOne({
      title: "Student Discounts",
      slug: "student-discounts",
      singular: "Student Discount",
      emoji: "🎓",
      metafields: [
        {
          title: "Email",
          key: "email",
          type: "text",
          required: true,
          value: "",
        },
        {
          title: "Discount Code",
          key: "discount_code",
          type: "text",
          required: true,
          value: "",
        },
        {
          title: "Requested At",
          key: "requested_at",
          type: "text",
          required: true,
          value: "",
        },
        {
          title: "Status",
          key: "status",
          type: "select-dropdown",
          required: true,
          value: "sent",
          options: [
            {
              key: "sent",
              value: "Sent",
            },
            {
              key: "pending",
              value: "Pending",
            },
            {
              key: "failed",
              value: "Failed",
            },
            {
              key: "used",
              value: "Used",
            },
          ],
        },
      ],
    });

    console.log("✓ Successfully created student-discounts object type!");
    console.log("\nObject Type Details:");
    console.log("  Title: Student Discounts");
    console.log("  Slug: student-discounts");
    console.log("  Emoji: 🎓");
    console.log("\nMetafields:");
    console.log("  - email (text, required)");
    console.log("  - discount_code (text, required)");
    console.log("  - requested_at (text, required)");
    console.log("  - status (select-dropdown, required)");
    console.log("\nStatus Options:");
    console.log("  - sent: Code sent successfully");
    console.log("  - pending: Processing");
    console.log("  - failed: Failed to send");
    console.log("  - used: Code has been redeemed");
    console.log("\n✓ Setup complete! The student discount system is ready to use.\n");

    return result;
  } catch (error) {
    console.error("\n✗ Error creating object type:");
    
    if (error && typeof error === "object" && "message" in error) {
      console.error("  Message:", error.message);
    }
    
    console.error("\nPlease check:");
    console.error("  1. COSMIC_WRITE_KEY environment variable is set");
    console.error("  2. Write key has proper permissions");
    console.error("  3. Bucket slug is correct in .env");
    console.error("\nYou can also create this manually in the Cosmic dashboard.");
    console.error("See COSMIC_STUDENT_DISCOUNTS_SCHEMA.md for instructions.\n");
    
    throw error;
  }
}

// Run the setup
setupStudentDiscountsType()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Setup failed:", error);
    process.exit(1);
  });
