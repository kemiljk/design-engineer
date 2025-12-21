# Cosmic CMS - Student Discounts Type Schema

## Overview
This document describes the Cosmic CMS object type needed for storing student discount records.

## Object Type Configuration

### In Cosmic Dashboard:
1. Navigate to your bucket settings
2. Go to "Object Types"
3. Click "Add Object Type"
4. Use the configuration below

---

## Object Type: `student-discounts`

### Basic Settings
- **Title (Singular):** Student Discount
- **Title (Plural):** Student Discounts
- **Slug:** `student-discounts`
- **Icon:** 🎓 (Graduation Cap)

### Metafields

Add the following metafields to this object type:

#### 1. Email
- **Title:** Email
- **Key:** `email`
- **Type:** Text
- **Required:** Yes
- **Help Text:** Student email address (lowercase)

#### 2. Discount Code
- **Title:** Discount Code
- **Key:** `discount_code`
- **Type:** Text
- **Required:** Yes
- **Help Text:** LemonSqueezy discount code generated for this student

#### 3. Requested At
- **Title:** Requested At
- **Key:** `requested_at`
- **Type:** Text (stores ISO date string)
- **Required:** Yes
- **Help Text:** When the discount was requested

#### 4. Status
- **Title:** Status
- **Key:** `status`
- **Type:** Select Dropdown
- **Required:** Yes
- **Options:**
  - `sent` - Code sent successfully
  - `pending` - Processing
  - `failed` - Failed to send
  - `used` - Code has been redeemed
- **Default:** `sent`
- **Help Text:** Current status of the discount code

### Optional Metafields (for future use)

#### 5. Used At (Optional)
- **Title:** Used At
- **Key:** `used_at`
- **Type:** Text (ISO date string)
- **Required:** No
- **Help Text:** When the code was redeemed at checkout

#### 6. Order ID (Optional)
- **Title:** Order ID
- **Key:** `order_id`
- **Type:** Text
- **Required:** No
- **Help Text:** LemonSqueezy order ID if tracked

---

## Quick Setup via API (Alternative)

If you prefer to create this programmatically, you can use the Cosmic API:

```typescript
// Note: This is reference code - object type creation 
// is typically done via the Cosmic dashboard UI

import { cosmic } from "@/lib/cosmic";

// Create object type (admin operation)
await cosmic.objectTypes.insertOne({
  title: "Student Discounts",
  slug: "student-discounts",
  emoji: "🎓",
  metafields: [
    {
      title: "Email",
      key: "email",
      type: "text",
      required: true,
    },
    {
      title: "Discount Code",
      key: "discount_code",
      type: "text",
      required: true,
    },
    {
      title: "Requested At",
      key: "requested_at",
      type: "text",
      required: true,
    },
    {
      title: "Status",
      key: "status",
      type: "select-dropdown",
      required: true,
      options: [
        { key: "sent", value: "Sent" },
        { key: "pending", value: "Pending" },
        { key: "failed", value: "Failed" },
        { key: "used", value: "Used" },
      ],
    },
  ],
});
```

---

## Example Object

Once created, objects in this type will look like:

```json
{
  "id": "6789...",
  "type": "student-discounts",
  "slug": "student-discount-abc12345",
  "title": "Student Discount: john@university.edu",
  "created_at": "2024-01-15T10:30:00.000Z",
  "metadata": {
    "email": "john@university.edu",
    "discount_code": "STUDENT-XYZ123ABC",
    "requested_at": "2024-01-15T10:30:00.000Z",
    "status": "sent"
  }
}
```

---

## Queries Used in Code

### Check if email already used:
```typescript
await cosmic.objects.find({
  type: "student-discounts",
  "metadata.email": "student@example.edu"
});
```

### Create new discount record:
```typescript
await cosmic.objects.insertOne({
  type: "student-discounts",
  title: `Student Discount: ${email}`,
  slug: `student-discount-${nanoid(8)}`,
  metadata: {
    email: email,
    discount_code: code,
    requested_at: new Date().toISOString(),
    status: "sent",
  },
});
```

---

## Admin Views

### In Cosmic Dashboard
After creating this type, you'll be able to:
- View all student discount requests
- Search by email
- See which codes have been issued
- Track status of each code
- Manually create codes if needed

### Useful Filters
- **By Status:** Filter to see only `sent` or `used` codes
- **By Date:** Sort by `requested_at` to see recent requests
- **By Email:** Search for specific student

---

## Security Considerations

### Access Control
- Ensure only admins can view student-discounts in Cosmic
- Don't expose this data in public API endpoints
- Use read/write keys appropriately

### Data Privacy
- Email addresses are personal data
- Store only what's necessary
- Have a data retention policy
- Allow students to request deletion if needed

---

## Testing

After creating the object type, test:

1. **Create via API:**
   ```bash
   POST /api/course/student-discount
   { "email": "test@university.edu" }
   ```

2. **Check Cosmic Dashboard:**
   - Navigate to Student Discounts
   - Verify record was created
   - Check all fields populated correctly

3. **Query via API:**
   ```typescript
   const { objects } = await cosmic.objects.find({
     type: "student-discounts"
   });
   console.log(objects);
   ```

---

## Maintenance

### Regular Tasks
- Archive old records (1+ years)
- Monitor for duplicate emails
- Review failed status records

### Data Cleanup
Consider implementing:
- Automatic archival of old records
- GDPR-compliant data deletion
- Export functionality for analytics

---

## Support Queries

### Find a student's code:
1. Log into Cosmic Dashboard
2. Navigate to Student Discounts
3. Search for the student's email
4. View the `discount_code` field
5. Can manually send if needed

### Check code status:
- View `status` field in Cosmic
- Cross-reference with LemonSqueezy dashboard
- Update status manually if code is redeemed

---

## Troubleshooting

### Object type not found error:
- Verify object type created in Cosmic
- Check slug is exactly `student-discounts`
- Ensure metafields match schema above

### Can't create objects:
- Verify `COSMIC_WRITE_KEY` is set
- Check API key permissions
- Ensure bucket slug is correct

### Duplicate key errors:
- Slug generation uses nanoid (collision unlikely)
- If occurs, retry with new nanoid
- Check for existing slugs

---

This schema is designed to be simple, efficient, and privacy-conscious while providing all necessary functionality for the automated student discount system.
