
import { ElMessage } from 'element-plus';
const options = {
  showClose:true
};


export default {
  error(message: string) {
    return ElMessage.error(message);
  },
  success(message: string) {
    return ElMessage.success(message);
  },
  default(message: string) {
    return ElMessage.info(message);
  },
  warning(message: string) {
    return ElMessage.warning(message);
  },
};
