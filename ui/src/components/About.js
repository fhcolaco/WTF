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

          <p class="mx-4 leading-relaxed text-gray-700 text-justify">
          O WTF, surgiu como resultado de um projeto universitário que tinha como objetivo criar um site de reservas de quartos simples e fácil de usar. 
          A equipa envolvida no projeto, composta por estudantes apaixonados por viagens e novas experiências, decidiu tornar-nos uma plataforma intuitiva e
          acessível para as pessoas encontrarem quartos inusitados em todo o mundo.

          Desde então, temos vindo a crescer em popularidade e somos agora um dos principais sites de reservas de quartos do mundo,
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

          <p class="mx-4 leading-relaxed text-gray-700 text-justify">
            O nosso objetivo é oferecer ao nosso público um site de reservas de quartos fácil de usar e intuitivo, 
            que permite às pessoas encontrar e reservar facilmente quartos inusitados em todo o mundo aos melhores preços.
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

          <p class="mx-4 leading-relaxed text-gray-700 text-justify">
          <div class="flex flex-col text-lg font-medium">
          <div class="flex items-center mb-2">
            <span class="inline-block w-6 h-6 mr-2">
              <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="phone-icon">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </span>
            <span class="mr-2">+351 232 456 789</span>
            <p class="mx-1 leading-relaxed text-gray-700 text-justify">|  (Atendimento 24h)</p>
          </div>
          <div class="flex items-center mb-2">
            <span class="inline-block w-6 h-6 mr-2">
              <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" class="envelope-icon">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </span>
            <span class="mr-2">wtf@gmail.com</span>
          </div>
          <div class="flex items-center">
            <span class="inline-block w-6 h-6 mr-2">
            <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor" className="map-icon">
              <path d="M3 10l6-4.8a1 1 0 011.44 0L13 10m-2-4a2 2 0 10 4 0 2 2 0 00-4 0zm7 4a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            </span>
            <span>Av. Cor. José Maria Vale de Andrade <br></br> Campus Politécnico Santa Maria  <br></br> 3504-510 Viseu</span>
          </div>
        </div>
        </p>
        </details>
    </div>
</div>
  );
}
