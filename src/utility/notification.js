import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notification = (
  type,
  content,
  position = "top-center",
  autoClose = 3000,
  hideProgressBar = true
) => {
  if (type === "success") {
    return toast.success(content, {
      position,
      autoClose,
      hideProgressBar
    });
  }
  if (type === "error") {
    return toast.error(content, {
      position,
      autoClose,
      hideProgressBar
    });
  }
  if (type === "info") {
    return toast.info(content, {
      position,
      autoClose,
      hideProgressBar
    });
  }
};

export { notification, ToastContainer };
