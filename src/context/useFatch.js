import { useState, useEffect } from "react";
import axiosConfic from "./axiosConfic";

const useFatch = (method, url) => {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const [data, setdata] = useState([]);

  const fatchData = async () => {
    try {
      if (method === "get") {
        const res = await axiosConfic.get(url);

        setdata(res.data);
        seterror("");
      }
      if (method === "post") {
        const res = await axiosConfic.post(url);
        setdata(res.data);
        seterror("");
      }
      if (method === "delete") {
        const res = await axiosConfic.delete(url);
        setdata(res.data);
        seterror("");
      }
    } catch (error) {
      seterror(error.message);
    }
    setloading(false);
  };

  useEffect(() => {
    fatchData();
  }, [url]);
  return { loading, error, data, setdata, seterror };
};

export default useFatch;
