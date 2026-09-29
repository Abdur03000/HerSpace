"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
      }}
      className="flex flex-col gap-3"
    >
      {subscribed ? (
        <p className="rounded-xl bg-pink-50 px-4 py-3 text-sm font-semibold text-purple-700">
          You&apos;re on the list! Fresh tips land in your inbox every week.
        </p>
      ) : (
        <>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-label="Email address"
            className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Subscribe ✨
          </button>
        </>
      )}
    </form>
  );
}
