"use client";

import toast from "react-hot-toast";

export default function NewsletterForm() {
  async function handleSubscribe(formData: FormData) {
    formData.get("email");

    toast.success(
      "Thank you for subscribing! Expect the best news and exclusive sanctuary deals in your inbox.",
      {
        duration: 5000,
      },
    );

    const form = document.getElementById("newsletter-form") as HTMLFormElement;
    form?.reset();
  }

  return (
    <form
      id="newsletter-form"
      action={handleSubscribe}
      className="flex flex-col gap-3"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Email Address"
        className="border border-white/10 bg-indigo-900/50 px-4 py-3 text-white transition-colors placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
      />
      <button
        type="submit"
        className="cursor-pointer bg-white px-6 py-3 text-xs font-bold tracking-widest text-indigo-950 uppercase transition-colors hover:bg-indigo-100"
      >
        Subscribe
      </button>
    </form>
  );
}
