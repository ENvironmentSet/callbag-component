export default (reducer, preloadedModel) => intent$ => (start, sink) => {
  let prevModel = preloadedModel;

  intent$(0, (t, d) => {
    if (t === 1) {
      prevModel = reducer(prevModel, d);
      sink(1, prevModel);
    } else sink(t, d);
  });
  sink(1, preloadedModel);
};