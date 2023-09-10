import React, { useRef, useEffect } from "react";

function useOutsideAlerter({ ref, setVisible, visible }) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (!visible) setVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter({
  className,
  children,
  setVisible,
  visible,
}) {
  const ref = useRef(null);
  useOutsideAlerter({
    ref,
    setVisible,
    visible,
  });

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
