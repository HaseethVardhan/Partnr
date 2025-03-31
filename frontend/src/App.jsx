import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import UserProtectedWrapper from "./components/UserProtectedWrapper.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/authentication"
          element={
            <Authentication />
          }
        />
      </Routes>
    </>
  );
}

export default App;
