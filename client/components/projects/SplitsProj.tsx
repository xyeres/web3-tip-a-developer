import Image from "next/future/image";

const SplitsProj = () => {
  return (
    <div className="grid place-content-center place-items-center pt-3 w-full h-full text-gray-400 font-light">
      <div className="max-w-2xl mx-4 text-lg">
        <h1 className="text-4xl mt-10 text-gray-500 font-extralight">
          Sound Splits redesign
        </h1>
        <p className="mt-2 border-b pb-5 font-normal text-base">
          Showcasing UI design using{" "}
          <span className="text-xs border border-pink-300 py-1 px-2 rounded-full">
            Figma
          </span>
        </p>
        <p className="pb-16 mt-10 pt-10">
          Sound Splits is a royalty accounting SaaS built for the music
          industry. I co-founded the company when I experienced first-hand
          the need for better accounting tools while running an independent record label.
        </p>
        <Image
          src="/imgs/projects/soundsplits/mobile.jpg"
          className="shadow-xl mx-auto"
          width={312}
          height={3801}
          alt="sound splits project screenshot"
        />
        
        <p className="max-w-3xl text-center my-20 py-10 lg:px-40">thank you</p>
      </div>
    </div>
  );
};

export default SplitsProj;
