import { createBulkDiscount } from "../lib/lemonsqueezy";
import 'dotenv/config';

// Usage: bun run scripts/generate-bulk-code.ts "McDonalds" 50
async function run() {
  const args = process.argv.slice(2);
  const company = args[0];
  const seats = parseInt(args[1]);

  if (!company || !seats) {
    console.error("Usage: bun run scripts/generate-bulk-code.ts <CompanyName> <Seats>");
    console.error("Example: bun run scripts/generate-bulk-code.ts \"McDonalds\" 50");
    process.exit(1);
  }

  console.log(`Generating 100% off code for ${company} with ${seats} seats...`);
  
  // Note: Ensure LEMONSQUEEZY_API_KEY and STORE_ID are in .env
  const code = await createBulkDiscount(company, seats);

  if (code) {
    console.log("✅ SUCCESS! Send this code to the client:");
    console.log("------------------------------------------------");
    console.log(`   ${code}`);
    console.log("------------------------------------------------");
    console.log("Direct Checkout Link (Full Access):");
    // Replace with actual Full Access Variant ID if known, or generic link
    const variantId = process.env.LEMON_PRODUCT_FULL || "YOUR_VARIANT_ID";
    console.log(`https://designengineer.lemonsqueezy.com/checkout/buy/${variantId}?discount=${code}`);
  } else {
    console.error("Failed to generate code. Check API keys.");
  }
}

run();
