import { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";
import ReactMarkdown from "react-markdown";

function App() {
  const [transcript, setTranscript] = useState("");
  const [instruction, setInstruction] = useState("");
  const [summary, setSummary] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!transcript.trim()) {
      alert("Please paste a transcript first.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("https://meeting-summarizer-0h37.onrender.com/summarize", {
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

  const handleSendEmail = () => {
    if (!recipient.trim() || !summary.trim()) {
      alert("Recipient email and summary are required.");
      return;
    }

    const templateParams = {
      email: recipient,
      summary: summary,
    };

    emailjs
      .send(
        "service_dqsgu09", 
        "template_1xe0fzm",
        templateParams,
        "XLwsTCT0eb18yZp1i"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send email.");
        }
      );
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
          <h3 className="text-lg font-semibold mb-2">Summary:</h3>
          <ReactMarkdown>{summary}</ReactMarkdown>

          <input
            type="email"
            placeholder="Recipient email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={handleSendEmail}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Send Summary
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
