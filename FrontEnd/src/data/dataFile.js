export const PROJECTS = [
  {
    id: "vms",
    name: "Visitors Management System",
    client: "Meridian Business Park",
    stack: "MERN",
    status: "In Progress",
    progress: 68,
    dueDate: "Aug 15, 2026",
    description:
      "Web app for front-desk check-in, host notifications, badge printing, and visit logs across 3 buildings.",
    milestones: [
      { label: "Requirements & wireframes", done: true },
      { label: "Auth + role-based access", done: true },
      { label: "Check-in / check-out flow", done: true },
      { label: "Host notification system", done: false },
      { label: "Badge printing integration", done: false },
      { label: "UAT & handover", done: false },
    ],
  },
  {
    id: "fieldapp",
    name: "Field Inspection App",
    client: "Northstar Logistics",
    stack: "Kotlin / Compose",
    status: "In Progress",
    progress: 32,
    dueDate: "Sep 30, 2026",
    description:
      "Android app for warehouse staff to run inspection checklists offline and sync photos/reports when back online.",
    milestones: [
      { label: "UI kit in Compose", done: true },
      { label: "Offline-first data layer (Room)", done: true },
      { label: "Checklist engine", done: false },
      { label: "Photo capture + sync", done: false },
      { label: "Play Store beta release", done: false },
    ],
  },
  {
    id: "crm",
    name: "Lightweight CRM",
    client: "Verve Studio",
    stack: "MERN",
    status: "Delivered",
    progress: 100,
    dueDate: "May 2, 2026",
    description: "Contact + deal pipeline tool with email logging and a weekly digest report.",
    milestones: [],
  },
];

export const UPDATES = [
  { id: 1, project: "vms", date: "Jul 18, 2026", text: "Host notification system: SMS + email triggers wired up, testing delivery reliability today." },
  { id: 2, project: "vms", date: "Jul 15, 2026", text: "Check-in/check-out flow complete and deployed to staging. Link shared for review." },
  { id: 3, project: "fieldapp", date: "Jul 12, 2026", text: "Offline sync queue passes all test cases, including flaky-network scenarios." },
  { id: 4, project: "vms", date: "Jul 08, 2026", text: "Role-based access (Reception / Host / Admin) merged and deployed." },
];

export const INVOICES = [
  { id: "INV-0031", project: "vms", amount: "₹42,000", status: "Paid", date: "Jul 01, 2026" },
  { id: "INV-0028", project: "fieldapp", amount: "₹35,000", status: "Paid", date: "Jun 15, 2026" },
  { id: "INV-0034", project: "vms", amount: "₹38,000", status: "Due Aug 1", date: "—" },
];

export const SERVICES = [
  {
    iconType: "code",
    title: "Web Applications",
    tag: "MERN",
    desc: "MongoDB, Express, React and Node — dashboards, internal tools, customer-facing products, built to scale past the MVP.",
  },
  {
    iconType: "phone",
    title: "Android Apps",
    tag: "KOTLIN / COMPOSE",
    desc: "Native Android apps with modern Compose UI, offline-first architecture, and clean integration with your existing backend.",
  },
  {
    iconType: "stack",
    title: "Full-Stack Delivery",
    tag: "END TO END",
    desc: "One team across web and mobile — a shared API, consistent design language, and a single point of contact throughout.",
  },
];

export const PROCESS = [
  { n: "01", title: "Discover", desc: 'Scope the problem, not just the feature list. We map users, constraints, and what "done" actually means.' },
  { n: "02", title: "Design", desc: "Wireframes and a technical plan you approve before a line of code is written." },
  { n: "03", title: "Build", desc: "Weekly builds you can click through — staging links, not status reports." },
  { n: "04", title: "Ship", desc: "Deployed, documented, and handed over with a walkthrough — not a zip file." },
  { n: "05", title: "Support", desc: "A support window post-launch, then a maintenance plan if you want one." },
];

export const SOCIALS = [
  {
    id: "linkedin",
    title: "LinkedIn",
    desc: "Connect professionally, discuss projects, collaborations, and opportunities.",
    cta: "View LinkedIn",
    href: "https://www.linkedin.com/in/rohitkumarmunda/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BviCL4NK%2FTGWJhIpYSKvCBQ%3D%3D",
  },
  {
    id: "github",
    title: "GitHub",
    desc: "Browse code samples, past project structures, and open-source contributions.",
    cta: "View GitHub",
    href: "https://github.com/RohitMunda07",
  },
  {
    id: "email",
    title: "Email",
    desc: "Send project requirements directly and we'll get back to you quickly.",
    cta: "Send Email",
    href: "mailto:hello@stackform.dev",
  },
];
