export default (first, inject) => {
  console.log(Object.getPrototypeOf(first));
  inject("fuzzySearch", () => console.log("oi"));
};
