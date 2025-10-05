export default function Example() {
  return (
    <div className="bg-[var(--background)]">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[var(--accent)] via-[var(--accent)] to-[var(--background)] opacity-50 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight leading-tight text-balance text-black sm:text-5xl">
              Tailored: Education YOUR Way
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-black sm:text-lg">
              Connect with experienced mentors who guide you through your university challenges,
              helping you achieve academic excellence and personal growth.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/sign-up"
                className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] shadow-md transform-gpu transition duration-150 ease-in-out hover:scale-105 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-[var(--accent)] inline-flex items-center gap-2 transition duration-150 ease-in-out hover:underline hover:decoration-[var(--accent)] hover:decoration-2">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-[var(--accent)] via-[var(--accent)] to-[var(--background)] opacity-75 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
      {/* About/What We Are Section - alternating layout */}
      <section className="relative flex flex-col items-center justify-center px-4 py-32 sm:py-40 bg-transparent">
        <div className="max-w-5xl w-full flex flex-col gap-20">
          {/* Row 1: text left, image right */}
          <div className="flex flex-col sm:flex-row items-center gap-1">
            <div className="flex-[1.6] flex flex-col justify-center sm:justify-end">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--accent)] mb-4 text-left">Network of Mentors</h2>
              <p className="text-xl sm:text-2xl text-black font-medium text-left max-w-2xl w-full">
                <span className="font-semibold">Tailored</span> is an accesible, <span className="italic">not for profit</span>, educational platform designed to connect students with experienced mentors in universities across Ontario. Mentors are <span className="font-semibold">volunteers</span> who provide personalized support, advice, and encouragement to help students navigate academic challenges and thrive while preparing for their university journey.
              </p>
            </div>
            <div className="flex-1 flex justify-center sm:justify-end mt-8 sm:mt-0">
              <img src="/connections.jpeg" alt="connections" className="w-56 h-56 object-contain rounded-xl shadow-md bg-[var(--background)]/80 sm:ml-0 sm:mr-0 ml-0 mr-0" />
            </div>
          </div>
          {/* Row 2: image left, text right */}
          <div className="flex flex-col sm:flex-row items-center gap-1">
            <div className="flex-1 flex justify-center sm:justify-start order-2 sm:order-1 mt-8 sm:mt-0">
              <img src="/grow.png" alt="grow" className="w-56 h-56 object-contain rounded-xl shadow-md bg-[var(--background)]/80 sm:ml-0 sm:mr-0 ml-0 mr-0" />
            </div>
            <div className="flex-[1.6] flex flex-col justify-center sm:justify-start order-1 sm:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--accent)] mb-4 text-right sm:text-left">Education for YOU</h2>
              <p className="text-xl sm:text-2xl text-black font-medium text-left max-w-2xl w-full">
                We believe in <span className="font-semibold">tailored</span> education—helping you grow, thrive, and succeed on your own terms, every step of the way. Tailored allows you to select what method you learn best by and connects you with mentors who align with your <span className="font-semibold">learning styles</span> and academic goals. Whether you prefer one-on-one sessions, group discussions, or virtual meetups, our platform offers flexible options to suit your needs.
              </p>
            </div>
          </div>
          {/* Row 3: text left, image right */}
          <div className="flex flex-col sm:flex-row items-center gap-1">
            <div className="flex-[1.6] flex flex-col justify-center sm:justify-end">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--accent)] mb-4 text-left">Too Good to be True?</h2>
                <p className="text-xl sm:text-2xl text-black font-medium text-left max-w-2xl w-full">
                  <span className="font-semibold">Tailored</span> is completely free to use, with no hidden costs or fees. Our mentors are passionate volunteers who believe in giving back to the community and helping students succeed. We are committed to making quality <span className="font-semibold">education</span> and mentorship accessible to all students, regardless of their background or financial situation. By connecting you with mentors who have faced similar <span className="font-semibold">obstacles</span>, Tailored empowers you to overcome obstacles—whether academic, social, or personal—so you can reach your full potential.
                </p>
            </div>
            <div className="flex-1 flex justify-center sm:justify-end mt-8 sm:mt-0">
              <img src="/overcome.jpg" alt="overcome" className="w-56 h-56 object-contain rounded-xl shadow-md bg-[var(--background)]/80 sm:ml-0 sm:mr-0 ml-0 mr-0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}