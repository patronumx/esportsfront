import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import banner from '../../assets/tekken8/banner.png'; // Import banner

const Tekken8FaceOff2026 = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        couponCode: '',
        paymentScreenshot: null // For file
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, paymentScreenshot: e.target.files[0] });
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard!`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.paymentScreenshot) {
            toast.error("Please fill in all required fields and upload payment proof.");
            setLoading(false);
            return;
        }

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        try {
            const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');
            const res = await axios.post(`${API_BASE}/api/tekken8/register`, submitData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.status === 201) {
                toast.success('Registration successful! We will review your entry.');
                setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    couponCode: '',
                    paymentScreenshot: null
                });
            }
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white relative isolate selection:bg-fuchsia-500/30">

            {/* Background Banner with Overlay */}
            <div className="fixed inset-0 z-[-1]">
                <img
                    src={banner}
                    alt="Tekken 8 Banner"
                    className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow ml-2" // Increased opacity and added subtle movement
                    style={{ animationDuration: '20s' }}
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/90 via-[#050505]/40 to-[#050505]/90"></div>
                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            <div className="pt-28 pb-24 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Hero Banner */}
                <div className="text-center mb-16 relative z-10 group select-none">
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-6 opacity-30"></div>

                    <h3 className="text-gray-200 font-sans font-bold tracking-[0.3em] text-sm md:text-lg uppercase mb-4 drop-shadow-md">Patronum Esports Presents</h3>

                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase font-display mb-4 leading-[0.85] perspective-500">
                        <span className="inline-block transform skew-x-[-10deg] hover:skew-x-[-4deg] transition-transform duration-500 origin-bottom">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] pr-6 py-4 block md:inline">TEKKEN 8</span>
                        </span>

                        <span className="inline-block transform skew-x-[-10deg] hover:skew-x-[-4deg] transition-transform duration-500 delay-75 origin-bottom">
                            <span className="block md:inline md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)] pr-6 py-4 brightness-110">FACE OFF</span>
                        </span>
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">

                    {/* Left Side: Event Info & Fees */}
                    <div className="w-full md:w-5/12 lg:w-4/12 space-y-8 sticky top-28">

                        {/* Status Card */}
                        <div className="bg-[#0f0f12]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 shadow-[0_0_40px_-10px_rgba(124,58,237,0.1)] relative overflow-hidden group hover:border-violet-500/30 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-green-500/20 transition-all duration-500"></div>
                            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Tournament Status</h3>
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <p className="text-xl font-bold text-white tracking-wide font-display">REGISTRATION OPEN</p>
                            </div>
                        </div>

                        {/* Timeline & Fees Card - Tekken Style */}
                        <div className="relative pt-4">
                            {/* Header */}
                            <h3 className="text-white/50 text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3 ml-2">
                                <span className="w-8 h-[2px] bg-red-500"></span>
                                Entry Phases
                            </h3>

                            <div className="space-y-6">
                                {/* Early Bird - The "Gold" Slot */}
                                <div className="relative group cursor-default">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-500 skew-x-[-12deg]"></div>
                                    <div className="relative bg-[#1a1a1f] border-l-8 border-orange-500 p-6 transform skew-x-[-12deg] overflow-hidden hover:bg-[#25252b] transition-colors duration-300">

                                        {/* Background Texture */}
                                        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-orange-500/10 to-transparent"></div>

                                        {/* Content Wrapper (Unskew Text) */}
                                        <div className="transform skew-x-[12deg] flex justify-between items-center relative z-10">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-orange-400 font-extrabold text-sm uppercase italic tracking-wider">Early Bird</span>
                                                    <span className="bg-orange-500 text-black text-[10px] font-black px-2 py-0.5 rounded shadow-[0_0_10px_rgba(249,115,22,0.6)] uppercase italic">Best Value</span>
                                                </div>
                                                <p className="text-sm text-white font-bold tracking-wider font-sans drop-shadow-md">21 Jan - 18 Feb</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">PKR</p>
                                                <p className="text-4xl md:text-5xl font-black italic text-white leading-none drop-shadow-[0_2px_10px_rgba(249,115,22,0.3)]">1500</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Standard - The "Blue" Slot */}
                                <div className="relative group opacity-90 hover:opacity-100 transition-opacity">
                                    <div className="relative bg-[#121215] border-l-4 border-blue-500 p-5 transform skew-x-[-12deg] hover:bg-[#1a1a1f] transition-colors duration-300">
                                        <div className="transform skew-x-[12deg] flex justify-between items-center">
                                            <div>
                                                <span className="text-blue-400 font-bold text-sm uppercase italic tracking-wider block mb-1">Standard</span>
                                                <p className="text-sm text-gray-200 font-bold tracking-wider font-sans">18 Feb - 15 Mar</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl md:text-4xl font-black italic text-gray-200 leading-none">2000</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Last Call - The "Red" Slot */}
                                <div className="relative group opacity-75 hover:opacity-100 transition-opacity">
                                    <div className="relative bg-[#121215] border-l-4 border-gray-700 hover:border-red-500 p-5 transform skew-x-[-12deg] hover:bg-[#1a1a1f] transition-all duration-300">
                                        <div className="transform skew-x-[12deg] flex justify-between items-center">
                                            <div>
                                                <span className="text-red-500/70 group-hover:text-red-500 font-bold text-sm uppercase italic tracking-wider block mb-1 transition-colors">Last Call</span>
                                                <p className="text-sm text-gray-400 group-hover:text-gray-200 font-bold tracking-wider font-sans transition-colors">16 Mar - 26 Mar</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl md:text-4xl font-black italic text-gray-500 group-hover:text-gray-200 leading-none transition-colors">2500</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Registration Form */}
                    <div className="w-full md:w-7/12 lg:w-8/12">
                        <div className="bg-[#0f0f12]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

                            <div className="relative z-10 mb-10 border-b border-white/5 pb-8">
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tight uppercase font-display text-white mb-2 pb-2 leading-relaxed">
                                    Fighter <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] pr-2 filter drop-shadow-[0_0_15px_rgba(79,70,229,0.6)]">Registration</span>
                                </h2>
                                <p className="text-gray-400 text-sm font-medium tracking-wide">
                                    Enter your details to secure your slot in the Tekken 8 Face Off 2026.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Full Name */}
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors pl-1">Full Name <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            </div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[#121215]/80 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-600 outline-none transition-all duration-300 hover:border-white/20 focus:bg-[#1a1a20]"
                                                placeholder="Jin Kazama"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors pl-1">Email <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[#121215]/80 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-600 outline-none transition-all duration-300 hover:border-white/20 focus:bg-[#1a1a20]"
                                                placeholder="fighter@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors pl-1">WhatsApp <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                            </div>
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[#121215]/80 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-600 outline-none transition-all duration-300 hover:border-white/20 focus:bg-[#1a1a20]"
                                                placeholder="+92 3XX XXXXXXX"
                                            />
                                        </div>
                                    </div>

                                    {/* Coupon Code */}
                                    <div className="space-y-3 group">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors pl-1">Promo Code</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-500 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 044-4z" /></svg>
                                            </div>
                                            <input
                                                type="text"
                                                name="couponCode"
                                                value={formData.couponCode}
                                                onChange={handleChange}
                                                className="w-full bg-[#121215]/80 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 rounded-xl pl-12 pr-5 py-4 text-white placeholder-gray-600 outline-none transition-all duration-300 hover:border-white/20 focus:bg-[#1a1a20]"
                                                placeholder="TEKKEN2026"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Screenshot */}
                                <div className="space-y-4 pt-4 border-t border-white/5">

                                    {/* Bank Details Section - Phase 2 Electric DoJo */}
                                    <div className="relative mb-10 mt-2">

                                        {/* Outer Skewed Container */}
                                        <div className="relative transform skew-x-[-10deg] bg-[#0c0c10] border-l-4 border-orange-600 rounded-r-2xl overflow-hidden group/bank transition-all duration-500 hover:shadow-[0_0_50px_-10px_rgba(249,115,22,0.2)]">

                                            {/* Dynamic Background Elements */}
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                                            <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-orange-600/10 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-orange-600/0 via-orange-600/50 to-orange-600/0"></div>

                                            {/* Content Wrapper (Unskew) */}
                                            <div className="transform skew-x-[10deg] p-6 relative z-10">

                                                {/* Header */}
                                                <div className="flex items-center justify-between mb-8 pb-2 border-b border-white/5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-2 h-2 bg-orange-500 rotate-45 animate-pulse"></div>
                                                        <h4 className="text-sm font-black italic uppercase tracking-[0.2em] text-gray-200 group-hover/bank:text-orange-500 transition-colors">
                                                            Bank Transfer <span className="text-orange-600">Details</span>
                                                        </h4>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-orange-500/50 bg-orange-950/30 px-2 py-1 rounded border border-orange-500/10">SECURE_PAYMENT_GATEWAY</span>
                                                </div>

                                                <div className="space-y-6">

                                                    {/* Bank & Title Grid */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="group/item">
                                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block group-hover/item:text-orange-400 transition-colors">Bank Name</span>
                                                            <div className="text-white font-bold text-lg tracking-wide pl-3 border-l-2 border-orange-500/30 group-hover/item:border-orange-500 transition-all font-display">
                                                                United Bank Limited (UBL)
                                                            </div>
                                                        </div>
                                                        <div className="group/item">
                                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 block group-hover/item:text-orange-400 transition-colors">Account Title</span>
                                                            <div className="text-white font-bold text-lg tracking-wide pl-3 border-l-2 border-orange-500/30 group-hover/item:border-orange-500 transition-all font-display">
                                                                PATRONUM X PVT LTD
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Account Number - Big & Bold */}
                                                    <div className="bg-black/40 p-4 border border-white/5 rounded-lg group/acc hover:border-orange-500/30 transition-all relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-orange-500/10 to-transparent opacity-0 group-hover/acc:opacity-100 transition-opacity"></div>
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                                            <div>
                                                                <span className="text-[10px] text-gray-500 font-mono mb-1 block">ACCOUNT NUMBER</span>
                                                                <span className="font-mono text-3xl font-black text-white tracking-wider group-hover/acc:text-orange-400 transition-colors">312367802</span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => copyToClipboard('0312367802', 'Account Number')}
                                                                className="px-6 py-2 bg-white/5 hover:bg-orange-600 hover:text-black text-gray-300 text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-orange-500 transition-all skew-x-[-10deg] group/btn"
                                                            >
                                                                <span className="inline-block skew-x-[10deg]">Copy Number</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* IBAN */}
                                                    <div className="bg-black/40 p-4 border border-white/5 rounded-lg group/iban hover:border-blue-500/30 transition-all relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-blue-500/10 to-transparent opacity-0 group-hover/iban:opacity-100 transition-opacity"></div>
                                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                                            <div className="overflow-hidden">
                                                                <span className="text-[10px] text-gray-500 font-mono mb-1 block">IBAN </span>
                                                                <span className="font-mono text-sm md:text-lg font-bold text-gray-300 tracking-wider truncate block group-hover/iban:text-blue-400 transition-colors">PK89UNIL0109000312367802</span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => copyToClipboard('PK89UNIL0109000312367802', 'IBAN')}
                                                                className="px-6 py-2 bg-white/5 hover:bg-blue-600 hover:text-white text-gray-300 text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-blue-500 transition-all skew-x-[-10deg] shrink-0"
                                                            >
                                                                <span className="inline-block skew-x-[10deg]">Copy IBAN</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        {/* Notifications / Alerts - Stacked & Stylized */}
                                        <div className="space-y-4 mt-8 px-2">

                                            {/* WhatsApp Alert */}
                                            <div className="relative group/alert overflow-hidden">
                                                <div className="absolute inset-0 bg-blue-600/10 transform skew-x-[-10deg] border-l-4 border-blue-500 transition-colors group-hover/alert:bg-blue-600/20"></div>
                                                <div className="relative z-10 p-4 flex gap-4 items-center">
                                                    <div className="w-10 h-10 bg-blue-600/20 flex items-center justify-center rounded text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-0.5 animate-pulse">Action Required</p>
                                                        <p className="text-gray-300 text-xs">
                                                            Send proof to WhatsApp: <span className="text-white font-bold text-sm hover:text-blue-400 transition-colors cursor-pointer select-all">+92 333 8638325</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Confirmation Alert */}
                                            <div className="relative group/alert overflow-hidden">
                                                <div className="absolute inset-0 bg-emerald-600/10 transform skew-x-[-10deg] border-l-4 border-emerald-500 transition-colors group-hover/alert:bg-emerald-600/20"></div>
                                                <div className="relative z-10 p-4 flex gap-4 items-center">
                                                    <div className="w-10 h-10 bg-emerald-600/20 flex items-center justify-center rounded text-emerald-400 border border-emerald-500/30">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-0.5">Verification Pending</p>
                                                        <p className="text-gray-300 text-xs">
                                                            You will receive a confirmation call from <span className="text-emerald-400 font-bold">Patronum Esports</span>.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 block">Payment Proof <span className="text-red-500">*</span></label>
                                    <div className="relative group/upload">
                                        <input
                                            type="file"
                                            name="paymentScreenshot"
                                            id="paymentScreenshot"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="paymentScreenshot"
                                            className={`flex flex-col items-center justify-center w-full min-h-[160px] border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden ${formData.paymentScreenshot
                                                ? 'border-green-500/50 bg-green-500/10'
                                                : 'border-white/10 bg-[#121215]/50 hover:border-indigo-500/50 hover:bg-indigo-500/5'
                                                }`}
                                        >
                                            {/* Hover Glow */}
                                            <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover/upload:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                            <div className="text-center space-y-4 relative z-10 p-6">
                                                {formData.paymentScreenshot ? (
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                        </div>
                                                        <div>
                                                            <span className="font-bold text-white text-base block mb-1">{formData.paymentScreenshot.name}</span>
                                                            <span className="text-[10px] text-green-400 uppercase tracking-[0.2em] font-black bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Uploaded Successfully</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 group-hover/upload:border-indigo-500/50 group-hover/upload:bg-indigo-500/20 flex items-center justify-center mx-auto transition-all duration-300 shadow-xl group-hover/upload:shadow-indigo-500/20">
                                                            <svg className="w-8 h-8 text-gray-400 group-hover/upload:text-indigo-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-sm text-gray-200 font-bold tracking-wide group-hover/upload:text-white transition-colors">Click to upload screenshot</p>
                                                            <p className="text-[10px] text-gray-500 font-mono uppercase">JPG, PNG or GIF (MAX. 5MB)</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full h-16 mt-8 relative group/btn outline-none ${loading ? 'cursor-not-allowed grayscale' : 'cursor-pointer'}`}
                                >
                                    {/* Skewed Background Container */}
                                    <div className={`absolute inset-0 transform skew-x-[-20deg] border-2 transition-all duration-300 ${loading
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 border-blue-400/30 group-hover/btn:border-blue-400 group-hover/btn:shadow-[0_0_40px_rgba(59,130,246,0.5)]'
                                        }`}>
                                        {/* Glitch Overlay */}
                                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                                        {/* Animated Shine */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                                    </div>

                                    {/* Text Content (Unskewed) */}
                                    <span className="relative z-10 flex items-center justify-center gap-3 w-full h-full transform skew-x-[-20deg]">
                                        <span className={`font-black text-xl md:text-2xl uppercase italic tracking-[0.1em] transform skew-x-[20deg] flex items-center gap-3 ${loading ? 'text-gray-500' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'}`}>
                                            {loading ? 'Processing...' : (
                                                <>
                                                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300">Complete Registration</span>
                                                    <svg className="w-6 h-6 group-hover/btn:text-blue-300 group-hover/btn:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 12h15" />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                    </span>

                                    {/* Decorative Corner Accents */}
                                    {!loading && (
                                        <>
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/50 transform skew-x-[-20deg] translate-y-1 -translate-x-1 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/50 transform skew-x-[-20deg] -translate-y-1 translate-x-1 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tekken8FaceOff2026;
