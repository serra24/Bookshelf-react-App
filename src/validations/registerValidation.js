const validateUsername = (username) => {
    if (!username.trim()) {
        return 'Username is required.';
    }
    if (username.length < 5) {
        return 'Username must be at least 5 characters long.';
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return 'Username can only contain letters and numbers.';
    }
    return '';
};

const validatePassword = (password) => {
    if (!password.trim()) {
        return 'Password is required.';
    }
    if (password.length < 8) {
        return 'Password must be at least 8 characters long.';
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        return 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.';
    }
    return '';
};

export { validateUsername, validatePassword };

