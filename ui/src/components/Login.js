import React, { useEffect } from "react";
import { login } from "../shared/sessionApi";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [hasError, setHasError] = React.useState(false);
  const [data, setData] = React.useState({
    user: "",
    pass: "",
    toHome: false,
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

  const tstGetUserInfo = (e) => {
    e.preventDefault();
    const check = axios.get("http://localhost:4000/verifyUser", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (check === true) {
      console.log(
        JSON.parse(atob(sessionStorage.getItem("token").split(".")[1]))
      );
    } else {
      console.log("Erro");
    }
  };
  const tstUserAdmin = (e) => {
    e.preventDefault();
    const check = axios.get("http://localhost:4000/verifyUser", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (check === true) {
      console.log(
        JSON.parse(atob(sessionStorage.getItem("token").split(".")[1])).isAdmin
      );
    } else {
      console.log("Erro");
    }
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
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
                {/* <p id="helperUser" classNameName="ml-5 text-sm text-slate-300">
                  Usar o email ou utilizador
                </p> */}
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
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="col-span-1">
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
              </div>
              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-full border border-blue-600 bg-blue-600 px-48 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none active:text-blue-500">
                  Login
                </button>
              </div>
              <hr class="col-span-6 h-px border-0 bg-gray-300" />
              <button
                type="button"
                class=" col-span-6 inline-flex items-center rounded-lg bg-[#f44242] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#f44242]/90"
              >
                <svg
                  class="mr-2 -ml-1 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Login com Google
              </button>
              <button
                type="button"
                class=" col-span-6 inline-flex items-center rounded-lg bg-[#3b5998] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#3b5998]/90"
              >
                <svg
                  class="mr-2 -ml-1 h-4 w-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook-f"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                  ></path>
                </svg>
                Login com Facebook
              </button>
            </form>
          </div>
          <div className="absolute inset-y-0 right-0 m-10 lg:bg-white">
            <button onClick={() => navigate(-1)}>
              <XMarkIcon className="h-6 w-6"></XMarkIcon>
            </button>
          </div>
          {/*Tiago isto serve para verificar o login se está a funcionar. De momento, já envia para a sessão como podes testar. Agora falta só modificar o aspeto*/}
          <div className="absolute bottom-0 right-0 m-10 flex flex-row lg:bg-white">
            <button
              onClick={(e) => tstLogout(e)}
              className="m-10 rounded border-2 bg-red-500"
            >
              <span>
                <XMarkIcon className="h-6 w-6" />
                TESTE LOGOUT
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
          </div>
        </main>
      </div>
    </section>
  );
}
