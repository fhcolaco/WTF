const url = "https://wtf-backend.onrender.com/services";

export const getServices = async () =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const getServicesById = async (id) =>
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

export const createServices = async (data) =>
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const updateServices = async (id, data) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const deleteServices = async (id) =>
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
