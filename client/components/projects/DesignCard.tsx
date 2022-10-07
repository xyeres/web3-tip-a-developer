import 'atropos/css'
import Atropos from 'atropos/react';
import Image from 'next/future/image';

type Props = {
  onClick: () => void;
  bgSrc: string;
  layerSrc: string;
  position: string;
  eventsEl?: any;
}

const DesignCard = (props: Props) => {
  return (
    <button onClick={props.onClick} className="relative outline-none ring-blue-100 focus:ring rounded-xl">
      <Atropos eventsEl={props.eventsEl} activeOffset={10} shadow={false} className="w-full h-full flex flex-col items-center">
        <Image src={props.bgSrc} data-atropos-offset="-5" className="m-4 rounded-xl" width={320} height={150} alt="" />
        <div className='absolute left-0 top-0 w-full h-full pt-0'>
          <div className="relative w-full">
            <Image src={props.layerSrc} className={props.position} data-atropos-offset="5" width={140} height={140} alt="" />
          </div>
        </div>
      </Atropos>
    </button>
  )
}

export default DesignCard