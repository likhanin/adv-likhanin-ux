import { useCallback, useEffect, useRef, useState } from 'react'

export function useCopyToClipboard(timeout = 1600) {
  const [copiedValue, setCopiedValue] = useState('')
  const timeoutRef = useRef(0)

  const copy = useCallback(
    async (value) => {
      if (!value) {
        return false
      }

      await navigator.clipboard.writeText(value)
      setCopiedValue(value)
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => {
        setCopiedValue('')
      }, timeout)

      return true
    },
    [timeout],
  )

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current)
    },
    [],
  )

  return { copiedValue, copy }
}
