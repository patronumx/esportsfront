import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import banner from '../../assets/events/hok.jpg';

const RiseOfMobaHOK = () => {
    const [teamName, setTeamName] = useState('');
    const [country, setCountry] = useState('Pakistan');
    const [players, setPlayers] = useState(
        Array(5).fill().map(() => ({ name: '', ign: '', phone: '', serverId: '', deviceName: '' }))
    );
    const [substitutes, setSubstitutes] = useState([]);
    const [loading, setLoading] = useState(false);

    const countries = ['Pakistan', 'Nepal', 'Bangladesh', 'India', 'Sri Lanka'];

    const handlePlayerChange = (index, field, value) => {
        const newPlayers = [...players];
        newPlayers[index][field] = value;
        setPlayers(newPlayers);
    };

    const handleSubstituteChange = (index, field, value) => {
        const newSubs = [...substitutes];
        newSubs[index][field] = value;
        setSubstitutes(newSubs);
    };

    const addSubstitute = () => {
        if (substitutes.length < 2) { // Limit to 2 subs for example
            setSubstitutes([...substitutes, { name: '', ign: '', phone: '', serverId: '', deviceName: '' }]);
        } else {
            toast.error("Maximum 2 substitutes allowed.");
        }
    };

    const removeSubstitute = (index) => {
        const newSubs = substitutes.filter((_, i) => i !== index);
        setSubstitutes(newSubs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (!teamName) {
            toast.error("Team Name is required");
            setLoading(false);
            return;
        }

        // Check if all main players have all fields filled
        const isPlayersValid = players.every(p => p.name && p.ign && p.phone && p.serverId && p.deviceName);
        if (!isPlayersValid) {
            toast.error("All fields for Main Roster are required.");
            setLoading(false);
            return;
        }

        // Check subtitles if any
        if (substitutes.length > 0) {
            const isSubsValid = substitutes.every(s => s.name && s.ign && s.phone && s.serverId && s.deviceName);
            if (!isSubsValid) {
                toast.error("All fields for Substitutes are required.");
                setLoading(false);
                return;
            }
        }

        try {
            // Using a relative path which will be proxied or full URL if configured
            // Assuming localhost or relative path based on setup
            // Since User's setup usually has proxy or cors, we'll try direct relative first if proxy set, or full
            // Looking at other files might help but standard axios call:
            await axios.post('http://localhost:5000/api/moba/register', {
                teamName,
                country,
                game: 'HOK',
                players,
                substitutes
            });

            toast.success("Registration has been successful. You will be informed about your matches schedule.");
            setLoading(false);
            // Optional: Reset form
            setTeamName('');
            setPlayers(Array(5).fill().map(() => ({ name: '', ign: '', phone: '', serverId: '', deviceName: '' })));
            setSubstitutes([]);

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed. Try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1a150b] text-white relative isolate selection:bg-yellow-500/30 font-sans">

            <div className="fixed inset-0 z-[-1]">
                <img
                    src={banner}
                    alt="HOK Banner"
                    className="w-full h-full object-cover opacity-80 fixed"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a150b]/95 via-[#1a150b]/80 to-[#1a150b]/90"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 mix-blend-overlay"></div>
            </div>

            <div className="pt-32 pb-24 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase font-display mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 drop-shadow-lg">
                        Honor of Kings
                    </h1>
                    <p className="text-yellow-500/80 font-bold tracking-[0.2em] uppercase text-sm">Team Registration</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-[#2a2215]/60 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-yellow-500/20 shadow-2xl">

                    {/* Team Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-yellow-500/10">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Team Name</label>
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="w-full bg-black/40 border border-yellow-500/20 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                                placeholder="Enter Team Name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Country</label>
                            <div className="relative">
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full bg-black/40 border border-yellow-500/20 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                                >
                                    {countries.map(c => <option key={c} value={c} className="bg-[#2a2215]">{c}</option>)}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-yellow-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Players */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-black italic uppercase text-white border-l-4 border-yellow-500 pl-3">Main Roster</h3>

                        {players.map((player, index) => (
                            <div key={index} className="bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-colors">
                                <h4 className="text-yellow-500/70 font-bold text-xs uppercase tracking-wider mb-4">Player {index + 1} {index === 0 && '(Captain)'}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        placeholder="Full Name"
                                        value={player.name}
                                        onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none"
                                        required
                                    />
                                    <input
                                        placeholder="In-Game Name (IGN)"
                                        value={player.ign}
                                        onChange={(e) => handlePlayerChange(index, 'ign', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none"
                                        required
                                    />
                                    <input
                                        placeholder="Phone Number / WhatsApp"
                                        value={player.phone}
                                        onChange={(e) => handlePlayerChange(index, 'phone', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none"
                                        required
                                    />
                                    <input
                                        placeholder="Server ID / User ID"
                                        value={player.serverId}
                                        onChange={(e) => handlePlayerChange(index, 'serverId', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none"
                                        required
                                    />
                                    <input
                                        placeholder="Device Model / Name"
                                        value={player.deviceName}
                                        onChange={(e) => handlePlayerChange(index, 'deviceName', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none md:col-span-2"
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Substitutes */}
                    <div className="space-y-6 pt-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black italic uppercase text-white border-l-4 border-gray-500 pl-3">Substitutes <span className="text-sm font-normal text-gray-500 not-italic normal-case ml-2">(Optional)</span></h3>
                            <button
                                type="button"
                                onClick={addSubstitute}
                                className="text-xs font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-500/20 transition-colors"
                            >
                                + Add Substitute
                            </button>
                        </div>

                        {substitutes.map((sub, index) => (
                            <div key={index} className="bg-black/20 p-6 rounded-2xl border border-white/5 relative group">
                                <button
                                    type="button"
                                    onClick={() => removeSubstitute(index)}
                                    className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <h4 className="text-gray-500 font-bold text-xs uppercase tracking-wider mb-4">Substitute {index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        placeholder="Full Name"
                                        value={sub.name}
                                        onChange={(e) => handleSubstituteChange(index, 'name', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none"
                                    />
                                    <input
                                        placeholder="In-Game Name (IGN)"
                                        value={sub.ign}
                                        onChange={(e) => handleSubstituteChange(index, 'ign', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none"
                                    />
                                    <input
                                        placeholder="Phone Number"
                                        value={sub.phone}
                                        onChange={(e) => handleSubstituteChange(index, 'phone', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none"
                                    />
                                    <input
                                        placeholder="Server ID"
                                        value={sub.serverId}
                                        onChange={(e) => handleSubstituteChange(index, 'serverId', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none"
                                    />
                                    <input
                                        placeholder="Device Model / Name"
                                        value={sub.deviceName}
                                        onChange={(e) => handleSubstituteChange(index, 'deviceName', e.target.value)}
                                        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-yellow-500/50 outline-none md:col-span-2"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl font-black uppercase tracking-[0.2em] text-white hover:from-yellow-500 hover:to-orange-500 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Complete Registration'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RiseOfMobaHOK;
