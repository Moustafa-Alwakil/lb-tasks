// import { Routes, Route } from 'react-router-dom';

import { Routes, Route } from 'react-router-dom';
import './globals.css';
import AuthLayout from './_auth/AuthLayout';
import LoginFrom from './_auth/forms/LoginFrom';
import RegisterForm from './_auth/forms/RegisterForm';
import  Index from './_root/pages/posts/Index';
import { RootLayout } from './_root/RootLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './_root/pages/posts/Create';
import SendEmails from './_root/pages/SendEmails';

const App = () => {
    return (
        <main className="flex h-screen">
            <ToastContainer />

            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginFrom />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Route>
                
                <Route element={<RootLayout />}>
                    <Route index element={<Index />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/send-emails' element={<SendEmails />} />
                </Route>
            </Routes>
        </main>
    )
}

export default App