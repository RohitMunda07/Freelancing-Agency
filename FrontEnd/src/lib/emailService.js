import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export async function sendEmail(data) {
  if (!isEmailJsConfigured) throw new Error("EmailJS is not configured.");

  const templateParams = {
    from_name: data.name || "",
    from_email: data.email || "",
    message: data.message || "",
  };

  // emailjs.send returns a Promise
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}

export default { sendEmail, isEmailJsConfigured };
