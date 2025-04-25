import express from "express"
import { loginUser,registerUser,getUsername } from "../controllers/UserController.js"

const UserRoute = express.Router()

UserRoute.get("/name/:id", getUsername);
UserRoute.post("/register",registerUser)
UserRoute.post("/login",loginUser)


export default UserRoute
