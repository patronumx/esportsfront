import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import mlBanner from '../../assets/events/ml.png';
import hokBanner from '../../assets/events/hok.jpg';

const MobaAdminLogin = ({ game }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const config = {
        mlbb: {
            title: 'MLBB Admin',
            banner: mlBanner,
            color: 'text-blue-500',
            borderColor: 'focus:border-blue-500',
            btnColor: 'bg-blue-600 hover:bg-blue-500',
            redirect: '/events/moba/mlbb/admin/dashboard'
        },
        hok: {
            title: 'HOK Admin',
            banner: hokBanner,
            color: 'text-yellow-500',
            borderColor: 'focus:border-yellow-500',
            btnColor: 'bg-yellow-600 hover:bg-yellow-500',
            redirect: '/events/moba/hok/admin/dashboard'
        }
    };

    const currentConfig = config[game] || config.mlbb;

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');
            const res = await axios.post(`${API_BASE}/api/moba/admin/login`, credentials);
            if (res.data.success) {
                localStorage.setItem('moba_admin_token', res.data.token);
                toast.success('Access Granted');
                navigate(currentConfig.redirect);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Access Denied');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentConfig.banner})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

            <div className="w-full max-w-md bg-[#0c0c10]/90 border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl backdrop-blur-md z-10">
                <div className="relative z-10">
                    <button
                        onClick={() => navigate('/events/admin')}
                        className="absolute -top-4 -left-4 p-2 text-gray-500 hover:text-white transition-colors"
                        title="Back to Admin Hub"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black italic uppercase tracking-wider mb-2">
                            {currentConfig.title} <span className={currentConfig.color}>Access</span>
                        </h2>
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
                                className={`w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white ${currentConfig.borderColor} transition-colors outline-none`}
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
                                className={`w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white ${currentConfig.borderColor} transition-colors outline-none`}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full ${currentConfig.btnColor} text-white font-black uppercase tracking-widest py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {loading ? 'Authenticating...' : 'Enter System'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MobaAdminLogin;
