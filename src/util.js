"use strict";

export let defaults = (...args) => {
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== undefined) {
      return args[i];
    }
  }
  return null;
};

export let toJSON = (node, func, memo) => {
  memo = memo || [];

  if (memo.indexOf(node) !== -1) {
    return `<circular:${node.klass}>`;
  }
  memo.push(node);

  let result = func(node, memo);

  memo.pop();

  return result;
};

export default {
  defaults,
  toJSON,
};
