import Loader from "../../Loader";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../../shared/userApi";

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState({ name: "", admin: null });

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    if (users.length !== 0) {
      setLoading(false);
    }
  }, [users]);

  function filt(rows) {
    return rows.filter((row) => {
      return (
        row.name.toLowerCase().indexOf(search.name.toLowerCase()) > -1 &&
        (row.is_admin === search.admin || search.admin === null)
      );
    });
  }

  function removeUser(id) {
    deleteUser(id).then((res) => {
      if (res.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      }
    });
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className=" flex items-baseline bg-white pb-4">
            <label htmlFor="table-search" className="sr-only">
              Procurar
            </label>
            <div className="relative mx-2 mt-1 flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search-table "
                name="search-table"
                className="block w-full rounded-md border  border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Procurar"
                value={search.name}
                onChange={(e) =>
                  setSearch((search) => ({ ...search, name: e.target.value }))
                }
              />
            </div>
            <div className="relative mx-2 mt-1 flex-1">
              <select
                required
                value={search.admin}
                name="adminCheck"
                id="adminCheck"
                onChange={(e) =>
                  setSearch((search) => ({
                    ...search,
                    admin:
                      e.target.value === "true"
                        ? true
                        : e.target.value === "false"
                        ? false
                        : null,
                  }))
                }
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
              >
                <option value={null}>Todos</option>
                <option value={true}>Administradores</option>
                <option value={false}>Utilizadores</option>
              </select>
              <label
                htmlFor="adminCheck"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
              >
                Tipo de utilizador
              </label>
            </div>
            <div className="relative mx-2 mt-1 flex flex-1 justify-end">
              <Link to="criar">
                <button className="rounded bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-700">
                  Criar
                </button>
              </Link>
            </div>
          </div>
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3" scope="col">
                  <span className="sr-only">Imagem</span>
                </th>
                <th className="px-6 py-4" scope="col">
                  Nome
                </th>
                <th className="px-6 py-4" scope="col">
                  Utilizador
                </th>
                <th className="px-6 py-4" scope="col">
                  Categoria
                </th>
                <th className="px-6 py-4" scope="col">
                  Contactos
                </th>
                <th className="px-6 py-4" scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filt(users).length > 0 ? (
                filt(users).map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://wtf-backend.onrender.com/images/${user.image}`}
                        alt=""
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.name.split(" ")[1] + ", " + user.name.split(" ")[0]}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">{user.user}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.is_admin ? "Administrador" : "Utilizador"}
                    </td>
                    <td className=" whitespace-nowrap px-6 py-4">
                      <div className="flex items-baseline justify-around space-x-4">
                        <Link
                          to="#"
                          onClick={(e) => {
                            window.location.href = `mailto:${user.email}`;
                            e.preventDefault();
                          }}
                        >
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <EnvelopeIcon className="h-5 w-5" />
                          </button>
                        </Link>
                        <Link
                          to="#"
                          onClick={(e) => {
                            window.location.href = `tel:+351${user.phone}`;
                            e.preventDefault();
                          }}
                          dataP
                        >
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <PhoneIcon className="h-5 w-5" />
                          </button>
                        </Link>
                      </div>
                    </td>
                    <td className=" whitespace-nowrap px-6 py-4">
                      <div className="flex items-baseline justify-around space-x-4">
                        <Link to={`${user._id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                        </Link>
                        <TrashIcon
                          className="h-5 w-5 cursor-pointer text-indigo-600 hover:text-indigo-900"
                          onClick={() => removeUser(user._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key="err">
                  <td
                    className="whitespace-nowrap px-6 py-4 text-center"
                    colSpan="10"
                  >
                    Não existem utilizadores com esses parâmetros...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
