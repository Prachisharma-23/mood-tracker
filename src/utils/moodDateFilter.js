export function filterMoodsByDate(moods, filter) {
  if (!Array.isArray(moods)) return [];

  const now = new Date();

  return moods.filter((mood) => {
    if (!mood.timestamp) return false;

    const moodDate = new Date(mood.timestamp);

    if (isNaN(moodDate)) return false;

    switch (filter) {
      case "today":
        return moodDate.toDateString() === now.toDateString();

      case "7":
        return now - moodDate <= 7 * 24 * 60 * 60 * 1000;

      case "30":
        return now - moodDate <= 30 * 24 * 60 * 60 * 1000;

      case "all":
        return true;

      default:
        return true;
    }
  });
}
