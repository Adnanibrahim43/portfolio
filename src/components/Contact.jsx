import { useState } from "react";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";

// Paste your Formspree endpoint here (looks like https://formspree.io/f/abcdwxyz)
const FORM_ENDPOINT = "https://formspree.io/f/xrppkwer";

const emptyForm = { name: "", email: "", message: "" };

const inputClass =
  "w-full rounded-lg border border-border-subtle bg-obsidian px-4 py-3 text-sm text-ink placeholder-slate-600 transition-colors focus:border-accent-500 focus:outline-none";

const labelClass = "mb-2 block font-mono text-xs text-slate-400 uppercase";

function Contact() {
  const [values, setValues] = useState(emptyForm);
  // "idle" | "sending" | "success" | "error"
  const [status, setStatus] = useState("idle");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus("success");
        setValues(emptyForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl p-6 sm:p-10">
        <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-mono text-xs tracking-widest text-accent-400 uppercase">
            Get In Touch
          </h2>
          <h3 className="font-display text-4xl leading-none font-medium tracking-tighter text-ink sm:text-6xl">
            Let's Build Impact-First AI
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Seeking to bring real-world AI development and RAG engineering to
            your team.
          </p>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-surface p-8">
          {status === "success" ? (
            <div className="space-y-4 text-center">
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-400">
                <FaCircleCheck className="mr-2 inline" />
                Thank you! Your message has been sent. I'll get back to you promptly.
              </div>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-xs text-slate-400 underline transition-colors hover:text-ink"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={values.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Discuss AI engineering roles, projects, or collaboration..."
                  className={`${inputClass} p-4`}
                ></textarea>
              </div>

              {status === "error" && (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-sm text-rose-400">
                  <FaCircleExclamation className="mr-2 inline" />
                  Something went wrong. Please try again, or email me directly.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-accent-600 hover:bg-accent-500 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent-600/25 transition-all disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-sm text-slate-400">
          <div>📧 ibrahim.khan.work01@gmail.com</div>
          <div>📞 +91-9177597086</div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;