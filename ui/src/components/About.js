import React from "react";
import { warningTravelFreak } from "../backend/styles/images";

export default function About() {
  return (
    <div>
      <img
        src={warningTravelFreak}
        alt="Warning: Travel Freak on the way"
        className="mx-auto h-96"
      />
     <br></br>
     <div className="bg-orange-500 p-8">
            <h1 className="text-center text-4xl font-medium text-white ">Sobre Nós</h1>
            <div className="bg-white p-8 rounded-lg">
              <h1 className="text-lg font-medium">Como surgimos?</h1>
                <p className="text-lg">Aqui vai a história da empresa</p>
              <h1 className="text-lg font-medium">Qual o nosso objetivo?</h1>
                <p className="text-lg">Aqui vai a missão da empresa</p>
              <h1 className="text-lg font-medium">Como surgimos?</h1>
                <p className="text-lg">Aqui vai a visão da empresa</p>
                <h2 className="text-lg font-medium">Equipe</h2>
                <ul>
                    <li className="text-lg">Membro 1</li>
                    <li className="text-lg">Membro 2</li>
                    <li className="text-lg">Membro 3</li>
                </ul>
            </div>
        </div>
    </div>
  );
}
