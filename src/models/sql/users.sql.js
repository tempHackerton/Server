//=================================
//             Users
//=================================

/**
 * SQL that insert user data
 */
export const saveUserSql =
	"INSERT INTO user(name, email, password, birth, gender, is_married, child_count,phone_number) VALUES(?, ?, ?, ?, ?, ?, ?,?);";

/**
 * SQL that find id & password by email
 */
export const findUserSql = "SELECT * FROM user WHERE email = ?;";

/** SQL that save token to blacklist */
export const expireToken =
	"INSERT INTO USER_TOKEN_EXPIRED_TB(token) VALUES(?);";