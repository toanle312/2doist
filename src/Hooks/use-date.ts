import { useEffect, useState } from "react";

export const useDate = () => {
  const [today, setToday] = useState("");
  const [tomorrow, setTomorrow] = useState("");
  const [nextWeekend, setNextWeekend] = useState("");
  const [nextWeek, setNextWeek] = useState("");

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    const nextWeekend = new Date(today);
    const nextWeek = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    nextWeek.setDate(today.getDate() + (7 - today.getDay() + 1));
    nextWeekend.setDate(today.getDate() + (7 - today.getDay() + 6));
    setToday(today.toDateString());
    setTomorrow(tomorrow.toDateString());
    setNextWeek(nextWeek.toDateString());
    setNextWeekend(nextWeekend.toDateString());
  }, []);

  return {
    today,
    tomorrow,
    nextWeek,
    nextWeekend
  };
};
