import { status } from "../../../config/response.status";
import {
	saveUserSql,
	findUserSql,
	expireToken,
} from "../sql/users.sql";
import { pool } from "../../../config/db.connect";

//=================================
//             Users
//=================================

// insert user
export const saveUser = async (req) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();
		const result = await pool.query(saveUserSql, [
            req.name,
			req.email,
			req.password,
            req.birth,
            req.gender,
			req.is_married,
            req.child_count,
            req.phone_number
		]);

		return null;
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

// bring encrypted password
export const findUser = async (req) => {
	let conn;
	try {
		console.log("---------");
		console.log(req);
		conn = await pool.getConnection();

		const user = await pool.query(findUserSql, [req]);

		return user[0][0];
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};

// insert token on blacklist
export const saveTokenBlacklist = async (req) => {
	let conn;
	try {
		console.log("---------");
		conn = await pool.getConnection();

		const result = await pool.query(expireToken, [req]);

		return result;
	} catch (err) {
		console.error(err);
		throw new BaseError(status.PARAMETER_IS_WRONG);
	} finally {
		if (conn) {
			conn.release();
		}
	}
};