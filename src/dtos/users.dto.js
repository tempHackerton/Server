//=================================
//             Users
//=================================

export const signupRequestDTO = (req) => {
	return {
		name: req.name,
		email: req.email,
		password: req.password,
		birth: req.birth,
		gender: req.gender,
		is_married: req.is_married,
		child_count: req.child_count,
	};
};

export const loginRequestDTO = (req) => {
	return {
		email: req.email,
		password: req.password,
	};
};

export const setProfileRequestDTO = (req) => {
	return {
		profile: req.profile,
	};
};