"use strict";

import * as util from "./util";
import NeuParam from "./param";

export class NeuNode {
  constructor(opts = {}) {
    this._ = {};
    this._.klass = util.defaults(opts.klass);
    this._.values = {};
    this._.params = {};
    this._.inputs = [];

    if (opts.values) {
      Object.keys(opts.values).forEach((name) => {
        this._.values[name] = opts.values[name];
        Object.defineProperty(this, name, {
          value: this._.values[name], enumerable: true
        });
      });
    }
    if (opts.params) {
      Object.keys(opts.params).forEach((name) => {
        this._.params[name] = new NeuParam(this, name, opts.params[name]);
        Object.defineProperty(this, name, {
          value: this._.params[name], enumerable: true
        });
      });
    }
  }

  get klass() {
    return this._.klass;
  }

  connect(...nodes) {
    nodes.forEach((node) => {
      if (node !== this && node && node._ && Array.isArray(node._.inputs) && node._.inputs.indexOf(this) === -1) {
        node._.inputs.push(this);
      }
    });
    return this;
  }

  toJSON(memo) {
    return util.toJSON(this, (node, memo) => {
      let json = {};

      json.klass = node.klass;

      Object.keys(node._.values).forEach((name) => {
        json[name] = node._.values[name];
      });
      Object.keys(node._.params).forEach((name) => {
        json[name] = node._.params[name].toJSON(memo);
      });

      json.inputs = node._.inputs.map((node) => {
        return node.toJSON(memo);
      });

      return json;
    }, memo);
  }
}

export default NeuNode;
