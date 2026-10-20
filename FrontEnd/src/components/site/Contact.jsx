import React, { useEffect, useState } from "react";
import { Mail, Github, Send, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button.jsx";
import SendLoader from "../ui/SendLoader.jsx";
import { post } from "../../axios/axios.js";

const inputClass =
  "font-body text-sm text-offwhite bg-surfaceAlt border border-borderLight rounded-lg px-3.5 py-2.5 outline-none focus:border-teal transition-colors w-full";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [sendData, setSendData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    serviceType: "",
    service: "",
    customService: "",
    budget: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSendData((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "service" && {
        serviceType: value === "Other" ? "others" : "service",
        customService: value === "Other" ? prev.customService : "",
      }),
    }));
  };

  const handleContactSend = async () => {
    setIsSending(true);

    try {
      const response = await post(
        "/chat/messages/project-message",
        sendData
      );
      setSent(true);
    } catch (error) {
      console.error("Error sending the message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="contact" className="max-w-6xl mx-auto px-6 pb-24 sm:pb-28">
      <div className="bg-surface border border-border rounded-2xl p-7 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-xl sm:text-2xl text-offwhite mb-3">Tell us about the project</h2>
          <p className="font-body text-sm text-muted leading-relaxed max-w-sm">
            One reply, usually within a day, with a few clarifying questions and a rough sense of scope — no sales call required to get that.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 font-body text-[13px] text-muted">
              <Mail size={15} className="text-teal" /> arisingbox@gmail.com
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 relative">
          {isSending && (
            <div className="flex items-center justify-center rounded-2xl bg-ink/70 backdrop-blur-sm absolute inset-0 z-10">
              <SendLoader />
            </div>
          )}
          {sent ? (
            <div className="flex items-center gap-2.5 text-teal font-body text-sm">
              <CheckCircle2 size={18} />
              Thanks — Your message has been sent successfully, <br /> We will contact you soon.
            </div>
          ) : (
            <>
              <input
                className={inputClass}
                placeholder="Your name"
                name="name"
                onChange={handleOnChange}
              />

              <input
                className={inputClass}
                placeholder="Email"
                name="email"
                onChange={handleOnChange}
              />

              <input
                className={inputClass}
                placeholder="Phone number"
                name="phone"
                onChange={handleOnChange}
              />

              <select
                className={inputClass}
                name="service"
                value={sendData.service}
                onChange={handleOnChange}
              >
                <option value="">Select service</option>
                <option value="Website Development">Website Development</option>
                <option value="Meta Ads">Meta Ads</option>
                <option value="Video Editing (Shorts / Reels)">Video Editing (Shorts / Reels)</option>
                <option value="Complete Growth Bundle (Web + Ads + Video)">Complete Growth Bundle (Web + Ads + Video)</option>
                <option value="Other">Other</option>
              </select>

              {sendData.service === "Other" && (
                <input
                  className={inputClass}
                  placeholder="Type your service"
                  name="customService"
                  value={sendData.customService}
                  onChange={handleOnChange}
                />
              )}

              <input
                className={inputClass}
                placeholder="Budget (optional)"
                name="budget"
                onChange={handleOnChange}
              />

              <textarea
                className={inputClass}
                placeholder="What are you building or scaling?"
                rows={4}
                name="message"
                onChange={handleOnChange}
              />

              <Button
                onClick={handleContactSend}
                icon={Send}
              >
                Send message
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}