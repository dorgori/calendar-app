export function convertDurationToDate(startDate, duration) {
  let endDate = new Date(startDate);
  const m = (duration / 1000 / 60) % 60;
  const h = (duration / 1000 / 60 / 60) % 24;
  const d = (duration / 1000 / 60 / 60 / 24) % 7;
  endDate.setMinutes(endDate.getMinutes() + m);
  endDate.setHours(endDate.getHours() + h);
  endDate.setDate(endDate.getDate() + d);
  return endDate;
}
