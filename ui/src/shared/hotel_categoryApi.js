const url = "https://wtf-backend.onrender.com/hotel_category";

export const getHotelCategory = async () =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      Accept: "application/json",
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const getHotelCategoryById = async (id) =>
  fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const createHotelCategory = async (data) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const updateHotelCategory = async (id, data) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });

export const deleteHotelCategory = async (id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return res.json();
  });
