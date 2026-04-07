import { toZonedTime, formatInTimeZone } from "date-fns-tz";

export function toNyTime(date: Date, timeZone = "America/New_York") {
  return toZonedTime(date, "America/New_York");
}
