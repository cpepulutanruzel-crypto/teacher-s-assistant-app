
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LOGIN from "./pages/loginForm";
import DASHBOARD from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import CREATECLASS from "./pages/createClass";
import LAYOUT from "./pages/Layout";
import ADDSTUDENT from "./pages/addStudent";
import SectionStudents from "./pages/sectionClass";
import SIGNUP from "./pages/signUp"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LOGIN />} />
        <Route path= "/signup" element={<SIGNUP/>}/>

        <Route
          element={
            <ProtectedRoute>
              <LAYOUT />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<DASHBOARD />} />

          <Route
            path="/section/:id"
            element={<SectionStudents />}
          />

          <Route
            path="/create-class"
            element={<CREATECLASS />}
          />

          <Route
            path="/add-student"
            element={<ADDSTUDENT />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

