import Image from "next/image";

const navItems = [
  {
    name: "Judges",
    link: "#judges",
  },
  {
    name: "Episodes",
    link: "#episodes",
  },
  {
    name: "Companies",
    link: "#companies",
  },
  {
    name: "Reviews",
    link: "#reviews",
  },
  {
    name: "Apply",
    link: "#apply",
  },
];

const HeroSection = () => {
  return (
    <section className="relative text-white" id="hero">
      <Image
        src="/imgs/hero-bg.svg"
        alt="Background Image"
        fill
        className="object-cover object-bottom w-full pb-24 sm:pb-40 md:pb-64 -z-10"
      />
      <div className="flex flex-col items-center px-6 mx-auto text-center max-w-7xl">
        <nav className="flex flex-wrap justify-center max-w-5xl mt-10 md:mt-12 gap-y-4 gap-x-12">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-sm font-semibold tracking-widest uppercase md:text-base lg:text-lg hover:underline"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <Image
          src="/imgs/logo.svg"
          alt="Go Fund Yourself Logo"
          width={400}
          height={400}
          className="mt-12"
        />
        <p className="max-w-4xl mx-auto mt-4 text-lg">
          Join the ultimate interactive show where entertainment meets
          opportunity. Engage with top CEOs, discover innovative startups, and
          invest in real-time—all from the comfort of your home.
        </p>
        <div className="flex flex-col justify-center mt-6 gap-y-2 gap-x-4 md:flex-row">
          <button className="px-5 py-3 font-bold text-[#FF3352] bg-white rounded-full md:px-6 md:py-4">
            Watch Live Now
          </button>
          <a href="#companies">
            <button className="px-5 py-3 font-bold border border-white rounded-full md:px-6 md:py-4">
              Explore Companies
            </button>
          </a>
        </div>
        <video
          src="https://client-lp-assets.s3.amazonaws.com/2305_Verb_Go+Fund+Yourself+Promo_24-05-17_v03_DB_v1+(1).mp4"
          className="z-20 w-full max-w-6xl mt-12 bg-white cursor-pointer rounded-3xl"
          poster="/imgs/hero-poster.png"
          preload="none"
          controls
          onClick={(e) => (e.target as HTMLVideoElement).play()}
        />
      </div>
    </section>
  );
};

export default HeroSection;
