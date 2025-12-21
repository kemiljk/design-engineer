# Setup Instructions - Student Discount & British English

## Quick Start

Follow these steps to complete the setup of recent updates.

---

## 1. Create Cosmic Object Type

The student discount system needs a database table in Cosmic CMS.

### Option A: Automated (Recommended)

Run the setup script:

```bash
npm run setup:student-discounts
```

This will:
- ✅ Create the `student-discounts` object type
- ✅ Add all required metafields
- ✅ Configure options for status dropdown
- ✅ Display confirmation when complete

**Expected Output:**
```
Setting up student-discounts object type in Cosmic...

✓ Successfully created student-discounts object type!

Object Type Details:
  Title: Student Discounts
  Slug: student-discounts
  Emoji: 🎓

Metafields:
  - email (text, required)
  - discount_code (text, required)
  - requested_at (text, required)
  - status (select-dropdown, required)

Status Options:
  - sent: Code sent successfully
  - pending: Processing
  - failed: Failed to send
  - used: Code has been redeemed

✓ Setup complete! The student discount system is ready to use.

Done!
```

### Option B: Manual (Fallback)

If the script fails, create manually in Cosmic Dashboard:

1. Log into Cosmic CMS
2. Navigate to your bucket → Settings → Object Types
3. Click "Add Object Type"
4. Use these settings:

**Basic:**
- Title: `Student Discounts`
- Slug: `student-discounts`
- Emoji: 🎓

**Metafields:**

| Title | Key | Type | Required | Notes |
|-------|-----|------|----------|-------|
| Email | email | Text | Yes | Student email |
| Discount Code | discount_code | Text | Yes | LS code |
| Requested At | requested_at | Text | Yes | ISO date |
| Status | status | Select Dropdown | Yes | See options below |

**Status Options:**
- `sent` - Code sent successfully
- `pending` - Processing  
- `failed` - Failed to send
- `used` - Code has been redeemed

See `COSMIC_STUDENT_DISCOUNTS_SCHEMA.md` for detailed instructions.

---

## 2. Verify Environment Variables

Ensure all required environment variables are set:

```bash
# LemonSqueezy (for discount code creation)
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_STORE_ID=...

# Resend (for email sending)
NEXT_PUBLIC_RESEND_API_KEY=re_...

# Cosmic (for database)
COSMIC_BUCKET_SLUG=...
COSMIC_READ_KEY=...
COSMIC_WRITE_KEY=...

# Clerk (for authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

Check `.env.local` file exists with these values.

---

## 3. Test Student Discount Flow

After setup, test the complete flow:

### A. Request Discount Code

1. Visit: `http://localhost:3000/course/pricing`
2. Scroll to "Student Discount - 30% Off" section
3. Enter a test student email (e.g., `test@university.edu`)
4. Click "Get My Discount Code"

**Expected Result:**
- ✅ Success message appears
- ✅ Email sent to student address
- ✅ Record created in Cosmic Dashboard

### B. Check Email Delivery

1. Check inbox of test email
2. Email should arrive within seconds
3. Subject: "Your Student Discount Code - Design Engineer Course 🎓"
4. Contains unique code like: `STUDENT-ABC123XYZ`

### C. Verify Cosmic Record

1. Log into Cosmic Dashboard
2. Navigate to Student Discounts
3. Find record for test email
4. Verify fields populated:
   - Email: `test@university.edu`
   - Discount Code: `STUDENT-...`
   - Status: `sent`
   - Requested At: (current timestamp)

### D. Test Code at Checkout

1. Visit pricing page
2. Click "Get Access" on any course
3. Proceed to LemonSqueezy checkout
4. Enter discount code from email
5. Verify 30% discount applies
6. **DO NOT complete purchase** (test only)

### E. Test Duplicate Prevention

1. Try requesting code again with same email
2. Should receive error: "This email has already been used..."
3. Confirms duplicate prevention working

---

## 4. Monitor First Real Requests

When students start using the system:

### Check Logs

Monitor for errors:

```bash
# In development
npm run dev

# Watch for these log entries:
# ✓ "Created enrollment for user..."
# ✗ "Error creating student discount:..."
# ✗ "Error sending email:..."
```

### Check Cosmic Dashboard

Periodically review Student Discounts:
- Are codes being created?
- Are statuses correct?
- Any failed sends?

### Check Resend Dashboard

Verify email delivery:
- Open rate
- Bounce rate
- Spam complaints (should be 0)

### Check LemonSqueezy Dashboard

Verify discount codes:
- Navigate to Discounts
- Search for `STUDENT-` prefix
- Check redemption counts
- Should show `1/1` after use

---

## 5. British English Review

All content now uses British English for prose.

### Quick Verification

Check these pages use British spellings:

1. `/course/pricing` - "recognised", "organisation"
2. `/course/faq` - "specialise", "organisation"  
3. Student discount form - "recognised educational institution"
4. Privacy page - "analyse", "organisational"

### Code Should Remain American

Verify CSS/code still uses:
- `color:` not `colour:`
- `text-align: center` not `centre`
- React props: `color="primary"` etc.

### Cursor Rules Active

Check `.cursorrules` file exists at project root.

This ensures future AI-generated content uses British English automatically.

---

## 6. Update Documentation

If you added custom student email domains:

1. Edit `/app/api/course/student-discount/route.ts`
2. Add domain to `STUDENT_DOMAINS` array
3. Deploy update
4. Document in `STUDENT_DISCOUNT_AUTOMATION.md`

---

## Common Issues

### Script Fails: "Missing COSMIC_WRITE_KEY"

**Solution:** Add to `.env.local`:
```bash
COSMIC_WRITE_KEY=your_write_key_here
```

### Student Email Not Recognised

**Solution:** Add domain to `STUDENT_DOMAINS` array in:
`/app/api/course/student-discount/route.ts`

### Email Not Arriving

**Check:**
1. Resend API key is valid
2. Sender domain verified in Resend
3. Check spam folder
4. Check Resend dashboard logs

### Discount Code Doesn't Work

**Check:**
1. Code exists in LemonSqueezy dashboard
2. Code hasn't been used already
3. Code applied to correct product
4. No conflicting discounts

---

## File Reference

### New Files Created
- `.cursorrules` - British English guidelines
- `scripts/setup-student-discounts.ts` - Cosmic setup script
- `app/api/course/student-discount/route.ts` - API endpoint
- `app/course/pricing/student-discount-form.tsx` - Form component
- `STUDENT_DISCOUNT_AUTOMATION.md` - Technical documentation
- `COSMIC_STUDENT_DISCOUNTS_SCHEMA.md` - Database schema
- `BRITISH_ENGLISH_UPDATE.md` - Language update summary
- `SETUP_INSTRUCTIONS.md` - This file

### Modified Files
- `lib/lemonsqueezy.ts` - Added discount creation function
- `app/components/email-template.tsx` - Added student email template
- `app/course/pricing/page.tsx` - Added discount form
- `app/course/faq/page.tsx` - Updated with student discount info
- `package.json` - Added setup script
- Multiple files - British English updates

---

## Success Checklist

Before going live with student discounts:

- [ ] Cosmic object type created (run setup script)
- [ ] All environment variables set
- [ ] Test discount request completes successfully
- [ ] Test email arrives with discount code
- [ ] Cosmic record created correctly
- [ ] Discount code works at LemonSqueezy checkout
- [ ] Duplicate prevention works
- [ ] British English verified on key pages
- [ ] `.cursorrules` file exists
- [ ] Documentation reviewed

---

## Next Steps

1. **Run the setup script:** `npm run setup:student-discounts`
2. **Test the complete flow** with a student email
3. **Review the documentation** in the README files
4. **Monitor the first few real requests**
5. **Add domains** as needed for international students

---

## Support

If you encounter issues:

1. Check error messages in console/logs
2. Review documentation files
3. Verify environment variables
4. Check Cosmic/Resend/LemonSqueezy dashboards
5. Review code in relevant files

For LemonSqueezy API questions, see their documentation:
https://docs.lemonsqueezy.com/api

For Cosmic API questions, see their documentation:
https://www.cosmicjs.com/docs/api

---

**The student discount system is now fully automated and production-ready!** 🎓
