import React, { useState } from "react";
import axios from "axios";

function App() {
  const [transcript, setTranscript] = useState("");
  const [instruction, setInstruction] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!transcript.trim()) {
      alert("Please paste a transcript first.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/summarize", {
        transcript,
        instruction,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      alert("Error generating summary");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center">
        AI Meeting Summarizer
      </h2>

      <label className="block mb-2 font-medium">Transcript:</label>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={8}
        className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Paste transcript here..."
      />

      <label className="block mb-2 font-medium">
        Custom Instruction (optional):
      </label>
      <textarea
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        rows={3}
        className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder='e.g. "Summarize in bullet points for executives"'
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      {summary && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Summary (Editable):</h3>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={8}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}
    </div>
  );
}

export default App;
