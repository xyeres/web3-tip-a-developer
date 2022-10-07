import Image from 'next/future/image'

const HunterProj = () => {
  return (
    <div className="grid place-content-center pt-3 w-full h-full text-gray-400 font-light">
      <div className='max-w-2xl mx-4 text-lg'>
        <h1 className='text-4xl mt-10 text-gray-500 font-extralight'>Hunter Magazine design</h1>
        <p className='mt-2 border-b pb-5 font-normal text-base'>Showcasing UI design using <span className='text-xs border border-pink-300 py-1 px-2 rounded-full'>Figma</span></p>
        <p className="pb-10 mt-10 pt-10">
          HUNTER is a lifestyle magazine bringing reader&apos;s pro guides and the world&apos;s
          best places to stay. A concept site.
        </p>
        <Image
          src="/imgs/projects/hunter/home.jpg"
          className='shadow-xl'
          width={756}
          height={1709}
          alt="project screenshot"
        />
        <p className="text-center my-20 py-10 px-6 md:px-20">
          The concept continues with a booking system that connects
          users to exclusive hotels and homes around the world....
        </p>
        <Image
          src="/imgs/projects/hunter/property.jpg"
          className='shadow-xl'
          width={756}
          height={1162}
          alt="project screenshot"
        />
        <p className="max-w-3xl text-center my-20 py-10 lg:px-40">
          A text-heavy article
        </p>
        <Image
          src="/imgs/projects/hunter/article.jpg"
          className='shadow-xl'
          width={756}
          height={2240}
          alt="project screenshot"
        />
        <p className="max-w-3xl text-center my-20 py-10 lg:px-40">
          thank you
        </p>
      </div>
    </div>
  )
}

export default HunterProj