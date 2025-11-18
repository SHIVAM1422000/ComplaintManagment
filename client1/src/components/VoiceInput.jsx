import React, { useState, useEffect } from 'react';

export default function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(()=> {
    if(!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)){
      setSupported(false);
    }
  }, []);

  let recognition;
  const start = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      onResult(text);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  return (
    <div>
      {!supported && <div className="text-sm text-red-500">Voice not supported in this browser</div>}
      <button onClick={start} className={`px-3 py-2 rounded ${listening ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
        {listening ? 'Listening...' : 'Record Voice'}
      </button>
    </div>
  );
}
