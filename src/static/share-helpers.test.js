const test = require("node:test");
const assert = require("node:assert/strict");

const {
  normalizeActivityKey,
  formatActivityLabelForMessage,
  getSharedActivityVisibilityState,
} = require("./share-helpers.js");

test("normalizeActivityKey normalizes case and spacing", () => {
  assert.equal(normalizeActivityKey("  Chess   Club "), "chess club");
});

test("formatActivityLabelForMessage trims and shortens long labels", () => {
  assert.equal(formatActivityLabelForMessage("  Chess Club  "), "Chess Club");
  assert.equal(
    formatActivityLabelForMessage(
      "A very long activity name that keeps going long enough to be shortened for messages"
    ),
    "A very long activity name that keeps going long enough to..."
  );
});

test("getSharedActivityVisibilityState reports visible shared activities", () => {
  assert.equal(
    getSharedActivityVisibilityState({
      highlightedActivity: "chess club",
      allActivities: { "Chess Club": {}, "Art Club": {} },
      visibleActivityKeys: ["chess club", "art club"],
    }),
    "visible"
  );
});

test("getSharedActivityVisibilityState reports hidden shared activities", () => {
  assert.equal(
    getSharedActivityVisibilityState({
      highlightedActivity: "chess club",
      allActivities: { "Chess Club": {}, "Art Club": {} },
      visibleActivityKeys: ["art club"],
    }),
    "hidden"
  );
});

test("getSharedActivityVisibilityState reports missing shared activities", () => {
  assert.equal(
    getSharedActivityVisibilityState({
      highlightedActivity: "debate club",
      allActivities: { "Chess Club": {}, "Art Club": {} },
      visibleActivityKeys: ["art club"],
    }),
    "missing"
  );
});
