const url = "https://wtf-backend.onrender.com/user";

export const getUsers = () =>
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const getUserById = (id) =>
  fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const createUser = async (data) =>
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const updateUser = async (id, data) => {
  await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: data,
  }).then((res) => {
    if (res.status !== 200) {
      return res.text().then((text) => {
        throw new Error(text);
      });
    }
    console.log(3);
    return res.json();
  });
};

export const deleteUser = (id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });
