import Image from "next/image";

// Define the type for a single episode
interface Episode {
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

// Define the props type for the NewestEpisodes component
interface NewestEpisodesProps {
  episodes: Episode[];
}

// Helper function to format the date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  return `${month} ${day}${daySuffix}, ${year}`;
};

const NewestEpisodes: React.FC<NewestEpisodesProps> = ({ episodes }) => {
  const YOUTUBE_PLAYLIST_URL =
    "https://www.youtube.com/playlist?list=PLaK_6SY7ixVQ04RZsdCLtgz64bU0Fazol"; // Added placeholder
  return (
    <section
      id="episodes"
      className="flex flex-col items-center justify-center py-10 lg:py-12"
    >
      <div className="flex items-center justify-between w-full px-4 mb-4 max-w-7xl 2xl:max-w-7xl">
        <h3 className="text-xl font-extrabold md:text-3xl xl:text-4xl">
          Newest Episodes
        </h3>
        <div className="flex items-center space-x-4">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Season 1
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-scroll max-w-[calc(100vw_-_2rem)] scrollbar">
        <div className="grid grid-flow-col pb-0 gap-x-4 snap-x">
          {/* <div className="w-64 overflow-hidden" /> */}
          {episodes.map((episode, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden bg-white border rounded-lg shadow-lg w-72"
            >
              <a
                href={episode.link || YOUTUBE_PLAYLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative">
                  <div className="aspect-video">
                    <Image
                      src={
                        episode.image
                          ? episode.image.startsWith("http") ||
                            episode.image.startsWith("/")
                            ? episode.image
                            : `/${episode.image}`
                          : "/img/episode-coming-soon.png"
                      }
                      alt={episode.title}
                      className="object-cover"
                      fill
                    />
                  </div>
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-white drop-shadow-md"
                      viewBox="0 0 24 24"
                    >
                      <path fill="currentColor" d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div className="flex flex-col justify-between flex-grow p-6 border gap-y-2">
                <p
                  className={`text-sm ${
                    episode.link ? "text-[#FF3352]" : "text-gray-500"
                  }`}
                >
                  {formatDate(episode.date)}
                </p>
                <h3 className="text-lg font-bold sm:text-xl">
                  {episode.title}
                </h3>
                <div className="relative flex-grow overflow-hidden max-h-24">
                  <p className="text-gray-500">{episode.description}</p>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none bg-gradient-to-b from-transparent to-white"
                    aria-hidden="true"
                  ></div>
                </div>
                <div className="mt-4">
                  {episode.link ? (
                    <a
                      href={episode.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="px-4 py-2 text-white bg-[#FF3352] rounded-full w-full hover:bg-red-700 transition-colors">
                        Watch Episode
                      </button>
                    </a>
                  ) : (
                    <button className="w-full px-4 py-2 text-gray-500 bg-gray-200 rounded-full cursor-not-allowed">
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewestEpisodes;
