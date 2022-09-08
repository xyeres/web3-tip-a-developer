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
      <a>
        <span className='p-2 py-[6px] pr-4 my-2 rounded-3xl transition-colors duration-200 bg-[#1F1F1F] hover:bg-[#2f2f2f] text-xs inline-flex flex-row gap-2 items-center'>
          <div className='flex-shrink-0 flex items-center'><Image alt={platform} src={icon} /></div>
          <span className='pointer-events-none'>{title}</span>
        </span>
      </a>
    </Link>
  )
}

export default Pill