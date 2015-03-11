"use strict";

import assert from "power-assert";
import NeuNode from "../src/node";
import NeuParam from "../src/param";

describe("NeuParam", () => {
  describe("constructor", () => {
    it("works", () => {
      let param = new NeuParam({}, "foo", 0);

      assert(param instanceof NeuParam);
    });
  });
  describe("#klass", () => {
    it("works", () => {
      let param = new NeuParam({}, "foo", 0);

      assert(param.klass === "Param");
    });
  });
  describe("#name", () => {
    it("works", () => {
      let param = new NeuParam({}, "foo", 0);

      assert(param.name === "foo");
    });
  });
  describe("#value", () => {
    it("works", () => {
      let param = new NeuParam({}, "foo", 0);

      assert(param.value === 0);

      param.value = 100;
      assert(param.value === 100);

      assert.throws(() => {
        param.value = "1000";
      }, TypeError);
    });
  });
  describe("#inputs", () => {
    it("works", () => {
      let param = new NeuParam({}, "foo", 0);

      assert.deepEqual(param.inputs, []);
    });
  });
  describe("#toJSON(): JSON", () => {
    it("works", () => {
      let node = new NeuNode({
        klass: "Sine",
        params: { frequency: 440, detune: 0 }
      });
      let frequency = new NeuNode({
        klass: "Xline",
        values: { start: 440, end: 2, dur: 1 }
      });

      frequency.connect(node.frequency);

      assert.deepEqual(node.toJSON(), {
        klass: "Sine",
        frequency: {
          value: 440,
          inputs: [
            {
              klass: "Xline",
              start: 440,
              end: 2,
              dur: 1,
              inputs: []
            }
          ]
        },
        detune: {
          value: 0,
          inputs: []
        },
        inputs: []
      });
    });
  });
});
