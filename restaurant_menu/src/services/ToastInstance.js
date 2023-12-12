import { toast } from "react-toastify";

export const showToast = (message, type ) => {
  switch (type) {
    case "success":
      toast.success(message, {
        autoClose: true,
        closeButton: true,
        closeOnClick: true,
        hideProgressBar:true,
        draggable:true
      });
      break;
    case "warn":
      toast.warn(message, {
        autoClose: true,
        closeButton: true,
        closeOnClick: true,
        hideProgressBar:true,
      
        draggable:true
      });
      break;
    default:
      toast.error(message, {
        autoClose: true,
        closeButton: true,
        closeOnClick: true,
        hideProgressBar:true,
        draggable:true,
      });
  }
};