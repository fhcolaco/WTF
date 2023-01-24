import React from "react";
import { warningTravelFreak } from "../backend/styles/images";

export default function About() {
  return (
    <div>
      <img
        src={warningTravelFreak}
        alt="Warning: Travel Freak on the way"
        className="h-96"
      />
    </div>
  );
}
