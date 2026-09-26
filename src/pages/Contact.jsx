import React, { useState } from "react";
import { MapPin, Mail, Phone, Award, Users, ImageOff, User, MessageSquare, Send, Loader2, CheckCircle2, AlertCircle, Route, Navigation, ExternalLink } from "lucide-react";
import { C, serif } from "../config/theme";
import { Card, Section, PageHero, Button, PlaceholderNote } from "../components/ui";
import { useFetch } from "../lib/useFetch";
import { fetchSiteInfo, submitContactMessage } from "../lib/api";
import { schoolMapLinks } from "../lib/maps";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" };

const fieldClass =
  "w-full pl-10 pr-4 py-3 rounded-lg text-sm bg-[#F7FBFE] border border-[#D6E7F2] placeholder:text-[#8199A8] " +
  "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1D6FA8]/25 focus:border-[#1D6FA8]";

function Signboard({ src }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div
        className="relative w-full h-56 sm:h-64 md:h-full flex flex-col items-center justify-center gap-2 px-6 text-center"
        style={{ background: `linear-gradient(155deg, ${C.blueTint}, ${C.blueTintSoft})` }}
      >
        <ImageOff size={22} style={{ color: C.blueDeep, opacity: 0.5 }} />
        <span className="text-xs font-semibold max-w-[22ch]" style={{ color: C.blueDeep }}>
          Signboard photo not added yet
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Mnadani Secondary School entrance signboard"
      className="w-full h-56 sm:h-64 md:h-full object-cover"
      onError={() => setBroken(true)}
    />
  );
}

export default function Contact() {
  const site = useFetch(fetchSiteInfo);
  const info = site.data;
  const map = schoolMapLinks(info);

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitContactMessage(form);
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", message: "" });
    setStatus("idle");
    setErrorMsg("");
  };

  const contactRows = info
    ? [
        { label: "Address", value: info.address, icon: MapPin },
        { label: "P.O. Box", value: info.poBox, icon: Mail },
        { label: "Email", value: info.email, icon: Mail },
        { label: "Phone", value: info.phone, icon: Phone },
        { label: "NECTA Centre", value: info.nectaCentreNumber, icon: Award },
        { label: "Administered by", value: info.administeredBy, icon: Users },
      ].filter((r) => r.value)
    : [];

  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch with Mnadani Secondary School." />

      <Section>
        <div
          className="rounded-2xl overflow-hidden grid md:grid-cols-[340px_1fr] shadow-sm"
          style={{ border: `1px solid ${C.line}`, background: C.white }}
        >
          <Signboard src={info?.signboardPhoto} />
          <div className="p-6 sm:p-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: C.blueDeep }}>
              <MapPin size={14} /> Look for this sign
            </div>
            <h3 className="text-lg sm:text-xl font-semibold" style={serif}>You'll find us in Bochela, Nkuhungu — just off Singida Road.</h3>
            <p className="text-sm mt-2 max-w-md" style={{ color: C.inkSoft }}>
              This signboard marks the school entrance — Prime Minister's Office (RALG), Dodoma Municipal
              Council, right at the gate. The school sits just off Singida Road, so once you've turned in
              toward Bochela and Nkuhungu, this sign is the clearest landmark to look for.
            </p>
            <div
              className="flex items-center gap-1.5 mt-4 text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
              style={{ color: C.blueDeep, background: C.blueTint }}
            >
              <Route size={13} /> Off Singida Road
            </div>
            <div className="flex flex-wrap gap-3 mt-5">
              <Button href={map.view} variant="primary" className="w-full sm:w-auto" {...EXTERNAL}>
                <MapPin size={16} /> View on map
              </Button>
              <Button href={map.directions} variant="secondary" className="w-full sm:w-auto" {...EXTERNAL}>
                <Navigation size={16} /> Get directions
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          <div className="space-y-5">
            {site.loading && (
              <div className="space-y-5 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: C.blueTint }} />
                    <div className="flex-1">
                      <div className="h-3 w-16 rounded" style={{ background: C.blueTint }} />
                      <div className="h-4 w-40 rounded mt-2" style={{ background: C.blueTint }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!site.loading && site.error && (
              <PlaceholderNote>
                This section couldn't be loaded right now — please check back soon.
              </PlaceholderNote>
            )}

            {!site.loading && !site.error && contactRows.map((r) => {
              const Icon = r.icon;
              const content = (
                <>
                  <div className="text-xs font-semibold" style={{ color: C.inkSoft }}>{r.label}</div>
                  <div className="font-medium break-words">{r.value}</div>
                </>
              );
              const row = (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
                    <Icon size={17} color={C.blueDeep} />
                  </div>
                  <div className="min-w-0">{content}</div>
                </div>
              );

              if (r.label === "Address") {
                return (
                  <a
                    key={r.label}
                    href={map.view}
                    {...EXTERNAL}
                    className="block -mx-2 px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-[#EEF7FC]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
                        <Icon size={17} color={C.blueDeep} />
                      </div>
                      <div className="min-w-0">
                        {content}
                        <div className="flex items-center gap-1 text-xs font-semibold mt-1" style={{ color: C.blue }}>
                          View on map <ExternalLink size={12} />
                        </div>
                      </div>
                    </div>
                  </a>
                );
              }
              if (r.label === "Email") {
                return (
                  <a
                    key={r.label}
                    href={`mailto:${r.value}`}
                    className="block -mx-2 px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-[#EEF7FC]"
                  >
                    {row}
                  </a>
                );
              }
              if (r.label === "Phone") {
                return (
                  <a
                    key={r.label}
                    href={`tel:${r.value.replace(/[^+\d]/g, "")}`}
                    className="block -mx-2 px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-[#EEF7FC]"
                  >
                    {row}
                  </a>
                );
              }
              return <div key={r.label}>{row}</div>;
            })}
          </div>

          <Card className="relative overflow-hidden p-0">
            <div
              className="px-6 sm:px-7 pt-6 sm:pt-7 pb-5"
              style={{ background: `linear-gradient(155deg, ${C.blueTintSoft}, ${C.white})`, borderBottom: `1px solid ${C.line}` }}
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: C.blueTint }}>
                <MessageSquare size={19} color={C.blueDeep} />
              </div>
              <h3 className="font-semibold text-lg mt-3" style={serif}>Send a message</h3>
              <p className="text-sm mt-1" style={{ color: C.inkSoft }}>We'll get back to you as soon as we can.</p>
            </div>

            <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-5">
              {status === "sent" ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center" style={{ background: C.blueTint }}>
                    <CheckCircle2 size={26} color={C.blue} />
                  </div>
                  <h4 className="mt-4 font-semibold text-lg" style={serif}>Message received</h4>
                  <p className="text-sm mt-1" style={{ color: C.inkSoft }}>
                    Thanks, {form.name.trim().split(" ")[0] || "there"} — we've noted your message and will be in touch.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-5 text-sm font-semibold transition-colors duration-200 hover:underline"
                    style={{ color: C.blueDeep }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-3.5" onSubmit={onSubmit}>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.inkSoft }} />
                    <label htmlFor="contact-name" className="sr-only">Full name</label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Full name"
                      required
                      value={form.name}
                      onChange={onChange}
                      className={fieldClass}
                    />
                  </div>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.inkSoft }} />
                    <label htmlFor="contact-email" className="sr-only">Email address</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email address"
                      required
                      value={form.email}
                      onChange={onChange}
                      className={fieldClass}
                    />
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.inkSoft }} />
                    <label htmlFor="contact-phone" className="sr-only">Phone number</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Phone number (optional)"
                      value={form.phone}
                      onChange={onChange}
                      className={fieldClass}
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3.5 top-3.5 pointer-events-none" style={{ color: C.inkSoft }} />
                    <label htmlFor="contact-message" className="sr-only">Your message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Your message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={onChange}
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <div
                      className="flex items-start gap-2.5 rounded-lg px-3.5 py-3 text-xs"
                      style={{ background: "#FBEAEA", color: "#8A2C24" }}
                    >
                      <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
