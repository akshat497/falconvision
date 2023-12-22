import { toast } from "react-toastify";

export const showToast = (message, type ) => {
  switch (type) {
    case "success":
      toast.success(message, {
        autoClose: true,
        closeButton: true,
        closeOnClick: true,
        hideProgressBar:true,
        draggable:true,
        style: {
          fontWeight: 'bold', // Add this line to make the font bold
          backgroundColor:"whiteSmoke",
          color:"#07bc0c"
        },
        
        
      });
      break;
    case "warn":
      toast.warn(message, {
        autoClose: true,
        closeButton: true,
        closeOnClick: true,
        hideProgressBar:true,
        draggable:true,
        style: {
          fontWeight: 'bold', // Add this line to make the font bold
          backgroundColor:"whiteSmoke",
          color:"#f1c40f"
        },
      });
      break;
      case "info":
        toast.info(message, {
          autoClose: true,
          closeButton: true,
          closeOnClick: true,
          hideProgressBar:true,
          draggable:true,
          style: {
            fontWeight: 'bold', // Add this line to make the font bold
            backgroundColor:"whiteSmoke",
            color:"#3498db;"
          },
        });
        break;
    default:
      toast.error(message, {
        autoClose: true,
        closeButton: true,
        closeOnClick: true,
        hideProgressBar:true,
        draggable:true,
        style: {
          fontWeight: 'bold', // Add this line to make the font bold
          backgroundColor:"whiteSmoke",
          color:"#e74c3c"
        },
      });
  }
};