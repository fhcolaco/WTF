const url = "https://wtf-backend.onrender.com/room";

const getRoom = async () =>
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

const getRoomById = async (id) =>
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

const createRoom = async (data) =>
  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    body: data,
  }).then((res) => {
    if (res.status !== 200) {
      return res.text().then((text) => {
        return text;
      });
    }
    return res.json();
  });

const updateRoom = async (id, data) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    body: data,
  }).then((res) => {
    if (res.status !== 200) {
      return res.text().then((text) => {
        return text;
      });
    }
    return res.json();
  });

const deleteRoom = async (id) =>
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

export { getRoom, getRoomById, createRoom, updateRoom, deleteRoom };
