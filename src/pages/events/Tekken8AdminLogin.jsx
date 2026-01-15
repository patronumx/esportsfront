import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Tekken8AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tekken8/admin/login`, credentials);
            if (res.data.success) {
                localStorage.setItem('tekken8_admin_token', res.data.token);
                toast.success('Access Granted');
                navigate('/events/tekken8/admin/dashboard');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Access Denied');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#0c0c10] border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black italic uppercase tracking-wider mb-2">Admin <span className="text-orange-500">Access</span></h2>
                        <p className="text-gray-500 text-xs font-mono uppercase tracking-[0.2em]">Restricted Area</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 transition-colors outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-orange-500 transition-colors outline-none"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black uppercase tracking-widest py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Authenticating...' : 'Enter System'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Tekken8AdminLogin;
