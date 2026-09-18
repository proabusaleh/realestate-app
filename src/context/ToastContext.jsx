import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info", duration = 3500) => {
      const id = ++toastId;
      setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss]
  );

  const toast = useCallback(
    {
      success: (msg, duration) => push(msg, "success", duration),
      error: (msg, duration) => push(msg, "error", duration),
      info: (msg, duration) => push(msg, "info", duration),
    },
    [push]
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-start gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-soft-lg rounded-2xl p-4 animate-slide-left"
          >
            <span
              className={`mt-0.5 shrink-0 ${
                t.type === "success"
                  ? "text-green-500"
                  : t.type === "error"
                  ? "text-red-500"
                  : "text-blue-500"
              }`}
            >
              {t.type === "success" ? (
                <CheckCircle size={20} />
              ) : t.type === "error" ? (
                <AlertCircle size={20} />
              ) : (
                <Info size={20} />
              )}
            </span>
            <p className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition shrink-0"
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}