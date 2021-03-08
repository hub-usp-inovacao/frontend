const generateOption = (keys, threshold = 0) => ({
  ignoreLocation: true,
  findAllMatches: true,
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  threshold,
  keys,
});

export default (context, inject) => {
  inject("fuzzySearch", async (term, items, keys) => {
    context.store.dispatch("global/setStrictResults");

    if (!term) {
      return undefined;
    }

    let results = await context.$search(term, items, generateOption(keys));

    if (!results.length) {
      context.store.dispatch("global/setFlexibleResults");
      results = await context.$search(term, items, generateOption(keys, 0.15));
    }

    return results;
  });
};
