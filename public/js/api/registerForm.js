// Check if passwords match
function passwordsMatch(pwd, verifyPwd) {
    return pwd === verifyPwd;
}

// Basic form validation
function validateForm(data) {
    
    if (!data.userName) return "Username is required";
    if (!data.firstName) return "First name is required";
    if (!data.lastName) return "Last name is required";
    if (!data.email) return "Email is required";
    if (!data.pwd) return "Password is required";
    if (!data.verifypwd) return "Please confirm your password";

    if (!passwordsMatch(data.pwd, data.verifypwd)) {
        return "Passwords do not match";
    }

    return null;
}