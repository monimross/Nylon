import Image from "next/image";
import React from "react";

const ErrorBoundary = ({ error, children }) => {
  if (error) {
    console.error(error);
    return (
      <div className="error-handling">
        <Image
          width={200}
          height={200}
          alt="error-image"
          src="/bug-fixing.svg"
        />
        <div className="error-page">
          <h1>Something went wrong.</h1>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  } else return children;
};

export default ErrorBoundary;
