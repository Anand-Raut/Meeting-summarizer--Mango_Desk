import { useState } from "react";
import emailjs from "emailjs-com";

function App() {
  const [recipient, setRecipient] = useState("");
  const [summary, setSummary] = useState("Sample summary goes here...");

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      to_name: recipient,
      summary: summary,
    };

    emailjs
      .send(
        "service_tja1fy9",
        "template_b7whu1l",
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
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Share Meeting Summary</h1>
      
      <textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows="6"
      />

      <input
        type="email"
        placeholder="Recipient email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={sendEmail}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Summary
      </button>
    </div>
  );
}

export default App;
