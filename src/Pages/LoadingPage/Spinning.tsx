import { loading } from "@/Assets";
import React from "react";
import "./LoadingPage.scss";

const Spinning: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <img src={loading} alt="logo" className="loading" />
    </div>
  );
};

export default Spinning;
