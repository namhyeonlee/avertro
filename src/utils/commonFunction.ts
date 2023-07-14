import { toast } from "react-toastify";

export const toastCall = (msg: string, type: "success" | "error" | "warning") => {
  switch (type) {
    case "success":
      toast.success(msg, { theme: "colored" });
      break;
    case "error":
      toast.error(msg, { theme: "colored" });
      break;
    case "warning":
      toast.warning(msg, { theme: "colored" });
      break;
  }
};
