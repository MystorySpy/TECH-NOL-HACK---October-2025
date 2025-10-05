export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-start pt-32 px-4">
      <div className="max-w-3xl w-full bg-white/90 rounded-2xl shadow-lg p-10 sm:p-16 flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-eyegrab text-[var(--accent)] mb-8 text-center">About Us</h1>
        <p className="text-lg sm:text-xl text-black text-center mb-6">
          <span className="font-semibold">Tailored</span> is a not-for-profit organization (NPO) founded by four Carleton University students—Jack, Niraj, Alex, and Isaac. We are dedicated to connecting students with <span className="font-semibold">experienced mentors</span> across Ontario. Our mission is to make mentorship and academic support accessible, free, and <span className="font-semibold">personalized</span> for every learner.
        </p>
        <p className="text-lg sm:text-xl text-black text-center mb-6">
          We believe in the <span className="font-semibold">power of community</span> and the value of learning from those who have walked the path before you. Our mentors are <span className="font-semibold">passionate volunteers</span> who provide guidance, encouragement, and practical strategies to help you thrive in your academic journey.
        </p>
        <p className="text-lg sm:text-xl text-black text-center mb-6">
          Many of our mentors are <span className="font-semibold">university students</span> who volunteer not only to give back, but also to gain valuable experience, develop leadership skills, and enhance their <span className="font-semibold">Co-Curricular Record (CCR)</span>. Volunteering as a mentor is a meaningful way to make a difference, build your resume, and connect with a vibrant academic community.
        </p>
        <p className="text-lg sm:text-xl text-black text-center">
          Whether you need advice on study habits, navigating university life, or <span className="font-semibold">overcoming challenges</span>, Tailored is here to support you—<span className="font-semibold">every step of the way</span>.
        </p>
        <p className="text-lg sm:text-xl text-black text-center mb-6">
          At Tailored, we are committed to <span className="font-semibold">fostering inclusion</span> by creating a welcoming environment for students from all backgrounds. We believe that <span className="font-semibold">diversity</span> enriches the learning experience and helps everyone grow together.
        </p>
        <p className="text-lg sm:text-xl text-black text-center mb-6">
          Our platform is designed to <span className="font-semibold">amplify underrepresented voices</span> in academia. By connecting students with mentors who share similar experiences, we help ensure that <span className="font-semibold">every voice matters</span> and is heard.
        </p>
        <p className="text-lg sm:text-xl text-black text-center mb-6">
          We are passionate about <span className="font-semibold">breaking barriers</span> to access education. Through free mentorship and support, Tailored empowers students to <span className="font-semibold">overcome obstacles</span> and pursue their academic dreams without limits.
        </p>
      </div>
    </main>
  );
}
