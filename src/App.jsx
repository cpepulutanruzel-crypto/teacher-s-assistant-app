import { BrowserRouter, Routes, Route } from "react-router-dom";

import LOGIN from "./pages/loginForm";
import DASHBOARD from "./pages/dashboard";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LOGIN />}
                />

                <Route
                    path="/dashboard"
                    element={<DASHBOARD />}
                />

            </Routes>

        </BrowserRouter>
    );

}

export default App;