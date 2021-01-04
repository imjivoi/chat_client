import Vue from "vue";

import { useToast } from "vue-toastification";
const toast = useToast();
const options = {
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};
export default {
  error(text: string) {
    return toast.error(text, options);
  },
  success(text: string) {
    return toast.success(text, options);
  },
  default(text: string) {
    return toast.info(text, options);
  },
  warning(text: string) {
    return toast.warning(text, options);
  },
};
