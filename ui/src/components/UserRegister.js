import React, { useEffect } from "react";
import { login } from "../shared/sessionApi";
import { NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function UserRegister() {
  const navigate = useNavigate();
  const [hasError, setHasError] = React.useState(false);
  const [data, setData] = React.useState({
    user: "",
    pass: "",
    toHome: true,
  });

  // const tstLogin = (e, data) => {
  //   e.preventDefault();
  //   console.log(data);
  //   login(data).then((res) => {
  //     console.log(res);
  //     if (res.success) {
  //       console.log("Login com sucesso");
  //       sessionStorage.setItem("token", res.data.token);
  //       console.log(sessionStorage.getItem("token"));
  //       if (data.toHome) navigate("/");
  //       else navigate("/login");
  //     } else {
  //       console.log("Erro no login");
  //       setHasError(true);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (hasError) {
  //     setTimeout(() => {
  //       alert("Utilizador ou password incorretos");
  //       setHasError(false);
  //     }, 500);
  //   }
  // }, [hasError]);

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="fixed flex h-32 w-6/12 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6 ">
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
            <div className="absolute right-0 top-28 col-span-6 mr-36 justify-end">
              <div className="relative -mt-16 block lg:hidden">
                <h1 className="mt-20 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Bem-vindo ao WTF ✈️
                </h1>

                <p className="mt-4 mb-20 leading-relaxed text-gray-500">
                  Esperamos que a sua estadia seja curta e dispendiosa.
                </p>
              </div>

              <div>
                <div className="">
                  <h1 className="text-3xl font-medium">Criar Conta</h1>
                </div>
                <form action="#" class="mt-8 grid grid-cols-6 gap-6">
                  <div class="col-span-6 mt-9 -mb-5 text-2xl">Avatar</div>
                  <hr class="col-span-6 mb-3 h-px border-0 bg-black" />

                  <div className="col-span-6 flex flex-row items-end">
                    <img className="aspect-square h-24 w-24" />
                    <div className="group relative z-0 ml-8 w-full">
                      <input
                        name="images"
                        id="images"
                        type="file"
                        multiple
                        // onChange={(e) => {
                        //   setFiles(e.target.files);
                        // }}
                        accept="image/*"
                        className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                      />
                      <label
                        htmlFor="images"
                        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                      >
                        Imagem
                      </label>
                    </div>
                  </div>

                  <div class="col-span-6 mt-9 -mb-5 text-2xl">
                    Dados Utilizador
                  </div>
                  <hr class="col-span-6 mb-3 h-px border-0 bg-black" />

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="FirstName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Primeiro Nome
                    </label>

                    <input
                      type="text"
                      id="FirstName"
                      name="first_name"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="LastName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Último Nome
                    </label>

                    <input
                      type="text"
                      id="LastName"
                      name="last_name"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="LastName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Telemóvel
                    </label>

                    <input
                      type="number"
                      id="LastName"
                      name="last_name"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="LastName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      NIF
                    </label>

                    <input
                      type="text"
                      id="LastName"
                      name="last_name"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6 mt-9 -mb-5 text-2xl">Morada</div>
                  <hr class="col-span-6 mb-3 h-px border-0 bg-black" />

                  <div class="col-span-6 sm:col-span-4">
                    <label
                      for="LastName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Endereço
                    </label>

                    <input
                      // value={hotel.postal_code}
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      required
                      placeholder=" "
                      // onChange={handleChange}
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-2">
                    <label
                      for="LastName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Código Postal
                    </label>

                    <input
                      // value={hotel.postal_code}
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      required
                      placeholder=" "
                      // onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="distrito"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Distrito
                    </label>
                    <select
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      required
                      name="distrito"
                      id="distrito"
                      // defaultValue={
                      //   locationList.find((element) =>
                      //     element.concelho.includes(hotel.location)
                      //   )?.distrito || "default"
                      // }
                      // onChange={(event) => setState(event.target.value)}
                    >
                      <option value="default" disabled>
                        Distrito
                      </option>
                      {/* {locationList.map((distrito, index) => (
                    <option value={distrito.distrito} key={(distrito, index)}>
                      {distrito.distrito}
                    </option>
                  ))} */}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Concelho
                    </label>
                    <select
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      required
                      name="location"
                      id="location"
                      // defaultValue={hotel.location || "default"}
                      // onChange={handleChange}
                    >
                      <option value="default" disabled>
                        Concelho
                      </option>
                      {/* {locationList.map((location) => {
                    if (location.distrito === state) {
                      return location.concelho.map((concelho, index) => (
                        <option value={concelho} key={(concelho, index)}>
                          {concelho}
                        </option>
                      ));
                    }
                  })} */}
                    </select>
                  </div>

                  <div class="col-span-6 mt-9 -mb-5 text-2xl">
                    Dados de Acesso
                  </div>
                  <hr class="col-span-6 mb-3 h-px border-0 bg-black" />

                  <div class="col-span-4">
                    <label
                      for="Email"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>

                    <input
                      type="email"
                      id="Email"
                      name="email"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-2">
                    <label
                      for="FirstName"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Nome de Utilizador
                    </label>

                    <input
                      type="text"
                      id="FirstName"
                      name="first_name"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="Password"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      id="Password"
                      name="password"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="PasswordConfirmation"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Password Confirmation
                    </label>

                    <input
                      type="password"
                      id="PasswordConfirmation"
                      name="password_confirmation"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6">
                    <p class="text-sm text-gray-500">
                      Ao criar uma conta, você concorda com os nossos{" "}
                      <a href="#" class="text-gray-700 underline">
                        termos e condições
                      </a>
                      .
                    </p>
                  </div>

                  <div class="col-span-6 mb-28 sm:flex sm:items-center sm:gap-4">
                    <button class="inline-block shrink-0 rounded-md border border-orange-500 bg-orange-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-500 focus:outline-none focus:ring active:text-orange-500">
                      Create an account
                    </button>

                    <p class="mt-4 flex flex-row text-sm text-gray-500 sm:mt-0">
                      Already have an account?
                      <NavLink to="/login">
                        <div className="text-black underline">Log in</div>
                      </NavLink>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
