import React from "react";
import LoginPage from "@/Pages/LoginPage/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { NESTED_URL, PAGE_URL } from "@/Utils";
import {
  FilterAndLabelsPage,
  InboxPage,
  TodayPage,
  UpcomingPage,
} from "@/Pages/ControlPage";
import PrivateRoute from "@/Router/PrivateRoute/PrivateRoute";
import MainLayout from "@/Layout/MainLayout";
import PageNotFound from "@/Pages/PageNotFound/PageNotFound";
const AppRouter: React.FC = () => {
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
            index
            path={PAGE_URL.HOME}
            element={<Navigate to={NESTED_URL.TODAY} replace />}
          />
          <Route path={NESTED_URL.INBOX} element={<InboxPage />}></Route>
          <Route path={NESTED_URL.TODAY} element={<TodayPage />}>
          </Route>
          <Route path={NESTED_URL.UPCOMING} element={<UpcomingPage />}></Route>
          <Route
            path={NESTED_URL.FILTER_LABELS}
            element={<FilterAndLabelsPage />}
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
