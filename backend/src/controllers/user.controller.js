import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { Project } from "../models/project.model.js";
import { Work } from "../models/work.model.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";

const isUserNameAvailable = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Only letters a-z, numbers 1-9 and underscores are allowed."
        )
      );
  }

  const { username } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { available: false, msg: "Username already exists" },
          "Username already exists"
        )
      );
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { available: true, msg: "Username is available" },
          "Username is available"
        )
      );
  }
});

const isMailExists = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Enter valid email address."
        )
      );
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { exists: true, msg: "Email already exists" },
          "Email already exists. Please login or use another email."
        )
      );
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { exists: false, msg: "Email is available" },
          "Email is available"
        )
      );
  }
});

const getProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user, message: "User profile fetched successfully" },
        "User profile fetched successfully"
      )
    );
});

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }

  const { email, password, username, authtype, firstname, lastname } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { exists: true, msg: "Email already exists" },
          "Email already exists. Please login or use another email."
        )
      );
  }

  if(authtype === "google") {
    const newUser = await User.create({
      email,
      username,
      fullname: {
        firstname,
        lastname,
      },
      authtype,
    });

    if (!newUser) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            { msg: "User not created" },
            "There was a problem on our side. Please try again later."
          )
        );
    }

    const { _id } = newUser.toObject();

    const token = await newUser.generateAuthToken();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: { _id }, token, msg: "User created successfully" },
          "User created successfully"
        )
      );
  }

  if (authtype === "local") {
    const newUser = await User.create({
      email,
      password,
      username,
      fullname: {
        firstname,
        lastname,
      },
      authtype,
    });

    if (!newUser) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            { msg: "User not created" },
            "There was a problem on our side. Please try again later."
          )
        );
    }

    const { _id } = newUser.toObject();

    const token = await newUser.generateAuthToken();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: { _id }, token, msg: "User created successfully" },
          "User created successfully"
        )
      );
  }
});

const updateProfession = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }

  const { profession } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { profession },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem on our side. Please try again later."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "User profile updated successfully" },
        "User profile updated successfully"
      )
    );
});

const updateSkills = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }

  const { skills } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { skills },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem on our side. Please try again later."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "User profile updated successfully" },
        "User profile updated successfully"
      )
    );
});

const updateBio = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }

  const { bio } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { about: bio },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem on our side. Please try again later."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "User profile updated successfully" },
        "User profile updated successfully"
      )
    );
});

const updateLinks = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }
  const { xlink, linkedInlink, portfoliolink } = req.body;

  const links = {};
  if (xlink) links.xlink = xlink;
  if (linkedInlink) links.linkedInlink = linkedInlink;
  if (portfoliolink) links.portfoliolink = portfoliolink;

  if (Object.keys(links).length === 0) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "At least one link is required" },
          "Please provide at least one link"
        )
      );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { links },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem on our side. Please try again later."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "User profile updated successfully" },
        "User profile updated successfully"
      )
    );
});

const updateProjects = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }

  const { title, details } = req.body;

  const project = await Project.create({
    title,
    details,
  });

  if (!project) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Project not created" },
          "There was a problem creating the project. Please try again."
        )
      );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { projectsArray: project._id } },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem updating user projects."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "Project added successfully" },
        "Project added successfully"
      )
    );
});

const updateWork = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }

  const { company, role, from, to, experience } = req.body;

  const work = await Work.create({
    company,
    role,
    from,
    to,
    experience,
  });

  if (!work) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Work experience not created" },
          "There was a problem creating the work experience. Please try again."
        )
      );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { workArray: work._id } },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem updating user work experience."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "Work experience added successfully" },
        "Work experience added successfully"
      )
    );
});

const updatePicture = asyncHandler(async (req, res) => {
  let imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "No image provided" },
          "Please provide an image."
        )
      );
  }

  const picture = await cloudinaryUpload(imageLocalPath);

  if (!picture) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Image not uploaded" },
          "There was a problem uploading the image. Please try again."
        )
      );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { profilePicture: picture.url },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem updating the profile picture."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {pictureurl:picture.url,  msg: "Profile picture updated successfully" },
        "Profile picture updated successfully"
      )
    );
});

const updatePreferences = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }

  const { preferences } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { preferences },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem updating user preferences."
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "User preferences updated successfully" },
        "User preferences updated successfully"
      )
    );
})

const getUserPicture = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("profilePicture");

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not found" },
          "There was a problem fetching the profile picture."
        )
      );
  }


  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { picture: user.profilePicture, msg: "Profile picture fetched successfully" },
        "Profile picture fetched successfully"
      )
    );
})

const findUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not found" },
          "There was a problem fetching the user."
        )
      );
  }


  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { userId: user._id, msg: "User fetched successfully" },
        "User fetched successfully"
      )
    );
})

const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { errors: errors.array() },
          "Please ensure all fields are filled correctly."
        )
      );
  }

  const {email, password} = req.body

  const user = await User.findOne({email})

  if(!user){
    return res
      .status(400)
      .json(new ApiResponse(400, {msg: "Email do not exist"}, "Email do not exist."))
  }

  if(user.authtype !== 'local'){
    return res
      .status(400)
      .json(new ApiResponse(400, {msg: 'Please login using your google or github.'}, 'Please login using your google or github.'))
  }

  const valid = await user.isPasswordCorrect(password)

  if(valid){
    const token = await user.generateAuthToken();
    return res
      .status(200)
      .json(new ApiResponse(
        200,
        {user: user._id, token, msg: 'Succesful LogIn'},
        'Successful LogIn'
      ))
  }else{
    return res
      .status(400)
      .json(new ApiResponse(
        400,
        {msg: 'Incorrect Password'},
        'Incorrect Password'
      ))
  }
})

export {
  isUserNameAvailable,
  isMailExists,
  getProfile,
  registerUser,
  updateProfession,
  updateSkills,
  updateBio,
  updateLinks,
  updateProjects,
  updateWork,
  updatePicture,
  updatePreferences,
  getUserPicture,
  findUserByEmail,
  login
};
