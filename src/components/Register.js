import React, { useState } from 'react';
import axios from 'axios';
import { validateUsername, validatePassword } from '../validations';


const Register = ({ onRegister }) => {
   const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

   const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setUsernameError(validateUsername(value));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value));
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value !== password) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate username
        const usernameValidationResult = validateUsername(username);
        if (usernameValidationResult) {
            setUsernameError(usernameValidationResult);
            return;
        }
        // Validate password
        const passwordValidationResult = validatePassword(password);
        if (passwordValidationResult) {
            setPasswordError(passwordValidationResult);
            return;
        }
        // Validate confirm password
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', { username, password });
            console.log(response.data);
            setSuccess('Registration successful! You can now log in.');
            setError('');
            setUsernameError('');
            setPasswordError('');
            setConfirmPasswordError('');
            if (onRegister) {
                onRegister();
            }
            // Add user to local storage
            localStorage.setItem('registeredUser', username);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Username already exists.');
                setSuccess('');
            } else {
                setError('An error occurred during registration.');
                setSuccess('');
            }
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center">Register</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        required
                                    />
                                    {usernameError && <div className="text-danger">{usernameError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        required
                                    />
                                    {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <div className="text-center">
                                <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
