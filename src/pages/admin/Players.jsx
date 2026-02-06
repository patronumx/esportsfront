import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/client';
import { Trash2, Download, Search, Shield, User, Gamepad2, Users, Plus, X, Send, Phone, MessageSquare, Mail } from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import FileUploader from '../../components/common/FileUploader';
import CustomSelect from '../../components/common/CustomSelect';
import { showToast } from '../../utils/toast';

const AdminPlayers = () => {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    // Selection State
    const [selectedPlayers, setSelectedPlayers] = useState(new Set());

    // Modals
    const [showAddModal, setShowAddModal] = useState(false);
    const [showBroadcastModal, setShowBroadcastModal] = useState(false);

    // Forms
    const [playerForm, setPlayerForm] = useState({
        ign: '', name: '', role: 'IGL', uid: '',
        instagram: '', twitter: '', discord: '', email: '', phone: '',
        avatarUrl: '', team: ''
    });

    const [broadcastData, setBroadcastData] = useState({ id: null, ign: '', message: '', isBulk: false });
    const [sendingBroadcast, setSendingBroadcast] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [playersRes, teamsRes] = await Promise.all([
                api.get('/admin/players'),
                api.get('/admin/teams?limit=100') // Get all teams for dropdown
            ]);
            setPlayers(playersRes.data.data || playersRes.data);
            setTeams(teamsRes.data.data || teamsRes.data);
        } catch (error) {
            console.error(error);
            showToast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/admin/players/${deleteId}`);
            fetchData();
            showToast.success('Player deleted successfully');
            setDeleteId(null);
        } catch (error) {
            console.error(error);
            showToast.error('Failed to delete player');
        }
    };

    const handleAddPlayer = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...playerForm,
                image: playerForm.avatarUrl,
                socialLinks: {
                    instagram: playerForm.instagram,
                    twitter: playerForm.twitter,
                    discord: playerForm.discord
                }
            };
            // Remove empty team to allow free agent
            if (!payload.team) delete payload.team;

            await api.post('/admin/players', payload);
            setShowAddModal(false);
            fetchData();
            setPlayerForm({ ign: '', name: '', role: 'IGL', uid: '', instagram: '', twitter: '', discord: '', email: '', phone: '', avatarUrl: '', team: '' });
            showToast.success('Player added successfully');
        } catch (error) {
            console.error(error);
            showToast.error('Failed to add player');
        }
    };

    const openBroadcastModal = (player) => {
        setBroadcastData({ id: player._id, ign: player.ign, message: '', isBulk: false });
        setShowBroadcastModal(true);
    };

    const openBulkBroadcastModal = () => {
        if (selectedPlayers.size === 0) return;
        setBroadcastData({ id: null, ign: `${selectedPlayers.size} Selected Players`, message: '', isBulk: true });
        setShowBroadcastModal(true);
    };

    const handleSendBroadcast = async (e) => {
        e.preventDefault();
        setSendingBroadcast(true);
        try {
            if (broadcastData.isBulk) {
                const playerIds = Array.from(selectedPlayers);
                const { data } = await api.post('/admin/players/broadcast-bulk', {
                    playerIds,
                    message: broadcastData.message
                });
                showToast.success(data.message);
                setSelectedPlayers(new Set()); // Clear selection
            } else {
                await api.post(`/admin/players/${broadcastData.id}/broadcast`, { message: broadcastData.message });
                showToast.success('Broadcast sent!');
            }
            setShowBroadcastModal(false);
        } catch (error) {
            console.error(error);
            showToast.error(error.response?.data?.message || 'Failed to send broadcast');
        } finally {
            setSendingBroadcast(false);
        }
    };


    const filteredPlayers = players.filter(player =>
        player.ign?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.realName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.team?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Selection Logic
    const toggleSelect = (id) => {
        const newSet = new Set(selectedPlayers);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedPlayers(newSet);
    };

    const toggleSelectAll = () => {
        if (selectedPlayers.size === filteredPlayers.length) {
            setSelectedPlayers(new Set());
        } else {
            const newSet = new Set(filteredPlayers.map(p => p._id));
            setSelectedPlayers(newSet);
        }
    };

    const teamOptions = teams.map(t => ({ value: t._id, label: t.name }));
    teamOptions.unshift({ value: '', label: 'Free Agent (No Team)' });

    const roles = ['IGL', 'Assaulter', 'Support', 'Fragger', 'Sniper', 'Filter'];

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight mb-1">
                        Player <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Management</span>
                    </h1>
                    <p className="text-gray-400 text-sm">Overview of all registered players across all teams.</p>
                </div>
                <div className="flex gap-3">
                    {selectedPlayers.size > 0 && (
                        <button
                            onClick={openBulkBroadcastModal}
                            className="px-4 py-2 bg-green-600 text-white rounded-xl flex items-center hover:bg-green-500 transition-colors shadow-lg shadow-green-600/20 font-bold animate-in fade-in zoom-in duration-200"
                        >
                            <Send className="mr-2 w-4 h-4" /> Message ({selectedPlayers.size})
                        </button>
                    )}
                    <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 font-bold">
                        <Plus className="mr-2 w-4 h-4" /> Add Player
                    </button>
                    <a href="https://esportsback-5f0e5dfa1bec.herokuapp.com/api/admin/export/players" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl flex items-center hover:bg-gray-700 transition-colors border border-white/5">
                        <Download className="mr-2 w-4 h-4" /> Export CSV
                    </a>
                </div>
            </div>

            {/* Search & Actions */}
            <div className="flex gap-4 items-center">
                <div className="relative group flex-grow">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search players by IGN, Real Name, or Team..."
                        className="w-full bg-black/20 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-blue-500/50 focus:bg-black/40 transition-all duration-300 backdrop-blur-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    onClick={toggleSelectAll}
                    className={`px-4 py-4 rounded-2xl border transition-all font-bold whitespace-nowrap ${selectedPlayers.size === filteredPlayers.length && filteredPlayers.length > 0 ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-black/20 border-white/5 text-gray-400 hover:text-white'}`}
                >
                    {selectedPlayers.size === filteredPlayers.length && filteredPlayers.length > 0 ? 'Deselect All' : 'Select All'}
                </button>
            </div>

            {/* Players Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPlayers.map(player => {
                    const isSelected = selectedPlayers.has(player._id);
                    return (
                        <div
                            key={player._id}
                            onClick={() => toggleSelect(player._id)}
                            className={`group relative bg-gray-900 rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-xl ${isSelected ? 'border-blue-500 ring-1 ring-blue-500/50 transform scale-[1.02]' : 'border-white/5 hover:border-blue-500/30'}`}
                        >
                            {/* Selection Indicator */}
                            <div className={`absolute top-4 right-4 z-20 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-600 bg-black/40'}`}>
                                {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                            </div>

                            {/* Background Gradient */}
                            <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-b transition-opacity duration-500 ${isSelected ? 'from-blue-900/40 opacity-100' : 'from-purple-900/20 opacity-50 group-hover:opacity-100'}`}></div>

                            <div className="p-6 relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-16 h-16 rounded-full bg-black border border-white/10 p-1 shadow-lg group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                        {player.image || player.avatarUrl ? (
                                            <img src={player.image || player.avatarUrl} alt={player.ign} className="w-full h-full object-cover rounded-full" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                                                <User className="w-8 h-8" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={e => e.stopPropagation()}>
                                        <button onClick={() => openBroadcastModal(player)} className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-colors" title="Send Broadcast">
                                            <Send className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(player._id)} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors" title="Delete Player">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-0.5">{player.ign}</h3>
                                <div className="text-sm text-gray-500 mb-4">{player.name || 'Unknown Name'}</div>

                                <div className="space-y-2">
                                    <Link to={`/sys-admin-secret-login/teams/${player.team?._id}`} onClick={e => e.stopPropagation()} className="bg-white/5 rounded-lg p-2 flex items-center justify-between border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="flex items-center text-xs text-gray-400 uppercase font-bold">
                                            <Shield className="w-3 h-3 mr-1.5" /> Team
                                        </div>
                                        <div className="text-blue-300 font-medium text-sm truncate max-w-[120px]">
                                            {player.team ? (
                                                <div className="flex items-center gap-1">
                                                    {player.team.logoUrl && <img src={player.team.logoUrl} className="w-4 h-4 rounded-full" />}
                                                    <span>{player.team.name}</span>
                                                </div>
                                            ) : 'Free Agent'}
                                        </div>
                                    </Link>
                                    <div className="bg-white/5 rounded-lg p-2 flex items-center justify-between border border-white/5">
                                        <div className="flex items-center text-xs text-gray-400 uppercase font-bold">
                                            <Gamepad2 className="w-3 h-3 mr-1.5" /> Role
                                        </div>
                                        <div className="text-white font-medium text-sm">{player.role || 'Player'}</div>
                                    </div>
                                    {(player.phone) && (
                                        <div className="bg-white/5 rounded-lg p-2 flex items-center justify-between border border-white/5">
                                            <div className="flex items-center text-xs text-gray-400 uppercase font-bold">
                                                <Phone className="w-3 h-3 mr-1.5" /> Phone
                                            </div>
                                            <div className="text-gray-300 font-mono text-xs">{player.phone}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Player Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-white/10 my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Add New Player</h2>
                            <button onClick={() => setShowAddModal(false)}><X className="text-gray-500 hover:text-white" /></button>
                        </div>
                        <form onSubmit={handleAddPlayer} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FileUploader label="Avatar" onUploadSuccess={(url) => setPlayerForm({ ...playerForm, avatarUrl: url })} />
                                <div className="space-y-4">
                                    <input type="text" placeholder="In-Game Name (IGN) *" className="w-full p-3 bg-black/20 rounded-lg border border-white/10 text-white focus:border-blue-500 outline-none" value={playerForm.ign} onChange={e => setPlayerForm({ ...playerForm, ign: e.target.value })} required />
                                    <input type="text" placeholder="Real Name" className="w-full p-3 bg-black/20 rounded-lg border border-white/10 text-white focus:border-blue-500 outline-none" value={playerForm.name} onChange={e => setPlayerForm({ ...playerForm, name: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CustomSelect label="Team" options={teamOptions} value={playerForm.team} onChange={(val) => setPlayerForm({ ...playerForm, team: val })} placeholder="Select Team (Optional)" />
                                <CustomSelect label="Role" options={roles} value={playerForm.role} onChange={(val) => setPlayerForm({ ...playerForm, role: val })} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="UID" className="w-full p-3 bg-black/20 rounded-lg border border-white/10 text-white focus:border-blue-500 outline-none" value={playerForm.uid} onChange={e => setPlayerForm({ ...playerForm, uid: e.target.value })} />
                                <input type="email" placeholder="Email" className="w-full p-3 bg-black/20 rounded-lg border border-white/10 text-white focus:border-blue-500 outline-none" value={playerForm.email} onChange={e => setPlayerForm({ ...playerForm, email: e.target.value })} />
                            </div>

                            <input type="text" placeholder="Phone Number (WhatsApp for notifications)" className="w-full p-3 bg-black/20 rounded-lg border border-white/10 text-white focus:border-blue-500 outline-none" value={playerForm.phone} onChange={e => setPlayerForm({ ...playerForm, phone: e.target.value })} />

                            <div className="space-y-2 pt-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Social Links</label>
                                <div className="grid grid-cols-3 gap-2">
                                    <input type="text" placeholder="Instagram" className="w-full p-2 bg-black/20 rounded border border-white/10 text-white text-sm" value={playerForm.instagram} onChange={e => setPlayerForm({ ...playerForm, instagram: e.target.value })} />
                                    <input type="text" placeholder="Twitter" className="w-full p-2 bg-black/20 rounded border border-white/10 text-white text-sm" value={playerForm.twitter} onChange={e => setPlayerForm({ ...playerForm, twitter: e.target.value })} />
                                    <input type="text" placeholder="Discord" className="w-full p-2 bg-black/20 rounded border border-white/10 text-white text-sm" value={playerForm.discord} onChange={e => setPlayerForm({ ...playerForm, discord: e.target.value })} />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500">Add Player</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Broadcast Modal */}
            {showBroadcastModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Send className="w-5 h-5" /> Send Broadcast</h2>
                            <button onClick={() => setShowBroadcastModal(false)}><X className="text-gray-500 hover:text-white" /></button>
                        </div>
                        <p className="text-sm text-gray-400 mb-1">Sending to: <span className="text-white font-bold">{broadcastData.ign}</span></p>
                        <p className="text-xs text-gray-500 mb-4">Message will be sent via WhatsApp</p>

                        <form onSubmit={handleSendBroadcast} className="space-y-4">
                            <textarea className="w-full p-3 h-32 bg-black/20 rounded-lg border border-white/10 text-white focus:border-green-500 outline-none resize-none" placeholder="Enter message..." value={broadcastData.message} onChange={e => setBroadcastData({ ...broadcastData, message: e.target.value })} required></textarea>
                            <button type="submit" disabled={sendingBroadcast} className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 flex justify-center items-center">
                                {sendingBroadcast ? 'Sending...' : 'Send Broadcast'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={deleteId !== null}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Player"
                message="Are you sure you want to delete this player? This action cannot be undone."
                confirmText="Delete"
                isDanger={true}
            />
        </div>
    );
};

export default AdminPlayers;
