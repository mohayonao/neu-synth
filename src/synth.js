"use strict";

import config from "./config";

let creators = {};

export class NeuSynth {
  constructor(func, ...args) {
    let neu = Object.create(config.namespace, creators);
    this.graph = func.apply(null, [ neu ].concat(args));
  }
}

export let register = (name, Klass) => {
  let creator = (...args) => {
    return new Klass(args);
  };
  creators[name] = { value: creator, enumerable: true };
};

export default NeuSynth;
