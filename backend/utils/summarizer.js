const { SummarizerManager } = require("node-summarizer");

// simple extractive summarizer (node-summarizer)
async function extractiveSummary(text, sentenceCount = 2){
  try {
    const mgr = new SummarizerManager(text, sentenceCount);
    const res = await mgr.getSummaryByRank();
    return res.summary || text.slice(0, 160);
  } catch (e) {
    return text.slice(0, 160);
  }
}

module.exports = { extractiveSummary };
