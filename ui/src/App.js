import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles/App.css";

import theWay from "./backend/theWay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h1 className="text-3xl font-bold">
                Só estava a testar para ver se funcionava o tailwind :D
              </h1>
              <a href="/dashboard">
                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                  Dashboard
                </button>
              </a>
            </section>
          }
        />
        {theWay.map((item) => {
          return (
            <Route key={item.path} path={item.path} element={item.element}>
              {item.children?.map((child) => {
                return (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={child.element}
                  />
                );
              })}
            </Route>
          );
        })}
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
