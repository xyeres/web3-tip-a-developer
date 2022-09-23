import { ProviderRpcError } from 'hardhat/types';
import Image from 'next/image';
import useMetamask from '../hooks/useMetamask'
import StepButton from './steps/StepButton';


const ChainCheck = () => {
  const { metaState, changeUserChain, addUserChain } = useMetamask()


  async function handleSwitchChainBtn() {
    try {
      await changeUserChain()
    } catch (err) {

      const RpcError = err as ProviderRpcError
      
      if (RpcError.code === 4902) {
        // network does not exist in users wallet, 
        // let's add it
        await addUserChain()
      }
      console.warn(err)
    }
  }

  return (
    <div className='w-full flex flex-col gap-3'>
      <div className='flex items-center self-center gap-2 text-sm mt-5'>
        <Image src="/imgs/bell.png" className='flex-shrink-0 w-full' width={24} height={24} alt="Warning, please select different chain" />
        <p className='flex-shrink w-full'>Must switch to Polygon network to send transaction. You are currently on {metaState.chain.name}</p>
      </div>
      <StepButton onClick={handleSwitchChainBtn} title='Switch to Polygon' />
    </div>
  )
}

export default ChainCheck