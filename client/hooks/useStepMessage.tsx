import { useContext, useEffect } from "react"
import { StepsContext } from "../lib/StepsProvider"

const useStepMessage = () => {
  const { setStepMessage, stepMessage } = useContext(StepsContext)
  return { stepMessage, setStepMessage }
}

export default useStepMessage