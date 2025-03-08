import toast from "react-hot-toast";

export const toastError = (message: string) => {
  toast(message, {
    icon: "❌",
    style: {
      border: "1px solid #ff4d4f",
      borderRadius: "10px",
      background: "#fff",
      color: "#000",
    },
  });
};

export const toastSuccess = (message: string) => {
  toast(message, {
    icon: "✅",
    style: {
      border: "1px solid #00c48c",
      borderRadius: "10px",
      background: "#fff",
      color: "#000",
    },
  });
};
