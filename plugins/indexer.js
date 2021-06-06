export default (ctx, inject) => {
  inject("indexer", (allData, keys) => {
    return allData.map((entity) => {
      entity.inspect = {};

      for (const k of keys) entity.inspect[k] = ctx.$removeAccent(entity[k]);

      return entity;
    });
  });
};
