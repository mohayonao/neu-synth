"use strict";

import * as util from "./util";

export class NeuParam {
  constructor(node, name, value) {
    this._ = {};
    this._.node = node;
    this._.name = name;
    this._.value = value;
    this._.inputs = [];
  }

  get klass() {
    return "Param";
  }

  get name() {
    return this._.name;
  }

  get value() {
    return this._.value;
  }

  set value(value) {
    if (typeof value !== "number") {
      throw new TypeError(`The ${this._.node.klass}.${this._.name} must be a number`);
    }
    this._.value = value;
  }

  get inputs() {
    return this._.inputs.slice();
  }

  toJSON(memo) {
    return util.toJSON(this, (node, memo) => {
      let json = {};

      json.value = node.value;

      json.inputs = node._.inputs.map((node) => {
        return node.toJSON(memo);
      });

      return json;
    }, memo);
  }
}

export default NeuParam;
