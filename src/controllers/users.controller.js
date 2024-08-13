import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { checkFormat } from "../middleware/jwt.js";
import {
	loginRequestDTO,
	signupRequestDTO,
	setProfileRequestDTO,
} from "../dtos/users.dto.js";
import {
	join,
	loginService,
	logoutService,
	getUserInfoByToken,
	setUserProfileImage,
} from "../services/users.service.js";

//=================================
//             Users
//=================================


// /users/signup
export const signup = async (req, res) => {
	try {
		if (await join(signupRequestDTO(req.body))) {
			// if password correct
			res.send(response(status.SUCCESS, null));
		} else {
			// if password incorrect
			res.send(response(status.PASSWORD_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/login
export const login = async (req, res) => {
	try {
		const result = await loginService(loginRequestDTO(req.body));
		if (result === 1) {
			// if login fail by email doesn't exists
			res.send(response(status.LOGIN_EMAIL_NOT_EXIST, null));
		} else if (result === 2) {
			// if login fail by password incorrect
			res.send(response(status.LOGIN_PASSWORD_WRONG, null));
		} else {
			// if login success
			res.send(response(status.SUCCESS, result));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/logout
export const logout = async (req, res) => {
	try {
		const token = await checkFormat(req.get("Authorization"));

		if (token !== null) {
			// if token format correct
			await logoutService(token);
			res.send(response(status.SUCCESS, null));
		} else {
			// if token format incorrect
			res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/info
export const getUserinfo = async (req, res) => {
	try {
		const token = await checkFormat(req.get("Authorization"));

		if (token !== null) {
			// if token format correct
			res.send(response(status.SUCCESS, await getUserInfoByToken(token)));
		} else {
			// if token format incorrect
			res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};

// /users/info/set-profile
export const setUserProfile = async (req, res) => {
	try {
		const token = await checkFormat(req.get("Authorization"));
		console.log(req);
		if (token !== null) {
			// if token format correct
			res.send(
				response(
					status.SUCCESS,
					await setUserProfileImage(token, setProfileRequestDTO(req.body))
				)
			);
		} else {
			// if token format incorrect
			res.send(response(status.TOKEN_FORMAT_INCORRECT, null));
		}
	} catch (err) {
		console.log(err);
		res.send(response(BaseError));
	}
};