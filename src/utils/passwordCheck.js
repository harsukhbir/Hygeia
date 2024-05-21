export const checkPasswordStrength = (password) => {
	let regex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/g);
	if(regex.test(password)) {
		return null;
	}
	return "Password must contain special charcter(!,@,#,$,&), number, Capital letter & Numeric letter.";
};