import React from "react";
import LoginPage from "../Pages/LoginPage/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { NESTED_URL, PAGE_URL } from "../Utils";
import {
  FilterAndLabelsPage,
  InboxPage,
  TodayPage,
  UpcomingPage,
} from "../Pages/ControlPage";
import PrivateRoute from "../Router/PrivateRoute/PrivateRoute";
import MainLayout from "src/Layout/MainLayout";
const AppRouter : React.FC = () => {
  return (
    <Routes>
      {/* Auto redirect to login page */}
      <Route path="/" element={<Navigate to={PAGE_URL.LOGIN} />} />
      {/* Public route */}
      <Route path={PAGE_URL.LOGIN} element={<LoginPage />}></Route>
      {/* Private route (only show home page when login success)*/}
      <Route element={<PrivateRoute />}>
        {/* Auto redirect to home page */}
        <Route path={PAGE_URL.HOME} element={<MainLayout />}>
          <Route
            path={PAGE_URL.HOME}
            element={<Navigate to={NESTED_URL.TODAY} />}
          />
          <Route path={NESTED_URL.INBOX} element={<InboxPage />}></Route>
          <Route path={NESTED_URL.TODAY} element={<TodayPage />}></Route>
          <Route path={NESTED_URL.UPCOMING} element={<UpcomingPage />}></Route>
          <Route
            path={NESTED_URL.FILTER_LABELS}
            element={<FilterAndLabelsPage />}
          ></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
