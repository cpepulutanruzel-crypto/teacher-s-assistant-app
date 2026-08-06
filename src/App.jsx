import { BrowserRouter, Routes, Route } from "react-router-dom";

import LOGIN from "./pages/loginForm";
import DASHBOARD from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LOGIN />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DASHBOARD />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
