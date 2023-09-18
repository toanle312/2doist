import React, { useEffect } from "react";
import "./style.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "src/firebase/config";
import { Todo } from "src/Components/Todo/Todo";
import { useDate } from "src/Hooks/use-date";
import TodoProvider from "src/Context/TodoContext";

const TodayPage: React.FC = () => {
  const { today } = useDate();

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
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData)
    })();
  }, []);

  return (
    <div className="control">
      <header className="today-header">
        <div className="today-header__content">
          <div>
            <span className="text-[20px] font-bold mr-2">Today</span>
            <span className="text-[14px] text-textGray">{today}</span>
          </div>
          <button>View</button>
        </div>
      </header>
      <section className="todo-list">
        <div className="m-auto max-w-[800px] w-full">
          List
        </div>
      </section>
      <section className="today-control">
        <div className="m-auto max-w-[800px] w-full">
          <TodoProvider>
            <Todo/>
          </TodoProvider>
        </div>
      </section>
    </div>
  );
};

export default TodayPage;
