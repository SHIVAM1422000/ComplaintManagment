import { useState } from "react";
import API from "../api/api";
import VoiceInput from "../components/VoiceInput";
import "../style/style1.css";
import Ml5Tagger from "../components/Ml5Tagger";

export default function AddFake() {
  const [msg, setMsg] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const loc = ["instagram", "facebook", "twitter", "email", "web", "whatsapp"];

  async function submit() {
    if(!msg) {
      alert("Please enter a message");
      return;
    }


    const randomIndex = Math.floor(Math.random() * loc.length);
    const res = await API.post("/", {
      message: msg,
      channel: loc[randomIndex],
    });

    console.log("Fake complaint added 🎉", res)
    setMsg("");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Fake Complaint 📝</h1>
      <textarea
        rows={4}
        className="w-full border p-3 rounded"
        placeholder="Enter fake complaint text..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <div className="flex items-center space-x-4">

      <button
        className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded"
        onClick={submit}
        >
        Submit 🎯
      </button>

      <VoiceInput onResult={setMsg} />
       <Ml5Tagger sampleMessage={msg} onTagsSuggested={setSuggestedTags} />
        </div>
    </div>
  );
}
