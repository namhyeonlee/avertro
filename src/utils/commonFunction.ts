import { toast } from "react-toastify";

export const doGetByteLength = (str: string): number => {
  let byteLength = 0;
  for (let i = 0; i < str.length; i++) {
    if (escape(str.charAt(i)).length > 4) {
      byteLength++;
    }
    byteLength++;
  }
  return byteLength;
};

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
