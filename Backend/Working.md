Here's a controller-by-controller breakdown, following the same conventions as `User.controller.ts` and `Project.controller.ts` (asyncHandler + ApiError + ApiResponse, Zod validation, `req.user.role` checks, ownership checks via `mongoose.isValidObjectId`).

**Review (Feedback) controller**
| Method | Route | Access | Purpose |
|---|---|---|---|
| `createReview` | `POST /reviews` | client | `CreateReviewSchema` (no status/isVisible). Should verify the project belongs to `req.user` and is `delivered` before allowing a review. |
| `getPublicReviews` | `GET /reviews/public` | public | Filters `status: "approved", isVisible: true` — feeds your landing page reviews section. |
| `getMyReviews` | `GET /reviews/me` | client | Their own reviews, any status — so they can see "pending" ones too. |
| `getReviewById` | `GET /reviews/:id` | owner or admin | |
| `moderateReview` | `PATCH /reviews/:id/moderate` | admin | Only place `status`/`isVisible` can be set — approve/reject/hide. |
| `deleteReview` | `DELETE /reviews/:id` | admin | |

**Invoice controller**
| Method | Route | Access | Purpose |
|---|---|---|---|
| `createInvoice` | `POST /invoices` | admin | `InvoiceZodSchema` — the subtotal+tax=total refine catches bad math before it saves. |
| `getInvoices` | `GET /invoices` | admin (all) / client (own) | Same role-branch pattern as `getProjects`. |
| `getInvoiceById` | `GET /invoices/:id` | owner or admin | |
| `updateInvoiceStatus` | `PATCH /invoices/:id/status` | admin | Manual override (e.g. mark paid for a bank transfer); normally set automatically once a linked Payment succeeds. |
| `deleteInvoice` | `DELETE /invoices/:id` | admin | |

**Message (contact form) controller**
| Method | Route | Access | Purpose |
|---|---|---|---|
| `submitMessage` | `POST /messages` | public, no auth | `SubmitContactFormSchema` — this is your Connect/Contact form's actual backend target. |
| `getMessages` | `GET /messages` | admin | List leads, optional `?status=` filter. |
| `getMessageById` | `GET /messages/:id` | admin | |
| `updateMessageStatus` | `PATCH /messages/:id/status` | admin | Moves a lead through `new → contacted → converted → closed`. |
| `deleteMessage` | `DELETE /messages/:id` | admin | |

**Mail controller** — one design decision worth flagging: mail records are almost always *created by your own server code* (e.g. "invoice sent" → call a `sendMail()` service function), not by a client hitting a POST endpoint. So this controller is read-only from the outside:
| Method | Route | Access | Purpose |
|---|---|---|---|
| `getMails` | `GET /mails` | admin | Optional `?user=` filter. |
| `getMailById` | `GET /mails/:id` | admin | |
| `resendMail` | `POST /mails/:id/resend` | admin | Retry a `status: "failed"` send. |

**Payment (Transaction) controller** — this is the one where I'd add something beyond what's in your schema file:
| Method | Route | Access | Purpose |
|---|---|---|---|
| `createOrder` | `POST /payments/order` | client | `CreatePaymentOrderSchema` → calls Razorpay SDK → saves a Transaction with `paymentStatus: "pending"`. |
| `verifyPayment` | `POST /payments/verify` | client | `VerifyPaymentSchema` → HMAC-verify the signature → flip status to success/failed, set `paidAt`. |
| `razorpayWebhook` | `POST /payments/webhook` | public, webhook-signature verified | **Recommended addition** — client-side verify can be silently skipped if the browser tab closes mid-flow; the webhook is the only source of truth you can't lose. |
| `getMyPayments` | `GET /payments/me` | client | |
| `getPayments` | `GET /payments` | admin | |
| `getPaymentById` | `GET /payments/:id` | owner or admin | |

Want me to go ahead and generate all five of these now (same style as the two you already have), or adjust anything in the plan first — e.g. skip the webhook endpoint if you're not ready to wire up Razorpay's dashboard yet?