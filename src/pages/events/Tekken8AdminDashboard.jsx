import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import banner from '../../assets/tekken8/banner.png';

const Tekken8AdminDashboard = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        const token = localStorage.getItem('tekken8_admin_token');
        if (!token) {
            navigate('/events/tekken8/admin');
            return;
        }

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tekken8/registrations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRegistrations(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                toast.error('Session Expired');
                localStorage.removeItem('tekken8_admin_token');
                navigate('/events/tekken8/admin');
            } else {
                toast.error('Failed to load data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('tekken8_admin_token');
        navigate('/events/tekken8/admin');
    };

    const downloadCSV = () => {
        const headers = ['Full Name', 'Email', 'Phone', 'Coupon Code', 'Date', 'Payment Screenshot URL'];
        const rows = registrations.map(reg => [
            `"${reg.fullName}"`,
            `"${reg.email}"`,
            `"${reg.phoneNumber}"`,
            `"${reg.couponCode || ''}"`,
            `"${new Date(reg.createdAt).toLocaleString()}"`,
            `"${reg.paymentScreenshot}"`
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'tekken8_registrations.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[#050505] text-white p-6 pt-24 relative">
            {/* Background Banner with Overlay - Matches User Side */}
            <div className="fixed inset-0 z-0">
                <img
                    src={banner}
                    alt="Tekken 8 Banner"
                    className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow ml-2"
                    style={{ animationDuration: '20s' }}
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/90 via-[#050505]/40 to-[#050505]/90"></div>
                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Header Content */}
            <div className="max-w-7xl mx-auto mb-6 relative z-10 pt-4">
                <div className="text-center mb-6 relative group select-none">
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-4 opacity-30"></div>
                    <h3 className="text-gray-200 font-sans font-bold tracking-[0.3em] text-sm md:text-lg uppercase mb-2 drop-shadow-md">Patronum Esports</h3>

                    <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase font-display mb-2 leading-[0.85]">
                        <span className="inline-block transform skew-x-[-10deg] hover:skew-x-[-4deg] transition-transform duration-500 origin-bottom">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] pr-4 py-4 block md:inline">TEKKEN 8</span>
                        </span>
                        <span className="inline-block transform skew-x-[-10deg] hover:skew-x-[-4deg] transition-transform duration-500 delay-75 origin-bottom">
                            <span className="block md:inline md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)] pr-4 py-4 brightness-110">ADMIN</span>
                        </span>
                    </h1>
                </div>

                {/* Toolbar */}
                <div className="flex justify-between items-center bg-[#050505]/40 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-red-500/5 opacity-50"></div>

                    <button
                        onClick={downloadCSV}
                        className="group relative px-6 py-2.5 bg-green-950/30 hover:bg-green-900/50 border border-green-500/30 hover:border-green-400 text-green-400 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded-sm backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.1)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]"
                    >
                        <div className="absolute inset-0 bg-green-400/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                        <div className="flex items-center gap-2 relative z-10">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Export Database
                        </div>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="group relative px-6 py-2 bg-red-950/30 hover:bg-red-900/50 border border-red-500/30 hover:border-red-400 text-red-500 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all skew-x-[-15deg] hover:skew-x-[-10deg] shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
                    >
                        <span className="relative z-10 inline-block skew-x-[15deg] group-hover:skew-x-[10deg] transition-all">Terminate Session</span>
                        <div className="absolute inset-0 bg-red-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
                    </button>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-7xl mx-auto relative z-10">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-6">
                        <div className="relative">
                            <div className="w-20 h-20 border-2 border-orange-500/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
                            <div className="absolute inset-0 w-20 h-20 border-2 border-transparent border-t-orange-500 rounded-full animate-[spin_1s_linear_infinite]"></div>
                            <div className="absolute inset-2 w-16 h-16 border-2 border-transparent border-l-red-500 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
                        </div>
                        <p className="text-orange-500 font-mono text-[10px] tracking-[0.5em] animate-pulse">DECRYPTING...</p>
                    </div>
                ) : registrations.length === 0 ? (
                    <div className="text-center py-32 bg-[#0c0c10]/40 backdrop-blur-xl rounded-2xl border border-white/5 border-dashed">
                        <p className="text-gray-500 font-mono text-xl uppercase tracking-widest">Database Empty</p>
                    </div>
                ) : (
                    <div className="overflow-hidden bg-[#0a0a0f]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_80px_-20px_rgba(0,0,0,0.7)] relative">
                        {/* Table Header Decoration */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gradient-to-r from-white/[0.01] via-white/[0.03] to-white/[0.01] border-b border-white/5">
                                        <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500/80">ID</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Timestamp</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Fighter Profile</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Contact</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Coupon</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {registrations.map((reg, index) => (
                                        <tr
                                            key={reg._id}
                                            className="group hover:bg-white/[0.02] transition-all duration-300 relative animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards hover:border-l-[3px] border-l-transparent hover:border-l-orange-500"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <td className="p-6 text-sm font-mono text-orange-500 font-bold group-hover:text-white transition-colors duration-300 shadow-[20px_0_20px_-10px_rgba(0,0,0,0.5)_inset]">
                                                #{String(index + 1).padStart(3, '0')}
                                            </td>
                                            <td className="p-6">
                                                <div className="text-sm text-gray-200 font-bold tracking-wide">{new Date(reg.createdAt).toLocaleDateString()}</div>
                                                <div className="text-[10px] text-gray-600 font-mono mt-1 tracking-wider">{new Date(reg.createdAt).toLocaleTimeString()}</div>
                                            </td>
                                            <td className="p-6">
                                                <div className="font-black text-orange-500 text-lg tracking-wider group-hover:text-white transition-colors duration-300 uppercase drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">{reg.fullName}</div>
                                                <div className="text-xs text-gray-400 mt-1.5 flex items-center gap-2 font-medium">
                                                    <span className="w-1.5 h-1.5 bg-orange-500 group-hover:bg-white transition-colors rounded-full shadow-[0_0_5px_rgba(249,115,22,0.8)]"></span>
                                                    {reg.email}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="relative group/chip inline-flex items-center gap-3 px-4 py-2 bg-emerald-950/20 border border-emerald-500/20 rounded-sm transform skew-x-[-10deg] hover:bg-emerald-950/40 hover:border-emerald-500/50 transition-all shadow-[0_0_10px_rgba(16,185,129,0.05)] hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                                    <div className="transform skew-x-[10deg] flex items-center gap-3">
                                                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30">
                                                            <svg className="w-3 h-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                        </div>
                                                        <span className="text-[11px] font-mono font-bold text-emerald-400/90 tracking-widest group-hover/chip:text-emerald-200 transition-colors">
                                                            {reg.phoneNumber}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                {reg.couponCode ? (
                                                    <div className="inline-block px-4 py-1.5 bg-blue-950/30 border border-blue-500/30 transform skew-x-[-10deg] shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                                        <span className="block transform skew-x-[10deg] text-[10px] font-black uppercase text-blue-400 tracking-[0.2em] drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                                                            {reg.couponCode}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] text-gray-700 font-mono pl-4">-</span>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => setSelectedImage(reg.paymentScreenshot)}
                                                        className="group/btn relative w-full max-w-[140px] py-2.5 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 border border-red-500/50 hover:border-orange-400 rounded text-[10px] font-black uppercase tracking-[0.25em] transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] overflow-hidden active:scale-95 transform skew-x-[-10deg]"
                                                    >
                                                        <span className="relative z-10 flex items-center justify-center gap-2 text-white group-hover/btn:text-white transition-colors transform skew-x-[10deg]">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                            Verification
                                                        </span>
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] translate-x-[-150%] group-hover/btn:animate-[shine_0.8s_infinite] transition-transform"></div>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Image Preview Modal */}
            {selectedImage && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center bg-[#101014] border border-white/10 rounded-2xl p-2 shadow-2xl skew-x-[-1deg] ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>

                        {/* Toolbar */}
                        <div className="w-full flex justify-between items-center px-4 py-3 border-b border-white/5 mb-2 bg-[#1a1a20] rounded-t-xl">
                            <h3 className="text-gray-300 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                                Payment Evidence
                            </h3>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <div className="relative w-full overflow-auto flex items-center justify-center bg-black/50 rounded p-1">
                            <img
                                src={selectedImage}
                                alt="Payment Proof"
                                className="max-w-full max-h-[80vh] object-contain rounded border border-white/5"
                            />
                        </div>

                        <div className="w-full py-3 text-center">
                            <p className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.2em] animate-pulse">
                                Verified by Patronum Secure Gateway
                            </p>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Tekken8AdminDashboard;
