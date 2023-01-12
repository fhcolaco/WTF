import { useState, useEffect, Fragment } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { Transition } from "@headlessui/react";
import { Routes, Route } from "react-router-dom";
import { error404 } from "../styles/images";

export const Layout = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarOpen]);

  return (
    <>
      <TopBar sideBarState={[sidebarOpen, setSidebarOpen]} />
      <Transition
        as={Fragment}
        show={sidebarOpen}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar sidebar={sidebarOpen} />
      </Transition>
      <div className="flex h-screen items-center justify-center ">
        <Routes>
          <Route
            path="/"
            element={
              <div className="h-auto w-2/3 rounded bg-slate-300 p-10">
                <p className="mt-6 mb-4 text-lg font-light leading-relaxed text-neutral-800">
                  Esta é a página principal do dashboard.Aqui vai ser colocado:
                </p>
                <ul className="mt-6 mb-4 list-inside list-disc text-lg font-light leading-relaxed text-neutral-800">
                  <li>uma tabela com as próximas visitas por data crescente</li>
                  <li>
                    quartos disponíveis, os quartos atualmente ocupados, o
                    número de quartos indispoíveis e o número total de hotéis
                  </li>
                  <li>
                    Valor total de vendas com gráfico e dados de total de vendas
                    e valor da comissão(lucro)
                  </li>
                </ul>
              </div>
            }
          />
          <Route path="*" element={<img src={error404} alt="404" />} />
        </Routes>
      </div>
    </>
  );
};
