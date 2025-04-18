import passport from 'passport';
import { Router } from "express";
import { ApiResponse } from '../utils/ApiResponse.js';

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

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/authentication',
    session: false
}),
(req,res) => {
    try {
        res.cookie('email', req.user, {
            httpOnly: false, 
            secure:true,
            sameSite: 'lax',
            maxAge: 5 * 60 * 1000 
          });
        res.redirect('http://localhost:5173/update-username')
    } catch (error) {
        console.log(error);
        res.redirect('http://localhost:5173/authentication')
    }
});

export default router;