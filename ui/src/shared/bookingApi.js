const url = "https://wtf-backend.onrender.com/booking";

export const getBookings = () =>
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

export const getBookingById = (id) =>
  fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return response.json();
  });

export const createBooking = (data) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return response.json();
  });

export const updateBooking = (id, data) =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return response.json();
  });

export const deleteBooking = (id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Something went wrong on api server!");
    }
    return response.json();
  });
