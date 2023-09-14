import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate, Navigate, BrowserRouter} from 'react-router-dom';

import Home from './container/Home';
import Login from "./components/Login";
import {createClient} from "@supabase/supabase-js";
import {supabase} from "./supabaseClient";
import { AuthProvider } from './hooks/Auth';
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
    const navigate = useNavigate();

    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])


    return (
        <AuthProvider>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
            </Routes>
        </AuthProvider>
    );
};

export default App