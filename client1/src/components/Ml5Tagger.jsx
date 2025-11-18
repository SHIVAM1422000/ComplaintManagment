import React, { useEffect, useRef, useState } from 'react';
import ml5 from 'ml5';

export default function Ml5Tagger({ onTagsSuggested, sampleMessage }) {
  const classifierRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(()=> {
    // tiny training data
    const trainingData = [
      { label: 'payment', text: 'payment failed charged refund issue' },
      { label: 'payment', text: 'upi failure payment not going through' },
      { label: 'delivery', text: 'package not delivered tracking delayed' },
      { label: 'delivery', text: 'lost package where is my order' },
      { label: 'login', text: 'cannot login password reset account locked' },
      { label: 'general', text: 'thank you love the product' },
      { label: 'refund', text: 'want refund money back' },
    ];

    // create the classifier
    classifierRef.current = ml5.neuralNetwork({ task: 'classification', debug: false });
    trainingData.forEach(d => classifierRef.current.addData({ text: d.text }, { label: d.label }));
    classifierRef.current.normalizeData();
    classifierRef.current.train({ epochs: 20 }, () => {
      setReady(true);
    });
  }, []);

  useEffect(()=> {
    if(!ready || !sampleMessage) return;
    classifierRef.current.classify({ text: sampleMessage }, (err, res) => {
      if(err) return console.error(err);
      // res is array with label and confidence
      const labels = res.map(r => r.label);
      onTagsSuggested(labels);
    });
  }, [ready, sampleMessage]);

  return (
    <div>
      {!ready ? <div className="text-sm text-gray-500">Tagger loading...</div> : <div className="text-sm text-green-600">Tagger ready</div>}
    </div>
  );
}
