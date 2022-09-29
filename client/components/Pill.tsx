import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  title: string,
  icon: string,
  platform: string,
  link: string,
}

function Pill({ icon, title, platform, link }: Props): JSX.Element {
  return (
    <Link href={link}>
      <a className='focus:ring-4 outline-none my-2 rounded-3xl ring-gray-400'>
        <span className='p-2 py-[7px] pr-4 rounded-3xl text-white transition-colors duration-200 bg-gray-600 hover:bg-gray-500 text-xs inline-flex flex-row gap-2 items-center'>
          <div className='flex-shrink-0 flex items-center'><Image alt={platform} src={icon} /></div>
          <span className='pointer-events-none'>{title}</span>
        </span>
      </a>
    </Link>
  )
}

export default Pill