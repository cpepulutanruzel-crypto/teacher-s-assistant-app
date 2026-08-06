import { BrowserRouter, Routes, Route } from "react-router-dom";

import LOGIN from "./pages/loginForm";
import DASHBOARD from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import CREATE from "./pages/createClass";
import LAYOUT from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LOGIN />} />

        <Route
          element={
            <ProtectedRoute>
              <LAYOUT />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<DASHBOARD />} />
          <Route path="/create-class" element={<CREATE />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
