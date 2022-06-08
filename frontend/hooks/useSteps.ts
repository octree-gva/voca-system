import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

export interface StepHelpers {
  goToNextStep: () => void
  goToPrevStep: () => void
  reset: () => void
  canGoToNextStep: boolean
  canGoToPrevStep: boolean
  setStep: Dispatch<SetStateAction<number>>
}

function useSteps(maxStep: number): [number, StepHelpers] {
  const [currentStep, setCurrentStep] = useState(1)

  const canGoToNextStep = useMemo(
    () => currentStep + 1 <= maxStep,
    [currentStep, maxStep],
  )

  const canGoToPrevStep = useMemo(() => currentStep - 1 >= 1, [currentStep])

  const setStep = useCallback(
    step => {
      // Allow value to be a function so we have the same API as useState
      const newStep = step instanceof Function ? step(currentStep) : step

      if (newStep >= 1 && newStep <= maxStep) {
        setCurrentStep(newStep)
        return
      }

      throw new Error('Step not valid')
    },
    [maxStep, currentStep],
  )

  const goToNextStep = useCallback(() => {
    if (canGoToNextStep) {
      setCurrentStep(step => step + 1)
    }
  }, [canGoToNextStep])

  const goToPrevStep = useCallback(() => {
    if (canGoToPrevStep) {
      setCurrentStep(step => step - 1)
    }
  }, [canGoToPrevStep])

  const reset = useCallback(() => {
    setCurrentStep(1)
  }, [])

  return [
    currentStep,
    {
      goToNextStep,
      goToPrevStep,
      canGoToNextStep,
      canGoToPrevStep,
      setStep,
      reset,
    },
  ]
}

export default useSteps
