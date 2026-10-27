import React from "react";

export default function WhatsAppFloat() {
  // Replace with your international country code + phone number (no '+' or '-' symbols)
  const phoneNumber = "919334671578"; 
  const defaultMessage = encodeURIComponent(
    "Hi ArisingBox! I'm interested in discussing a project (Website / Meta Ads / Video Editing)."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      {/* Tooltip on hover */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-surfaceAlt border border-borderLight px-3 py-1.5 font-body text-xs text-offwhite shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-x-1 hidden sm:block">
        Chat with us on WhatsApp
      </span>

      {/* Pulsing ring indicator */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 blur-sm animate-pulse" />

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_6px_26px_rgba(37,211,102,0.6)] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-ink"
      >
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="currentColor"
          className="transition-transform duration-300 group-hover:rotate-6"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.89 12.04 8.01 12.2C8.13 12.37 9.71 14.81 12.14 15.86C12.72 16.11 13.17 16.26 13.52 16.37C14.1 16.55 14.63 16.53 15.05 16.47C15.52 16.4 16.49 15.88 16.69 15.31C16.89 14.74 16.89 14.25 16.83 14.15C16.77 14.05 16.61 13.99 16.37 13.87C16.13 13.75 14.95 13.17 14.73 13.09C14.51 13.01 14.35 12.97 14.19 13.21C14.03 13.45 13.57 13.99 13.43 14.15C13.29 14.31 13.15 14.33 12.91 14.21C12.67 14.09 11.9 13.84 10.98 13.02C10.26 12.38 9.78 11.59 9.64 11.35C9.5 11.11 9.63 10.98 9.75 10.86C9.86 10.75 10 10.56 10.12 10.42C10.24 10.28 10.28 10.18 10.36 10.02C10.44 9.86 10.4 9.72 10.34 9.6C10.28 9.48 9.82 8.35 9.63 7.88C9.44 7.42 9.25 7.48 9.11 7.47C8.98 7.46 8.82 7.46 8.66 7.46L8.53 7.33Z" />
        </svg>
      </a>
    </aside>
  );
}