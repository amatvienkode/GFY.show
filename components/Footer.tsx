import { platforms } from "./FeaturedIn";

const links = [
  { text: "Back to Top", href: "#hero" },
  { text: "Titans", href: "#titans" },
  { text: "Episodes", href: "#episodes" },
  { text: "Companies", href: "#companies" },
  { text: "Reviews", href: "#reviews" },
  { text: "Apply", href: "#apply" },
  // {
  //   text: "Live on Lookhu",
  //   href: "https://lookhu.tv/channel/go-fund-yourself",
  //   target: "_blank",
  // },
];

const Footer = () => {
  return (
    <footer className="pt-6 pb-16 text-white bg-[#842DB4]">
      <div className="grid col-span-1 gap-8 px-6 mx-auto sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] max-w-7xl">
        <div className="col-span-1 px-6 sm:col-span-2 md:col-span-1 lg:gap-20 md:flex-row">
          <p className="mt-2 text-2xl lg:text-3xl font-grobold">
            GO FUND YOURSELF!
          </p>
          <p className="mt-2 lg:text-lg">info@gofundyourself.show</p>
          <p className="mt-2 lg:text-lg">10621 Calle Lee, Suite 153</p>
          <p className="lg:text-lg">Los Alamitos, CA 90720</p>
        </div>
        <ul className="px-6 list-none lg:text-lg gap-y-4 gap-x-20">
          {links.map((link, index) => (
            <li key={index} className="mx-0">
              <a
                href={link.href}
                className="hover:underline"
                // target={link.target}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
        <ul className="px-6 list-none lg:text-lg gap-y-4 gap-x-20">
          {platforms.map((platform, index) => (
            <li key={index} className="mx-0">
              <a href={platform.link} className="hover:underline">
                {platform.platform}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
