import passport from "passport";
import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const router = Router();

// router.get('/login/failed', (req, res) => {
//     res.status(401).json(new ApiResponse(400, {msg: 'Login failed!'}, 'login failed'));
// });

// router.get('/login/success', (req, res) => {
//     console.log(req.user);
//     if(req.user){
//         res.status(200).json(new ApiResponse(200, req.user, 'Login success'));
//         res.redirect('http://localhost:5173/authentication')
//     }
// });

// router.get('/logout', (req, res) => {
//     req.logout()
//     res.redirect('http://localhost:5173/authentication')
// });

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://partnr.onrender.com/authentication",
    session: false,
  }),
  (req, res) => {
    try {
      const email = req.user;
      const authType = "google";
      res.redirect(
        `https://partnr.onrender.com/update-username?email=${encodeURIComponent(
          email
        )}&auth=${authType}`
      );
    } catch (error) {
      console.log(error);
      res.redirect("https://partnr.onrender.com/authentication");
    }
  }
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "https://partnr.onrender.com/authentication",
    session: false,
  }),
  (req, res) => {
    try {
      const email = req.user; // req.user is just a string
      const authType = "github";
      res.redirect(
        `https://partnr.onrender.com/update-username?email=${encodeURIComponent(
          email
        )}&auth=${authType}`
      );
    } catch (error) {
      console.log(error);
      res.redirect("https://partnr.onrender.com/authentication");
    }
  }
);

router.route("/get-token").post(async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) {
      return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
    }
    const findUser = await User.findById(user);
    const token = await findUser.generateAuthToken();
    res
      .status(200)
      .json(new ApiResponse(200, { token }, "Token retrieved successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

export default router;
