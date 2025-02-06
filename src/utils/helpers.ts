export function formatDaysLeft(targetDate: string): string {
  const now = new Date(); // Current date and time
  const target = new Date(targetDate); // Target date
  const timeDifference = target.getTime() - now.getTime(); // Time difference in milliseconds

  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

  if (daysLeft > 0) {
    return `${daysLeft} days left`;
  } else if (daysLeft === 0) {
    return "Today is the day!";
  } else {
    return `Expired ${Math.abs(daysLeft)} days ago`;
  }
}
export const daysAgo = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffInDays === 0 ? "Today" : `${diffInDays} days ago`;
};

export function formatText(text: string): string {
  return text
    .toLowerCase() // Convert the entire text to lowercase
    .split("_") // Split by "_"
    .map(
      (word, index) =>
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word // Capitalize only the first word
    )
    .join(" "); // Join with spaces
}
