interface formatDatesInput {
  date: string;
}

const formatDatesForSearch = ({ date }: formatDatesInput) => {
  const start = new Date(date);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  const startDate = `${start.getFullYear()}-${start.getMonth()}-01`;
  const endDate = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;
  return { startDate, endDate };
};

export default formatDatesForSearch;
