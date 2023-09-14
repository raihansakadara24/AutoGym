import React, {useEffect, useRef, useState} from 'react';
import shareVideo from '../assets/workout-cinematic.mp4';
import Button from "./Button";
import {supabase} from "../supabaseClient";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/Auth";

const Login = () => {
    const [helperText, setHelperText] = useState({error: null, text: null});
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false)
    const [register, setRegister] = useState(false);
    const navigate = useNavigate()
    const [state, setState] = useState({});

    const {user} = useAuth();

    useEffect(() => {
        if (user) {
            navigate('/', {replace: true});
        }
    }, [user, navigate]);
    const loginGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }
    const handleLogin = async (type) => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        setIsLoading(true)
        const {user, error} =
            type === "LOGIN"
                ? await supabase.auth.signInWithPassword({email, password})
                : await supabase.auth.signUp({email, password});
        navigate('/')
        if (error) {
            setHelperText({error: true, text: error.message});
        } else if (!user && !error && type === 'REGISTER') {
            setHelperText({
                error: false,
                text: "An email has been sent to you for verification!",
            });
        }
        setIsLoading(false)
        setTimeout(() => {
            setHelperText({error: null, text: null});
        }, 5000);

    };

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={shareVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
            </div>
            <div
                className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                <div className="border rounded-lg p-10 border-teal-500">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin(register ? 'REGISTER' : 'LOGIN');
                    }}>
                        <div>
                            <h1 className="flex justify-center text-white text-3xl mb-10">{register ? 'Create Account' : 'Login'}</h1>
                            <input
                                className="bg-transparent border-b border-white text-white sm:text-sm focus:ring-transparent dark:bg-transparent dark:border-teal-500 hover:border-teal-500 hover:focus:ring-teal-500 focus:border-teal-500 block p-2.5 w-72"
                                type="text" name="email" placeholder="Enter Email" ref={emailRef}
                            />
                            <input
                                className="bg-transparent border-b border-white text-white sm:text-sm focus:ring-transparent dark:bg-transparent dark:border-teal-500 hover:border-teal-500 hover:focus:ring-teal-500 focus:border-teal-500 block p-2.5 mt-5 w-72 "
                                type="password" name="password" placeholder="Password" ref={passwordRef}
                            />
                            <div className="flex mt-5">
                                <Button label={register ? 'Sign Up' : 'Sign In'} type="submit" isLoading={isLoading}/>
                            </div>
                            <div className="mt-5">
                                <button className="bg-white w-full rounded-lg py-2" type="submit" onClick={loginGoogle}>
                                    <div className="flex flex-row gap-4 justify-center items-center">
                                        <img src={require('../assets/google.png')} alt="google logo"
                                             className="w-10 h-8"/>
                                        Sign In With Google
                                    </div>
                                </button>
                            </div>
                            <div className="flex justify-center gap-1 mt-5 text-white">
                                {register
                                    ? "Have an account? "
                                    : "Don't have an account? "}
                                <span
                                    className="hover:text-teal-500 cursor-pointer"
                                    onClick={() => setRegister(!register)}
                                >
                                    {register ? 'Login' : 'Register'}
                                </span>
                            </div>
                        </div>
                        {!!helperText.text && (
                            <div
                                className={`border px-1 py-2 mt-5 text-center text-sm ${
                                    helperText.error
                                        ? "bg-red-100 border-red-300 text-red-400"
                                        : "bg-green-100 border-green-300 text-green-500"
                                }`}
                            >
                                {helperText.text}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
