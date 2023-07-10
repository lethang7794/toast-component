import React from "react";

export function useEscapeKeydown(callback) {
  React.useEffect(() => {
    function handleEscapeKeydown(event) {
      if (event.code === "Escape") {
        callback();
      }
    }

    window.addEventListener("keydown", handleEscapeKeydown);
    return () => {
      window.removeEventListener("keydown", handleEscapeKeydown);
    };
  }, [callback]);
}
