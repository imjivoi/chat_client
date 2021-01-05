interface IRegData {
  nickname: string;
  email: string;
  password: string;
}

let validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let validPassRegex = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;

export const validator = (data: IRegData) => {
  let errors = [];
  if (data.nickname.length < 4) {
    errors.push("Nickname must contain more than 3 symbols");
  }
  if (!validEmailRegex.test(data.email)) {
    errors.push("Email is not valid");
  }
  if (data.password.length < 8) {
    errors.push("Password must contain more than 8 symbols");
  }
  if (!validPassRegex.test(data.password)) {
    errors.push(
      "Password should be stronger and must contain uppercase letter, number and special symbol"
    );
  }

  if (errors.length) return { errors, status: false };

  return { status: true, errors };
};
