"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [catFact, setCatFact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    fetch("/api/catfacts")
      .then((response) => response.json())
      .then((data) => {
        setCatFact(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Random Cat Fact</h1>
      {isLoading ? <p>Loading...</p> : <p>{catFact?.fact || "No cat fact available"}</p>}
    </div>
  );
}
