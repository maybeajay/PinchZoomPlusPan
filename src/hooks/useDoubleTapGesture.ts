import { useRef } from 'react';

export default function useDoubleTapGesture(delay = 300) {
  const lastTapRef = useRef<number | null>(null);

//   function that will reset the image that is zoomed
  function handleDoubleTap() {
    const now = Date.now();

    if (lastTapRef.current && now - lastTapRef.current < delay) {
      lastTapRef.current = null;
      return true;
    }
    lastTapRef.current = now;
    return false;
  }
  
  return handleDoubleTap;
}
