import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "./Icons";

const titans = [
  {
    name: "Rory Cutaia",
    title: "Leader in Telecom & Technology",
    position: "Founder & CEO @ Verb",
    description:
      "From successful New York City attorney to telecom disruptor, investor, and serial entrepreneur who sold his first start-up for more than $200 million; he's currently founder and CEO of NASDAQ-listed TON Strategy Co., and MARKET.live, a tech start-up disrupting the livestream shopping sector.",
    imageSrc: "/img/rory.png",
    color: "#0024be",
    social: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/profile.php?id=61563865485948",
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/gofundyourselfshow?igsh=MTBpMXdpaDV6OGEwZQ==",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/company/go-fund-yourself-show",
      },
      {
        platform: "youtube",
        url: "https://www.youtube.com/@GoFundYourselfShow",
      },
    ],
  },
  {
    name: "David Meltzer",
    title: "Leader in Sports Marketing",
    position: "Co-Founder @ Sport 1 Marketing",
    description:
      "Former CEO of Leigh Steinberg Sports and Entertainment and current Chairman of the Napolean Hill Institute, David Meltzer is an accomplished author, investor, philanthropist, and business coach and one of the most sought-after inspirational and motivational speakers at the world's biggest business, sports, technology, and motivational events.",
    imageSrc: "/img/david.png",
    color: "#fce62c",
    social: [
      { platform: "facebook", url: "https://www.facebook.com/davidmeltzer11/" },
      {
        platform: "instagram",
        url: "https://www.instagram.com/davidmeltzer/?hl=en",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/davidmeltzer2/",
      },
      {
        platform: "youtube",
        url: "https://www.youtube.com/channel/UCflt1OopRWIApMOjVgZyJ6Q",
      },
    ],
  },
  {
    name: "Jayson Waller",
    title: "Account Marketing Leader",
    position: "CEO @ BAM Coaching",
    description:
      "A well-respected thought leader in solar, home services, and digital lead-gen, CEO of multiple multi-million-dollar companies, a successful author, motivational speaker, and host of the popular Jayson Waller Unleashed Podcast, he brings his own brand of BAM to business problem solving.",
    imageSrc: "/img/jayson.png",
    color: "#fc3053",
    social: [
      {
        platform: "facebook",
        url: "https://www.facebook.com/JaysonWallerBAM/",
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/jaysonwallerbam/",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/jayson-waller-/",
      },
      {
        platform: "youtube",
        url: "https://www.youtube.com/channel/UCwTHT2Q-omcIjTOwOa2imTQ",
      },
    ],
  },
];

const Judge = ({ judge, index }) => {
  return (
    <div
      className={`border flex flex-col px-6 py-6 md:px-12 md:py-12 gap-y-10 gap-x-16 bg-white shadow-xl items-center rounded-2xl ${
        index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div
        className={`relative flex-shrink-0 rounded-xl w-full md:max-w-xs lg:max-w-lg aspect-square`}
      >
        <Image
          src={judge.imageSrc}
          alt={judge.name}
          fill
          className="rounded-xl"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-3xl md:text-4xl xl:text-5xl font-grobold">
          {judge.name}
        </h3>
        <p className="mt-4 text-gray-500 lg:text-lg">{judge.description}</p>
        <div className="flex w-10 h-10 mt-6 start gap-x-2">
          {judge.social.map((social, idx) => (
            <a key={idx} href={social.url} className="text-gray-500 ">
              {
                {
                  youtube: (
                    <YoutubeIcon color={judge.color} height={42} width={42} />
                  ),
                  instagram: (
                    <InstagramIcon color={judge.color} height={42} width={42} />
                  ),
                  facebook: (
                    <FacebookIcon color={judge.color} height={42} width={42} />
                  ),
                  linkedin: (
                    <LinkedInIcon color={judge.color} height={42} width={42} />
                  ),
                }[social.platform]
              }
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const MeetTheTitans = () => {
  return (
    <section id="titans" className="py-16 bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase md:text-base lg:text-lg">
            Our Expert Panel
          </p>
          <h2 className="mt-4 text-4xl md:mt-6 lg:text-5xl xl:text-6xl">
            Meet the <span className="text-[#0125BD]">Titans</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-gray-500 md:mt-6 md:text-lg">
            Seasoned CEOs Guiding You Through Every Investment Opportunity
          </p>
        </div>
        <div className="flex flex-col gap-6 mt-6">
          {titans.map((judge, index) => (
            <Judge judge={judge} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTitans;

