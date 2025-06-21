import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { Project } from "../models/project.model.js";
import { Work } from "../models/work.model.js";
import { Like } from "../models/like.model.js";
import { cloudinaryDelete, cloudinaryUpload } from "../utils/cloudinary.js";
import { Connection } from "../models/connection.model.js";
import { Notification } from "../models/notification.model.js";
import { Conversation } from "../models/conversation.model.js";

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

  if (authtype === "google" || authtype === 'github') {
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

  // First, fetch the current profilePicture of the user
  const currentUser = await User.findById(req.user._id).select("profilePicture");

  const oldPictureUrl = currentUser?.profilePicture;
  const defaultPictureUrl = "https://res.cloudinary.com/dbzcsfi3e/image/upload/v1743434367/default_pfp_wngp1j.jpg";

  // Update the profilePicture
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { profilePicture: picture.url },
    { new: true }
  );

  // If the old picture is not the default, delete it from cloudinary
  if (oldPictureUrl && oldPictureUrl !== defaultPictureUrl) {
    // Extract public_id from the URL
    const matches = oldPictureUrl.match(/\/upload\/(?:v\d+\/)?([^\.\/]+)\./);
    if (matches && matches[1]) {
      const publicId = matches[1];
      try {
        await cloudinaryDelete(publicId);
      } catch (err) {
        // Log error but don't block response
        console.error("Failed to delete old profile picture from cloudinary:", err);
      }
    }
  }

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
        {
          pictureurl: picture.url,
          msg: "Profile picture updated successfully",
        },
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
});

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
        {
          picture: user.profilePicture,
          msg: "Profile picture fetched successfully",
        },
        "Profile picture fetched successfully"
      )
    );
});

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
});

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

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Email do not exist" },
          "Email do not exist."
        )
      );
  }

  if (user.authtype !== "local") {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Please login using your google or github." },
          "Please login using your google or github."
        )
      );
  }

  const valid = await user.isPasswordCorrect(password);

  if (valid) {
    const token = await user.generateAuthToken();
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: user._id, token, msg: "Succesful LogIn" },
          "Successful LogIn"
        )
      );
  } else {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Incorrect Password" },
          "Incorrect Password"
        )
      );
  }
});

const suggestedUsers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user.swipeResetAt || (Date.now() - new Date(user.swipeResetAt).getTime()) > 24 * 60 * 60 * 1000) {
    user.SwipedArray = [];
    user.swipeResetAt = Date.now();
    await user.save();
  }

  const { SwipedArray, halfSwipedArray, preferences, _id } = user;

  const excludedUsers = [...SwipedArray, ...halfSwipedArray, _id];
  const halfSwipedLimit = 5;

  const halfSwipedResults = await User.find({
    _id: {
      $in: halfSwipedArray,
      $nin: SwipedArray,
    },
  })
    .select("fullname profession skills profilePicture _id")
    .limit(halfSwipedLimit);

  const skillsLimit = 10 - halfSwipedResults.length;

  let skillsResults = [];
  if (skillsLimit > 0) {
    skillsResults = await User.find({
      _id: { $nin: excludedUsers },
      skills: { $in: preferences },
    })
      .select("fullname profession skills profilePicture _id")
      .limit(skillsLimit);
  }

  const recommended = [...halfSwipedResults, ...skillsResults];

  if (recommended.length < 10) {
    const additionalLimit = 10 - recommended.length;
    const alreadyIncludedIds = recommended.map(u => u._id.toString());
    const moreUsers = await User.find({
      _id: { $nin: [...excludedUsers, ...alreadyIncludedIds] }
    })
      .select("fullname profession skills profilePicture _id")
      .limit(additionalLimit);
    recommended.push(...moreUsers);
  }

  return res.status(200).json(
    new ApiResponse(200, {
      users: recommended,
      msg:
        recommended.length === 0
          ? "No recommended users found"
          : "Recommended users fetched successfully",
    })
  );
});

const fetchUserDetailsForProfile = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId).select(
    "fullname username profession profilePicture connectionsArray likesArray about projectsArray workArray links"
  );

  await user.populate([
    { path: "workArray", select: "company role from to experience" },
    { path: "projectsArray", select: "title details" },
    { path: "connectionsArray", select: "first_connect second_connect status" },
  ]);

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, { msg: "User not found" }, "User not found"));
  }

  // Determine connection status
  // let connectionStatus = null;
  // if (req.user && Array.isArray(user.connectionsArray)) {
  //   const connection = user.connectionsArray.find(conn => {
  //     return (
  //       (conn.first_connect?.toString() === req.user._id.toString()) ||
  //       (conn.second_connect?.toString() === req.user._id.toString())
  //     );
  //   });
  //   if (connection) {
  //     connectionStatus = connection.status === "accepted" ? "connected" : "pending";
  //   }
  // }
  // Check connection status using Connection model
  let connectionStatus = null;
  if (req.user && req.user._id && user._id) {
    const connection = await Connection.findOne({
      $or: [
        { first_connect: req.user._id, second_connect: user._id },
        { first_connect: user._id, second_connect: req.user._id },
      ],
    });

    if (connection) {
      if (connection.status === "accepted") {
        connectionStatus = "connected";
      } else if (connection.status === "pending") {
        if (connection.first_connect.toString() === req.user._id.toString()) {
          connectionStatus = "pending";
        } else {
          connectionStatus = "accept";
        }
      }
    }
  }
  
  let conversationId = "";
  if (connectionStatus === "connected") {
    const participants = [req.user._id, user._id].sort();
    const conversation = await Conversation.findOne({ participants });
    if (conversation) {
      conversationId = conversation._id;
    }
  }

  const userDetails = {
    fullname:
      user.fullname.firstname.charAt(0).toUpperCase() +
      user.fullname.firstname.slice(1).toLowerCase() +
      " " +
      user.fullname.lastname.charAt(0).toUpperCase() +
      user.fullname.lastname.slice(1).toLowerCase(),
    username: user.username,
    profession: user.profession,
    profilePicture: user.profilePicture,
    connectionsCount: user.connectionsArray.length,
    likesCount: user.likesArray.length,
    about: user.about,
    projectsArray: user.projectsArray,
    workArray: user.workArray,
    ...(user.links &&
    (user.links.xlink || user.links.linkedInlink || user.links.portfoliolink)
      ? { links: user.links }
      : {}),
    connectionStatus,
    conversationId
  };


  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: userDetails, msg: "User details fetched successfully" },
        "User details fetched successfully"
      )
    );
});

const fetchSelfDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "fullname username profession profilePicture connectionsArray likesArray about projectsArray workArray links"
  );

  await user.populate([
    { path: "workArray", select: "company role from to experience" },
    { path: "projectsArray", select: "title details" },
  ]);

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, { msg: "User not found" }, "User not found"));
  }

  const userDetails = {
    fullname:
      user.fullname.firstname.charAt(0).toUpperCase() +
      user.fullname.firstname.slice(1).toLowerCase() +
      " " +
      user.fullname.lastname.charAt(0).toUpperCase() +
      user.fullname.lastname.slice(1).toLowerCase(),
    username: user.username,
    profession: user.profession,
    profilePicture: user.profilePicture,
    connectionsCount: user.connectionsArray.length,
    likesCount: user.likesArray.length,
    about: user.about,
    projectsArray: user.projectsArray,
    workArray: user.workArray,
    ...(user.links &&
    (user.links.xlink || user.links.linkedInlink || user.links.portfoliolink)
      ? { links: user.links }
      : {}),
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: userDetails, msg: "User details fetched successfully" },
        "User details fetched successfully"
      )
    );
});

const newConnection = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User ID is required" },
          "Please provide a valid user ID."
        )
      );
  }

  const connection = await Connection.create({
    first_connect: req.user._id,
    second_connect: userId,
    status: "pending",
  });

  if (!connection) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Connection not created" },
          "There was a problem creating the connection. Please try again."
        )
      );
  }

  const notification = await Notification.create({
    type: "connection",
    user: req.user._id,
    connection: connection._id,
  });

  await User.findByIdAndUpdate(userId, {
    $addToSet: { notificationsArray: notification._id },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { msg: "Connection request sent successfully" },
        "Connection request sent successfully"
      )
    );
});

const acceptConnection = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const connection = await Connection.findOneAndUpdate(
    { first_connect: userId, second_connect: req.user._id, status: "pending" },
    { status: "accepted" }
  );

  if (!connection) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          { msg: "Connection not found or already accepted" },
          "Connection not found or already accepted"
        )
      );
  }

  // Push connection to both users' connectionsArray
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { connectionsArray: connection._id },
  });
  await User.findByIdAndUpdate(userId, {
    $addToSet: { connectionsArray: connection._id },
  });

  const notification = await Notification.findOneAndDelete({
    type: "connection",
    connection: connection._id,
    user: userId,
  });

  if (notification) {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { notificationsArray: notification._id },
    });
  }

  const participants = [userId, req.user._id].sort(); // ensure consistent order

  let conversation = await Conversation.findOne({ participants });

  if (!conversation) {
    conversation = await Conversation.create({ participants });
  }

  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { conversationsArray: conversation._id },
  });
  await User.findByIdAndUpdate(userId, {
    $addToSet: { conversationsArray: conversation._id },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "Connection accepted successfully" },
        "Connection accepted successfully"
      )
    );
});

const rejectConnection = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const connection = await Connection.findOneAndDelete({
    first_connect: userId,
    second_connect: req.user._id,
    status: "pending",
  });

  const notification = await Notification.findOneAndDelete({
    type: "connection",
    connection: connection._id,
    user: userId,
  });

  if (notification) {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { notificationsArray: notification._id },
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "Connection rejected successfully" },
        "Connection rejected successfully"
      )
    );
});

const disconnect = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const connection = await Connection.findOne({
    $or: [
      { first_connect: req.user._id, second_connect: userId },
      { first_connect: userId, second_connect: req.user._id },
    ],
  });

  if (!connection) {
    return res
      .status(404)
      .json(
        new ApiResponse(
          404,
          { msg: "Connection not found" },
          "Connection not found"
        )
      );
  }

  // Remove connection reference from both users
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { connectionsArray: connection._id },
  });
  await User.findByIdAndUpdate(userId, {
    $pull: { connectionsArray: connection._id },
  });

  // Delete the connection itself
  await Connection.findByIdAndDelete(connection._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "Disconnected successfully" },
        "Disconnected successfully"
      )
    );
});

const updateAllDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "fullname profession about projectsArray workArray links"
  );

  await user.populate([
    { path: "workArray", select: "company role from to experience" },
    { path: "projectsArray", select: "title details" },
  ]);

  const {
    firstname,
    lastname,
    profession,
    about,
    workArray,
    projectsArray,
    links,
  } = req.body;

  if (firstname !== user.fullname.firstname) {
    user.fullname.firstname = firstname;
    await user.save();
  }

  if (lastname !== user.fullname.lastname) {
    user.fullname.lastname = lastname;
    await user.save();
  }

  if (profession !== user.profession) {
    user.profession = profession;
    await user.save();
  }

  if (about !== user.about) {
    user.about = about;
    await user.save();
  }

  // Update projectsArra
  // Remove all existing projects (sequentially, no Promise.all)
  for (const projectId of user.projectsArray) {
    await Project.findByIdAndDelete(projectId);
  }
  // Add new projects
  // Add new projects (sequentially, no Promise.all)
  const newProjects = [];
  for (const p of projectsArray) {
    const project = await Project.create({
      title: p.title,
      details: p.details,
    });
    newProjects.push(project);
  }
  user.projectsArray = newProjects.map((p) => p._id);
  await user.save();

  // Update workArray

  // Remove all existing work experiences (sequentially)
  for (const workId of user.workArray) {
    await Work.findByIdAndDelete(workId);
  }
  // Add new work experiences (sequentially)
  const newWorks = [];
  for (const w of workArray) {
    const work = await Work.create({
      company: w.company,
      role: w.role,
      from: w.from,
      to: w.to,
      experience: w.experience,
    });
    newWorks.push(work);
  }
  user.workArray = newWorks.map((w) => w._id);
  await user.save();

  // Update links
  if (links && typeof links === "object") {
    user.links = links;
    await user.save();
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "User details updated successfully" },
        "User details updated successfully"
      )
    );
});

// const bookmark = asyncHandler(async (req, res) => {
//   const {userId} = req.body;
//   if (!userId) {
//     return res
//       .status(400)
//       .json(
//         new ApiResponse(
//           400,
//           { msg: "User ID is required" },
//           "Please provide a valid user ID."
//         )
//       );
//   }

//   const user = await User.findByIdAndUpdate(
//     req.user._id,
//     { $addToSet: { bookmarksArray: userId } },
//     { new: true }
//   );

//   if (!user) {
//     return res
//       .status(404)
//       .json(
//         new ApiResponse(
//           404,
//           { msg: "User not found" },
//           "User not found"
//         )
//       );
//   }

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(
//         200,
//         { msg: "User bookmarked successfully" },
//         "User bookmarked successfully"
//       )
//     );
// })

const swipeRight = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User ID is required" },
          "Please provide a valid user ID."
        )
      );
  }

  // Add req.user._id to userId's halfSwipedArray
  await User.findByIdAndUpdate(userId, {
    $addToSet: { halfSwipedArray: req.user._id },
  });

  // Add userId to req.user._id's SwipedArray
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { SwipedArray: userId },
  });

  // Create a like object and add reference
  // Check if a like already exists
  let like = await Like.findOne({
    liked_by: req.user._id,
    liked_to: userId,
  });

  if (!like) {
    like = await Like.create({
      liked_by: req.user._id,
      liked_to: userId,
    });
    await User.findByIdAndUpdate(userId, { $addToSet: { likesArray: like._id } });
    const notification = await Notification.create({
      type: "like",
      user: req.user._id,
      like: like._id,
      expire: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    });
  
    await User.findByIdAndUpdate(userId, {
      $addToSet: { notificationsArray: notification._id },
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "Swiped right successfully" },
        "Swiped right successfully"
      )
    );
});

const swipeLeft = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User ID is required" },
          "Please provide a valid user ID."
        )
      );
  }

  // Add userId to req.user._id's SwipedArray
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { SwipedArray: userId },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "Swiped right successfully" },
        "Swiped right successfully"
      )
    );
});

const updateSocketId = asyncHandler(async (req, res) => {
  const { socketId } = req.body;

  if (!socketId) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "Socket ID is required" },
          "Please provide a socket ID"
        )
      );
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { socketId },
    { new: true }
  );

  if (!user) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          { msg: "User not updated" },
          "There was a problem updating the socket ID"
        )
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { msg: "Socket ID updated successfully" },
        "Socket ID updated successfully"
      )
    );
});

const fetchNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("notificationsArray");

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, { msg: "User not found" }, "User not found"));
  }

  // Get the notificationsArray and fetch the latest 5 connection and 5 like notifications by timestamp
  // Step 1: Fetch the notification objects for all IDs in notificationsArray
  const notifications = await Notification.find({
    _id: { $in: user.notificationsArray },
  })
    .select("type createdAt")
    .sort({ createdAt: -1 }); // sort all notifications by createdAt desc

  // Step 2: Filter and get latest 5 connection and 5 like notification IDs
  const connectionIds = notifications
    .filter((n) => n.type === "connection")
    .slice(0, 5)
    .map((n) => n._id);

  const likeIds = notifications
    .filter((n) => n.type === "like")
    .slice(0, 5)
    .map((n) => n._id);

  // Step 3: Populate the latest 5 connection notifications
  const connectionNotifications = await Notification.find({
    _id: { $in: connectionIds },
  })
    .sort({ createdAt: -1 })
    .populate([{ path: "user", select: "username profilePicture _id" }]);

  // Step 4: Populate the latest 5 like notifications
  const likeNotifications = await Notification.find({ _id: { $in: likeIds } })
    .sort({ createdAt: -1 })
    .populate([{ path: "user", select: "username profilePicture _id" }]);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        connectionNotifications,
        likeNotifications,
        msg: "Notifications fetched successfully",
      },
      "Notifications fetched successfully"
    )
  );
});

const viewConnections = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("connectionsArray");
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, { msg: "User not found" }, "User not found"));
  }

  // Fetch all connections and populate both users
  const connections = await Connection.find({
    _id: { $in: user.connectionsArray },
  }).populate([
    { path: "first_connect", select: "_id username profilePicture" },
    { path: "second_connect", select: "_id username profilePicture" },
  ]);

  // For each connection, pick the user that is NOT req.user._id
  const connectedUsers = connections
    .map((conn) => {
      let otherUser;
      if (
        conn.first_connect &&
        conn.first_connect._id.toString() !== req.user._id.toString()
      ) {
        otherUser = conn.first_connect;
      } else if (
        conn.second_connect &&
        conn.second_connect._id.toString() !== req.user._id.toString()
      ) {
        otherUser = conn.second_connect;
      }
      return otherUser
        ? {
            _id: otherUser._id,
            username: otherUser.username,
            profilePicture: otherUser.profilePicture,
          }
        : null;
    })
    .filter(Boolean);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          connections: connectedUsers,
          msg: "Connections fetched successfully",
        },
        "Connections fetched successfully"
      )
    );
});

const viewLikes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("likesArray");
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, { msg: "User not found" }, "User not found"));
  }

  const likes = await Like.find({ _id: { $in: user.likesArray } }).populate({
    path: "liked_by",
    select: "_id username profilePicture",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { likes, msg: "Likes fetched successfully" },
        "Likes fetched successfully"
      )
    );
});

const getPreferences = asyncHandler(async (req, res) => {
  const preferences = await User.findById(req.user._id).select("preferences");
  if (!preferences) {
    return res.status(404).json(new ApiResponse(404, { message: "User not found" }, "User not found"));
  }
  return res.status(200).json(new ApiResponse(200, preferences, "Preferences fetched successfully"));
});

const getUserSkills = asyncHandler(async (req, res) => {
  const skills = await User.findById(req.user._id).select("skills");
  if (!skills) {
    return res.status(404).json(new ApiResponse(404, { message: "User not found" }, "User not found"));
  }
  return res.status(200).json(new ApiResponse(200, skills, "Skills fetched successfully"));
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
  login,
  suggestedUsers,
  fetchUserDetailsForProfile,
  newConnection,
  fetchSelfDetails,
  updateAllDetails,
  acceptConnection,
  rejectConnection,
  disconnect,
  // bookmark,
  swipeRight,
  swipeLeft,
  updateSocketId,
  fetchNotifications,
  viewConnections,
  viewLikes,
  getPreferences,
  getUserSkills
};
