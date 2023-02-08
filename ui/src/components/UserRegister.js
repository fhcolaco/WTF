import React, { useEffect, useState, useParams } from "react";
import { login } from "../shared/sessionApi";
import { NavLink, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import locationList from "../shared/locationList";
import { getUserById, getUsers } from "../shared/userApi";
import { check } from "prettier";
import { createUser, updateUser } from "../shared/userApi";

export default function UserRegister() {
  const navigate = useNavigate();
  const [hasError, setHasError] = React.useState(false);
  const [user, setUser] = useState({});
  const [state, setState] = useState("");
  const [files, setFiles] = useState([]);
  const [session, setSession] = useState();
  const [data, setData] = React.useState({
    user: "",
    pass: "",
    toHome: true,
  });

  useEffect(() => {
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
          setSession(
            JSON.parse(atob(sessionStorage.getItem("token").split(".")[1])).id
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    getUserById(session).then((res) => setUser(res));
  }, [session]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (!session) {
      setUser({
        _id: "",
        user: "",
        pass: "",
        is_admin: false,
        name: "",
        email: "",
        location: "",
        address: "",
        postal_code: "",
        phone: null,
        fiscal_number: null,
        credit_card: null,
        image: "default.svg",
      });
    } else {
      getUserById(user._id).then((data) => {
        setUser(data);
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const send = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", `${user.first_name} ${user.last_name}`);
    data.append("_id", user._id);
    data.append("user", user.user);
    data.append("pass", user.pass);
    data.append("is_admin", user.is_admin);
    data.append("email", user.email);
    data.append("location", user.location);
    data.append("address", user.address);
    data.append("postal_code", user.postal_code);
    data.append("phone", user.phone);
    data.append("fiscal_number", user.fiscal_number);
    data.append("credit_card", user.credit_card);
    data.append("image", user.image);
    data.append("files", files);

    for (let pair of data.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    onSubmitUser(data, event);
  };

  const onSubmitUser = (data, event) => {
    event.preventDefault();
    console.log("inicio");
    let id = data.get("_id");
    // for (const [key, value] of data.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    if (id !== "") {
      updateUser(id, data)
        .then((teste) => {
          getUsers().then((res) => {
            setUser(res);
          });
        })
        .catch((err) => {
          console.log("ERRO", err);
        });
    } else {
      createUser(data).then((data) => {
        console.log(data);
        setUser([...user, data]);
      });
    }
    navigate("/login");
  };

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
                <form
                  onSubmit={(e) => send(e)}
                  class="mt-8 grid grid-cols-6 gap-6"
                >
                  <div class="col-span-6 mt-9 -mb-5 text-2xl">Avatar</div>
                  <hr class="col-span-6 mb-3 h-px border-0 bg-black" />

                  <div className="col-span-6 flex flex-row items-end">
                    <img
                      className="h-24 w-24 rounded-full border border-gray-200 bg-gray-100"
                      src={`https://wtf-backend.onrender.com/images/${user.image}`}
                    />
                    <div className="group relative z-0 ml-8 w-full">
                      <input
                        name="images"
                        id="images"
                        type="file"
                        onChange={(e) => {
                          setFiles(e.target.files[0]);
                        }}
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
                      for="first_name"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Primeiro Nome
                    </label>
                    {console.log(user)}
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={user.first_name}
                      onChange={handleChange}
                      placeholder="Primeiro Nome"
                      required
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
                      id="last_name"
                      name="last_name"
                      value={user.last_name}
                      onChange={handleChange}
                      placeholder="Último Nome"
                      required
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
                      id="phone"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      placeholder="XXXXXXXXX"
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
                      type="number"
                      id="fiscal_number"
                      name="fiscal_number"
                      value={user.fiscal_number}
                      onChange={handleChange}
                      placeholder="XXXXXXXXX"
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
                      type="text"
                      name="address"
                      id="address"
                      value={user.address}
                      onChange={handleChange}
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Rua, Nº, Localidade"
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
                      value={user.postal_code}
                      onChange={handleChange}
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      placeholder="XXXX-XXX"
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
                      name="distrito"
                      id="distrito"
                      defaultValue={
                        locationList.find((element) =>
                          element.concelho.includes(user.location)
                        )?.distrito || "default"
                      }
                      onChange={(event) => setState(event.target.value)}
                    >
                      <option value="default" disabled>
                        Distrito
                      </option>
                      {locationList.map((distrito, index) => (
                        <option
                          value={distrito.distrito}
                          key={(distrito, index)}
                        >
                          {distrito.distrito}
                        </option>
                      ))}
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
                      name="location"
                      id="location"
                      defaultValue={user.location || "default"}
                      onChange={handleChange}
                    >
                      <option value="default" disabled>
                        Concelho
                      </option>
                      {locationList.map((location) => {
                        if (location.distrito === state) {
                          return location.concelho.map((concelho, index) => (
                            <option value={concelho} key={(concelho, index)}>
                              {concelho}
                            </option>
                          ));
                        }
                      })}
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
                      value={user.email}
                      onChange={handleChange}
                      required
                      placeholder="exemplo@wtf.dev"
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
                      id="user"
                      name="user"
                      value={user.user}
                      onChange={handleChange}
                      placeholder="Mínimo 3 caracteres"
                      required
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
                      name="pass"
                      onChange={handleChange}
                      placeholder="Mínimo 8 caracteres"
                      required
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
                      placeholder="Mínimo 8 caracteres"
                      required
                      class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>

                  <div class="col-span-6">
                    <p class="text-sm text-gray-500">
                      Ao criar uma conta, você concorda com os nossos{" "}
                      <a
                        href="https://ajuda.sapo.pt/condicoes-de-utilizacao-portal-sapo-60556"
                        class="text-gray-700 underline"
                      >
                        termos e condições
                      </a>
                      .
                    </p>
                  </div>
                  <div class="col-span-6 mb-28 sm:flex sm:items-center sm:gap-4">
                    <button
                      type="submit"
                      class="inline-block shrink-0 rounded-md border border-orange-500 bg-orange-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-orange-500 focus:outline-none focus:ring active:text-orange-500"
                    >
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
