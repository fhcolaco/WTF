import React, { useState, useEffect } from "react";
import { getHotelCategoryById } from "../../shared/hotel_categoryApi";
import Loader from "../../Loader";
import { useParams, useNavigate } from "react-router-dom";

export default function HotelCategoryDetail(props) {
  const [hotelCategory, setHotelCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setHotelCategory({
        _id: "",
        name: "",
        description: "",
      });
    } else {
      getHotelCategoryById(id).then((data) => {
        setHotelCategory(data);
      });
    }
  }, []);

  useEffect(() => {
    if (hotelCategory.length !== 0) {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [hotelCategory]);

  const handleChange = (e) => {
    setHotelCategory({ ...hotelCategory, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid w-full grid-cols-12 gap-6">
          <form
            className="col-start-3 col-end-11"
            onSubmit={(e) => props.submit(hotelCategory, e)}
          >
            <div className="inline-block">
              <h2 className="mb-8 text-4xl font-extrabold">
                {id
                  ? `Editar ${hotelCategory.name}`
                  : "Criar nova Categoria de Hotel"}
              </h2>
            </div>
            <div className="group relative z-0 my-8 w-full">
              <input
                required
                type="text"
                name="name"
                id="name"
                value={hotelCategory.name}
                onChange={handleChange}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                placeholder=" "
              />
              <label
                htmlFor="name"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
              >
                Nome da categoria
              </label>
            </div>
            <div className="group relative z-0 my-8 w-full">
              <textarea
                name="description"
                required
                id="description"
                value={hotelCategory.description}
                onChange={handleChange}
                rows="5"
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                placeholder=" "
              />
              <label
                htmlFor="description"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
              >
                Descrição da categoria
              </label>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Guardar
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
