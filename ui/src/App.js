import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Layout from "./backend/components/Layout";
import Dashboard from "./backend/components/Dashboard";
import { error404 } from "./backend/styles/images";
import "./styles/App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h1 className="text-3xl font-bold">
                  Só estava a testar para ver se funcionava o tailwind :D
                </h1>
                <a href="/Dashboard">
                  <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                    Button
                  </button>
                </a>
              </section>
            }
          />
          <Route path="/Dashboard" element={<Layout />}>
            <Route index path="" element={<Dashboard />} />
            {/* Se todos falharem mostra uma mensagem de erro no dashboard" */}
            <Route exact path="*" element={<img src={error404} alt="404" />} />
          </Route>
          {/*<Route path="*" element={<h1>NOT FOUND</h1>} />*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
