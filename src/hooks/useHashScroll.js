import { useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useHashScroll = () => {
  const { hash } = useLocation()

  const scrollToHash = useCallback((targetHash) => {
    if (!targetHash) return

    const normalizedHash = targetHash.startsWith('#') ? targetHash : `#${targetHash}`
    const element = document.getElementById(normalizedHash.slice(1))

    if (!element) return

    window.requestAnimationFrame(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [])

  useEffect(() => {
    if (hash) {
      scrollToHash(hash)
    }
  }, [hash, scrollToHash])

  return scrollToHash
}

export default useHashScroll
