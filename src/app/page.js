"use client";
import { Input } from "postcss";
import { useEffect, useState } from "react";

export default function Home() {
  const [catFact, setCatFact] = useState(null);
  const [title, setTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [newTitle, setNewTitle] = useState(null);
  const [addDone, setAddDone] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    fetch("/api/fact")
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

  const AddMethodWithBodyJson = async () => {
    setIsLoading2(true);
    try {
      const response = await fetch("/api/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New TItle for Hello clicking",
          userId: 5,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);

      setTitle(data?.title);
      setIsLoading2(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading2(false);
    }
  };

  const AddTitle = async () => {
    setIsLoading3(true);
    try {
      const response = await fetch("/api/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          userId: 5,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);

      setAddDone(data?.title);
      setIsLoading3(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading3(false);
    }
  };
  return (
    <div>
      <h1 className="mb-3">Random Cat Fact</h1>
      {isLoading ? (
        <p className="mb-3">Loading...</p>
      ) : (
        <p className="mb-3">{catFact?.fact || "No cat fact available"}</p>
      )}
      <div
        className="px-3 py-2 mb-3 rounded-lg bg-cyan-400 text-black w-fit cursor-pointer"
        onClick={AddMethodWithBodyJson}
      >
        HELLO
      </div>
      {isLoading2 && <p className="mb-3">Loading...</p>}
      {!isLoading2 && title && <p className="mb-3">{title}</p>}
      {/* Add more user*/}
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setNewTitle(e.target.value)}
        className="border border-gray-300  bg-slate-950 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-lime-400"
      />
      <div
        className="px-3 mb-3 py-2 rounded-lg bg-lime-400 text-black w-fit cursor-pointer"
        onClick={AddTitle}
      >
        Add
      </div>
      {isLoading3 && <p className="mb-3"> Adding...</p>}{" "}
      {!isLoading3 && addDone && <p className="mb-3">{addDone}</p>}
    </div>
  );
}
