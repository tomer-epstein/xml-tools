const {
  reduce,
  has,
  pipe,
  toPairs,
  filter,
  concat,
  append,
  cond,
  is,
  and,
  T,
  isEmpty,
  always,
  curry,
  apply,
  flip,
  identity,
  flatten,
  not,
  map,
  equals,
  defaultTo,
  converge,
  takeLast
} = require("ramda");

const hasType = has("type");
const isArray = value => Array.isArray(value);
const wrapInArray = obj => [obj];
const notEmpty = pipe(isEmpty, not);
const isArrayWithValues = converge(and, [isArray, notEmpty]);

const getAstChildrenReflective = pipe(
  defaultTo({}),
  toPairs,
  map(
    cond([
      [apply(equals("parent")), always([])],
      [(_, value) => value && hasType(value), (_, value) => wrapInArray(value)],
      [
        pipe(takeLast(1), apply(isArrayWithValues)),
        pipe(takeLast(1), identity)
      ],
      [T, always([])]
    ])
  ),
  flatten
);

module.exports = {
  hasType: hasType,
  getAstChildrenReflective: getAstChildrenReflective
};
