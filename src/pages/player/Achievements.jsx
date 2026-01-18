import { useState, useEffect } from 'react';
import api from '../../api/client';
import { Trophy, Plus, Trash2, Edit2, Award, Star, Save, X, Video, Play, ExternalLink } from 'lucide-react';
import { showToast } from '../../utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

const PlayerAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        event: '',
        placement: '',
        description: '',
        montageLink: ''
    });

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const { data } = await api.get('/player/achievements');
            setAchievements(data || []);
        } catch (error) {
            console.error('Failed to fetch achievements', error);
            // showToast.error('Failed to load achievements');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (index = null) => {
        if (index !== null) {
            const achievement = achievements[index];
            setFormData({
                title: achievement.title,
                event: achievement.event || '',
                placement: achievement.placement || '',
                description: achievement.description || '',
                montageLink: achievement.montageLink || ''
            });
            setEditingIndex(index);
        } else {
            setFormData({
                title: '',
                event: '',
                placement: '',
                description: '',
                montageLink: ''
            });
            setEditingIndex(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingIndex(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let updatedAchievements = [...achievements];
            if (editingIndex !== null) {
                updatedAchievements[editingIndex] = formData;
            } else {
                updatedAchievements = [...updatedAchievements, formData];
            }

            const { data } = await api.put('/player/achievements', { achievements: updatedAchievements });
            setAchievements(data);
            showToast.success(editingIndex !== null ? 'Achievement updated!' : 'Achievement added!');
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save achievement', error);
            showToast.error('Failed to save achievement');
        }
    };

    const handleDelete = async (index) => {
        if (!window.confirm('Are you sure you want to delete this achievement?')) return;
        try {
            const updatedAchievements = achievements.filter((_, i) => i !== index);
            const { data } = await api.put('/player/achievements', { achievements: updatedAchievements });
            setAchievements(data);
            showToast.success('Achievement deleted');
        } catch (error) {
            console.error('Failed to delete achievement', error);
            showToast.error('Failed to delete achievement');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tight uppercase leading-normal">
                        Career <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 pr-6">Highlights</span>
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base font-medium mt-1">Showcase your tournament wins and professional milestones.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-violet-900/20 active:scale-95 group"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Add Achievement</span>
                </button>
            </div>

            {/* Achievements List */}
            {achievements.length === 0 ? (
                <div className="bg-[#0a0a0a] border border-dashed border-white/10 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                        <Trophy className="w-10 h-10 text-gray-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">No achievements yet</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto px-4">Start building your legacy by adding your tournament history and awards.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="text-violet-400 hover:text-violet-300 font-bold hover:underline transition-all"
                    >
                        Add your first highlight
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx}
                            className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6 relative group overflow-hidden hover:border-violet-500/30 transition-all duration-300 shadow-xl"
                        >
                            <div className="absolute top-0 right-0 p-20 bg-violet-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-violet-500/10 transition-colors" />

                            <div className="relative z-10 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="p-3 bg-violet-500/10 rounded-2xl border border-violet-500/10 group-hover:scale-110 transition-transform duration-300">
                                        <Award className="w-6 h-6 text-violet-400" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleOpenModal(idx)} className="p-2 text-gray-500 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(idx)} className="p-2 text-gray-500 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-1">{item.placement || 'Participant'}</div>
                                    <h3 className="text-xl font-black text-white leading-tight uppercase tracking-tight">{item.title}</h3>
                                    <div className="text-sm text-gray-400 font-medium mt-1">{item.event}</div>
                                </div>

                                {item.description && (
                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 italic">"{item.description}"</p>
                                )}

                                <div className="flex items-center justify-end pt-4 border-t border-white/5">
                                    {item.montageLink && (
                                        <a
                                            href={item.montageLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 rounded-lg transition-all text-[10px] font-black uppercase tracking-tighter group/link"
                                        >
                                            <Play className="w-3 h-3 fill-current" />
                                            WATCH MONTAGE
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-10 w-full max-w-lg shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />

                            <div className="flex justify-between items-center mb-8 relative z-10">
                                <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                                    {editingIndex !== null ? 'Edit Achievement' : 'New Achievement'}
                                </h2>
                                <button onClick={handleCloseModal} className="p-2 text-gray-500 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Achievement Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all font-medium"
                                            placeholder="e.g. MVP Finalist"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Placement</label>
                                        <input
                                            type="text"
                                            value={formData.placement}
                                            onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all font-medium"
                                            placeholder="e.g. 1st Place"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Tournament / Event</label>
                                        <input
                                            type="text"
                                            value={formData.event}
                                            onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all font-medium"
                                            placeholder="e.g. PMCO Spring Split"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Brief Description</label>
                                        <textarea
                                            rows="2"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all font-medium resize-none"
                                            placeholder="Mention highlights or individual performance..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Montage / Video Link (YouTube/TikTok/Insta)</label>
                                        <div className="relative">
                                            <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="url"
                                                value={formData.montageLink}
                                                onChange={(e) => setFormData({ ...formData, montageLink: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:border-violet-500/50 focus:bg-white/10 outline-none transition-all font-medium"
                                                placeholder="e.g. https://www.instagram.com/reels/..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-violet-900/20 hover:shadow-violet-900/40 flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{editingIndex !== null ? 'Update Achievement' : 'Save Achievement'}</span>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PlayerAchievements;
