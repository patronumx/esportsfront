import React, { useEffect, useState } from 'react';
import api from '../../api/client';
import { Search, Filter, User, Briefcase, Clock, Calendar, Smartphone, Instagram, Phone, Trophy, X, ExternalLink, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROLES = ['Role', 'IGL', 'Assaulter', 'Support', 'Fragger'];
const EXPERIENCES = ['Experience', '1 Year', '2 Years', '3 Years', '4 Years', '5+ Years'];

const ScoutPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        role: 'Role',
        experience: 'Experience',
        search: '',
        age: '', // exact age for now
        device: ''
    });

    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [showAchievements, setShowAchievements] = useState(false);

    useEffect(() => {
        fetchPlayers();
    }, [filters]); // Debouncing would be better in prod, but fine for now

    const fetchPlayers = async () => {
        setLoading(true);
        try {
            // Build query params
            const params = new URLSearchParams();
            if (filters.role !== 'Role') params.append('role', filters.role);
            if (filters.experience !== 'Experience') params.append('experience', filters.experience);
            if (filters.age) params.append('age', filters.age);
            if (filters.search) params.append('search', filters.search);
            if (filters.device) params.append('device', filters.device);

            const { data } = await api.get(`/team/scout?${params.toString()}`);
            setPlayers(data);
        } catch (error) {
            console.error('Error fetching players:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">

            {/* Header & Nav */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-1">Scout Players</h1>
                    <p className="text-slate-400 text-sm">Find the perfect free agent for your roster</p>
                </div>
                <div className="flex bg-zinc-900 rounded-lg p-1 border border-white/10">
                    <Link to="/team/dashboard" className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-md">Dashboard</Link>
                    <Link to="/team/roster" className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-md">My Roster</Link>
                    <div className="px-4 py-2 text-sm text-black bg-white font-bold rounded-md shadow-lg cursor-default">Scout</div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-4 mb-8 sticky top-4 z-20 shadow-2xl shadow-black/50 backdrop-blur-xl">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search by Name/IGN..."
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-violet-500 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Role Filter */}
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                        <select
                            name="role"
                            value={filters.role}
                            onChange={handleFilterChange}
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-violet-500 focus:outline-none appearance-none cursor-pointer"
                        >
                            {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                        </select>
                    </div>

                    {/* Experience Filter */}
                    <div className="relative">
                        <Clock className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                        <select
                            name="experience"
                            value={filters.experience}
                            onChange={handleFilterChange}
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-violet-500 focus:outline-none appearance-none cursor-pointer"
                        >
                            {EXPERIENCES.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                        </select>
                    </div>

                    {/* Age Filter */}
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                        <input
                            type="number"
                            name="age"
                            value={filters.age}
                            onChange={handleFilterChange}
                            placeholder="Age (Exact)"
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-violet-500 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Device Filter */}
                    <div className="relative">
                        <Smartphone className="absolute left-3 top-3 text-gray-500 w-4 h-4" />
                        <input
                            type="text"
                            name="device"
                            value={filters.device}
                            onChange={handleFilterChange}
                            placeholder="Device (e.g. iPhone)"
                            className="w-full bg-[#1a1a1a] border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-violet-500 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Players Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {players.length > 0 ? (
                        players.map(player => (
                            <div key={player._id} className="relative group overflow-hidden">
                                {/* Border Glow Effect */}
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative bg-[#080808]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 lg:p-8 transition-all duration-300 group-hover:bg-white/[0.02]">
                                    <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center">

                                        {/* Avatar and Primary Identity */}
                                        <div className="flex items-center gap-6 min-w-[300px]">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-2xl bg-zinc-900 flex-shrink-0 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-violet-500/50 transition-all duration-500 group-hover:rotate-3">
                                                    {player.avatarUrl ? (
                                                        <img src={player.avatarUrl} alt={player.ign} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-10 h-10 text-zinc-700" />
                                                    )}
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                                                    <Smartphone className="w-4 h-4 text-violet-500" />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-violet-400 transition-all duration-300">
                                                    {player.ign}
                                                </h3>
                                                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">{player.name || 'Anonymous Player'}</p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-lg text-[10px] font-black text-violet-400 uppercase tracking-widest">
                                                        {player.role || 'Unassigned'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:w-auto p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                                            <div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Age</div>
                                                <div className="text-lg font-black text-white italic">
                                                    {player.age ? `${player.age}Y` : '--'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Experience</div>
                                                <div className="text-lg font-black text-white italic">
                                                    {player.experience || '--'}
                                                </div>
                                            </div>
                                            <div className="col-span-2 lg:col-span-1">
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Device</div>
                                                <div className="text-sm font-bold text-gray-300 truncate" title={player.device}>
                                                    {player.device || '--'}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions Section */}
                                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-48">
                                            <button
                                                onClick={() => {
                                                    setSelectedPlayer(player);
                                                    setShowAchievements(true);
                                                }}
                                                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all group/btn shadow-lg shadow-amber-500/5"
                                            >
                                                <Trophy className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                                                Achievements
                                            </button>

                                            <div className="flex gap-2 flex-1">
                                                {player.phone && (
                                                    <a
                                                        href={`https://wa.me/${player.phone.replace(/\D/g, '').startsWith('0') ? '92' + player.phone.slice(1) : player.phone.replace(/\D/g, '')}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all shadow-lg shadow-emerald-500/5"
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                        </svg>
                                                        WhatsApp
                                                    </a>
                                                )}
                                                {player.socialLinks?.instagram && (
                                                    <a href={player.socialLinks.instagram} target="_blank" rel="noreferrer" className="p-4 bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-2xl hover:bg-pink-500 hover:text-black transition-all flex-shrink-0">
                                                        <Instagram className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#111] rounded-3xl border border-white/5">
                            <div className="bg-zinc-900 p-6 rounded-full mb-4">
                                <Search className="w-12 h-12 text-zinc-700" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No players found</h3>
                            <p className="text-slate-500 max-w-md mx-auto">Try adjusting your filters or search terms.</p>
                            <button onClick={() => setFilters({ role: 'Role', experience: 'Experience', search: '', device: '', age: '' })} className="mt-6 text-violet-400 hover:text-violet-300 font-bold text-sm">Clear Filters</button>
                        </div>
                    )}
                </div>
            )}

            {/* Achievements Modal */}
            {
                showAchievements && selectedPlayer && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 animate-in fade-in duration-300">
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative">
                            {/* Modal Header */}
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-violet-500/10 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                        <Trophy className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">
                                            {selectedPlayer.ign}'s <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Achievements</span>
                                        </h2>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Career Highlights & Awards</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowAchievements(false)}
                                    className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl transition-all border border-white/5"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                {selectedPlayer.achievements && selectedPlayer.achievements.length > 0 ? (
                                    selectedPlayer.achievements.map((achievement, idx) => (
                                        <div key={idx} className="group/item relative bg-white/[0.02] border border-white/5 rounded-3xl p-6 transition-all hover:bg-white/[0.04] hover:border-amber-500/30">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black text-amber-400 uppercase tracking-widest">
                                                        #{achievement.placement || 'TBA'}
                                                    </div>
                                                    <h3 className="text-2xl font-black text-white italic tracking-tight uppercase leading-tight group-hover/item:text-amber-400 transition-colors">
                                                        {achievement.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                                                        <Briefcase className="w-4 h-4 text-violet-500" />
                                                        {achievement.event}
                                                    </div>
                                                    {achievement.description && (
                                                        <p className="text-gray-500 text-sm leading-relaxed mt-4 max-w-lg">
                                                            {achievement.description}
                                                        </p>
                                                    )}
                                                </div>

                                                {achievement.montageLink && (
                                                    <a
                                                        href={achievement.montageLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-shrink-0 flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-violet-600/20"
                                                    >
                                                        <PlayCircle className="w-5 h-5" />
                                                        Watch Montage
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
                                        <Trophy className="w-16 h-16 text-gray-600 mb-4" />
                                        <p className="text-gray-400 font-bold italic uppercase tracking-widest">No achievements recorded yet</p>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 bg-white/[0.02] border-t border-white/5 text-center">
                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">End of Transmission</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default ScoutPlayers;
