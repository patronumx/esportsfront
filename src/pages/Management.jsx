import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaGamepad, FaMapMarkerAlt, FaBirthdayCake, FaFlag, FaYoutube, FaInstagram, FaStar, FaMedal, FaHistory, FaArrowLeft, FaHandshake, FaBriefcase, FaEnvelope, FaPhone, FaLinkedin, FaTools } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Hyperspeed from '../components/Hyperspeed';

// Assets
import saadImg from '../assets/management/SAAD.png';
import maazImg from '../assets/management/maz.png';
import abdImg from '../assets/management/abd.png';
import javsImg from '../assets/management/javs.png';
import logo from '../assets/logo.png';

// --- DATA ---
const players = [
    {
        id: 'saad-aziz',
        name: 'Saad Aziz',
        nickname: 'Saad Aziz',
        role: 'National Team Manager - Esports',
        image: saadImg,
        imageClass: 'scale-[1.5] translate-y-2', // Zoomed in for Saad
        achievements: {
            wins: [
                // Extracted from "Key Capabilities" & "Experience" as highlights
                { year: "Present", name: "National Team Operations & Player Selection", rank: "Lead" },
                { year: "Present", name: "Team Ashes Manager & Operations Lead", rank: "Lead" },
                { year: "2019-Present", name: "Esports Operations & Player Representation", rank: "Lead" },
            ],
            runnerUps: [],
            notable: [
                { year: "2024", name: "Tekken 8 Esports World Cup 2024 LCQ", rank: "90th/270" },
                { year: "Various", name: "Baaz Gauntlet, Ashes Showdown, Baaz Havoc", rank: "Organizer" },
            ]
        },
        stats: {
            yearsActive: "4+",
            majorTitles: "Mgr"
        },
        bio: {
            gamingTag: "Saad Aziz",
            startedPlaying: "2019", // Based on experience start
            rank: "Manager",
            location: "Lahore, Pakistan",
            born: "N/A",
            influence: "Management"
        },
        socials: {
            email: { value: "Email", sub: "Contact", link: "mailto:phantomEsports7223@gmail.com" },
            phone: { value: "Phone", sub: "Contact", link: "tel:+923137396135" },
            instagram: { value: "ig", sub: "Instagram", link: "https://www.instagram.com/phantom_7223/" },
            linkedin: { value: "in", sub: "LinkedIn", link: "https://www.linkedin.com/in/saad-aziz-a71111328/" },
        },
        characters: [], // No characters for manager
        heroTitle: {
            top: "National Team Manager",
            namePart1: "Saad",
            namePart2: "Aziz"
        },
        badges: [
            "NATIONAL TEAM MANAGER",
            "OPERATIONS LEAD"
        ],
        highlight: {
            title: "Esports Operations Specialist",
            description: <>National team and esports operations manager with hands-on experience across Pakistan's competitive ecosystem. Proven background in player management, tournament operations, and multi-title coordination across Fighting Games, MOBA, and mobile esports. Adept at stakeholder coordination, talent identification, and maintaining competitive integrity aligned with international standards.</>
        },
        sponsorships: [
            { year: "2022-Present", name: "TEAM ASHES", fullName: "Team Ashes", description: "Led team operations including player coordination, tournament participation, and liaison with organizers and partners. Supervised content and media operations aligned with competitive calendars." },
            { year: "2019-Present", name: "Freelance", fullName: "Social Media Manager & Content Specialist", description: "Managed social media accounts for high-profile esports athletes including Arslan Ash, Joe Crush, Atif Butt, and Joka. Developed content strategies and edited videos." },
            { year: "Contract", name: "NASR Esports", fullName: "YouTube Manager", description: "Previously contracted with NASR Esports to manage YouTube channels for players Angry Bird & Big Bird." }
        ],
        skills: [
            "National Team Operations & Player Selection",
            "Tournament & Event Operations (Online & LAN)",
            "Multi-Title Ecosystem Management (FGC, MOBA, Mobile)",
            "Stakeholder Coordination",
            "Adobe Premiere Pro, Photoshop",
            "Social Media Management",
            "Team Management",
            "Gaming Knowledge: Tekken, SF, KOF, Mobile Legends, DOTA, PUBG, etc."
        ]
    },
    {
        id: 'muhammad-maaz',
        name: 'Muhammad Maaz',
        nickname: 'Maaz',
        role: 'Head of Operations - Patronum Esports',
        image: maazImg,
        imageClass: 'scale-[2.0] translate-y-3 -translate-x-3', // Increased zoom for Maaz
        achievements: {
            wins: [
                { year: "Present", name: "Patronum Esports Head Ops", rank: "Lead" },
                { year: "2025", name: "National Team Program Builder (HOK/MLBB)", rank: "Director" },
                { year: "2022-23", name: "Pro Scrims Pakistan Event Manager", rank: "Lead" },
            ],
            runnerUps: [],
            notable: [
                { year: "2025", name: "Esports World Cup Content Creator", rank: "Creator" },
            ]
        },
        stats: {
            yearsActive: "6+",
            majorTitles: "HOP"
        },
        bio: {
            gamingTag: "Maaz",
            startedPlaying: "2020",
            rank: "Head of Operations",
            location: "Islamabad, Pakistan",
            born: "N/A",
            influence: "Operations"
        },
        socials: {
            email: { value: "Email", sub: "Contact", link: "mailto:businessmaz17@gmail.com" },
            phone: { value: "Phone", sub: "Contact", link: "https://wa.me/923247904543" },
            linkedin: { value: "in", sub: "LinkedIn", link: "https://www.linkedin.com/in/muhammad-maaz-96b8983a7/" },
            instagram: { value: "ig", sub: "Instagram", link: "https://www.instagram.com/maazzz2026/" },
        },
        characters: [],
        heroTitle: {
            top: "Head of Operations",
            namePart1: "Muhammad",
            namePart2: "Maaz"
        },
        badges: [
            "HEAD OF OPS",
            "EVENT STRATEGIST"
        ],
        highlight: {
            title: "Esports Operations Strategist",
            description: <>A passionate esports professional with experience in event management, team development, and content creation. Specializing in managing high-level esports events and player development programs to contribute to the growth of competitive gaming in Pakistan and South Asia. Proven track record with Patronum Esports and Pro Scrims Pakistan.</>
        },
        sponsorships: [
            { year: "Nov 2025-Present", name: "Patronum Esports", fullName: "Head of Operations", description: "Leading Patronum Esports operations, partnerships, and strategic initiatives. directing national team programs for HOK and MLBB. Developing professional training frameworks and cultivating relationships with top clubs." },
            { year: "Oct 2025-Present", name: "Patronum X Pvt. Ltd.", fullName: "Head of Technology", description: "Leading the development and execution of innovative software solutions and SaaS products. Managing the tech team to drive development of cutting-edge applications and platforms. Focusing on robust infrastructure, seamless integration, and scalable solutions." },
            { year: "2025", name: "Esports World Cup", fullName: "Content Creator", description: "Attended EWC 2025 in Riyadh as a content creator, covering the event, interviewing players, and generating live social media content to enhance brand visibility." },
            { year: "2022-2023", name: "Coda Shop", fullName: "Event Manager", description: "Managed partnerships with Coda Shop and local gaming communities for PUBG Mobile and Call of Duty tournaments." },
            { year: "2020-2022", name: "Pro Scrims Pakistan", fullName: "Event Manager", description: "Managed esports tournament series for PUBG Mobile and Call of Duty. Organized online/offline events, logistics, and content production." },
            { year: "2019-2021", name: "Professional Esports Player", fullName: "National Competitor", description: "Participated in numerous Pakistani national tournaments as a professional player, building deep insights into the competitive ecosystem." }
        ],
        skills: [
            "Esports Event Management (Online & LAN)",
            "Team Development & Management",
            "Content Creation & Social Media",
            "Esports Partnerships & Networking",
            "Scouting & Player Development",
            "Tournament Logistics & Scheduling",
            "Leadership & Strategic Planning",
            "Full Stack Web Developer"
        ]
    },
    {
        id: 'abdullah-nazir',
        name: 'Abdullah Nazir Ahmed',
        nickname: 'Abdullah',
        role: 'Team Manager - Patronum Esports',
        image: abdImg,
        imageClass: 'scale-[2.2] translate-y-3', // Zoomed in slightly more for Abdullah
        achievements: {
            wins: [
                { year: "Present", name: "Patronum X Head of Operations", rank: "Partner" },
                { year: "Present", name: "Patronum Esports Team Manager", rank: "Partner" },
            ],
            runnerUps: [],
            notable: [
                { year: "2025", name: "Esports World Cup Content Creator", rank: "Creator" },
                { year: "2024", name: "Game Development Intern (M Labs)", rank: "Dev" },
            ]
        },
        stats: {
            yearsActive: "4+",
            majorTitles: "Mgr"
        },
        bio: {
            gamingTag: "Abdullah",
            startedPlaying: "2021",
            rank: "Team Manager",
            location: "Islamabad, Pakistan",
            born: "N/A",
            influence: "Operations"
        },
        socials: {
            email: { value: "Email", sub: "Contact", link: "mailto:malik.ab.0711@gmail.com" },
            phone: { value: "Phone", sub: "Contact", link: "tel:+923110100792" },
            instagram: { value: "ig", sub: "Instagram", link: "https://www.instagram.com/khanaabadoshh.x/" },
            linkedin: { value: "in", sub: "LinkedIn", link: "https://www.linkedin.com/in/abdullah-nazir-ahmed-0b09a53a1/" },
        },
        characters: [],
        heroTitle: {
            top: "Team Manager",
            namePart1: "Abdullah",
            namePart2: "Nazir"
        },
        badges: [
            "TEAM MANAGER",
            "GAME DEVELOPER"
        ],
        highlight: {
            title: "Esports Operations & Game Dev",
            description: <>Game Developer and Operations Lead with a blend of technical and managerial expertise. As Head of Operations & Partner at Patronum X, ensures smooth execution of company goals and daily operations. Combines game development knowledge (Unity, Blender, C#) with esports management to bridge the gap between technical execution and strategic growth.</>
        },
        sponsorships: [
            { year: "2025-Present", name: "Patronum X Pvt. Ltd.", fullName: "Head of Operations & Partner", description: "Overseeing daily operations, implementing SOPs, and coordinating between tech, design, and client teams to ensure delivery excellence. Contributing to strategic planning and business growth." },
            { year: "2025-Present", name: "Patronum Esports", fullName: "Team Manager & Partner", description: "Leading team operations, tournament registrations, and logistics. Managing player rosters, discipline, and performance alignment. Developing partnerships to expand opportunities." },
            { year: "2025", name: "Esports World Cup", fullName: "Content Creator", description: "Attended Esports World Cup as a content creator, engaging with the global community." }
        ],
        skills: [
            "Game Development (Unity, Unreal Engine)",
            "3D Modeling & Animation (Blender)",
            "Team Operations & Leadership",
            "Esports Tournament Management",
            "Strategic Planning & SOP Implementation",
            "C# & Machine Learning (ML Agents)",
            "Problem Solving"
        ]
    },
    {
        id: 'javeria-akber',
        name: 'Javeria Akber',
        nickname: 'Javeria',
        role: 'General Manager - Patronum Esports',
        image: javsImg,
        imageClass: 'scale-[1.35] translate-y-3', // Zoomed in for Javeria
        achievements: {
            wins: [
                { year: "Present", name: "Patronum X CTO", rank: "Lead" },
                { year: "Present", name: "Patronum Esports General Manager", rank: "Lead" },
            ],
            runnerUps: [],
            notable: [
                { year: "2025", name: "Esports World Cup Content Creator", rank: "Creator" },
            ]
        },
        stats: {
            yearsActive: "4+",
            majorTitles: "CTO"
        },
        bio: {
            gamingTag: "Javeria",
            startedPlaying: "2019",
            rank: "CTO / GM",
            location: "Islamabad, Pakistan",
            born: "N/A",
            influence: "Technology"
        },
        socials: {
            email: { value: "Email", sub: "Contact", link: "mailto:javeria.akber11@gmail.com" },
            instagram: { value: "ig", sub: "Instagram", link: "https://www.instagram.com/shots.by.javs/" },
            linkedin: { value: "in", sub: "LinkedIn", link: "https://www.linkedin.com/in/javeria-akber-b80b57228/" },
        },
        characters: [],
        heroTitle: {
            top: "Chief Technology Officer",
            namePart1: "Javeria",
            namePart2: "Akber"
        },
        badges: [
            "CTO",
            "GENERAL MANAGER"
        ],
        highlight: {
            title: "AI Engineer & Tech Strategist",
            description: <>AI Engineer with hands-on experience in machine learning, computer vision, and automation. As CTO at Patronum X and General Manager at Patronum Esports, leads technical strategy, scalable product development, and operational growth. Skilled in integrating AI models into real-world applications and driving data-driven decision-making.</>
        },
        sponsorships: [
            { year: "Oct 2025-Present", name: "Patronum X Pvt. Ltd.", fullName: "Chief Technology Officer (CTO)", description: "Leading technical strategy and development of AI-driven and SaaS products. Responsible for system architecture, automation, and translating business requirements into scalable technology solutions." },
            { year: "Nov 2025-Present", name: "Patronum Esports", fullName: "General Manager", description: "Overseeing day-to-day esports operations, team management, and strategic planning. Coordinating competitive teams, managing partnerships, and aligning operations with organizational goals." },
            { year: "Project", name: "Vision Kick - Football Analysis", fullName: "YOLO / Computer Vision", description: "Built a YOLO-based system to detect players and ball in match footage. Added tracking for tactical movement visualization." },
            { year: "Project", name: "Cyber-Threat Detection", fullName: "Machine Learning", description: "Trained ML models to classify malware using feature extraction." }
        ],
        skills: [
            "Python, C++, SQL",
            "Machine Learning & Deep Learning (CNNs, YOLO)",
            "Computer Vision & Image Processing",
            "Data Analysis (NumPy, Pandas)",
            "Strategic Planning & Leadership",
            "Esports Operations Management",
            "Automation & System Architecture"
        ]
    }
];



import { useParams, useNavigate } from 'react-router-dom';

const Management = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find player based on URL param, normalized
    const selectedPlayer = id ? players.find(p => p.id === id) : null;

    const handleSelectPlayer = (player) => {
        navigate(`/management/${player.id}`);
    };

    const handleBack = () => {
        navigate('/management');
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500 selection:text-white pb-20 overflow-x-hidden relative">
            {/* Background Animation */}
            <div className="fixed inset-0 z-0 opacity-40">
                <Hyperspeed />
            </div>

            <AnimatePresence mode="wait">
                {!selectedPlayer ? (
                    <RosterView key="roster" players={players} onSelect={handleSelectPlayer} />
                ) : (
                    <PlayerDetail key="detail" player={selectedPlayer} onBack={handleBack} />
                )}
            </AnimatePresence>
        </div>
    );
};

// --- ROSTER VIEW ---
const RosterView = ({ players, onSelect }) => {
    return (
        <section className="relative pt-32 pb-12 px-4 z-10 w-full max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-4 leading-none drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <span className="text-white">Patronum</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 ml-4 pr-4">Management</span>
                </h1>
                <p className="text-cyan-400/80 font-bold tracking-widest text-sm md:text-base uppercase">Meet our Team Leaders</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
                {players.map((player) => (
                    <motion.div
                        key={player.id}
                        layoutId={`card-${player.id}`}
                        onClick={() => onSelect(player)}
                        className="group relative cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] group-hover:border-cyan-500/60 aspect-[3/4]">
                            {/* Image */}
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center p-8">
                                <img
                                    src={player.image}
                                    alt={player.name}
                                    className={`w-full h-auto object-contain opacity-90 transition-transform duration-700 group-hover:scale-105 ${player.imageClass || ''}`}
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                            {/* Text Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                <h3 className="text-2xl font-black text-white italic mb-1 uppercase leading-none">{player.name}</h3>
                                <div className="text-cyan-400 font-bold uppercase tracking-widest text-xs mb-4">{player.role}</div>
                                <div className="w-12 h-1 bg-cyan-500 rounded-full group-hover:w-full transition-all duration-500" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

// --- DETAIL VIEW ---
const PlayerDetail = ({ player, onBack }) => {
    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 60 },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        },
        exit: { opacity: 0 }
    };

    return (
        <section className="relative pt-24 pb-12 px-4 z-10">
            <div className="max-w-7xl mx-auto origin-top scale-90">
                <motion.button
                    onClick={onBack}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8 flex items-center gap-2 text-cyan-400 font-bold hover:text-white transition-colors uppercase tracking-wider text-sm"
                >
                    <FaArrowLeft /> Back to Management
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-cyan-400 font-bold tracking-widest text-lg md:text-xl mb-2 uppercase">{player.heroTitle.top}</h2>
                    <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-4 leading-none drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        <span className="text-white block md:inline">{player.heroTitle.namePart1}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 md:ml-4 pr-4 py-2">{player.heroTitle.namePart2}</span>
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-6">
                        {player.badges.map((badge, idx) => (
                            <div key={idx} className="bg-gradient-to-r from-blue-900/60 to-cyan-900/60 border border-cyan-500/30 px-8 py-3 rounded-full backdrop-blur-md shadow-lg shadow-cyan-500/10">
                                <span className="text-cyan-400 font-bold tracking-wider">{badge}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Col: Profile Card */}
                    <motion.div
                        className="lg:col-span-4 sticky top-8"
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        layoutId={`card-${player.id}`}
                    >
                        <div className="relative z-10 rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-900/40 backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                            <div className="aspect-[3/4] w-full bg-gradient-to-b from-slate-800 to-slate-900 relative flex items-center justify-center overflow-hidden group p-8">
                                <img
                                    src={player.image}
                                    alt={player.name}
                                    className={`w-full h-auto object-contain opacity-100 group-hover:scale-105 transition-transform duration-700 ${player.imageClass || ''}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <h3 className="text-3xl font-black text-white italic mb-1 uppercase">{player.name}</h3>
                                    <div className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">{player.role}</div>
                                    <div className="flex gap-3 flex-wrap">
                                        {player.socials.email && <SocialIcon icon={<FaEnvelope />} href={player.socials.email.link} className="bg-red-600 hover:bg-red-700" />}
                                        {player.socials.phone && <SocialIcon icon={<FaPhone />} href={player.socials.phone.link} className="bg-green-600 hover:bg-green-700" />}
                                        {player.socials.twitter && <SocialIcon icon={<FaXTwitter />} href={player.socials.twitter.link} className="bg-slate-950 hover:bg-black border border-slate-800" />}
                                        {player.socials.instagram && <SocialIcon icon={<FaInstagram />} href={player.socials.instagram.link} className="bg-pink-600 hover:bg-pink-700" />}
                                        {player.socials.linkedin && <SocialIcon icon={<FaLinkedin />} href={player.socials.linkedin.link} className="bg-blue-600 hover:bg-blue-700" />}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 border-t border-cyan-500/20 divide-x divide-cyan-500/20 bg-slate-900/60">
                                <div className="p-4 text-center">
                                    <div className="text-2xl font-black text-white">{player.stats.yearsActive}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-cyan-400/80 font-bold">Years Experience</div>
                                </div>
                                <div className="p-4 text-center">
                                    <div className="text-2xl font-black text-white">{player.stats.majorTitles}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-cyan-400/80 font-bold">Role Level</div>
                                </div>
                            </div>
                        </div>
                        {/* Skills List */}
                        <div className="mt-8 bg-slate-900/40 border border-slate-800 p-6 rounded-3xl backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                                <FaTools /> Key Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {player.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-slate-800/60 border border-slate-700 text-zinc-300 text-xs px-3 py-1.5 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </motion.div>

                    {/* Right Col: Detailed Info */}
                    <motion.div
                        className="lg:col-span-8 space-y-8"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        {/* Bio Data */}
                        <SectionContainer title="Professional Profile" icon={<FaBriefcase />}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-zinc-300">
                                <div className="space-y-4">
                                    <InfoRow label="Name" value={player.bio.gamingTag} icon={<FaBriefcase />} />
                                    <InfoRow label="Experience Start" value={player.bio.startedPlaying} icon={<FaHistory />} />
                                    <InfoRow label="Designation" value={player.bio.rank} icon={<FaTrophy className="text-yellow-500" />} />
                                </div>
                                <div className="space-y-4">
                                    <InfoRow label="Location" value={player.bio.location} icon={<FaMapMarkerAlt />} />
                                    <InfoRow label="Focus Areas" value={player.bio.influence} icon={<FaStar />} />
                                </div>
                            </div>
                        </SectionContainer>

                        {/* Experience Timeline */}
                        {player.sponsorships && player.sponsorships.length > 0 && (
                            <SectionContainer title="Professional Experience" icon={<FaHandshake className="text-cyan-500" />}>
                                <div className="relative border-l border-cyan-500/30 ml-3 md:ml-6 space-y-8 pb-4">
                                    {player.sponsorships.map((sponsor, idx) => (
                                        <div key={idx} className="relative pl-8 md:pl-12 group">
                                            {/* Timeline Dot */}
                                            <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] group-hover:scale-150 transition-transform"></div>

                                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                                                <span className="text-lg font-black text-cyan-400 font-mono">{sponsor.year}</span>
                                                <h4 className="text-xl font-bold text-white uppercase tracking-wider">{sponsor.name}</h4>
                                                <span className="hidden md:block w-8 h-[1px] bg-slate-700"></span>
                                                <span className="text-sm font-bold text-zinc-400 uppercase tracking-wide">{sponsor.fullName}</span>
                                            </div>
                                            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl bg-slate-900/30 p-4 rounded-xl border border-slate-800/50 hover:border-cyan-500/20 transition-colors">
                                                {sponsor.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </SectionContainer>
                        )}


                        {/* Highlight */}
                        <motion.div variants={fadeInUp} className="rounded-3xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90 z-0"></div>
                            {/* <img src={bannerImg} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay z-0" /> */}

                            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaMedal className="text-yellow-400 text-2xl" />
                                        <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm">Skills & Expertise</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 italic uppercase">{player.highlight.title}</h3>
                                    <p className="text-blue-100 leading-relaxed text-lg">
                                        {player.highlight.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Achievements Section - Re-purposed for Roles */}
                        {(player.achievements.wins.length > 0 || player.achievements.notable.length > 0) && (
                            <SectionContainer title="Key Roles & Milestones" icon={<FaTrophy className="text-yellow-500" />}>
                                <div className="space-y-8">
                                    {/* Wins */}
                                    {player.achievements.wins.length > 0 && (
                                        <div>
                                            <h4 className="text-cyan-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <FaStar /> Key Positions held
                                            </h4>
                                            <div className="grid gap-3">
                                                {player.achievements.wins.map((ach, i) => (
                                                    <AchievementRow key={i} year={ach.year} name={ach.name} rank={ach.rank} />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Notables */}
                                    {player.achievements.notable.length > 0 && (
                                        <div>
                                            <h4 className="text-zinc-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <FaFlag /> Other Achievements
                                            </h4>
                                            <div className="grid gap-3">
                                                {player.achievements.notable.map((ach, i) => (
                                                    <AchievementRow key={i} year={ach.year} name={ach.name} rank={ach.rank} highlight={false} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </SectionContainer>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};


// Sub-components

const SectionContainer = ({ title, icon, children }) => (
    <motion.div
        className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        <div className="absolute top-0 right-0 p-8 opacity-5 text-white text-9xl transform translate-x-10 -translate-y-10">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-cyan-400 mb-8 flex items-center gap-3 relative z-10">
            <span className="w-8 h-1 bg-cyan-500 rounded-full"></span>
            {title}
        </h3>
        <div className="relative z-10">
            {children}
        </div>
    </motion.div>
);

const InfoRow = ({ label, value, icon }) => (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
            {icon}
        </div>
        <div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-0.5">{label}</div>
            <div className="text-zinc-200 font-medium text-lg">{value}</div>
        </div>
    </div>
);

const AchievementRow = ({ year, name, rank, highlight = true }) => {
    let rankStyle = "text-zinc-500 bg-slate-800/50 border-slate-700";
    let icon = <FaStar />;

    if (rank === 'Lead' || rank === '1st') {
        rankStyle = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]";
        icon = <FaStar />;
    } else {
        rankStyle = "text-cyan-600 bg-cyan-600/10 border-cyan-600/20";
        icon = <FaFlag />;
    }

    return (
        <div className={`relative flex items-center justify-between p-4 md:p-5 rounded-xl border bg-slate-900/40 backdrop-blur-sm transition-all duration-300 group hover:border-cyan-500/30 hover:bg-slate-800/60 ${highlight ? 'border-slate-800' : 'border-slate-800/50'}`}>
            <div className="flex items-center gap-4 md:gap-6">
                {/* Year Badge */}
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                    <span className="text-xs font-bold text-zinc-500 uppercase">Year</span>
                    <span className="text-sm font-black text-white font-mono leading-none">{year}</span>
                </div>

                {/* Name */}
                <div className="flex flex-col">
                    <h4 className="font-bold text-zinc-100 text-lg md:text-xl group-hover:text-cyan-400 transition-colors line-clamp-1">{name}</h4>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:block">Experience Detail</span>
                </div>
            </div>

            {/* Rank Badge */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border uppercase tracking-wider font-black text-sm md:text-base ${rankStyle}`}>
                <span className="text-lg">{icon}</span>
                {rank}
            </div>
        </div>
    );
};

const SocialIcon = ({ icon, href, className }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all transform hover:-translate-y-1 hover:shadow-lg ${className}`}>
        {icon}
    </a>
);


export default Management;
