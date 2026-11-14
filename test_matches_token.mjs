function matchesToken(haystack, token) {
  if (!haystack || !token) return false;
  haystack = haystack.toLowerCase();
  token = token.toLowerCase();

  if (token.length <= 2) {
    // Exact word boundary match only for 1-2 char tokens
    const words = haystack.split(/[^a-z0-9]+/);
    return words.includes(token);
  }

  // For words >= 3 chars, split haystack into words
  const words = haystack.split(/[^a-z0-9]+/);
  return words.some(w => w === token || (w.length >= token.length && w.startsWith(token)) || (token.length >= 5 && w.includes(token)));
}

console.log('ashirvad matches sh:', matchesToken('ashirvad flowguard cpvc 90 degree elbow 1"', 'sh')); // Should be FALSE
console.log('fevicol sh matches sh:', matchesToken('fevicol sh ultimate synthetic resin', 'sh')); // Should be TRUE
console.log('fevicol sh matches fevicol:', matchesToken('fevicol sh ultimate synthetic resin', 'fevicol')); // Should be TRUE
console.log('glue brush matches brush:', matchesToken('asian paints trucare adhesive and paint brush', 'brush')); // Should be TRUE
