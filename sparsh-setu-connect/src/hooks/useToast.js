import { useCallback, useRef, useState } from "react";

export default function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback(({ title, message = "", type = "success", duration = 3500 }) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ title, message, type, visible: true });
    timerRef.current = setTimeout(() => {
      setToast((t) => (t ? { ...t, visible: false } : t));
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast((t) => (t ? { ...t, visible: false } : t));
  }, []);

  return { toast, showToast, hideToast };
}
