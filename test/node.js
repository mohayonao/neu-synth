"use strict";

import assert from "power-assert";
import NeuNode from "../src/node";
import NeuParam from "../src/param";

describe("NeuNode", () => {
  describe("constructor", () => {
    it("works", () => {
      let node = new NeuNode();

      assert(node instanceof NeuNode);
    });
    it("with values", () => {
      let node = new NeuNode({
        klass: "Xline",
        values: { start: 1, end: 1e-6, dur: 1 }
      });

      assert(node instanceof NeuNode);
      assert(node.start === 1);
      assert(node.end === 1e-6);
      assert(node.dur === 1);
    });
    it("with params", () => {
      let node = new NeuNode({
        klass: "Sine",
        params: { frequency: 440, detune: 0 }
      });

      assert(node instanceof NeuNode);
      assert(node.frequency instanceof NeuParam);
      assert(node.detune instanceof NeuParam);
    });
  });
  describe("#klass", () => {
    it("works", () => {
      let node = new NeuNode({
        klass: "Sine",
        params: { frequency: 440, detune: 0 }
      });

      assert(node.klass === "Sine");
    });
  });
  describe("#connect(...nodes: any): self", () => {
    it("works", () => {
      let node = new NeuNode({
        klass: "Sine",
        params: { frequency: 440, detune: 0 }
      });

      let result = node.connect(node);

      assert(result === node);
    });
  });
  describe("#toJSON(): JSON", () => {
    it("works", () => {
      let node = new NeuNode({
        klass: "Sine",
        params: { frequency: 440, detune: 0 }
      });

      let gain = new NeuNode({
        klass: "Xline",
        values: { start: 1, end: 1e-6, dur: 1 }
      });
      node.connect(gain);

      assert.deepEqual(gain.toJSON(), {
        klass: "Xline",
        start: 1,
        end: 1e-6,
        dur: 1,
        inputs: [
          {
            klass: "Sine",
            frequency: {
              value: 440,
              inputs: []
            },
            detune: {
              value: 0,
              inputs: []
            },
            inputs: []
          }
        ]
      });
    });
  });
});
