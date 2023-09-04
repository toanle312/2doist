import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "src/firebase/config";
import { Todo } from "src/Components/Todo/Todo";

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

  useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, "todos"));
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      console.log(filteredData);
    })()
  }, [])

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
      <section className="today-control">
        <div className="m-auto max-w-[800px] w-full">
          <Todo/>
        </div>
      </section>
    </div>
  );
};

export default TodayPage;
