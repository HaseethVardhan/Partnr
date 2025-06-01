import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import UserProtectedWrapper from "./components/UserProtectedWrapper.jsx";
import UpdateUsername from "./pages/UpdateUsername.jsx";
import UpdateLinks from "./pages/UpdateLinks.jsx";
import UpdateBio from "./pages/UpdateBio.jsx";
import UpdateSkills from "./pages/UpdateSkills.jsx";
import UpdateProfession from "./pages/UpdateProfession.jsx";
import UpdateWork from "./pages/UpdateWork.jsx";
import UpdateProject from "./pages/UpdateProject.jsx";
import UpdatePicture from "./pages/UpdatePicture.jsx";
import UpdatePreferences from "./pages/UpdatePreferences.jsx";
import UpdateName from "./pages/UpdateName.jsx";
import SelfProfilePage from "./pages/SelfProfilePage.jsx";

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
        <Route 
          path="/update-bio"
          element={
            <UpdateBio />
          }
        />
        <Route 
          path="/update-skills"
          element={
            <UpdateSkills />
          }
        />
        <Route 
          path="/update-profession"
          element={
            <UpdateProfession />
          }
        />
        <Route 
          path="/update-name"
          element={
            <UpdateName />
          }
        />
        <Route 
          path="/update-work"
          element={
            <UpdateWork />
          }
        />
        <Route 
          path="/update-project"
          element={
            <UpdateProject />
          }
        />
        <Route 
          path="/update-picture"
          element={
            <UpdatePicture />
          }
        />
        <Route 
          path="/update-preferences"
          element={
            <UpdatePreferences />
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedWrapper>
              <SelfProfilePage />
            </UserProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
