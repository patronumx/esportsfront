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
            const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tekken8/register`, submitData, {
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
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1 block">Payment Proof <span className="text-red-500">*</span></label>
                                    <div className="relative group/upload">
                                        <input
                                            type="file"
                                            name="paymentScreenshot"
                                            id="paymentScreenshot"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            required
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
                                    className={`w-full py-5 mt-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all duration-300 transform border border-white/20 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] relative overflow-hidden group/btn ${loading
                                        ? 'bg-gray-800 cursor-not-allowed text-gray-500'
                                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:scale-[1.02]'
                                        }`}
                                >
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-all duration-700 ease-in-out skew-x-[-20deg]"></div>

                                    <span className="relative z-10 flex items-center justify-center gap-4 drop-shadow-md">
                                        {loading ? 'Processing...' : 'Complete Registration'}
                                        {!loading && (
                                            <svg className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        )}
                                    </span>
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
