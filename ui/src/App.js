import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <body>
              <h1 className="text-3xl font-bold">
                Só estava a testar para ver se funcionava o tailwind :D
              </h1>
              <a href="/Dashboard">
                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                  Button
                </button>
              </a>
            </body>
          }
        />
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Se todos falharem ele volta para o "home" */}
        <Route path="*" element={redirect("/")} />
      </Routes>
    </Router>
  );
}

export default App;
