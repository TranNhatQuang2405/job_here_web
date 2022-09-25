export const ValidateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const ValidateUTF8Name = (text) => {
  var regex = /[\s\p{Alpha}\p{M}-]+/gu;
  const check = regex.exec(text);
  if (check && check[0] === text) return true;
  else return false;
};

export const ValidatePassword = (password) => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  return regex.test(password);
};
