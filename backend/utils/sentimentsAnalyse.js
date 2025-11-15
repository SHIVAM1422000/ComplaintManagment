const Sentiment = require('sentiment');
const sentiment = new Sentiment();

export default function sentimentAnalyze(message) {
  const res = sentiment.analyze(message);
  return res.score;
}