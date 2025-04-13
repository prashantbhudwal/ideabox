"use client";
import { registerTool } from "..";
import { useState } from "react";
import { testLLM } from "./server";

export function ScientificMethodTool() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getText = async () => {
    setLoading(true);
    setError(null);
    setText(null);
    try {
      const result = await testLLM();
      setText(result);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    } 
  };

  return (
    <div>
      <button onClick={getText} disabled={loading}>
        {loading ? "Loading..." : "Get Text"}
      </button>
      {text && <p>{text}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
