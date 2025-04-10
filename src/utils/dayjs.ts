import dayjs from "dayjs";

export const formatDate = (
  date: string,
  format = "HH:mm-DD/MM/YYYY",
) => {
  if (!dayjs(date).isValid) return date;

  return dayjs(date).format(format);
};
