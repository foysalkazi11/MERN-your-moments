import React from "react";
import { ClipLoader } from "react-spinners";
const Loading = ({ loading, size = 100 }) => {
  return (
    <div className="loading-component">
      <ClipLoader color={"#1f6f8b"} size={size} loading={loading} />
    </div>
  );
};
const FirstLoading = ({ loading, size = 100, height = "100vh" }) => {
  return (
    <div className="loading" style={{ height }}>
      <ClipLoader color={"#1f6f8b"} size={size} loading={loading} />
    </div>
  );
};
export { Loading, FirstLoading };

// className="loading-component"
