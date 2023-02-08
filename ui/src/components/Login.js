import React, { useEffect } from "react";
import { login } from "../shared/sessionApi";
import { NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [hasError, setHasError] = React.useState(false);
  const [data, setData] = React.useState({
    user: "",
    pass: "",
    toHome: true,
  });

  const tstLogin = (e, data) => {
    e.preventDefault();
    console.log(data);
    login(data).then((res) => {
      console.log(res);
      if (res.success) {
        console.log("Login com sucesso");
        sessionStorage.setItem("token", res.data.token);
        console.log(sessionStorage.getItem("token"));
        if (data.toHome) navigate("/");
        else navigate("/login");
      } else {
        console.log("Erro no login");
        setHasError(true);
      }
    });
  };

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        alert("Utilizador ou password incorretos");
        setHasError(false);
      }, 500);
    }
  }, [hasError]);

  const tstLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    console.log("Logout com sucesso");
    navigate("/login");
  };

  const tstGetUserInfo = async (e) => {
    e.preventDefault();
    console.log("A verificar...");
    const check = axios
      .get("https://wtf-backend.onrender.com/verifyUser", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.success === true) {
          console.log(
            JSON.parse(atob(sessionStorage.getItem("token").split(".")[1]))
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  const tstUserAdmin = (e) => {
    e.preventDefault();
    console.log("A verificar...");
    const check = axios
      .get("https://wtf-backend.onrender.com/verifyUser", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.success === true) {
          if (
            JSON.parse(atob(sessionStorage.getItem("token").split(".")[1]))
              .isAdmin
          )
            console.log("<.>");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Night"
            src="https://img4.goodfon.com/wallpaper/nbig/3/c0/urban-travel-architecture-moscow-city-skyscraper-sunset-sk-1.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-9xl font-bold text-white sm:text-3xl md:text-6xl">
              Bem-vindo ao WTF ✈️
            </h2>

            <p className="mt-4 text-xl leading-relaxed text-white/90">
              Esperamos que a sua estadia seja curta e dispendiosa.
            </p>
          </div>
        </section>

        <main
          aria-label="Main"
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
        >
          <div className="absolute inset-y-0 right-0 m-10 lg:bg-white">
            <button onClick={() => navigate(-1)}>
              <XMarkIcon className="h-6 w-6"></XMarkIcon>
            </button>
          </div>
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <h1 className="mt-20 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Bem-vindo ao WTF ✈️
              </h1>

              <p className="mt-4 mb-20 leading-relaxed text-gray-500">
                Esperamos que a sua estadia seja curta e dispendiosa.
              </p>
            </div>

            <div className="col-span-6">
              <h1 className="text-3xl font-medium">Account Login</h1>
            </div>
            <form
              onSubmit={(e) => tstLogin(e, data)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6">
                <label
                  for="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email / Utilizador
                </label>

                <input
                  type="text"
                  id="Email"
                  name="email"
                  onChange={(e) => setData({ ...data, user: e.target.value })}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="col-span-6">
                <label
                  for="Password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  onChange={(e) => setData({ ...data, pass: e.target.value })}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm  focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              {/* <div className="col-span-1">
                <label
                  for="toHome"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Ir para a Home
                </label>
                <input
                  type="checkbox"
                  id="toHome"
                  name="toHome"
                  onChange={(e) =>
                    setData({ ...data, toHome: e.target.checked })
                  }
                  className="mt-1  w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div> */}
              <div className="col-span-6 flex items-center gap-4">
                <button className="inline-block shrink-0 rounded-full border border-orange-500 bg-orange-500 px-48 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-500 focus:outline-none active:text-orange-400">
                  Login
                </button>
              </div>
              <NavLink>
                <div className="col-span-6 text-center text-sm text-gray-600 hover:cursor-pointer hover:underline">
                  Ainda não tem conta WTF? Clica para criar.
                </div>
              </NavLink>
            </form>
          </div>

          {/*Tiago isto serve para verificar o login se está a funcionar. De momento, já envia para a sessão como podes testar. Agora falta só modificar o aspeto*/}
          {/* <div className="absolute bottom-0 right-0 m-10 flex flex-row lg:bg-white">
            <button
              onClick={(e) => tstLogout(e)}
              className="m-10 rounded border-2 bg-red-500"
            >
              <span>
                <XMarkIcon className="h-6 w-6" />
                TESTE LOGOUT
              </span>
            </button>
            <button
              onClick={(e) => tstUserAdmin(e)}
              className="m-10 rounded border-2 bg-red-500"
            >
              <span>
                <XMarkIcon className="h-6 w-6" />
                TESTE Admin
              </span>
            </button>
            <button
              onClick={(e) => tstGetUserInfo(e)}
              className="m-10 rounded border-2 bg-red-500"
            >
              <span>
                <XMarkIcon className="h-6 w-6" />
                TESTE User
              </span>
            </button>
            <div
              className={`m-10 flex h-24 w-24 items-center justify-center p-10 ${
                sessionStorage.getItem("token") !== null
                  ? "bg-green-400"
                  : "bg-black"
              }`}
            >
              <p className="text-white">
                {sessionStorage.getItem("token") !== null
                  ? "LOGGED IN"
                  : "NOT LOGGED IN"}
              </p>
            </div>
          </div> */}
        </main>
      </div>
    </section>
  );
}
