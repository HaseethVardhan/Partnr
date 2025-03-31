import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import UserProtectedWrapper from "./components/UserProtectedWrapper.jsx";

function App() {
  return (
    <div className='bg-[#1a1a1a] h-screen w-screen'>
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
    </div>
  );
}

export default App;
