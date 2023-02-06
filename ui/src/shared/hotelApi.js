const url = "https://wtf-backend.onrender.com/hotel";

export const getHotel = () =>
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

export const getHotelById = (id) =>
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

export const createHotel = async (data) =>
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

export const updateHotel = async (id, data) => {
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

export const deleteHotel = (id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
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
