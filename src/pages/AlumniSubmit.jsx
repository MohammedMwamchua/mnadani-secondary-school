import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Camera, User, Calendar, Briefcase, MapPin, Phone,
  Send, Loader2, CheckCircle2, AlertCircle,
} from "lucide-react";
import { C, serif } from "../config/theme";
import { Card, Section, PageHero, Button } from "../components/ui";
import { pathFor } from "../lib/routes";
import { submitAlumnus } from "../lib/api";

const fieldClass =
  "w-full pl-10 pr-4 py-3 rounded-lg text-sm bg-[#F7FBFE] border border-[#D6E7F2] placeholder:text-[#8199A8] " +
  "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1D6FA8]/25 focus:border-[#1D6FA8]";

const initialForm = {
  full_name: "",
  year_finished: "",
  current_role: "",
  city: "",
  phone: "",
};

function PhotoField({ file, onSelect }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    onSelect(f);
    if (!f) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="Add your photo"
        className="relative w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D6FA8]"
        style={
          preview
            ? { border: "3px solid #fff", boxShadow: `0 0 0 1px ${C.line}` }
            : { background: C.blueTint, border: "1.5px dashed #b9d8ec" }
        }
      >
        {preview ? (
          <img src={preview} alt="" className="w-full h-full object-cover" />
        ) : (
          <Camera size={22} color={C.blueDeep} />
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

export default function AlumniSubmit() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!photo) {
      setStatus("error");
      setErrorMsg("Please add your photo — it's required.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitAlumnus({ ...form, photo });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setPhoto(null);
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <>
      <PageHero
        eyebrow="Alumni"
        title="Share your story with Mnadani."
        lead="Tell us where life has taken you since leaving Mnadani — it's reviewed by the school before it appears on the Alumni page, so nothing goes live without a check first."
      />

      <Section>
        <Link
          to={pathFor("alumni")}
          className="inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-colors duration-200 hover:text-[#124F80]"
          style={{ color: C.blueDeep }}
        >
          <ArrowLeft size={15} /> Back to Alumni
        </Link>

        <Card className="relative overflow-hidden p-0 max-w-md">
          <div className="px-6 sm:px-8 py-7 sm:py-8">
            {status === "sent" ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center" style={{ background: C.blueTint }}>
                  <CheckCircle2 size={26} color={C.blue} />
                </div>
                <h4 className="mt-4 font-semibold text-lg" style={serif}>Thank you, {form.full_name.trim().split(" ")[0] || "there"}!</h4>
                <p className="text-sm mt-1 max-w-sm mx-auto" style={{ color: C.inkSoft }}>
                  Your story has been submitted for review. Once the school approves it, it'll appear on
                  the Alumni page.
                </p>
                <div className="flex items-center justify-center gap-4 mt-5">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-sm font-semibold transition-colors duration-200 hover:underline"
                    style={{ color: C.blueDeep }}
                  >
                    Submit another story
                  </button>
                  <Link to={pathFor("alumni")} className="text-sm font-semibold transition-colors duration-200 hover:underline" style={{ color: C.blueDeep }}>
                    Back to Alumni
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-3.5" onSubmit={onSubmit}>
                <PhotoField file={photo} onSelect={setPhoto} />

                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.inkSoft }} />
                  <label htmlFor="al-name" className="sr-only">Full name</label>
                  <input
                    id="al-name" name="full_name" autoComplete="name" placeholder="Full name" required
                    value={form.full_name} onChange={onChange} className={fieldClass}
                  />
                </div>

                <div className="relative">
                  <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.inkSoft }} />
                  <label htmlFor="al-year" className="sr-only">Year finished</label>
                  <input
                    id="al-year" name="year_finished" type="number" placeholder="Year finished" required
                    value={form.year_finished} onChange={onChange} className={fieldClass}
                  />
                </div>

                <div className="relative">
                  <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.inkSoft }} />
                  <label htmlFor="al-role" className="sr-only">What you're doing now</label>
                  <input
                    id="al-role" name="current_role" placeholder="What you're doing now" required
                    value={form.current_role} onChange={onChange} className={fieldClass}
                  />
                </div>

                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.inkSoft }} />
                  <label htmlFor="al-city" className="sr-only">Where you are now</label>
                  <input
                    id="al-city" name="city" placeholder="Where you are now" required
                    value={form.city} onChange={onChange} className={fieldClass}
                  />
                </div>

                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.inkSoft }} />
                  <label htmlFor="al-phone" className="sr-only">Phone number</label>
                  <input
                    id="al-phone" name="phone" type="tel" placeholder="Phone number" required
                    value={form.phone} onChange={onChange} className={fieldClass}
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
                      <Loader2 size={16} className="animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit your story
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </Card>
      </Section>
    </>
  );
}
