export type Card = {
  imgSrc: string;
  imgHeight: number;
  imgWidth: number;
  classNames: {
    stack: string;
    container: string;
  };
  title: string;
  logoOnly: boolean;
  desc: string;
  role: string;
  stack: Array<String>;
  published: boolean;
  href: string;
};

const cardData: Card[] = [
  {
    imgSrc: "/imgs/constellation-logo.png",
    imgWidth: 40,
    imgHeight: 40,
    classNames: {
      stack: "border-fuchsia-300",
      container: "bg-[#fef7ff] ring-fuchsia-100 border-fuchsia-200",
    },
    title: "Constellation Labs",
    logoOnly: false,
    desc: `Anyone can fund their next project through decentralized web3
    crowdfunding. Coming soon.`,
    role: "UI Design, Development, Architecture",
    stack: ["Solidity", "ethers.js", "Next.js"],
    published: false,
    href: "#",
  },
  {
    imgSrc: "/imgs/ss-logo-full.svg",
    imgWidth: 200,
    imgHeight: 46,
    classNames: {
      stack: "border-blue-300",
      container:
        "hover:bg-gradient-to-b from-[#fbffff] border-blue-200 ring-blue-100",
    },
    title: "Sound Splits",
    logoOnly: true,
    desc: `SaaS processing 10M+ monthly rows of royalty data for labels
    and publishers`,
    role: "UI Design, Development, System Design",
    stack: ["React", "Django", "PostgreSQL"],
    published: true,
    href: "https://www.soundsplits.com",
  },
  {
    imgSrc: "",
    imgWidth: 40,
    imgHeight: 40,
    classNames: {
      stack: "border-yellow-300",
      container:
        "hover:bg-gradient-to-b from-yellow-50 border-yellow-300 ring-yellow-200",
    },
    title: "Streamy",
    logoOnly: false,
    desc: `Subscribers-only music streaming for United Pursuit Records
    delivering exclusive music to their most loyal fans`,
    role: "Design & Development",
    stack: ["Next.js", "React", "Firebase"],
    published: true,
    href: "https://listen.unitedpursuit.com",
  },
];

export { cardData };
