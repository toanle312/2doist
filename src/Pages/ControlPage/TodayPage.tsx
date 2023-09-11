import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "src/firebase/config";
import { Todo } from "src/Components/Todo/Todo";
import { useDate } from "src/Hooks/use-date";

const TodayPage: React.FC = () => {
  const {today} = useDate();

  // const handleScroll = useCallback(() => {
  //   console.log("scroll");
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, true); // true <=> { capture: true }

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll, false);
  //   };
  // }, [handleScroll]);

  useEffect(() => {
    (async () => {
      const data = await getDocs(collection(db, "todos"));
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
    })()
  }, [])

  return (
    <div>
      <header className="today-header">
        <div className="today-header__content">
          <div>
            <span className="text-[20px] font-bold mr-2">Today</span>
            <span className="text-[14px] text-textGray">{today}</span>
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
