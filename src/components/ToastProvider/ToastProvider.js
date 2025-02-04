import React, { useCallback, useMemo } from "react";
import { useEscapeKeydown } from "../../hooks/useEscapeKeydown";

const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleAddToast = useCallback((toast) => {
    setToasts((toasts) => [...toasts, toast]);
  }, []);

  const handleRemoveToast = useCallback((id) => {
    setToasts((toasts) => toasts.filter((item) => item.id !== id));
  }, []);

  const handleRemoveAllToasts = useCallback((id) => {
    setToasts([]);
  }, []);

  const providerValue = useMemo(() => {
    return { toasts, handleAddToast, handleRemoveToast, handleRemoveAllToasts };
  }, [handleAddToast, handleRemoveAllToasts, handleRemoveToast, toasts]);

  useEscapeKeydown(handleRemoveAllToasts);

  return (
    <ToastContext.Provider value={providerValue}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToasts should be use inside a ToastProvider");
  }

  return context;
}

export default ToastProvider;
