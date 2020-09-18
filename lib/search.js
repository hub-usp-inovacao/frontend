export const genFuzzyOptions = (keys) => ({
  ignoreLocation: true,
  findAllMatches: true,
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  threshold: 0.2,
  keys,
});
