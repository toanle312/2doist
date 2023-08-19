import React from "react";
import "./App.css";
import LoginPage from "./Pages/LoginPage/LoginPage";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import { PAGE_URL } from "./Utils";
import {
  FilterAndLabelsPage,
  InboxPage,
  TodayPage,
  UpcomingPage,
} from "./Pages/ControlPage";
import PrivateRoute from "./Router/PrivateRoute/PrivateRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route element={<PrivateRoute />}>
        <Route path={PAGE_URL.HOME} element={<HomePage />}>
          <Route path={PAGE_URL.INBOX} element={<InboxPage />}></Route>
          <Route path={PAGE_URL.TODAY} element={<TodayPage />}></Route>
          <Route path={PAGE_URL.UPCOMING} element={<UpcomingPage />}></Route>
          <Route
            path={PAGE_URL.FILTER_LABELS}
            element={<FilterAndLabelsPage />}
          ></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
