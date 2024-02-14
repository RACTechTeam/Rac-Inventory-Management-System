import React, { useEffect, useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after some delay
    }, 2000); // Simulate a 2-second delay

    return () => clearTimeout(timer);
  }, []); // Run this effect only once after the component mounts

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >
            Loading...
          </span>
        </div>
      ) : (
        <div>
          {/* Your main content here */}
          <h1>Main Content</h1>
        </div>
      )}
    </div>
  );
}