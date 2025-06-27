import fs from "fs";
import matter from "gray-matter"; // For parsing markdown frontmatter
import { GetStaticProps } from "next";
import path from "path";

import dynamic from "next/dynamic";
import Script from "next/script";
import ApplySection from "../components/Apply";
import CheddarBanner from "../components/CheddarBanner";
import CustomHead from "../components/CustomHead";
import FeaturedCompanies from "../components/FeaturedCompanies";
import FeaturedIn from "../components/FeaturedIn";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import MeetTheTitans from "../components/MeetTheTitans";
import NewestEpisodes from "../components/NewestEpisodes";
import StreamingOn from "../components/StreamingOn";
import Testimonials from "../components/Testimonials";

// Interfaces remain the same
export interface Episode {
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Company {
  logo: string;
  name: string;
  description: string;
  episodeLink: string;
  investLink: string;
  imageBackgroundColor?: string; // Optional: e.g., '#FFFFFF', 'bg-gray-800'
}

export interface Testimonial {
  picture: string;
  quote: string;
  title: string;
  name: string;
}

interface Props {
  episodes?: Episode[];
  companies?: Company[];
  testimonials?: Testimonial[];
  error?: string;
}

// Helper function to read and parse markdown files from a directory
const getContent = <T extends object>(contentType: string): T[] => {
  const contentDir = path.join(process.cwd(), "content", contentType);
  try {
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      console.warn(
        `Content directory not found for ${contentType}: ${contentDir}`
      );
      return [];
    }
    const filenames = fs.readdirSync(contentDir);
    const items = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
        const filePath = path.join(contentDir, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents); // Parse frontmatter
        return data as T;
      });
    return items;
  } catch (error) {
    console.warn(
      `Could not read content for ${contentType}:`,
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const episodes = getContent<Episode>("episodes");
    const companies = getContent<Company>("companies");
    const testimonials = getContent<Testimonial>("testimonials");

    // Sort episodes by date in descending order
    episodes.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });

    // Serialize date objects to strings
    const serializableEpisodes = episodes.map((episode) => ({
      ...episode,
      date: new Date(episode.date).toISOString(),
    }));

    return {
      props: {
        episodes: serializableEpisodes,
        companies,
        testimonials,
      },
      revalidate: 3600, // Revalidate after 1 hour (3600 seconds)
    };
  } catch (error) {
    console.error("Error in getStaticProps reading markdown content:", error);
    return {
      props: {
        error:
          error instanceof Error
            ? error.message
            : String(error || "An unknown error occurred reading content"),
      },
    };
  }
};

const IndexPage = ({ episodes, companies, testimonials, error }: Props) => {
  if (error) {
    console.log("Error passed to page component::", error);
    return (
      <div>
        <h1>Error Loading Page Data</h1>
        <p>{error}</p>
        <p>Please try again later or contact support if the issue persists.</p>
      </div>
    );
  }
  return (
    <div>
      <CustomHead
        title="Home"
        description="Welcome to Go Fund Yourself, the premier reality TV show where innovative entrepreneurs pitch their groundbreaking ideas to seasoned titans of industry. Discover new startups, watch compelling pitches, and explore investment opportunities."
        ogUrl="/"
      />
      {/* <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-M2TF5L6');`,
        }}
      /> */}
      {/* <Banner /> */}
      <CheddarBanner />
      <Hero />
      <FeaturedIn />
      <StreamingOn />
      <HowItWorks />
      <MeetTheTitans />
      {episodes && episodes.length > 0 ? (
        <NewestEpisodes episodes={episodes} />
      ) : null}
      {companies && companies.length > 0 ? (
        <FeaturedCompanies companies={companies} />
      ) : null}
      <Testimonials testimonials={testimonials} />
      <ApplySection />
      <Footer />
      {/* <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M2TF5L6"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      /> */}
    </div>
  );
};

export default IndexPage;
