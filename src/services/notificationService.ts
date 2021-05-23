import {createToastInterface} from "vue-toastification";

const options = {
  timeout: 2000
};

const toast = createToastInterface(options)

export default {
  error(message: string) {
    return toast.error(message);
  },
  success(message: string) {
    return toast.success(message);
  },
  default(message: string) {
    return toast.info(message);
  },
  warning(message: string) {
    return toast.warning(message);
  },
};
