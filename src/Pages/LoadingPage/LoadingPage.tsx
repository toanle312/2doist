import { loading, logoOnly } from "@/Assets";
import React from "react";
import "./LoadingPage.scss";

type LoadingPageProps = {
  // only show loading icon when loading,
  loadingOnly?: boolean;
};

const LoadingPage: React.FC<LoadingPageProps> = ({ loadingOnly = false }) => {
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      {loadingOnly ? (
        ""
      ) : (
        <img src={logoOnly} alt="logo" className="w-[80px] mb-4" />
      )}
      <img src={loading} alt="logo" className="loading" />
    </div>
  );
};

export default LoadingPage;
