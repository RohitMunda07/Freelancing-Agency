This is actually one of the most important design decisions. **Status is not the same for every model.** Each model represents a different business process, so its statuses should reflect that process.

Here's how I'd design it for **Stackform**.

---

# 1. User Status

Represents whether a user can use the platform.

```text
Pending Verification
Active
Suspended
Blocked
Deleted
```

### Meaning

| Status               | Meaning                                    |
| -------------------- | ------------------------------------------ |
| Pending Verification | User signed up but hasn't verified email.  |
| Active               | User can access everything.                |
| Suspended            | Temporarily disabled by admin.             |
| Blocked              | Permanently blocked for policy violations. |
| Deleted              | Soft deleted account.                      |

---

# 2. Project Status

Represents the overall lifecycle of a project.

```text
Draft
Pending Approval
Planning
In Progress
On Hold
Under Review
Completed
Delivered
Cancelled
```

### Meaning

| Status           | Meaning                                         |
| ---------------- | ----------------------------------------------- |
| Draft            | Project created but work hasn't started.        |
| Pending Approval | Waiting for client approval or advance payment. |
| Planning         | Requirements and timeline are being prepared.   |
| In Progress      | Active development is happening.                |
| On Hold          | Waiting on the client or another dependency.    |
| Under Review     | Development finished, client is reviewing.      |
| Completed        | All work is complete.                           |
| Delivered        | Final files handed over.                        |
| Cancelled        | Project stopped before completion.              |

---

# 3. Project Milestone Status

Each project contains many milestones.

Example:

```
Authentication
Dashboard
Payment
Deployment
```

Each milestone has its own status.

```text
Pending
In Progress
Completed
Blocked
Skipped
```

### Meaning

| Status      | Meaning                                                             |
| ----------- | ------------------------------------------------------------------- |
| Pending     | Not started yet.                                                    |
| In Progress | Currently being worked on.                                          |
| Completed   | Finished successfully.                                              |
| Blocked     | Can't continue due to dependency (e.g., waiting for client assets). |
| Skipped     | Not required anymore.                                               |

---

# 4. Project Update Status

Every update you post for the client.

Example:

```
Authentication finished
Dashboard redesigned
Payment integrated
```

You generally don't need many statuses here.

```text
Published
Hidden
```

or simply:

```text
Visible
Hidden
```

---

# 5. Payment Status

Represents the payment transaction.

```text
Pending
Paid
Failed
Refunded
Partially Refunded
```

### Meaning

| Status             | Meaning                               |
| ------------------ | ------------------------------------- |
| Pending            | Order created, payment not completed. |
| Paid               | Successfully paid.                    |
| Failed             | Payment failed.                       |
| Refunded           | Full refund issued.                   |
| Partially Refunded | Partial refund issued.                |

---

# 6. Invoice Status

Represents billing.

```text
Draft
Issued
Paid
Overdue
Cancelled
```

### Meaning

| Status    | Meaning                 |
| --------- | ----------------------- |
| Draft     | Invoice being prepared. |
| Issued    | Sent to the client.     |
| Paid      | Payment received.       |
| Overdue   | Due date has passed.    |
| Cancelled | Invoice voided.         |

---

# 7. Review Status

Represents moderation.

```text
Pending
Approved
Rejected
Hidden
```

### Meaning

| Status   | Meaning                              |
| -------- | ------------------------------------ |
| Pending  | Waiting for admin review.            |
| Approved | Visible on the website.              |
| Rejected | Rejected by admin.                   |
| Hidden   | Temporarily hidden without deleting. |

---

# 8. Contact Message Status

Represents how you've handled client inquiries.

```text
New
Read
Replied
Closed
```

### Meaning

| Status  | Meaning                   |
| ------- | ------------------------- |
| New     | Just received.            |
| Read    | Admin has viewed it.      |
| Replied | A response has been sent. |
| Closed  | Conversation finished.    |

---

# 9. Mail Status

Represents email delivery.

```text
Queued
Sent
Failed
```

### Meaning

| Status | Meaning                 |
| ------ | ----------------------- |
| Queued | Waiting to be sent.     |
| Sent   | Delivered successfully. |
| Failed | Sending failed.         |

---

# Relationships

```
User
│
├── Projects
│      │
│      ├── Milestones
│      ├── Updates
│      ├── Payments
│      ├── Invoices
│      └── Reviews
│
├── Messages
└── Mail Logs
```

---

## My recommendation

Since you're building a professional client portal, I would **not** use plain strings for statuses throughout the code. Instead, define **TypeScript enums** (or constant objects) for each model.

For example:

```ts
export enum ProjectStatus {
  DRAFT = "Draft",
  PLANNING = "Planning",
  IN_PROGRESS = "In Progress",
  ON_HOLD = "On Hold",
  UNDER_REVIEW = "Under Review",
  COMPLETED = "Completed",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}
```

Doing the same for `PaymentStatus`, `InvoiceStatus`, `ReviewStatus`, etc., gives you:

* autocomplete in your IDE,
* compile-time safety,
* consistent values across your models, controllers, and frontend,
* and fewer bugs caused by typos like `"completed"` vs `"Completed"` vs `"COMPLETE"`.

This approach scales much better as your platform grows.
