import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";

const TodayPage: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<string>("");
  const [scrollY, setScrollY] = useState<number>();

  useEffect(() => {
    const nowDay = new Date();
    setCurrentDay(nowDay.toDateString());
  }, []);

  const handleScroll = useCallback(() => {
    console.log("scroll");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true); // true <=> { capture: true }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div onScroll={handleScroll}>
      <header className="today-header">
        <div className="today-header__content">
          <div>
            <span className="text-[20px] font-bold mr-2">Today</span>
            <span className="text-[14px] text-textGray">{currentDay}</span>
          </div>
          <button>View</button>
        </div>
      </header>
      <section className="today-control"></section>
    </div>
  );
};

export default TodayPage;
