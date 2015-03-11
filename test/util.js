"use strict";

import assert from "power-assert";
import util from "../src/util";

describe("util", () => {
  describe("defaults(...args: any): any", () => {
    it("works", () => {
      assert(util.defaults(1) === 1);
      assert(util.defaults(0, 1) === 0);
      assert(util.defaults(null, 1) === null);
      assert(util.defaults(undefined, undefined, 2) === 2);
    });
  });
  describe.skip("toJSON(node: any, func: function, memo: any[]): JSON", () => {
    it("works", () => {
    });
  });
});
