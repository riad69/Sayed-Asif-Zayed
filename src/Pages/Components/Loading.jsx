import React from "react";
import "../css/loading.css";

const Loading = () => {
  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="loader grid place-items-center"></div>
    </div>
  );
};

export default Loading;
