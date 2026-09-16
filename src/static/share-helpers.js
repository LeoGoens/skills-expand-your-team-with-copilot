(function (globalScope) {
  function normalizeActivityKey(activityName) {
    return activityName.trim().toLowerCase().replace(/\s+/g, " ");
  }

  function formatActivityLabelForMessage(activityName) {
    const cleanedLabel = activityName.replace(/\s+/g, " ").trim();

    if (!cleanedLabel) {
      return "";
    }

    if (cleanedLabel.length <= 60) {
      return cleanedLabel;
    }

    return `${cleanedLabel.slice(0, 57)}...`;
  }

  function getSharedActivityVisibilityState({
    highlightedActivity,
    allActivities,
    visibleActivityKeys,
  }) {
    if (!highlightedActivity) {
      return "none";
    }

    if (visibleActivityKeys.includes(highlightedActivity)) {
      return "visible";
    }

    const allActivityKeys = Object.keys(allActivities).map(normalizeActivityKey);

    if (allActivityKeys.includes(highlightedActivity)) {
      return "hidden";
    }

    return "missing";
  }

  const helpers = {
    normalizeActivityKey,
    formatActivityLabelForMessage,
    getSharedActivityVisibilityState,
  };

  globalScope.activityShareHelpers = helpers;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = helpers;
  }
})(typeof window !== "undefined" ? window : globalThis);
