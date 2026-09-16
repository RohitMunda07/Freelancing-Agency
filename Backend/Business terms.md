This is one of the best questions you've asked so far.

You're building a **freelancing agency**, not just writing code. Understanding business terms will help you:

* Communicate professionally with clients.
* Design your backend correctly.
* Build features that match real business workflows.

Let's go through the most common terms in the order they usually happen.

---

# Complete Freelancing Business Flow

```text
Lead
   │
   ▼
Inquiry
   │
   ▼
Requirement Discussion
   │
   ▼
Quotation / Proposal
   │
   ▼
Negotiation
   │
   ▼
Agreement / Contract
   │
   ▼
Project
   │
   ▼
Milestones
   │
   ▼
Invoice
   │
   ▼
Payment
   │
   ▼
Delivery
   │
   ▼
Support
```

---

# 1. Lead

A **Lead** is someone who may become your client.

Example:

* Someone messages you on Instagram.
* Someone fills out your website contact form.
* Someone is referred by a friend.

They are interested but haven't hired you yet.

Example:

> "Hi, I need an e-learning website."

They're a lead.

---

# 2. Inquiry

An inquiry is the client's first request.

Example:

> "How much will it cost to build a pharmacy inventory system?"

No project yet.

Just a question.

---

# 3. Requirement Gathering

This is where you understand exactly what the client wants.

Questions like:

* What features?
* Android or Web?
* Admin panel?
* Payment gateway?
* Deadline?
* Budget?

This stage is very important because unclear requirements lead to project changes later.

---

# 4. Quotation

This is the term you asked about.

A **Quotation** is an official price offer.

It answers:

> "How much will this project cost?"

Example:

```text
Quotation

Project:
E-Learning Platform

Price:
₹30,000

Timeline:
30 Days

Support:
30 Days Free

Valid Until:
15 August 2026
```

Notice something:

The client has **not accepted yet**.

A quotation is simply your offer.

---

# Quotation vs Estimate

These are often confused.

### Estimate

Approximate price.

Example:

> Around ₹20,000–₹25,000.

Nothing is final.

---

### Quotation

Exact price.

Example:

> ₹22,500

This is your formal offer.

---

# 5. Proposal

A proposal is more detailed than a quotation.

Instead of just saying:

```text
₹30,000
```

you explain:

* Problem
* Solution
* Features
* Timeline
* Technology
* Cost
* Terms

Example:

```text
Project Proposal

Introduction

Objectives

Features

Technology

Timeline

Price

Payment Terms

Support
```

Most agencies send proposals instead of just quotations.

---

# 6. Negotiation

Client says:

> ₹30,000 is too much.

You say:

> I can do ₹27,000 if we remove the payment gateway.

That's negotiation.

---

# 7. Contract / Agreement

Once the client accepts,

both parties agree on:

* Price
* Scope
* Deadline
* Ownership
* Payment terms

Now the project officially starts.

---

# 8. Advance Payment

Most freelancers don't start without an advance.

Example:

Project Price

₹50,000

Client pays

₹20,000

before work begins.

This is also called:

* Booking Amount
* Initial Payment
* Advance Payment

---

# 9. Milestone

Large projects are divided into smaller parts.

Example:

```text
Milestone 1

UI Design

₹10,000

Completed
```

```text
Milestone 2

Backend

₹20,000

Completed
```

```text
Milestone 3

Deployment

₹20,000
```

Each milestone can have its own payment.

---

# 10. Deliverable

A deliverable is something you hand over.

Examples:

* Website
* APK
* Source Code
* Documentation
* Database

---

# 11. Invoice

Invoice ≠ Quotation

Many beginners confuse these.

---

Quotation

> "Will you pay ₹30,000?"

---

Invoice

> "You accepted. Please pay ₹30,000."

Invoice is a payment request.

Example:

```text
Invoice

Invoice No

INV-001

Amount

₹30,000

Due Date

10 August

Status

Pending
```

---

# 12. Payment

Client pays.

Example:

```text
Payment

Invoice

INV-001

Amount

₹30,000

Method

UPI

Status

Success
```

---

# 13. Receipt

Invoice asks for money.

Receipt confirms money was received.

Example:

```text
Receipt

Received

₹30,000

Date

25 July
```

---

# Invoice vs Receipt

Invoice

> Please pay.

Receipt

> Thank you for paying.

---

# 14. Due Date

The last date for payment.

Example:

Invoice

1 August

Due Date

15 August

---

# 15. Overdue

Client didn't pay before the due date.

Status becomes

```text
Overdue
```

---

# 16. Revision

Client wants changes.

Example:

> Move the login button.

Most freelancers include:

```text
2 Free Revisions
```

After that,

extra charges.

---

# 17. Scope

Everything included in the project.

Example:

Included

* Login
* Dashboard
* Payment Gateway

Not Included

* Android App

If the client later asks for an Android app,

that's outside the scope.

---

# 18. Change Request (CR)

Client asks for something new after work has started.

Example:

Originally

Website only

Later

> "Can you build an Android app too?"

That's a Change Request.

Usually charged separately.

---

# 19. Support

After project completion.

Example:

```text
30 Days Free Support
```

---

# 20. Maintenance

Long-term support.

Example:

Client pays

₹5,000/month

for

* Bug fixes
* Security updates
* Server monitoring

---

# 21. Warranty

Promise that you'll fix bugs caused by your own work.

Example:

```text
60 Days Bug Warranty
```

---

# 22. SLA (Service Level Agreement)

Mostly for companies.

Example:

Critical bug?

Response within

4 hours.

---

# 23. NDA (Non-Disclosure Agreement)

You promise not to reveal the client's confidential information.

---

# 24. Intellectual Property (IP)

Who owns the code?

Usually after full payment,

ownership transfers to the client.

---

# 25. Purchase Order (PO)

Common with companies.

Before you start,

they send a document saying:

> We officially approve this work.

---

# 26. Completion Certificate

You declare:

```text
Project Completed Successfully
```

---

# 27. Sign-off

Client says:

> Everything looks good.

Project officially closes.

---

# Business Workflow for ArisingBox

Based on your agency, I recommend this workflow:

```text
Lead
   │
   ▼
Requirement Discussion
   │
   ▼
Proposal
   │
   ▼
Quotation
   │
   ▼
Client Accepts
   │
   ▼
Project Created
   │
   ▼
Advance Payment
   │
   ▼
Milestones
   │
   ▼
Progress Updates
   │
   ▼
Final Invoice
   │
   ▼
Final Payment
   │
   ▼
Delivery
   │
   ▼
Support
   │
   ▼
Review
```

## Which of these should become database models?

Not every business term needs its own collection. For your platform, I'd recommend:

| Business Term  | Separate Model? | Reason                                                            |
| -------------- | --------------- | ----------------------------------------------------------------- |
| User           | ✅ Yes           | Core entity                                                       |
| Lead           | ❌ Not initially | Can be a contact form until you need CRM features                 |
| Quotation      | ✅ Yes           | Clients can review, accept, or reject it                          |
| Proposal       | ❌ Usually no    | Often stored as a generated PDF or document linked to a quotation |
| Project        | ✅ Yes           | Core entity                                                       |
| Milestone      | ✅ Yes           | Track progress and payments                                       |
| Invoice        | ✅ Yes           | Billing                                                           |
| Payment        | ✅ Yes           | Financial records                                                 |
| Review         | ✅ Yes           | Testimonials and feedback                                         |
| Support Ticket | ✅ Later         | Post-delivery support                                             |

I especially recommend adding a **Quotation model**. In a real freelancing workflow, it's the missing link between a client's inquiry and the creation of a project. A quotation can be accepted, rejected, or expire, and once it's accepted, your application can automatically create the project and generate the initial invoice. This makes your backend much closer to how professional agencies operate.
