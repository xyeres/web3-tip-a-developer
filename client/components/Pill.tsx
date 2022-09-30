import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  icon: string;
  platform: string;
  link: string;
};

function Pill({ icon, title, platform, link }: Props): JSX.Element {
  return (
    <Link href={link}>
      <a className="flex focus:ring-4 outline-none my-2 py-[5px] p-2 pr-4 bg-gray-600 focus:bg-gray-700 hover:bg-gray-700 rounded-3xl ring-gray-400">
        <span className="text-white transition-colors duration-200  text-xs inline-flex flex-row gap-2 items-center">
          <span className="flex-shrink-0 flex items-center">
            <Image alt={platform} src={icon} />
          </span>
          <span className="pointer-events-none">{title}</span>
        </span>
      </a>
    </Link>
  );
}

export default Pill;
