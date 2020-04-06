//https://medium.com/@stojanpeshov/react-hooks-component-will-mount-2c21ba2778a1
import { useState, useEffect } from 'react'

const useBeforeFirstRender = (f: Function) => {
  const [hasRendered, setHasRendered] = useState(false)
  useEffect(() => setHasRendered(true), [hasRendered])
  if (!hasRendered) {
    f()
  }
}

export default useBeforeFirstRender