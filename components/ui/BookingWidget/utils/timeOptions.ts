export const generateTimeOptions = () => {
  const times: string[] = [];
  for (let h = 7; h < 16.5; h++) {
    times.push(`${h.toString().padStart(2, "0")}:00`);
    times.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return times;
};
