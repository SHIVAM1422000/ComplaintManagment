const stringSimilarity = require('string-similarity');


async function findDuplicate(message, allQueries, threshold = 0.72){
  if(!allQueries || allQueries.length === 0) return null;
  const messages = allQueries.map(q => q.message || "");
  const match = stringSimilarity.findBestMatch(message, messages);
  if(match.bestMatch.rating >= threshold){
    return allQueries[match.bestMatchIndex]; 
  }
  return null;
}

module.exports = { findDuplicate };
