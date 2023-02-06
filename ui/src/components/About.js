import React from "react";
import { warningTravelFreak } from "../backend/styles/images";

export default function About() {
  return (
    <div>
        <img
          src="https://wtf-backend.onrender.com/images/PatchesWTF.png"
          alt="Warning: Travel Freak on the way"
          className="mx-auto h-80"
        />
        <br></br>

        <h1 className="text-center text-7xl font-medium text-white">Sobre Nós</h1>

        <br></br>

        <div class="space-y-4 ">
        <details
          class="group border-l-4 border-orange-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary class="flex items-center justify-between cursor-pointer">
            <h2 class="text-lg font-medium text-gray-900">
            Como surgimos?
            </h2>

            <span
              class="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p class="mt-4 leading-relaxed text-gray-700 text-justify">
          Nós, WTF, surgimos como resultado de um projeto universitário que tinha como objetivo criar um site de reservas de quartos simples e fácil de usar. 
          A equipa envolvida no projeto, composta por estudantes apaixonados por viagens e novas experiências, decidiu tornar-nos uma plataforma intuitiva e
          acessível para as pessoas encontrarem quartos inusitados em todo o mundo.

          Assim nascemos nós, o WTF, um site de reservas de quartos fácil de usar e intuitivo, que permite às pessoas encontrar e reservar facilmente quartos
          inusitados em todo o mundo. Desde então, temos vindo a crescer em popularidade e somos agora um dos principais sites de reservas de quartos do mundo,
          oferecendo a conveniência de uma plataforma de reservas simples e eficiente.
          </p>
        </details>

        <details
          class="group border-l-4 border-orange-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary class="flex items-center justify-between cursor-pointer">
            <h2 class="text-lg font-medium text-gray-900">
            Qual o nosso objetivo?
            </h2>

            <span
              class="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p class="mt-4 leading-relaxed text-gray-700 text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis
            molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt
            voluptate dicta quo officiis explicabo consequuntur distinctio corporis
            earum similique!
          </p>
        </details>

        <details
          class="group border-l-4 border-orange-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary class="flex items-center justify-between cursor-pointer">
            <h2 class="text-lg font-medium text-gray-900">
            Contatos
            </h2>

            <span
              class="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p class="mt-4 leading-relaxed text-gray-700 text-justify">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis
            molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt
            voluptate dicta quo officiis explicabo consequuntur distinctio corporis
            earum similique!
          </p>
        </details>
    </div>
</div>
  );
}
