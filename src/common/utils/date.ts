/**
 * Calculates the current week of life based on a birth date
 * @param birthYear - Year of birth
 * @param birthMonth - Month of birth (0-indexed: 0 = January)
 * @param birthDay - Day of birth
 * @returns The current week number since birth
 */
export function getWeekOfLife(
  birthYear = 1993,
  birthMonth = 2, // March (0-indexed: 0 = January)
  birthDay = 1,
): number {
  // Create the birth date
  const birthDate = new Date(birthYear, birthMonth, birthDay);
  const today = new Date();

  // Check if the birth date is in the future
  if (today < birthDate) {
    throw new Error("Birth date cannot be in the future");
  }

  // Calculate the difference in milliseconds
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = today.getTime() - birthDate.getTime();

  // Calculate the number of days elapsed since birth
  const daysElapsed = Math.floor(diffMs / msPerDay);

  // Compute the week of life (adding 1 to count the first week as week 1)
  return Math.floor(daysElapsed / 7) + 1;
}
