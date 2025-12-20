import { chromium, type Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const BASE_URL = "http://localhost:3000";

interface AuditResult {
  page: string;
  illustrations: {
    found: boolean;
    count: number;
    issues: string[];
  };
  codeBlocks: {
    count: number;
    issues: string[];
  };
  layoutIssues: string[];
}

async function getAllCoursePages(): Promise<string[]> {
  const contentDir = path.join(process.cwd(), "content/course");
  const pages: string[] = [];

  function walkDir(dir: string, basePath: string = "") {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        walkDir(filePath, path.join(basePath, file));
      } else if (file.endsWith(".md")) {
        const pagePath = path.join(basePath, file.replace(".md", ""));
        pages.push(`/course/${pagePath}`);
      }
    }
  }

  walkDir(contentDir);
  return pages;
}

async function auditPage(page: Page, url: string): Promise<AuditResult> {
  const result: AuditResult = {
    page: url,
    illustrations: { found: false, count: 0, issues: [] },
    codeBlocks: { count: 0, issues: [] },
    layoutIssues: [],
  };

  try {
    await page.goto(`${BASE_URL}${url}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(500); // Let any animations settle
  } catch (e) {
    result.layoutIssues.push(`Failed to load page: ${e}`);
    return result;
  }

  // Check for illustrations (SVGs with role="img")
  const illustrations = await page.locator('svg[role="img"]').all();
  result.illustrations.count = illustrations.length;
  result.illustrations.found = illustrations.length > 0;

  for (let i = 0; i < illustrations.length; i++) {
    const svg = illustrations[i];
    const box = await svg.boundingBox();
    
    if (!box) {
      result.illustrations.issues.push(`Illustration ${i + 1}: Not visible (no bounding box)`);
      continue;
    }

    // Check if illustration is reasonably sized
    if (box.width < 100 || box.height < 100) {
      result.illustrations.issues.push(`Illustration ${i + 1}: Too small (${box.width}x${box.height})`);
    }

    // Check for text elements inside SVG and look for overlaps
    const textElements = await svg.locator("text, tspan").all();
    const textBoxes: { text: string; box: { x: number; y: number; width: number; height: number } }[] = [];

    for (const textEl of textElements) {
      const textBox = await textEl.boundingBox();
      const textContent = await textEl.textContent();
      if (textBox && textContent) {
        textBoxes.push({ text: textContent.trim(), box: textBox });
      }
    }

    // Check for text overlaps within the same SVG
    for (let j = 0; j < textBoxes.length; j++) {
      for (let k = j + 1; k < textBoxes.length; k++) {
        const a = textBoxes[j].box;
        const b = textBoxes[k].box;
        
        // Check if boxes overlap
        const overlap = !(a.x + a.width < b.x || b.x + b.width < a.x || 
                         a.y + a.height < b.y || b.y + b.height < a.y);
        
        if (overlap) {
          result.illustrations.issues.push(
            `Illustration ${i + 1}: Text overlap detected between "${textBoxes[j].text}" and "${textBoxes[k].text}"`
          );
        }
      }
    }

    // Check for rect elements overlapping with text
    const rects = await svg.locator("rect").all();
    for (const rect of rects) {
      const rectBox = await rect.boundingBox();
      if (!rectBox) continue;
      
      for (const textItem of textBoxes) {
        // Check if text overlaps with rect (excluding background rects)
        const rectFill = await rect.getAttribute("fill");
        if (rectFill && rectFill !== "none" && rectFill !== ILLUSTRATION_COLORS_BG) {
          const overlap = !(textItem.box.x + textItem.box.width < rectBox.x || 
                          rectBox.x + rectBox.width < textItem.box.x || 
                          textItem.box.y + textItem.box.height < rectBox.y || 
                          rectBox.y + rectBox.height < textItem.box.y);
          
          // Only flag if the text is outside the rect but overlapping (edge case)
          if (overlap) {
            const textCenterX = textItem.box.x + textItem.box.width / 2;
            const textCenterY = textItem.box.y + textItem.box.height / 2;
            const isTextInsideRect = textCenterX > rectBox.x && textCenterX < rectBox.x + rectBox.width &&
                                    textCenterY > rectBox.y && textCenterY < rectBox.y + rectBox.height;
            
            if (!isTextInsideRect) {
              // Text is overlapping but not centered inside - potential issue
              const overlapAmount = Math.min(
                textItem.box.x + textItem.box.width - rectBox.x,
                rectBox.x + rectBox.width - textItem.box.x
              );
              if (overlapAmount > 5) { // More than 5px overlap
                result.illustrations.issues.push(
                  `Illustration ${i + 1}: Text "${textItem.text}" may overlap with a shape`
                );
              }
            }
          }
        }
      }
    }
  }

  // Check code blocks
  const codeBlocks = await page.locator("pre").all();
  result.codeBlocks.count = codeBlocks.length;

  for (let i = 0; i < codeBlocks.length; i++) {
    const pre = codeBlocks[i];
    const box = await pre.boundingBox();
    
    if (box) {
      // Check min height
      if (box.height < 40) {
        result.codeBlocks.issues.push(`Code block ${i + 1}: Height too small (${box.height}px)`);
      }
      
      // Check if content is overflowing horizontally
      const scrollWidth = await pre.evaluate((el) => el.scrollWidth);
      const clientWidth = await pre.evaluate((el) => el.clientWidth);
      
      if (scrollWidth > clientWidth + 10) {
        result.codeBlocks.issues.push(`Code block ${i + 1}: Horizontal overflow detected`);
      }
    }
  }

  // Check for general layout issues
  const article = await page.locator("article").first();
  if (article) {
    const articleBox = await article.boundingBox();
    if (articleBox && articleBox.width > 1200) {
      result.layoutIssues.push(`Article too wide: ${articleBox.width}px`);
    }
  }

  return result;
}

const ILLUSTRATION_COLORS_BG = "var(--illustration-bg)";

async function main() {
  console.log("🔍 Starting illustration audit...\n");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const coursePages = await getAllCoursePages();
  console.log(`Found ${coursePages.length} course pages to audit\n`);

  const results: AuditResult[] = [];
  let pagesWithIssues = 0;

  for (const url of coursePages) {
    process.stdout.write(`Auditing: ${url}...`);
    const result = await auditPage(page, url);
    results.push(result);

    const hasIssues = 
      result.illustrations.issues.length > 0 || 
      result.codeBlocks.issues.length > 0 || 
      result.layoutIssues.length > 0;

    if (hasIssues) {
      pagesWithIssues++;
      console.log(" ⚠️  Issues found");
    } else {
      console.log(" ✅");
    }
  }

  await browser.close();

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("AUDIT SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total pages: ${coursePages.length}`);
  console.log(`Pages with issues: ${pagesWithIssues}`);
  console.log(`Total illustrations found: ${results.reduce((sum, r) => sum + r.illustrations.count, 0)}`);
  console.log(`Total code blocks found: ${results.reduce((sum, r) => sum + r.codeBlocks.count, 0)}`);

  // Print detailed issues
  const pagesWithProblems = results.filter(
    r => r.illustrations.issues.length > 0 || r.codeBlocks.issues.length > 0 || r.layoutIssues.length > 0
  );

  if (pagesWithProblems.length > 0) {
    console.log("\n" + "=".repeat(60));
    console.log("DETAILED ISSUES");
    console.log("=".repeat(60));

    for (const result of pagesWithProblems) {
      console.log(`\n📄 ${result.page}`);
      
      if (result.illustrations.issues.length > 0) {
        console.log("  Illustrations:");
        for (const issue of result.illustrations.issues) {
          console.log(`    ⚠️  ${issue}`);
        }
      }
      
      if (result.codeBlocks.issues.length > 0) {
        console.log("  Code Blocks:");
        for (const issue of result.codeBlocks.issues) {
          console.log(`    ⚠️  ${issue}`);
        }
      }
      
      if (result.layoutIssues.length > 0) {
        console.log("  Layout:");
        for (const issue of result.layoutIssues) {
          console.log(`    ⚠️  ${issue}`);
        }
      }
    }
  } else {
    console.log("\n✅ No issues found!");
  }

  // Write full results to JSON
  const outputPath = path.join(process.cwd(), "audit-results.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nFull results written to: ${outputPath}`);
}

main().catch(console.error);
