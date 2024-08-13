import express from "express";
import {
	signup,
	login,
	logout,
	getUserinfo,
	setUserProfile,
} from "../controllers/users.controller";

export const usersRoute = express.Router();

usersRoute.post("/signup", async (req, res) => {
	await signup(req, res);
});

usersRoute.post("/login", async (req, res) => {
	await login(req, res);
});

usersRoute.post("/logout", async (req, res) => {
	await logout(req, res);
});

usersRoute.get("/info", async (req, res) => {
	await getUserinfo(req, res);
});

usersRoute.post("/info/set-profile", async (req, res) => {
	await setUserProfile(req, res);
});