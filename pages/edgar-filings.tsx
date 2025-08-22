import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import Footer from "../components/Footer";

export interface IssuerArrangement {
  issuerName: string;
  compensationArrangement: string;
  priorRelationship: string;
  noSecuritiesAdvise: string;
}

interface Props {
  arrangements?: IssuerArrangement[];
  error?: string;
}

// Helper function to read and parse markdown files from issuer_arrangements directory
const getIssuerArrangements = (): IssuerArrangement[] => {
  const contentDir = path.join(process.cwd(), "content", "issuer_arrangements");
  try {
    if (!fs.existsSync(contentDir)) {
      console.warn(
        `Content directory not found for issuer_arrangements: ${contentDir}`
      );
      return [];
    }
    const filenames = fs.readdirSync(contentDir);
    const arrangements = filenames
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => {
        const filePath = path.join(contentDir, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return data as IssuerArrangement;
      });
    return arrangements;
  } catch (error) {
    console.warn(
      `Could not read content for issuer_arrangements:`,
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const arrangements = getIssuerArrangements();

    return {
      props: {
        arrangements,
      },
      revalidate: 3600, // Revalidate after 1 hour
    };
  } catch (error) {
    console.error(
      "Error in getStaticProps reading issuer arrangements:",
      error
    );
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

const IssuerArrangementsPage = ({ arrangements, error }: Props) => {
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Error Loading Page Data
          </h1>
          <p className="">{error}</p>
          <p className=" mt-2">
            Please try again later or contact support if the issue persists.
          </p>
        </div>
      </div>
    );
  }
  // text-[#0125BD]
  // bg-[#FF3352]
  return (
    <div className="bg-[#0125BD22] not-balanced">
      <header className="flex sticky shadow-md py-2 top-0 z-50 bg-white flex-col items-center justify-center">
        <div className="max-w-5xl mx-auto w-full px-4">
          <Link href="/">
            <button className="hover:bg-gray-100 rounded-md py-2 px-4 flex items-center gap-1">
              {/* simple chevron left */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to GFY Main Page
            </button>
          </Link>
        </div>
      </header>
      <section className="flex flex-col items-center px-4 sm:px-8 pt-4 pb-8 justify-center">
        <div className="bg-white max-w-5xl rounded-lg px-4 sm:px-16 pb-8">
          <Image
            src="/img/logo.svg"
            alt="Go Fund Yourself Logo"
            width={200}
            height={200}
            className="w-40 h-40 mx-auto"
          />
          <h1 className="text-2xl font-roboto balance text-center mb-6">
            Go Fund Yourself Show, LLC Compensation Arrangements, Potential
            Conflicts of Interest
          </h1>

          <p className=" mb-6 leading-relaxed">
            The following information discloses the financial arrangements
            between Go Fund Yourself Show, LLC, the creator of the show “Go Fund
            Yourself”, and each persona and/or issuer appearing on the show.
            These arrangements consist of compensated arrangements and ownership
            of securities, which could potentially give rise to conflicts of
            interest.
          </p>

          {arrangements && arrangements.length > 0 ? (
            <div className="space-y-8">
              {arrangements.map((arrangement, index) => (
                <div
                  key={index}
                  className="border-l-4 border-purple-500 pl-6 py-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <span className="font-bold">Issuer Name:</span>
                      <p className="mt-1">{arrangement.issuerName}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="font-bold">
                        Compensation Arrangement:
                      </span>
                      <p className=" mt-1">
                        {arrangement.compensationArrangement}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">
                        Prior Relationship with Issuer(s):
                      </span>
                      <p className=" mt-1">{arrangement.priorRelationship}</p>
                    </div>
                    <div className=" mt-1">
                      {arrangement.noSecuritiesAdvise}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No arrangements data available at this time.
            </p>
          )}
        </div>
      </section>

      <footer className="pt-6 pb-12 text-white bg-[#842DB4]">
        <div className="flex gap-8 px-6 mx-auto max-w-7xl">
          <div className="col-span-1 px-6 sm:col-span-2 md:col-span-1 lg:gap-20 md:flex-row">
            <p className="mt-2 text-2xl lg:text-3xl font-grobold">
              GO FUND YOURSELF!
            </p>
            <p className="mt-2 lg:text-lg">info@gofundyourself.show</p>
            <p className="mt-2 lg:text-lg">10621 Calle Lee, Suite 153</p>
            <p className="lg:text-lg">Los Alamitos, CA 90720</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IssuerArrangementsPage;
