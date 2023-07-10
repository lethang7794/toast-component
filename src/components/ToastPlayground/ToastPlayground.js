import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";
import { useToasts } from "../ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];
const DEFAULT_VARIANT = VARIANT_OPTIONS[0];

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(DEFAULT_VARIANT);

  const { toasts, handleAddToast } = useToasts();

  function handleSubmitToast(event) {
    event.preventDefault();
    if (variant && message) {
      handleAddToast({
        id: crypto.randomUUID(),
        variant,
        message,
      });
      setVariant(DEFAULT_VARIANT);
      setMessage("");
    }
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} />

      <form onSubmit={handleSubmitToast}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor='message'
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id='message'
                className={styles.messageInput}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((opt) => {
                const id = `variant-${opt}`;
                return (
                  <label key={id} htmlFor={id}>
                    <input
                      id={id}
                      type='radio'
                      name='variant'
                      value={opt}
                      checked={variant === opt}
                      onChange={(event) => {
                        setVariant(event.target.value);
                      }}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
