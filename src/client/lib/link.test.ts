import { link } from "./link";
import { describe, it, expect } from "vitest";
// Test vitest
describe("link utility", () => {
  describe("link object", () => {
    it("should have the correct structure", () => {
      expect(link).toHaveProperty("path");
      expect(link).toHaveProperty("url");
    });
  });
});
