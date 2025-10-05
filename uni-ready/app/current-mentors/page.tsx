"use client";
import { MENTORS } from "../../constants/mentors";

export default function CurrentMentorsPage() {
  return (
  <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[#ffe5db]/80 to-[var(--accent)]/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-4xl sm:text-5xl font-eyegrab tracking-tight text-[var(--accent)] drop-shadow-lg mb-4">Meet Our Mentors</h2>
          <p className="mt-2 text-lg text-black">Here is an updated list of our mentors and what subjects they are experts in. Our mentors maintain a best practice where they keep smaller group sizes of a max of 10 people per session.</p>
        </div>
        <ul role="list" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {MENTORS.map((mentor) => (
            <li key={mentor.name} className="rounded-3xl bg-white/80 shadow-xl border border-[var(--accent)]/20 p-7 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl duration-200">
              <div className="relative mb-4">
                <img src={mentor.photo} alt={mentor.name} className="size-24 rounded-full border-4 border-[var(--accent)] shadow-md object-cover" />
              </div>
              <h3 className="text-xl font-eyegrab tracking-tight mb-1" style={{ color: 'var(--accent, #FA8072)' }}>{mentor.name}</h3>
              <p className="text-sm font-semibold text-black text-center mb-2">{mentor.subjects}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
