const url = "https://wtf-backend.onrender.com/";

export const login = async (data) =>
  await fetch(`${url}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return res.json();
  });

export const register = async (data) =>
  await fetch(`${url}register`, {
    method: "POST",
    body: data,
  }).then((res) => {
    if (res.status !== 200) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    return sessionStorage.setItem("token", res);
  });

export const logout = () => {
  sessionStorage.clear();
};
