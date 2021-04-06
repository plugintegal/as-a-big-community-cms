export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { "x-access-token": "Bearer " + user.token };
  } else {
    return {};
  }
};

export const FormData = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return {
      "x-access-token": "Bearer " + user.token,
      "content-type": "multipart/form-data"
    };
  } else {
    return {};
  }
};
