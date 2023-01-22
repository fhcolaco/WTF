import { forwardRef } from "react";
import { logo } from "../styles/images";
import { Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  BuildingOffice2Icon,
  UserIcon,
  BanknotesIcon,
  UserGroupIcon,
  BriefcaseIcon,
  Cog8ToothIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export const sideBarItems = [
  { name: "Dashboard", cat: [""] },
  {
    name: "Hotel",
    cat: ["Criar", "Ver Todos", "Categoria"],
  },
  {
    name: "Quarto",
    cat: ["Criar", "Ver Todos", "Categoria"],
  },
  { name: "Reserva", cat: [""] },
  {
    name: "Utilizador",
    cat: ["Criar", "Ver Todos"],
  },
  {
    name: "Servico",
    cat: ["Criar", "Ver Todos"],
  },
  { name: "Configuracao", cat: [""] },
];

export const SideBar = forwardRef((props, ref) => {
  const sideBarItemsIcons = [
    <HomeIcon key={"dashboard"} className="h-5 w-5" />,
    <BuildingOffice2Icon key={"hotel"} className="h-5 w-5" />,
    <UserIcon key="quarto" className="h-5 w-5 " />,
    <BanknotesIcon key="reserva" className="h-5 w-5" />,
    <UserGroupIcon key="utilizador" className="h-5 w-5" />,
    <BriefcaseIcon key="servico" className="h-5 w-5" />,
    <Cog8ToothIcon key="config" className="h-5 w-5" />,
  ];
  const noth = () => {};
  const router = useNavigate();
  return (
    <div
      ref={ref}
      className="absolute inset-y-0 left-0 z-10 w-56 bg-white shadow-sm"
    >
      <div className="mt-6 mb-14 flex justify-center">
        <img src={logo} alt="WTF_logo" className="h-auto w-32 " />
      </div>
      <div className="flex flex-col">
        {sideBarItems.map((item, index) => {
          return (
            <>
              <Menu>
                <Menu.Button
                  onClick={() => {
                    index === 0
                      ? router("/dashboard")
                      : item.cat.length == 1
                      ? router(
                          `${item.name.toLowerCase()}}`.replace(
                            /[^A-Za-z0-9/]/g,
                            ""
                          )
                        )
                      : void 0;
                  }}
                  className="relative mx-5 mb-3 inline-flex cursor-pointer items-center rounded py-3 pl-6 text-center text-orange-500 transition-colors hover:bg-orange-100"
                >
                  <div className="mr-2">{sideBarItemsIcons[index]}</div>
                  <div className="flex-1 grow text-left">
                    <p>{item.name}</p>
                  </div>
                  {item.cat.length !== 1 ? (
                    <ChevronDownIcon
                      className="absolute right-4 ml-2 -mr-1 h-5 w-5 flex-1 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  ) : null}
                </Menu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform scale-95"
                  enterTo="transform scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform scale-100"
                  leaveTo="transform scale-95"
                >
                  {item.cat.length !== 1 ? (
                    <Menu.Items className="my-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {item.cat.map((subItem, index2) => (
                          <Menu.Item key={subItem}>
                            {({ active }) => (
                              <div
                                onClick={() => {
                                  router(
                                    `${item.name.toLowerCase()}/${
                                      subItem === "Ver Todos"
                                        ? ""
                                        : subItem.toLowerCase()
                                    }`.replace(/[^A-Za-z0-9/]/g, "")
                                  );
                                }}
                                className={
                                  "mx-5 mb-3 cursor-pointer items-center rounded py-3 text-center text-orange-500 transition-colors hover:bg-orange-100"
                                }
                              >
                                {subItem}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  ) : null}
                </Transition>
              </Menu>
            </>
          );
        })}
      </div>
    </div>
  );
});
