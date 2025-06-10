import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profession, setProfession] = useState("");
  const [about, setAbout] = useState("");

  const [workArray, setWorkArray] = useState([]);
  const [projectsArray, setProjectsArray] = useState([]);

  const [links, setLinks] = useState({
    linkedInlink: "",
    xlink: "",
    portfoliolink: "",
  });

  const handleAddWork = () => {
    setWorkArray([
      ...workArray,
      { company: "", role: "", from: "", to: "", experience: "" },
    ]);
  };

  const handleRemoveWork = (index) => {
    const updated = [...workArray];
    updated.splice(index, 1);
    setWorkArray(updated);
  };

  const handleAddProject = () => {
    setProjectsArray([...projectsArray, { title: "", details: "" }]);
  };

  const handleRemoveProject = (index) => {
    const updated = [...projectsArray];
    updated.splice(index, 1);
    setProjectsArray(updated);
  };

  const handleSave = async () => {
    setError1(null);
    setLoading(true);

    // Validate fields
    if (!firstname.trim()) {
      setError1("First name is required.");
      setLoading(false);
      return;
    }
    if (firstname.includes(" ")) {
      setError1("First name cannot contain spaces.");
      setLoading(false);
      return;
    }
    if (lastname.includes(" ")) {
      setError1("Last name cannot contain spaces.");
      setLoading(false);
      return;
    }
    if (!lastname.trim()) {
      setError1("Last name is required.");
      setLoading(false);
      return;
    }
    if (!about.trim()) {
      setError1("About section cannot be empty.");
      setLoading(false);
      return;
    }
    if(!profession.trim()){
        setError1("Profession cannot be empty.");
        setLoading(false);
        return;
    }
    for (let i = 0; i < workArray.length; i++) {
      const w = workArray[i];
      if (
        !w.company.trim() ||
        !w.role.trim() ||
        !w.from ||
        !w.to ||
        !w.experience.trim()
      ) {
        setError(`All fields are required in Work Experience #${i + 1}.`);
        setLoading(false);
        return;
      }
      if (new Date(w.from) > new Date(w.to)) {
        setError1(
          `'From' date cannot be after 'To' date in Work Experience #${i + 1}.`
        );
        setLoading(false);
        return;
      }
    }
    for (let i = 0; i < projectsArray.length; i++) {
      const p = projectsArray[i];
      if (!p.title.trim() || !p.details.trim()) {
        setError1(`All fields are required in Project #${i + 1}.`);
        setLoading(false);
        return;
      }
    }
    setLoading(true)
    const userData = {
        firstname,
        lastname,
        profession,
        about,
        workArray,
        projectsArray,
        links
    }

    const update = async () => {
        try {
            const response = await axios.post( `${import.meta.env.VITE_BASE_URL}/user/update-all-details`,
          userData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          if(response.status === 200){
            navigate('/profile');
            setLoading(false);
          }
        } catch (error) {
            setError(error);
            setLoading(false);
            console.log(error);
        }
    }

    update();
  
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/fetch-self-details`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          // Helper function to format date to dd-mm-yyyy
          const formatDate = (dateStr) => {
            if (!dateStr) return "";
            const date = new Date(dateStr);
            if (isNaN(date)) return dateStr;
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
          };

          setAbout(response.data.data.user.about);
          setFirstname(response.data.data.user.fullname.split(" ")[0]);
          setLastname(response.data.data.user.fullname.split(" ")[1]);
          setProfession(response.data.data.user.profession);
          setWorkArray(response.data.data.user.workArray);
          setProjectsArray(response.data.data.user.projectsArray);
          setLinks(response.data.data.user.links);
          setError(null);
        }
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error("Error fetching user data:", err);
        setLoading(false);
      }
    };
    fetchData();

    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col p-5 bg-[#1a1a1a]  text-white gap-6">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-screen flex items-center backdrop-blur-3xl justify-center z-50">
          <Trefoil
            size="40"
            stroke="4"
            strokeLength="0.15"
            bgOpacity="0.3"
            speed="1.4"
            color="#8b5cf6"
          />
        </div>
      )}
      {error !== null && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 px-10 ">
          <p className="text-[#aaaaaa] font-inter font-[500] text-lg">
            {error}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <img
          onClick={() => navigate(-1)}
          className="h-5 w-6 object-contain"
          src="https://res.cloudinary.com/dbzcsfi3e/image/upload/v1748781336/Vector_5_labewm.png"
        />
        <h1 className="text-2xl font-[500] font-poppins">Edit Profile</h1>
        <button
          onClick={handleSave}
          className="bg-[#8b5cf6] px-4 py-2 rounded-lg font-semibold font-inter"
        >
          Save
        </button>
      </div>

      {error1 !== null && (
        <div className="w-full flex flex-row items-center justify-center font-inter text-[#ff857f] text-sm font-[400]">
            {error1}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <input
          className="p-2 bg-[#333333] rounded font-inter "
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          className="p-2 bg-[#333333] rounded font-inter "
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          className="p-2 bg-[#333333] rounded font-inter "
          placeholder="Profession"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
        />
        <div>
        <textarea
          className="p-2 bg-[#333333] rounded font-inter w-full"
          placeholder="About"
          value={about}
          maxLength={500}
          onChange={(e) => setAbout(e.target.value)}
          />
          <p className="flex w-full text-[#aaaaaa] text-xs font-inter font-[400] tracking-[0.5px] px-2 justify-end">
            {about?.length || 0}/500
          </p>
          </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 font-inter">
          Work Experience
        </h2>
        {workArray.map((work, i) => (
          <div
            key={i}
            className="bg-[#2a2a2a] p-3 rounded mb-2 flex flex-col gap-2 font-inter"
          >
            <input
              className="p-2 bg-[#333] rounded"
              placeholder="Company"
              value={work.company}
              onChange={(e) => {
                const updated = [...workArray];
                updated[i].company = e.target.value;
                setWorkArray(updated);
              }}
            />
            <input
              className="p-2 bg-[#333] rounded"
              placeholder="Role"
              value={work.role}
              onChange={(e) => {
                const updated = [...workArray];
                updated[i].role = e.target.value;
                setWorkArray(updated);
              }}
            />
            <input
              className="p-2 bg-[#333] rounded"
              placeholder="From"
              type="date"
              value={work.from.slice(0, 10)}
              onChange={(e) => {
                const updated = [...workArray];
                updated[i].from = e.target.value;
                setWorkArray(updated);
              }}
            />
            <input
              className="p-2 bg-[#333] rounded"
              placeholder="To"
              type="date"
              value={work.to.slice(0, 10)}
              onChange={(e) => {
                const updated = [...workArray];
                updated[i].to = e.target.value;
                setWorkArray(updated);
              }}
            />
            <textarea
              className="p-2 bg-[#333] rounded"
              placeholder="Experience Details"
              value={work.experience}
              maxLength={200}
              onChange={(e) => {
                const updated = [...workArray];
                updated[i].experience = e.target.value;
                setWorkArray(updated);
              }}
            />
            <p className="flex w-full text-[#aaaaaa] text-xs font-inter font-[400] tracking-[0.5px] px-2 justify-end">
            {work.experience?.length || 0}/200
          </p>
            <button
              onClick={() => handleRemoveWork(i)}
              className="text-red-400 text-left"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleAddWork}
          className="text-[#8b5cf6] mt-2 font-inter"
        >
          + Add Work Experience
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 font-inter">Projects</h2>
        {projectsArray.map((proj, i) => (
          <div
            key={i}
            className="bg-[#2a2a2a] p-3 rounded mb-2 flex flex-col gap-2 font-inter"
          >
            <input
              className="p-2 bg-[#333] rounded"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => {
                const updated = [...projectsArray];
                updated[i].title = e.target.value;
                setProjectsArray(updated);
              }}
            />
            <div>

            <textarea
              className="p-2 bg-[#333] rounded w-full"
              placeholder="Project Details"
              value={proj.details}
              maxLength={400}
              onChange={(e) => {
                  const updated = [...projectsArray];
                  updated[i].details = e.target.value;
                  setProjectsArray(updated);
                }}
                />
                <p className="flex w-full text-[#aaaaaa] text-xs font-inter font-[400] tracking-[0.5px] px-2 justify-end">
            {proj.details?.length || 0}/400
          </p>
                </div>
            <button
              onClick={() => handleRemoveProject(i)}
              className="text-red-400 text-left"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={handleAddProject} className="text-[#8b5cf6] mt-2">
          + Add Project
        </button>
      </div>

      <div className="flex flex-col gap-3 font-inter">
        <h2 className="text-xl font-semibold">Links</h2>
        <input
          className="p-2 bg-[#333] rounded font-inter"
          placeholder="LinkedIn"
          value={links?.linkedInlink || ""}
          onChange={(e) => setLinks({ ...links, linkedInlink: e.target.value })}
        />
        <input
          className="p-2 bg-[#333] rounded font-inter"
          placeholder="X/Twitter"
          value={links?.xlink || ""}
          onChange={(e) => setLinks({ ...links, xlink: e.target.value })}
        />
        <input
          className="p-2 bg-[#333] rounded font-inter"
          placeholder="Portfolio"
          value={links?.portfoliolink || ""}
          onChange={(e) =>
            setLinks({ ...links, portfoliolink: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default EditProfilePage;
