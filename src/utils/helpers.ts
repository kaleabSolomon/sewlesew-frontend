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
