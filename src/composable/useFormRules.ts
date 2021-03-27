import { ref } from "vue";

export default function validation() {
  const rules = {
    username: [
      {
        required: true,
        message: "Please username",
        trigger: "blur",
      },
      { min: 4, message: "Length should be 4 or more", trigger: "blur" },
    ],
    email: [
      {
        required: true,
        message: "Please input email address",
        trigger: "blur",
      },
      {
        type: "email",
        message: "Please input correct email address",
        trigger: ["blur", "change"],
      },
    ],
    password: [
      {
        required: true,
        message: "Please input valid password",
        trigger: "blur",
      },
      { min: 6, message: "Length should be 6 or more", trigger: "blur" },
    ],
  };

  const formBlock = ref();
  async function validation() {
    return await formBlock.value.validate();
  }

  return {
    rules,
    formBlock,
    validation,
  };
}
