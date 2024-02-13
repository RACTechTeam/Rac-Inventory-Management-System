import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [userEmail, setEmail] = useState('');
    const [userPassword, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            // Make a POST request to your server with user credentials
            const response = await axios.post('http://localhost:4000/rac/user/login', {
                userEmail,
                userPassword,
            });

            // Assuming the response has a property named 'message' indicating success or failure
            if (response.data.success === true) {
                // If login is successful, navigate to the dashboard
                navigate('/dashboard');
                console.log('Login Successful');
            } else {
                alert('Invalid credentials or login failed');
                console.log('Login unsuccessful');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-poppins min-h-screen bg-gray-100 py-6 flex flex-col sm:py-12 ml-auto">
            <div className="font-poppins relative ml-auto py-3 sm:max-w-xl sm:mx-auto">
                <div className="font-poppins absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="font-poppins relative px-26 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 lg:pb-11">
                    <div className="font-poppins max-w-md mx-auto">
                        <div>
                            <h1 className="font-poppins text-2xl font-semibold">Login Form</h1>
                        </div>
                        <div className="font-poppins divide-y divide-gray-200">
                            <form onSubmit={handleSignUp} className="font-poppins py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="font-poppins relative">
                                    <input
                                        id="userEmail"
                                        name="email"
                                        type="text"
                                        value={userEmail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="font-poppins peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="font-poppins relative">
                                    <input
                                        id="userPassword"
                                        name="password"
                                        type="password"
                                        value={userPassword}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="font-poppins peer  h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Password"
                                    />
                                </div>

                                <p className="font-poppins text-sm">
                                    <Link to="/signup" className="font-poppins text-blue-700">
                                        Forget Password
                                    </Link>
                                </p>

                                <div className="font-poppins flex justify-center items-center h-full">
                                    <button
                                        type="submit"
                                        className="font-poppins bg-blue-500 text-white rounded-md px-2 py-1"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;