import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import banner from '../../assets/tekken8/banner.png';
import mlBanner from '../../assets/events/ml.png';
import hokBanner from '../../assets/events/hok.jpg';

const EVENTS = [
    {
        id: 'tekken8-faceoff-2026',
        slug: 'tekken8',
        name: 'Tekken 8 Face Off 2026',
        description: 'The ultimate battle for the Iron Fist Tournament.',
        banner: banner,
        apiEndpoint: '/api/tekken8',
        tokenKey: 'tekken8_admin_token'
    },
    {
        id: 'rise-of-moba-mlbb',
        slug: 'mlbb',
        name: 'Rise of Moba - MLBB',
        description: 'Mobile Legends: Bang Bang Tournament.',
        banner: mlBanner,
        apiEndpoint: '/api/moba/mlbb',
        tokenKey: 'moba_admin_token'
    },
    {
        id: 'rise-of-moba-hok',
        slug: 'hok',
        name: 'Rise of Moba - HOK',
        description: 'Honor of Kings Tournament.',
        banner: hokBanner,
        apiEndpoint: '/api/moba/hok',
        tokenKey: 'moba_admin_token'
    }
];

const EventsAdminDashboard = ({ forcedSlug }) => { // specific prop or from generic route
    const { gameId } = useParams(); // 'mlbb' or 'hok' or undefined
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [whatsappStatus, setWhatsappStatus] = useState({ status: 'disconnected', qrCode: null });
    const [showWhatsappModal, setShowWhatsappModal] = useState(false);
    const [verifyingId, setVerifyingId] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [confirmation, setConfirmation] = useState({ isOpen: false, title: '', message: '', onConfirm: null, isDangerous: false, confirmText: 'Confirm', cancelText: 'Cancel' });

    // Bulk Messaging State
    const [selectedIds, setSelectedIds] = useState([]);
    const [showBulkMessageModal, setShowBulkMessageModal] = useState(false);
    const [bulkMessageText, setBulkMessageText] = useState('');
    const [bulkSending, setBulkSending] = useState(false);

    // CSV Schedule State
    const [showCsvModal, setShowCsvModal] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [csvFile, setCsvFile] = useState(null);
    const [csvUploading, setCsvUploading] = useState(false);
    const [csvProgress, setCsvProgress] = useState({ sent: 0, total: 0, failed: 0 });
    const [csvLog, setCsvLog] = useState([]);

    const navigate = useNavigate();

    const handleEventSelect = (event) => {
        if (event.slug === 'tekken8') {
            navigate('/events/tekken8/admin/dashboard');
        } else if (event.slug === 'mlbb') {
            navigate('/events/moba/mlbb/admin/dashboard');
        } else if (event.slug === 'hok') {
            navigate('/events/moba/hok/admin/dashboard');
        } else {
            setSelectedEvent(event);
        }
    };

    useEffect(() => {
        // Priority: forcedSlug prop > gameId param
        const slug = forcedSlug || gameId;

        if (slug) {
            const event = EVENTS.find(e => e.slug === slug);
            if (event) {
                setSelectedEvent(event);
            } else if (slug === 'admin') {
                // Generic admin dashboard
            } else {
                toast.error('Event not found');
            }
        }
    }, [gameId, forcedSlug]);

    useEffect(() => {
        if (selectedEvent) {
            fetchRegistrations();
            fetchWhatsappStatus();
            // Poll WhatsApp status every 5 seconds if modal is open or status is not ready
            const interval = setInterval(() => {
                fetchWhatsappStatus();
            }, 5000);
            return () => clearInterval(interval);
        } else {
            setLoading(false); // Stop loading if no event is selected (selection view)
        }
    }, [selectedEvent]);

    const fetchRegistrations = async () => {
        if (!selectedEvent) return;
        setLoading(true);

        const token = localStorage.getItem(selectedEvent.tokenKey);

        if (!token) {
            // Redirect to appropriate login
            if (selectedEvent.slug === 'tekken8') {
                navigate('/events/tekken8/admin');
            } else if (selectedEvent.slug === 'mlbb') {
                navigate('/events/moba/mlbb/admin');
            } else if (selectedEvent.slug === 'hok') {
                navigate('/events/moba/hok/admin');
            } else {
                navigate('/events/admin');
            }
            return;
        }

        try {
            const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');
            const res = await axios.get(`${API_BASE}${selectedEvent.apiEndpoint}/registrations`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRegistrations(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                toast.error('Session Expired');
                localStorage.removeItem(selectedEvent.tokenKey);
                // Redirect logic same as above
                if (selectedEvent.slug === 'tekken8') {
                    navigate('/events/tekken8/admin');
                } else if (selectedEvent.slug === 'mlbb') {
                    navigate('/events/moba/mlbb/admin');
                } else if (selectedEvent.slug === 'hok') {
                    navigate('/events/moba/hok/admin');
                }
            } else {
                toast.error('Failed to load data');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchWhatsappStatus = async () => {
        if (!selectedEvent) return;
        const token = localStorage.getItem(selectedEvent.tokenKey);
        if (!token) return;

        try {
            const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');
            // NOTE: Assuming all events use same whatsapp endpoint structure relative to their API base
            // Does mobaRoutes support whatsapp status? 
            // The user wants 'Separate admin page just like Tekken'.
            // MobaRoutes currently DOES NOT have whatsapp integration.
            // I should safeguard this or add it to mobaRoutes if needed.
            // For now, I'll try-catch and ignore 404s for Moba unless added.
            const res = await axios.get(`${API_BASE}${selectedEvent.apiEndpoint}/admin/whatsapp/status`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWhatsappStatus(res.data);
        } catch (err) {
            // console.error("WhatsApp Status Error", err); 
            // Suppress error if route doesn't exist yet
        }
    };

    const isMoba = selectedEvent?.slug === 'mlbb' || selectedEvent?.slug === 'hok';

    const getContactDetails = (reg) => {
        if (isMoba) {
            const captain = reg.players?.[0] || {};
            return {
                name: captain.name || 'Captain',
                phone: captain.phone || '',
                display: reg.teamName
            };
        }
        return {
            name: reg.fullName,
            phone: reg.phoneNumber,
            display: reg.fullName
        };
    };

    const sendVerificationMessage = (registration) => {
        const token = localStorage.getItem(selectedEvent.tokenKey);
        if (!token) return;

        if (whatsappStatus.status !== 'ready') {
            toast.error('WhatsApp not connected! Please connect first.');
            setShowWhatsappModal(true);
            return;
        }

        const contact = getContactDetails(registration);
        const isResend = registration.isVerified;

        setConfirmation({
            isOpen: true,
            title: isResend ? 'Resend Verification?' : 'Send Verification?',
            message: isResend
                ? `Team is already verified. Send message again to ${contact.display}?`
                : `Send verification message to ${contact.display}?`,
            confirmText: 'Send Message',
            cancelText: 'Cancel',
            isDangerous: false,
            onConfirm: async () => {
                setVerifyingId(registration._id);
                const loadingToast = toast.loading(`Sending message to ${contact.display}...`);

                try {
                    const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

                    let message = '';
                    if (isMoba) {
                        message = `Salam ${contact.name}!\n\nYour registration for *${selectedEvent.name}* (Team: *${registration.teamName}*) has been verified ✅.\n\nYou will receive updates on your matches schedule very soon. Stay tuned!\n\nRegards,\n*Patronum Esports*`;
                    } else {
                        message = `Salam ${contact.name}!\n\nYour payment for *${selectedEvent.name}* has been verified ✅.\n\nYou will receive the update on your matches schedule very soon. Stay tuned!\n\nRegards,\n*Patronum Esports*`;
                    }

                    await axios.post(`${API_BASE}${selectedEvent.apiEndpoint}/admin/notify`, {
                        phoneNumber: contact.phone,
                        message,
                        registrationId: registration._id
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    // Update local state
                    setRegistrations(prev => prev.map(r => r._id === registration._id ? { ...r, isVerified: true } : r));

                    toast.success(`Message sent to ${contact.display}`, { id: loadingToast });
                } catch (err) {
                    console.error(err);
                    toast.error('Failed to send message', { id: loadingToast });
                } finally {
                    setVerifyingId(null);
                }
            }
        });
    };

    const sendBulkMessage = async () => {
        if (!bulkMessageText.trim()) return;
        setBulkSending(true);
        const token = localStorage.getItem(selectedEvent.tokenKey);
        const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

        let successCount = 0;
        let failCount = 0;

        for (const id of selectedIds) {
            const reg = registrations.find(r => r._id === id);
            if (!reg) continue;

            const contact = getContactDetails(reg);

            try {
                await axios.post(`${API_BASE}${selectedEvent.apiEndpoint}/admin/notify`, {
                    phoneNumber: contact.phone,
                    message: bulkMessageText,
                    registrationId: id
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                successCount++;
            } catch (err) {
                console.error(`Failed to message ${contact.display}`, err);
                failCount++;
            }
        }

        // Update isVerified for all selected
        setRegistrations(prev => prev.map(r => selectedIds.includes(r._id) ? { ...r, isVerified: true } : r));

        setBulkSending(false);
        setShowBulkMessageModal(false);
        setBulkMessageText('');
        setSelectedIds([]);
        toast.success(`Sent ${successCount} messages. ${failCount > 0 ? `${failCount} failed.` : ''}`);
    };

    // CSV Handling Functions
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setCsvFile(file);

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const rows = text.split('\n').map(row => row.split(','));
            // Standard CSV Parser: Expects Phone, Opponent, Date, Time (4 columns)
            // Remove header if present (check if first cell contains "Phone")
            let dataRows = rows.filter(row => row.length >= 4 && row[0].trim() !== '');
            if (dataRows.length > 0 && dataRows[0][0].toLowerCase().includes('phone')) {
                dataRows = dataRows.slice(1);
            }

            const parsedData = dataRows.map(row => ({
                phone: row[0]?.trim().replace(/\D/g, ''), // Clean non-digits
                opponent: row[1]?.trim(),
                date: row[2]?.trim(),
                time: row[3]?.trim()
            })).filter(item => item.phone && item.opponent && item.time);

            setCsvData(parsedData);
        };
        reader.readAsText(file);
    };

    const sendScheduleNotifications = async () => {
        if (csvData.length === 0) return;
        setCsvUploading(true);
        setCsvProgress({ sent: 0, total: csvData.length, failed: 0 });
        setCsvLog([]);

        const token = localStorage.getItem(selectedEvent.tokenKey);
        const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');

        let sent = 0;
        let failed = 0;
        const newLog = [];

        for (const [index, row] of csvData.entries()) {
            try {
                // Try to find the user name if possible, otherwise generic greeting
                const existingUser = registrations.find(r => r.phoneNumber.includes(row.phone) || row.phone.includes(r.phoneNumber));
                const name = existingUser ? existingUser.fullName : "Fighter";

                // Format: Salam [Name]! Your match against [Opponent] is scheduled for [Date] at [Time].
                const message = `Salam ${name}!\n\nYour match against *${row.opponent}* is scheduled for *${row.date}* at *${row.time}*.\n\nPlease be ready 15 minutes before your match time.\n\nRegards,\n*Patronum Esports*`;

                await axios.post(`${API_BASE}${selectedEvent.apiEndpoint}/admin/notify`, {
                    phoneNumber: row.phone,
                    message
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                sent++;
                newLog.push(`✅ Sent to ${row.phone} (${name})`);
            } catch (err) {
                console.error(`Failed CSV row ${index}`, err);
                failed++;
                newLog.push(`❌ Failed to ${row.phone}: ${err.message}`);
            }

            setCsvProgress({ sent, total: csvData.length, failed });
            setCsvLog(prev => [...prev, newLog[newLog.length - 1]]);

            // Add slight delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        setCsvUploading(false);
        toast.success(`Schedule Blast Complete! Sent: ${sent}, Failed: ${failed}`);
    };

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const handleUpdate = async () => {
        if (!editingUser) return;
        try {
            const token = localStorage.getItem(selectedEvent.tokenKey);
            const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');
            const res = await axios.put(`${API_BASE}${selectedEvent.apiEndpoint}/registration/${editingUser._id}`, editingUser, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update local state
            setRegistrations(registrations.map(reg => reg._id === editingUser._id ? res.data : reg));
            setEditingUser(null);
            toast.success('User updated successfully');
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update user');
        }
    };

    const handleDelete = (id) => {
        setConfirmation({
            isOpen: true,
            title: 'Delete Warrior?',
            message: 'Are you sure you want to delete this user? This action cannot be undone.',
            confirmText: 'Delete User',
            cancelText: 'Cancel',
            isDangerous: true,
            onConfirm: async () => {
                try {
                    const token = localStorage.getItem(selectedEvent.tokenKey);
                    const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api$/, '');
                    await axios.delete(`${API_BASE}${selectedEvent.apiEndpoint}/registration/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    // Update local state
                    setRegistrations(registrations.filter(reg => reg._id !== id));
                    toast.success('User deleted successfully');
                } catch (error) {
                    console.error('Delete failed:', error);
                    toast.error('Failed to delete user');
                }
            }
        });
    };

    const handleLogout = () => {
        if (selectedEvent) {
            localStorage.removeItem(selectedEvent.tokenKey);
            // Redirect based on event
            if (selectedEvent.slug === 'tekken8') {
                navigate('/events/tekken8/admin');
            } else if (selectedEvent.slug === 'mlbb') {
                navigate('/events/moba/mlbb/admin');
            } else if (selectedEvent.slug === 'hok') {
                navigate('/events/moba/hok/admin');
            } else {
                navigate('/events/admin');
            }
        } else {
            // Fallback clear all known
            localStorage.removeItem('tekken8_admin_token');
            localStorage.removeItem('moba_admin_token');
            navigate('/events/admin');
        }
    };

    const downloadCSV = () => {
        if (registrations.length === 0) return;

        let headers = [];
        let rows = [];

        if (isMoba) {
            headers = ['Team Name', 'Country', 'Captain Name', 'Captain IGN', 'Captain Phone', 'P1 Device', 'P2 Name', 'P2 IGN', 'P3 Name', 'P3 IGN', 'P4 Name', 'P4 IGN', 'P5 Name', 'P5 IGN', 'Date'];
            rows = registrations.map(reg => {
                const p = reg.players || [];
                return [
                    `"${reg.teamName}"`,
                    `"${reg.country}"`,
                    `"${p[0]?.name || ''}"`,
                    `"${p[0]?.ign || ''}"`,
                    `"${p[0]?.phone || ''}"`,
                    `"${p[0]?.deviceName || ''}"`,
                    `"${p[1]?.name || ''}"`,
                    `"${p[1]?.ign || ''}"`,
                    `"${p[2]?.name || ''}"`,
                    `"${p[2]?.ign || ''}"`,
                    `"${p[3]?.name || ''}"`,
                    `"${p[3]?.ign || ''}"`,
                    `"${p[4]?.name || ''}"`,
                    `"${p[4]?.ign || ''}"`,
                    `"${new Date(reg.createdAt).toLocaleString()}"`
                ];
            });
        } else {
            headers = ['Full Name', 'Email', 'Phone', 'Coupon Code', 'Date', 'Payment Screenshot URL'];
            rows = registrations.map(reg => [
                `"${reg.fullName}"`,
                `"${reg.email}"`,
                `"${reg.phoneNumber}"`,
                `"${reg.couponCode || ''}"`,
                `"${new Date(reg.createdAt).toLocaleString()}"`,
                `"${reg.paymentScreenshot}"`
            ]);
        }

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${selectedEvent.id}_registrations.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!selectedEvent) {
        // Event Selection View
        return (
            <div className="min-h-screen bg-[#050505] text-white p-6 pt-24 relative">
                {/* Simplified Background */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/90 via-[#0a0a10] to-[#050505]/90"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 w-full">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase font-display mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 inline-block pr-2">
                                Event Dashboard
                            </span>
                        </h1>
                        <p className="text-gray-400 uppercase tracking-widest text-xs md:text-sm">Select an event to manage</p>
                    </div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {EVENTS.map(event => (
                            <div
                                key={event.id}
                                onClick={() => handleEventSelect(event)}
                                className="group cursor-pointer relative bg-[#101015] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:-translate-y-1"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#101015] to-transparent z-10"></div>
                                    <img
                                        src={event.banner}
                                        alt={event.name}
                                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                                            Active
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 relative z-20">
                                    <h3 className="text-2xl font-black italic text-white mb-2 uppercase group-hover:text-orange-500 transition-colors">{event.name}</h3>
                                    <p className="text-sm text-gray-400 mb-6 line-clamp-2">{event.description}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex -space-x-2">
                                            {/* Placeholder for user avatars if needed */}
                                        </div>
                                        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                            Manage Event
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Default Dashboard View (Registration Table)
    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 pt-24 relative">
            {/* Background Banner with Overlay - Matches User Side */}
            <div className="fixed inset-0 z-0">
                <img
                    src={selectedEvent.banner}
                    alt="Event Banner"
                    className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow ml-2"
                    style={{ animationDuration: '20s' }}
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/90 via-[#050505]/40 to-[#050505]/90"></div>
                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-15 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Header Content */}
            <div className="max-w-[95%] mx-auto mb-6 relative z-10 pt-4">
                {!forcedSlug && (
                    <button
                        onClick={() => setSelectedEvent(null)}
                        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Events</span>
                    </button>
                )}

                <div className="text-center mb-6 relative group select-none">
                    <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-4 opacity-30"></div>
                    <h3 className="text-gray-200 font-sans font-bold tracking-[0.3em] text-sm md:text-lg uppercase mb-2 drop-shadow-md">Patronum Esports</h3>

                    <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase font-display mb-2 leading-[0.85]">
                        <span className="inline-block transform skew-x-[-10deg] hover:skew-x-[-4deg] transition-transform duration-500 origin-bottom">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] pr-4 py-4 block md:inline">
                                {selectedEvent.name.split(' ').slice(0, -1).join(' ')}
                            </span>
                        </span>
                        <span className="inline-block transform skew-x-[-10deg] hover:skew-x-[-4deg] transition-transform duration-500 delay-75 origin-bottom">
                            <span className="block md:inline md:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)] pr-4 py-4 brightness-110">ADMIN</span>
                        </span>
                    </h1>
                </div>

                {/* Toolbar */}
                <div className="flex justify-between items-center p-6 relative z-20 gap-6 flex-wrap md:flex-nowrap bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5 shadow-2xl">

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowBulkMessageModal(true)}
                            disabled={selectedIds.length === 0}
                            className={`group relative px-6 py-3 border text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded clip-path-slant ${selectedIds.length > 0
                                ? 'bg-orange-600 border-orange-500 text-white hover:bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]'
                                : 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'}`}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                {selectedIds.length > 0 ? `Message (${selectedIds.length})` : 'Message Selected'}
                            </span>
                        </button>

                        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

                        <button
                            onClick={downloadCSV}
                            className="group relative px-6 py-3 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                        >
                            <div className="flex items-center gap-2 relative z-10">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Export Database
                            </div>
                        </button>
                        <button
                            onClick={() => setShowCsvModal(true)}
                            className="group relative px-6 py-3 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/30 hover:border-blue-400 text-blue-400 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded hover:scale-105 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                        >
                            <div className="flex items-center gap-2 relative z-10">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Upload Schedule
                            </div>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowWhatsappModal(true)}
                            className={`group relative px-6 py-3 border ${whatsappStatus.status === 'ready' ? 'bg-green-500/10 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-red-500/10 border-red-500/50 text-red-500 animate-pulse'} hover:bg-white/5 transition-all rounded text-[10px] font-black uppercase tracking-[0.2em]`}
                        >
                            <div className="flex items-center gap-2 relative z-10">
                                <span className={`w-2 h-2 rounded-full ${whatsappStatus.status === 'ready' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,1)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]'}`}></span>
                                {whatsappStatus.status === 'ready' && whatsappStatus.user ? `Connected: +${whatsappStatus.user}` : whatsappStatus.status === 'ready' ? 'WhatsApp Online' : 'Connect WhatsApp'}
                            </div>
                        </button>

                        <button
                            onClick={handleLogout}
                            className="group relative px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all rounded shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Exit
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-[95%] mx-auto relative z-10">
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
                    <>
                        {isMoba ? (
                            /* MOBA CARD VIEW */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                                {
                                    registrations.map((reg) => {
                                        const captain = reg.players?.[0] || {};
                                        return (
                                            <div key={reg._id} className="bg-[#0a0a0f]/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative group hover:border-orange-500/50 transition-all overflow-hidden">
                                                {/* Selection Checkbox */}
                                                <div className="absolute top-4 right-4 z-20">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(reg._id)}
                                                        onChange={(e) => {
                                                            if (e.target.checked) setSelectedIds([...selectedIds, reg._id]);
                                                            else setSelectedIds(selectedIds.filter(id => id !== reg._id));
                                                        }}
                                                        className="w-5 h-5 rounded border-white/20 bg-black/40 checked:bg-orange-500 focus:ring-orange-500/50 cursor-pointer accent-orange-500"
                                                    />
                                                </div>

                                                {/* Team Header */}
                                                <div className="mb-6 border-b border-white/5 pb-4">
                                                    <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">{reg.country}</div>
                                                    <h3 className="text-2xl font-black italic text-white uppercase truncate pr-8" title={reg.teamName}>{reg.teamName}</h3>
                                                </div>

                                                {/* Players List */}
                                                <div className="space-y-4 mb-6">
                                                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                                        <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                                                            <svg className="w-3 h-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                            Team Roster
                                                        </div>
                                                        <span className="text-[10px] font-mono text-gray-600 font-bold">{reg.players?.length}/5</span>
                                                    </div>

                                                    <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar scroll-smooth">
                                                        {reg.players?.map((player, idx) => (
                                                            <div key={idx} className="group/player bg-black/20 hover:bg-white/[0.03] border border-white/5 hover:border-white/10 rounded-xl p-3 transition-all duration-300 relative overflow-hidden">
                                                                {/* Subtle highlight effect */}
                                                                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-orange-500/50 to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity"></div>

                                                                <div className="flex justify-between items-start mb-3">
                                                                    <div className="flex flex-col">
                                                                        <span className="text-gray-200 font-bold text-sm tracking-tight group-hover/player:text-white transition-colors">{player.name}</span>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                            <span className="text-[10px] font-mono text-orange-500/90 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/10 tracking-wide">
                                                                                {player.ign}
                                                                            </span>
                                                                            {idx === 0 && <span className="text-[8px] font-black uppercase text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20 tracking-wider">CPT</span>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="bg-emerald-900/10 border border-emerald-500/10 rounded-lg px-2 py-1 flex items-center gap-1.5 text-emerald-500/80 group-hover/player:border-emerald-500/30 group-hover/player:bg-emerald-900/20 transition-all">
                                                                            <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                                            <span className="text-[10px] font-mono tracking-wider">{player.phone}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-2 mt-2">
                                                                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col justify-center group-hover/player:bg-white/[0.04] transition-colors">
                                                                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-1">
                                                                            <svg className="w-2.5 h-2.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4a2 2 0 01-2-2m-2-4h.01M17 16h.01" /></svg>
                                                                            Server ID
                                                                        </span>
                                                                        <span className="text-gray-300 font-mono text-[10px] truncate pl-4">{player.serverId || '-'}</span>
                                                                    </div>
                                                                    <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2 flex flex-col justify-center text-right group-hover/player:bg-white/[0.04] transition-colors">
                                                                        <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1.5 justify-end mb-1">
                                                                            Device
                                                                            <svg className="w-2.5 h-2.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                                                        </span>
                                                                        <span className="text-gray-300 font-mono text-[10px] truncate pr-4" title={player.deviceName}>{player.deviceName || '-'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>



                                                {/* Actions */}
                                                <div className="grid grid-cols-2 gap-2 mt-auto">
                                                    <button
                                                        onClick={() => sendVerificationMessage(reg, 'captain')}
                                                        className={`py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${reg.isVerified
                                                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default'
                                                            : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                                            }`}
                                                        disabled={reg.isVerified || verifyingId === reg._id}
                                                    >
                                                        {verifyingId === reg._id ? (
                                                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        ) : (
                                                            <>Msg Captain <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></>
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() => sendVerificationMessage(reg, 'all')}
                                                        className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
                                                        disabled={verifyingId === reg._id}
                                                    >
                                                        Msg Team <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(reg._id)}
                                                        className="col-span-2 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg border border-red-500/20 transition-all text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2"
                                                    >
                                                        Delete Team <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            /* TEKKEN TABLE VIEW (Existing) */
                            <div className="overflow-hidden bg-[#0a0a0f]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_80px_-20px_rgba(0,0,0,0.7)] relative">
                                {/* Table Header Decoration */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gradient-to-r from-white/[0.01] via-white/[0.03] to-white/[0.01] border-b border-white/5">
                                                <th className="p-6 w-10">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.length === registrations.length && registrations.length > 0}
                                                        onChange={(e) => {
                                                            if (e.target.checked) setSelectedIds(registrations.map(r => r._id));
                                                            else setSelectedIds([]);
                                                        }}
                                                        className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-orange-500 focus:ring-orange-500/50 cursor-pointer accent-orange-500"
                                                    />
                                                </th>
                                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-orange-500/80">ID</th>
                                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Timestamp</th>
                                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Fighter Profile</th>
                                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Contact</th>
                                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Coupon</th>
                                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">Payment</th>
                                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">Verification</th>
                                                <th className="p-6 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {registrations.map((reg, index) => (
                                                <tr
                                                    key={reg._id}
                                                    className="group hover:bg-white/[0.02] transition-all duration-300 relative animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards hover:border-l-[3px] border-l-transparent hover:border-l-orange-500"
                                                    style={{ animationDelay: `${index * 50}ms` }}
                                                >
                                                    <td className="p-6">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedIds.includes(reg._id)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) setSelectedIds([...selectedIds, reg._id]);
                                                                else setSelectedIds(selectedIds.filter(id => id !== reg._id));
                                                            }}
                                                            className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-orange-500 focus:ring-orange-500/50 cursor-pointer accent-orange-500"
                                                        />
                                                    </td>
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
                                                                className="group/btn relative px-4 py-2 bg-violet-950/30 hover:bg-violet-900/50 border border-violet-500/30 hover:border-violet-400 rounded text-[10px] font-black uppercase tracking-[0.1em] transition-all shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] active:scale-95"
                                                            >
                                                                <span className="relative z-10 text-violet-400 group-hover/btn:text-white transition-colors">
                                                                    View Proof
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="flex justify-center">
                                                            <div className="flex justify-center">
                                                                <button
                                                                    onClick={() => sendVerificationMessage(reg)}
                                                                    disabled={verifyingId === reg._id}
                                                                    className={`group/btn relative w-full max-w-[140px] h-9 flex items-center justify-center transform skew-x-[-10deg] transition-all duration-300
                                                                        ${verifyingId === reg._id ? 'bg-gray-800/50 border border-gray-600 cursor-wait' :
                                                                            reg.isVerified
                                                                                ? 'bg-emerald-950/10 border border-emerald-500/20 text-emerald-500/80 cursor-default'
                                                                                : 'bg-black/40 border border-[#00ea88]/30 hover:border-[#00ea88] text-[#00ea88] hover:bg-[#00ea88] hover:text-black shadow-[0_0_15px_rgba(0,234,136,0.05)] hover:shadow-[0_0_30px_rgba(0,234,136,0.4)] active:scale-95'
                                                                        }`}
                                                                >
                                                                    <span className="relative z-10 flex items-center gap-2 font-black uppercase tracking-[0.25em] text-[10px] transform skew-x-[10deg]">
                                                                        {verifyingId === reg._id ? (
                                                                            <>
                                                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                                                                Sending...
                                                                            </>
                                                                        ) : reg.isVerified ? (
                                                                            <>
                                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                                                                Verified
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                Confirm
                                                                            </>
                                                                        )}
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-6">
                                                        <div className="flex justify-center gap-3">
                                                            <button
                                                                onClick={() => handleEdit(reg)}
                                                                className="p-2 text-blue-400 hover:text-white transition-colors"
                                                                title="Edit User"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(reg._id)}
                                                                className="p-2 text-red-400 hover:text-white transition-colors"
                                                                title="Delete User"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
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
                    </>
                )
                }
            </div >

            {/* Edit User Modal */}
            {
                editingUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-[#0f0f15] border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
                            <button
                                onClick={() => setEditingUser(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <h2 className="text-2xl font-black italic uppercase text-white mb-6 tracking-wide">
                                Edit <span className="text-orange-500">Warrior</span>
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={editingUser.fullName || editingUser.name || ''}
                                        onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value, name: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={editingUser.phoneNumber || editingUser.phone || ''}
                                        onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value, phone: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    />
                                </div>



                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={editingUser.email || ''}
                                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                                    />
                                </div>

                                <button
                                    onClick={handleUpdate}
                                    className="w-full py-4 mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black uppercase tracking-[0.2em] rounded-lg transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Confirmation Modal */}
            {
                confirmation.isOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-[#0f0f15] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] relative transform scale-100 animate-in zoom-in-95 duration-200">
                            <div className="flex flex-col items-center text-center">
                                {confirmation.isDangerous ? (
                                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20">
                                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-white mb-2">{confirmation.title}</h3>
                                <p className="text-gray-400 mb-8">{confirmation.message}</p>

                                <div className="flex gap-4 w-full">
                                    <button
                                        onClick={() => setConfirmation({ ...confirmation, isOpen: false })}
                                        className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors"
                                    >
                                        {confirmation.cancelText}
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirmation.onConfirm) confirmation.onConfirm();
                                            setConfirmation({ ...confirmation, isOpen: false });
                                        }}
                                        className={`flex-1 py-3 px-4 font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg ${confirmation.isDangerous
                                            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-900/20'
                                            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-blue-900/20'}`}
                                    >
                                        {confirmation.confirmText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Image Preview Modal */}
            {
                selectedImage && createPortal(
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
                )
            }

            {/* WhatsApp Connection Modal */}
            {
                showWhatsappModal && createPortal(
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
                        onClick={() => setShowWhatsappModal(false)}
                    >
                        <div className="relative max-w-md w-full bg-[#101014] border border-white/10 rounded-2xl p-6 shadow-2xl skew-x-[-1deg] ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-2">Connect WhatsApp</h3>
                                <p className="text-sm text-gray-400">Scan the QR code to link your automated messaging.</p>
                            </div>

                            <div className="flex flex-col items-center justify-center min-h-[300px] bg-white/5 rounded-xl border border-white/5 p-4 mb-6">
                                {whatsappStatus.status === 'ready' ? (
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <h4 className="text-lg font-bold text-white">Connected!</h4>
                                        <p className="text-xs text-gray-400 mt-2">
                                            {whatsappStatus.user ? `Linked to +${whatsappStatus.user}` : 'You can now send automated messages.'}
                                        </p>
                                    </div>
                                ) : whatsappStatus.qrCode ? (
                                    <img src={whatsappStatus.qrCode} alt="WhatsApp QR Code" className="w-64 h-64 object-contain rounded-lg" />
                                ) : (
                                    <div className="text-center">
                                        <div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                        <p className="text-xs text-gray-500">Generating QR Code...</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setShowWhatsappModal(false)}
                                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>,
                    document.body
                )
            }

            {/* Bulk Message Modal */}
            {
                showBulkMessageModal && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-[#0f0f15] border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
                            <button
                                onClick={() => setShowBulkMessageModal(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="text-orange-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                </span>
                                Bulk Message
                            </h2>
                            <p className="text-sm text-gray-400 mb-6">
                                Sending to <strong className="text-white">{selectedIds.length}</strong> selected warriors.
                            </p>

                            <div className="mb-6">
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message Content</label>
                                <textarea
                                    value={bulkMessageText}
                                    onChange={(e) => setBulkMessageText(e.target.value)}
                                    rows="6"
                                    placeholder="Enter your message here..."
                                    className="w-full bg-black/30 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-orange-500 transition-colors text-sm font-mono"
                                ></textarea>
                                <p className="text-[10px] text-gray-600 mt-2 text-right">Supports WhatsApp formatting (*bold*, _italic_)</p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowBulkMessageModal(false)}
                                    disabled={bulkSending}
                                    className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={sendBulkMessage}
                                    disabled={bulkSending || !bulkMessageText.trim()}
                                    className="flex-1 py-3 px-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2"
                                >
                                    {bulkSending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                            Send Blast
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* CSV Upload Modal */}
            {
                showCsvModal && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-[#0f0f15] border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative">
                            <button
                                onClick={() => setShowCsvModal(false)}
                                disabled={csvUploading}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="text-blue-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </span>
                                Upload Match Schedule
                            </h2>
                            <p className="text-sm text-gray-400 mb-6">
                                Upload a CSV file with columns: <code className="bg-white/10 px-1 rounded">Phone, Opponent, Date, Time</code>
                            </p>

                            {!csvFile ? (
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-10 text-center hover:border-blue-500/50 transition-colors bg-white/5">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="csv-upload"
                                    />
                                    <label htmlFor="csv-upload" className="cursor-pointer">
                                        <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        <p className="text-blue-400 font-bold uppercase tracking-wider">Click to Upload CSV</p>
                                        <p className="text-xs text-gray-500 mt-2">Example: 923001234567, Arslan Ash, 15/01/2026, 10:00 AM</p>
                                    </label>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-sm text-white font-mono">Found <span className="text-blue-400 font-bold">{csvData.length}</span> matches to schedule.</p>
                                        <p className="text-xs text-gray-500">File: {csvFile.name}</p>
                                    </div>

                                    <div className="bg-black/50 border border-white/5 rounded-lg max-h-48 overflow-y-auto mb-6 p-2">
                                        <table className="w-full text-left text-xs font-mono text-gray-400">
                                            <thead>
                                                <tr className="border-b border-white/10 text-gray-500">
                                                    <th className="p-2">Phone</th>
                                                    <th className="p-2">Opponent</th>
                                                    <th className="p-2">Date</th>
                                                    <th className="p-2">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {csvData.slice(0, 50).map((row, i) => (
                                                    <tr key={i} className="border-b border-white/5">
                                                        <td className="p-2 text-blue-400">{row.phone}</td>
                                                        <td className="p-2">{row.opponent}</td>
                                                        <td className="p-2">{row.date}</td>
                                                        <td className="p-2">{row.time}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {csvData.length > 50 && <p className="text-center text-[10px] text-gray-600 p-2">...and {csvData.length - 50} more</p>}
                                    </div>

                                    {csvUploading ? (
                                        <div className="space-y-4">
                                            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-blue-500 h-full transition-all duration-300"
                                                    style={{ width: `${(csvProgress.sent / csvProgress.total) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs font-mono">
                                                <span className="text-blue-400">Sending: {csvProgress.sent}/{csvProgress.total}</span>
                                                <span className="text-red-400">Failed: {csvProgress.failed}</span>
                                            </div>
                                            <div className="h-24 bg-black/80 rounded border border-white/5 p-2 overflow-y-auto font-mono text-[10px] text-gray-400">
                                                {csvLog.map((log, i) => (
                                                    <div key={i}>{log}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={sendScheduleNotifications}
                                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black uppercase tracking-[0.2em] rounded-lg transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                            Start Schedule Blast
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
            {/* CSV Upload Modal */}
            {
                showCsvModal && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-[#0f0f15] border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative">
                            <button
                                onClick={() => setShowCsvModal(false)}
                                disabled={csvUploading}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="text-blue-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                </span>
                                Upload Match Schedule
                            </h2>
                            <p className="text-sm text-gray-400 mb-6">
                                Upload a CSV file with columns: <code className="bg-white/10 px-1 rounded">Phone, Opponent, Date, Time</code>
                            </p>

                            {!csvFile ? (
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-10 text-center hover:border-blue-500/50 transition-colors bg-white/5">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        id="csv-upload"
                                    />
                                    <label htmlFor="csv-upload" className="cursor-pointer">
                                        <svg className="w-12 h-12 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        <p className="text-blue-400 font-bold uppercase tracking-wider">Click to Upload CSV</p>
                                        <p className="text-xs text-gray-500 mt-2">Example: 923001234567, Arslan Ash, 15/01/2026, 10:00 AM</p>
                                    </label>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <p className="text-sm text-white font-mono">Found <span className="text-blue-400 font-bold">{csvData.length}</span> matches to schedule.</p>
                                        <p className="text-xs text-gray-500">File: {csvFile.name}</p>
                                    </div>

                                    <div className="bg-black/50 border border-white/5 rounded-lg max-h-48 overflow-y-auto mb-6 p-2">
                                        <table className="w-full text-left text-xs font-mono text-gray-400">
                                            <thead>
                                                <tr className="border-b border-white/10 text-gray-500">
                                                    <th className="p-2">Phone</th>
                                                    <th className="p-2">Opponent</th>
                                                    <th className="p-2">Date</th>
                                                    <th className="p-2">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {csvData.slice(0, 50).map((row, i) => (
                                                    <tr key={i} className="border-b border-white/5">
                                                        <td className="p-2 text-blue-400">{row.phone}</td>
                                                        <td className="p-2">{row.opponent}</td>
                                                        <td className="p-2">{row.date}</td>
                                                        <td className="p-2">{row.time}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {csvData.length > 50 && <p className="text-center text-[10px] text-gray-600 p-2">...and {csvData.length - 50} more</p>}
                                    </div>

                                    {csvUploading ? (
                                        <div className="space-y-4">
                                            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-blue-500 h-full transition-all duration-300"
                                                    style={{ width: `${(csvProgress.sent / csvProgress.total) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between text-xs font-mono">
                                                <span className="text-blue-400">Sending: {csvProgress.sent}/{csvProgress.total}</span>
                                                <span className="text-red-400">Failed: {csvProgress.failed}</span>
                                            </div>
                                            <div className="h-24 bg-black/80 rounded border border-white/5 p-2 overflow-y-auto font-mono text-[10px] text-gray-400">
                                                {csvLog.map((log, i) => (
                                                    <div key={i}>{log}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={sendScheduleNotifications}
                                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black uppercase tracking-[0.2em] rounded-lg transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                            Start Schedule Blast
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default EventsAdminDashboard;
