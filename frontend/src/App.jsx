import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import UserProtectedWrapper from "./components/UserProtectedWrapper.jsx";
import UpdateUsername from "./pages/UpdateUsername.jsx";
import UpdateLinks from "./pages/UpdateLinks.jsx";

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
        <Route 
          path="/update-username"
          element={
            <UpdateUsername />
          }
        />
        <Route 
          path="/update-links"
          element={
            <UpdateLinks />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
