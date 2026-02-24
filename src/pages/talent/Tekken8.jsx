import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaGamepad, FaMapMarkerAlt, FaBirthdayCake, FaFlag, FaYoutube, FaInstagram, FaStar, FaMedal, FaHistory, FaArrowLeft, FaHandshake, FaTwitch } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Assets
import dawoodImg from '../../assets/tekken8/Dawood.png';
import khanImg from '../../assets/tekken8/Khan.png';
import alisaImg from '../../assets/tekken8/Alisa.png';
import kumaImg from '../../assets/tekken8/Kuma.png';
import fengImg from '../../assets/tekken8/FENG.png';
import tekken8Logo from '../../assets/tekken8/TEKKEN.png';
import bannerImg from '../../assets/tekken8/banner.png';
import esharibImg from '../../assets/tekken8/Esharib.png';
import kashiImg from '../../assets/tekken8/KASHI.png';
import jonImg from '../../assets/tekken8/JON.png';
import kingImg from '../../assets/tekken8/King.png';
import kazuyaImg from '../../assets/tekken8/Kazuya.png';
import farzeenImg from '../../assets/tekken8/FARZEEN.png';
import shaheenImg from '../../assets/tekken8/Shaheen.png';
import usamaImg from '../../assets/tekken8/USAMA.png';

// --- DATA ---
const players = [
    {
        id: 'dawood',
        name: 'Dawood Sikandar',
        nickname: 'Dawood Sikandar',
        role: 'Professional Tekken Player',
        image: dawoodImg,
        achievements: {
            wins: [
                { year: "2025", name: "Pak vs Saudia", rank: "1st" },
                { year: "2025", name: "Iqra University Tournament", rank: "1st" },
                { year: "2024", name: "Mooring 2024", rank: "1st" },
                { year: "2023", name: "Fast daira23", rank: "1st" },
                { year: "2022", name: "Thaiger Uppercut 2022", rank: "1st" },
                { year: "2021", name: "UGP SIALKOT", rank: "1st" },
                { year: "2018", name: "7CG CUP", rank: "1st" },
                { year: "2017", name: "PGA Cup S2", rank: "1st" },
            ],
            runnerUps: [
                { year: "2025", name: "The Baaz Gauntlet 2 Karachi Qualifier", rank: "2nd" },
                { year: "2024", name: "Thaiger Uppercut 2024 - T8 3v3", rank: "2nd" },
                { year: "2024", name: "Khan's Power Crusher #1", rank: "2nd" },
                { year: "2023", name: "Daska Championship Tekken 7", rank: "2nd" },
                { year: "2021", name: "PPG - Battle of Champions S2", rank: "2nd" },
            ],
            notable: [
                { year: "2025", name: "Esports World Cup 2025 LCQ", rank: "17th" },
                { year: "2025", name: "EVO 2025", rank: "17th" },
                { year: "2024", name: "Gamers Galaxy Pakistan", rank: "9th" },
                { year: "2022", name: "WeRTitan Cup", rank: "3rd" },
                { year: "2016", name: "D Generation X", rank: "3rd" },
            ]
        },
        stats: {
            yearsActive: "10+",
            majorTitles: "9"
        },
        bio: {
            gamingTag: "Dawood Sikandar",
            startedPlaying: "2012",
            rank: "Top 5 in Pakistan",
            location: "Faisalabad, Pakistan",
            born: "24-06-1995",
            influence: "Chanel"
        },
        socials: {
            youtube: { value: "5.06K", sub: "1.35M+ Views", link: "https://www.youtube.com/@dawoodsikandar-tk" },
            twitter: { value: "3,404", sub: "X (Twitter)", link: "https://x.com/DawoodSikandar" },
            instagram: { value: "1,269", sub: "Instagram", link: "https://www.instagram.com/dawood.sikandar/" },
            twitch: { value: "Follow", sub: "Twitch", link: "https://www.twitch.tv/dawood_sikandar77" }
        },
        characters: [
            { name: "Alisa", img: alisaImg, color: "from-pink-600/20" },
            { name: "Kuma", img: kumaImg, color: "from-amber-600/20" }
        ],
        heroTitle: {
            top: "Pakistani Esports Icon",
            namePart1: "Dawood",
            namePart2: "Sikandar"
        },
        badges: [
            "THIAGER UPPERCUT 2022 CHAMPION",
            "MOORING 2024 CHAMPION"
        ],
        highlight: {
            title: "Breakthrough Player of the Year 2022",
            description: <>One of the historic Tekken 7v7 exhibition match in Riyadh, Team Pakistan secured a dominant <strong className="text-white">15–8 victory</strong> over Saudi Arabia. My standout performance in this international clash led to me being honored with this prestigious award, cementing my rise on the global stage.</>
        },
        sponsorships: [
            { year: "2017", name: "PGA", fullName: "Pakistan Gaming Arena", description: "PGA is an independent organization for the COMMUNITY and support players all around Pakstan." },
            { year: "2018", name: "7CG", fullName: "7 Cities Gaming League", description: "7 Cities is a gaming league and pro team from the mid Atlantic Region" },
            { year: "2019", name: "V SLASH", fullName: "vSlash Esports", description: "vSlash Esports is an esports organization in the UAE that focuses on games such as CS:GO, DragonBall FighterZ, Street Fighter V, Super Smash Bros. Ultimate, and Tekken 7." },
            { year: "2019-2022", name: "ASHES GAMING", fullName: "Ashes Gaming", description: "Ashes Gaming is a Pakistani esports organization founded by Arslan Ash, with the goal of promoting and unearthing new talents in Pakistan." },
            { year: "2023-2024", name: "M5HOST", fullName: "M5Host Digital Solutions", description: "M5Host is a digital services (like web development, digital marketing etc.) provider company across the globe." },
            { year: "May 2024", name: "CLOUD9", fullName: "Cloud9", description: "Cloud9 (C9), is an American professional esports company based in Santa Monica, California." },
            { year: "May 2025", name: "NOVA", fullName: "Nova Esports", description: "Nova Esports is a leading professional esports organization based in Hong Kong that competes in multiple mobile and PC game titles" },
        ]
    },
    {
        id: 'khan',
        name: 'Imran Khan',
        nickname: 'Khan',
        role: 'Professional Tekken Player',
        image: khanImg,
        achievements: {
            wins: [
                { year: "2023", name: "Gamers 8 Riyadh", rank: "1st" },
                { year: "N/A", name: "Penang Esports", rank: "1st" },
            ],
            runnerUps: [
                { year: "2024", name: "EVO USA", rank: "2nd" },
                { year: "N/A", name: "Kurokuro Cup", rank: "2nd" },
            ],
            notable: [
                { year: "2019", name: "FV Major Cup 2019", rank: "4th" },
                { year: "N/A", name: "PPG Dojo", rank: "3rd" },
            ]
        },
        stats: {
            yearsActive: "10+",
            majorTitles: "2+"
        },
        bio: {
            gamingTag: "Imran Khan",
            startedPlaying: "2014",
            rank: "Top 10 in Pakistan",
            location: "Pakistan",
            born: "N/A",
            influence: "N/A"
        },
        socials: {
            youtube: { value: "4.5K", sub: "Subscribers", link: "https://www.youtube.com/@RealKhanImran" },
            twitter: { value: "8.5K", sub: "Followers", link: "https://x.com/Khanimran675" },
            instagram: { value: "6.9K", sub: "Followers", link: "https://www.instagram.com/fate_khanimran/" },
            twitch: { value: "2.7K", sub: "Followers", link: "https://www.twitch.tv/fate_khan" }
        },
        characters: [
            { name: "Feng", img: fengImg, color: "from-red-600/20" }
        ],
        heroTitle: {
            top: "Pakistani Esports Icon",
            namePart1: "Imran",
            namePart2: "Khan"
        },
        badges: [
            "GAMERS 8 RIYADH WINNER",
            "EVO USA FINALIST"
        ],
        highlight: {
            title: "Global Contender",
            description: <>As a dedicated and passionate Tekken player, I bring over a decade of professional experience and a proven track record of success. I am committed to continually improving my skills and achieving excellence in the esports scene. With my USA visa in hand, I am well-positioned to compete in key international events and take my game to the next level.</>
        },
        sponsorships: []
    },
    {
        id: 'esharib',
        name: 'Esharib',
        nickname: 'Esharib',
        role: 'Professional Tekken Player',
        image: esharibImg,
        achievements: {
            wins: [
                { year: "2025", name: "NASCON 2025", rank: "1st" },
                { year: "2025", name: "Baaz Gauntlet 2 Qualifier", rank: "1st" },
                { year: "2025", name: "E Net Ronix UGX 2025", rank: "1st" },
                { year: "2023", name: "TS Showdown S2", rank: "1st" },
            ],
            runnerUps: [
                { year: "2023", name: "KS S2", rank: "2nd" },
                { year: "2022", name: "NASCON 2022", rank: "2nd" },
            ],
            notable: [
                { year: "2025", name: "Level Up Dojo", rank: "3rd" },
                { year: "2025", name: "Heatwave Showdown", rank: "4th" },
                { year: "2024", name: "Havoc 3", rank: "5th" },
                { year: "2023", name: "Elite Tekken Championship", rank: "3rd" },
                { year: "2022", name: "Best of the Best Dojo", rank: "3rd" },
            ]
        },
        stats: {
            yearsActive: "4+",
            majorTitles: "4"
        },
        bio: {
            gamingTag: "Esharib",
            startedPlaying: "N/A",
            rank: "Top Tier",
            location: "Lahore",
            born: "N/A",
            influence: "Alisa"
        },
        socials: {
            twitter: { value: "1.4K+", sub: "Followers", link: "https://x.com/tk_esharib" },
            youtube: { value: "400+", sub: "Subscribers", link: "https://www.youtube.com/@tkesharib" },
            instagram: { value: "500+", sub: "Followers", link: "https://www.instagram.com/tk_esharib/" },
            twitch: { value: "800+", sub: "Followers", link: "https://www.twitch.tv/Esharib_TK" }
        },
        characters: [
            { name: "Alisa", img: alisaImg, color: "from-pink-600/20" }
        ],
        heroTitle: {
            top: "Free Agent",
            namePart1: "Esharib",
            namePart2: ""
        },
        badges: [
            "HOLDER OF 5 YEAR US VISA",
            "NASCON CHAMPION"
        ],
        highlight: {
            title: "International Prospect",
            description: <>A formidable Alisa main and emerging talent from Karachi. As a free agent holding a <strong className="text-white">5-Year US Visa</strong>, I am ready to compete on the global stage. My consistent top placements in major national tournaments prove my capability to challenge the best.</>
        },
        sponsorships: []
    },
    /* {
        id: 'kashi',
        name: 'Kashi Snake',
        nickname: 'Kashi Snake',
        role: 'Professional Tekken Player',
        image: kashiImg,
        achievements: {
            wins: [
                { year: "2025", name: "PPG Battle of Champions S5", rank: "1st" },
                { year: "2022", name: "Elite Championship", rank: "1st" },
                { year: "2020", name: "TGL", rank: "1st" },
            ],
            runnerUps: [
                { year: "2024", name: "Pakistan's Tekken Tussle S1", rank: "2nd" },
                { year: "2022", name: "Clash of Warriors", rank: "2nd" },
            ],
            notable: [
                { year: "2025", name: "Tekken Final Judgment", rank: "3rd" },
                { year: "2024", name: "EWC LCQ", rank: "Top 8" },
                { year: "2022", name: "TWT Regional Finals", rank: "3rd" },
                { year: "2019", name: "Takra Cup", rank: "4th" },
            ]
        },
        stats: {
            yearsActive: "6+",
            majorTitles: "5+"
        },
        bio: {
            gamingTag: "Kashi Snake",
            startedPlaying: "2019",
            rank: "Pro",
            location: "Gujranwala",
            born: "N/A",
            influence: "Kazuya"
        },
        socials: {
            twitter: { value: "3K+", sub: "Followers", link: "https://x.com/KashiSnake99" },
            instagram: { value: "2K+", sub: "Followers", link: "https://www.instagram.com/kashi_snake/" },
            twitch: { value: "1.5K+", sub: "Followers", link: "https://twitch.tv" }
        },
        characters: [
            { name: "Kazuya", img: kazuyaImg, color: "from-purple-700/20" }
        ],
        heroTitle: {
            top: "Ashes Gaming",
            namePart1: "Kashi",
            namePart2: "Snake"
        },
        badges: [
            "TAKEDOWN CHAMPION",
            "ASHES GAMING"
        ],
        highlight: {
            title: "Consistent Performer",
            description: <>A highly consistent player in the Pakistani Tekken scene, known for deep runs in major tournaments. With multiple 1st place finishes in 2020 and 2022, and a strong presence in the Tekken World Tour Regional Finals.</>
        },
        sponsorships: []
    }, */
    {
        id: 'jon',
        name: 'The Jon',
        nickname: 'The Jon',
        role: 'Professional Tekken Player',
        image: jonImg,
        achievements: {
            wins: [
                { year: "2025", name: "Paradise Game Battle", rank: "1st" },
                { year: "2024", name: "Thaiger Uppercut 2024", rank: "1st" },
                { year: "2024", name: "Ignite Tekken Cup", rank: "1st" },
                { year: "2018", name: "OUG Tournament 2018", rank: "1st" },
            ],
            runnerUps: [
                { year: "2025", name: "Takedown 2025", rank: "3rd" },
                { year: "2019", name: "Takra Cup", rank: "2nd" },
            ],
            notable: [
                { year: "2025", name: "Thaiger Uppercut 2025", rank: "Top 8" },
                { year: "2024", name: "Esports World Cup 2024", rank: "5th" },
                { year: "2019", name: "TWT Finals LCQ", rank: "4th" },
                { year: "2024", name: "Tekken World Tour Finals", rank: "Qualified" },
                { year: "2023", name: "Gamers8", rank: "Top 6" },
            ]
        },
        stats: {
            yearsActive: "7+",
            majorTitles: "3"
        },
        bio: {
            gamingTag: "The Jon",
            startedPlaying: "2016",
            rank: "Pro",
            location: "Pakistan",
            born: "N/A",
            influence: "King"
        },
        socials: {
            twitter: { value: "12K+", sub: "Followers", link: "https://x.com/THEJON07" },
            youtube: { value: "5K+", sub: "Subscribers", link: "https://www.youtube.com/@thejonno1" },
            instagram: { value: "4K+", sub: "Followers", link: "https://www.instagram.com/thejon07/" },
            twitch: { value: "3K+", sub: "Followers", link: "https://twitch.tv" }
        },
        characters: [
            { name: "King", img: kingImg, color: "from-yellow-600/20" }
        ],
        heroTitle: {
            top: "Al Qadsiah",
            namePart1: "The",
            namePart2: "Jon"
        },
        badges: [
            "OUG CHAMPION",
            "KING SPECIALIST"
        ],
        highlight: {
            title: "The King Master",
            description: <>Adeel "THE JON" Sheikh is a world-renowned Tekken professional known for his mastery of <strong>King</strong>. Representing Al Qadsiah, he famously defeated the legendary Knee at OUG 2018, putting him on the global map. His unpredictable playstyle and grappling prowess make him a crowd favorite and a feared competitor.</>
        },
        sponsorships: [
            { year: "2024", name: "AL QADSIAH", fullName: "Al Qadsiah", description: "Representing Al Qadsiah, a prominent Saudi sports club entered into esports." },
            { year: "2021-2023", name: "ASHES", fullName: "Ashes Gaming", description: "Former member of Arslan Ash's team, Ashes Gaming." }
        ]
    },
    {
        id: 'farzeen',
        name: 'Muhammad Farzeen',
        nickname: 'Farzeen',
        role: 'Professional Tekken Player',
        image: farzeenImg,
        achievements: {
            wins: [
                { year: "2025", name: "Cape Town Showdown 2025", rank: "1st" },
                { year: "2025", name: "South East Asia Major 2025", rank: "1st" },
                { year: "2024", name: "Battle Arena Melbourne 14", rank: "1st" },
            ],
            runnerUps: [
                { year: "2025", name: "Takedown 2025", rank: "2nd" },
            ],
            notable: [
                { year: "2025", name: "Tekken World Tour Finals 2025", rank: "4th" },
                { year: "2024", name: "Evolution Championship Series 2024", rank: "13th-16th" },
                { year: "2023", name: "Evolution Championship Series 2023", rank: "13th-16th" },
            ]
        },
        stats: {
            yearsActive: "5+",
            majorTitles: "3"
        },
        bio: {
            gamingTag: "Farzeen",
            startedPlaying: "2020",
            rank: "Top 5 in Pakistan",
            location: "Pakistan",
            born: "06-09-2002",
            influence: "Shaheen"
        },
        socials: {
            youtube: { value: "3.07K", sub: "Subscribers", link: "https://www.youtube.com/@FalcFarzeen" },
            twitter: { value: "5.9K", sub: "Followers", link: "https://x.com/Farzeen_tk" },
            instagram: { value: "7.3K", sub: "Followers", link: "https://www.instagram.com/farzeen_tk/" }
        },
        characters: [
            { name: "Shaheen", img: shaheenImg, color: "from-green-600/20" }
        ],
        heroTitle: {
            top: "Team Falcons",
            namePart1: "Farzeen",
            namePart2: ""
        },
        badges: [
            "TWT FINALS 2025 4TH PLACE",
            "SHAHEEN SPECIALIST"
        ],
        highlight: {
            title: "The Shaheen Specialist",
            description: <>Muhammad "Farzeen" is a rising star in the global Tekken scene, representing <strong>Team Falcons</strong>. Known for his exceptional <strong>Shaheen</strong>, he made history by placing 4th at the Tekken World Tour Finals 2025. His clinical playstyle and rapid rise have made him one of the most respected players from Pakistan.</>
        },
        sponsorships: [
            { year: "2024", name: "TEAM FALCONS", fullName: "Team Falcons", description: "Signed with Team Falcons, one of the premier esports organizations in the world, representing them in major international tournaments." }
        ]
    },
    {
        id: 'usama',
        name: 'Usama Abbasi',
        nickname: 'Usama',
        role: 'Professional Tekken Player',
        image: usamaImg,
        achievements: {
            wins: [
                { year: "2025", name: "Takedown 2025", rank: "1st" },
                { year: "N/A", name: "Guard Breaker", rank: "1st" }
            ],
            runnerUps: [
                { year: "2025", name: "Final Round 2025", rank: "2nd" }
            ],
            notable: [
                { year: "2025", name: "Tekken World Tour Finals 2025", rank: "5th-6th" },
                { year: "2025", name: "Only The Best TWT Challenger", rank: "3rd" },
                { year: "N/A", name: "Frame Trap", rank: "3rd" }
            ]
        },
        stats: {
            yearsActive: "5+",
            majorTitles: "2+"
        },
        bio: {
            gamingTag: "Usama",
            startedPlaying: "N/A",
            rank: "Top Tier",
            location: "Pakistan",
            born: "N/A",
            influence: "Jin / Shaheen"
        },
        socials: {
            youtube: { value: "745", sub: "Subscribers", link: "https://www.youtube.com/@usamatk708" },
            twitter: { value: "1.1K", sub: "Followers", link: "https://x.com/usamatekken708?s=09&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnIXmBYb736KEXbfJFZwyMU5dyzV0sUaN_8j4GJ0QaVXXNly4ELxWARVCPUz4_aem_BLanX-PK4W3w3LAApfGfQw" },
            instagram: { value: "761", sub: "Followers", link: "https://www.instagram.com/usamatekken708/" }
        },
        characters: [
            { name: "Kazuya", img: kazuyaImg, color: "from-purple-700/20" }
        ],
        heroTitle: {
            top: "Team Falcons",
            namePart1: "Usama",
            namePart2: "Abbasi"
        },
        badges: [
            "TWT FINALS 2025 TOP 6",
            "TAKEDOWN CHAMPION"
        ],
        highlight: {
            title: "Emerging Top Tier Talent",
            description: <>Usama Abbasi is a massive force in the global Tekken 8 scene. Recently signed to <strong>Team Falcons</strong>, his 5th-6th place finish at the prestigious Tekken World Tour Finals 2025 and an authoritative win at Takedown 2025 cement his status as one of Pakistan's elite players.</>
        },
        sponsorships: [
            { year: "2025", name: "TEAM FALCONS", fullName: "Team Falcons", description: "Representing Team Falcons, a premier global esports organization." }
        ]
    }
];


import { useParams, useNavigate } from 'react-router-dom';

const Tekken8 = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find player based on URL param
    const selectedPlayer = id ? players.find(p => p.id === id) : null;

    const handleSelectPlayer = (player) => {
        navigate(`/talent/tekken8/${player.id}`);
    };

    const handleBack = () => {
        navigate('/talent/tekken8');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-white pb-20 overflow-x-hidden relative">
            {/* Background Banner */}
            <div className="fixed inset-0 z-0 opacity-20">
                <img src={bannerImg} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
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
                    <span className="text-white">Tekken</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 ml-4 pr-4">Legends</span>
                </h1>
                <p className="text-cyan-400/80 font-bold tracking-widest text-sm md:text-base uppercase">Select a fighter to view profile</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-950">
                                <img
                                    src={player.image}
                                    alt={player.name}
                                    className="w-full h-full object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                            {/* Text Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                <h3 className="text-3xl font-black text-white italic mb-1 uppercase leading-none">{player.name}</h3>
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
                    <FaArrowLeft /> Back to Roster
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
                            <div className="aspect-[3/4] w-full bg-gradient-to-b from-slate-800 to-slate-900 relative flex items-center justify-center overflow-hidden group">
                                <img
                                    src={player.image}
                                    alt={player.name}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-6 left-6 right-6 z-20">
                                    <h3 className="text-3xl font-black text-white italic mb-1 uppercase">{player.name}</h3>
                                    <div className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4">{player.role}</div>
                                    <div className="flex gap-3">
                                        {player.socials.youtube && <SocialIcon icon={<FaYoutube />} href={player.socials.youtube.link} className="bg-red-600 hover:bg-red-700" />}
                                        {player.socials.twitter && <SocialIcon icon={<FaXTwitter />} href={player.socials.twitter.link} className="bg-slate-950 hover:bg-black border border-slate-800" />}
                                        {player.socials.instagram && <SocialIcon icon={<FaInstagram />} href={player.socials.instagram.link} className="bg-pink-600 hover:bg-pink-700" />}
                                        {player.socials.twitch && <SocialIcon icon={<FaTwitch />} href={player.socials.twitch.link} className="bg-purple-600 hover:bg-purple-700" />}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 border-t border-cyan-500/20 divide-x divide-cyan-500/20 bg-slate-900/60">
                                <div className="p-4 text-center">
                                    <div className="text-2xl font-black text-white">{player.stats.yearsActive}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-cyan-400/80 font-bold">Years Active</div>
                                </div>
                                <div className="p-4 text-center">
                                    <div className="text-2xl font-black text-white">{player.stats.majorTitles}</div>
                                    <div className="text-[10px] uppercase tracking-wider text-cyan-400/80 font-bold">Major Titles</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {player.characters.map((char, i) => (
                                <CharacterCardMini key={i} name={char.name} img={char.img} color={char.color} />
                            ))}
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
                        <SectionContainer title="Bio Data" icon={<FaGamepad />}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-zinc-300">
                                <div className="space-y-4">
                                    <InfoRow label="Gaming Tag" value={player.bio.gamingTag} icon={<FaGamepad />} />
                                    <InfoRow label="Started Playing" value={player.bio.startedPlaying} icon={<FaHistory />} />
                                    <InfoRow label="Internal Rank" value={player.bio.rank} icon={<FaTrophy className="text-yellow-500" />} />
                                </div>
                                <div className="space-y-4">
                                    <InfoRow label="Location" value={player.bio.location} icon={<FaMapMarkerAlt />} />
                                    <InfoRow label="Born" value={player.bio.born} icon={<FaBirthdayCake />} />
                                    <InfoRow label="Influence" value={player.bio.influence} icon={<FaStar />} />
                                </div>
                            </div>
                        </SectionContainer>

                        {/* Sponsorship Timeline */}
                        {player.sponsorships && player.sponsorships.length > 0 && (
                            <SectionContainer title="Sponsorship Timeline" icon={<FaHandshake className="text-cyan-500" />}>
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


                        {/* Global Impact Award */}
                        <motion.div variants={fadeInUp} className="rounded-3xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90 z-0"></div>
                            <img src={bannerImg} className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay z-0" />

                            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <FaMedal className="text-yellow-400 text-2xl" />
                                        <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm">Global Recognition</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 italic uppercase">{player.highlight.title}</h3>
                                    <p className="text-blue-100 leading-relaxed text-lg">
                                        {player.highlight.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Achievements Section */}
                        <SectionContainer title="Tournament Achievements" icon={<FaTrophy className="text-yellow-500" />}>
                            <div className="space-y-8">
                                {/* Wins */}
                                <div>
                                    <h4 className="text-cyan-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <FaTrophy /> Championships Won
                                    </h4>
                                    <div className="grid gap-3">
                                        {player.achievements.wins.map((ach, i) => (
                                            <AchievementRow key={i} year={ach.year} name={ach.name} rank={ach.rank} />
                                        ))}
                                    </div>
                                </div>

                                {/* Runner Ups */}
                                <div>
                                    <h4 className="text-zinc-400 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <FaMedal /> Runner-Up Finishes
                                    </h4>
                                    <div className="grid gap-3">
                                        {player.achievements.runnerUps.map((ach, i) => (
                                            <AchievementRow key={i} year={ach.year} name={ach.name} rank={ach.rank} />
                                        ))}
                                    </div>
                                </div>

                                {/* Notables */}
                                <div>
                                    <h4 className="text-zinc-500 font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <FaStar /> Notable Appearances
                                    </h4>
                                    <div className="grid gap-3">
                                        {player.achievements.notable.map((ach, i) => (
                                            <AchievementRow key={i} year={ach.year} name={ach.name} rank={ach.rank} highlight={false} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SectionContainer>

                        {/* Content & Growth */}
                        <SectionContainer title="Content & Growth" icon={<FaYoutube />}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {player.socials.youtube && <StatCard icon={<FaYoutube className="text-red-500" />} label="Subscribers" value={player.socials.youtube.value} sub={player.socials.youtube.sub} />}
                                {player.socials.twitter && <StatCard icon={<FaXTwitter className="text-white" />} label="Followers" value={player.socials.twitter.value} sub={player.socials.twitter.sub} />}
                                {player.socials.instagram && <StatCard icon={<FaInstagram className="text-pink-500" />} label="Followers" value={player.socials.instagram.value} sub={player.socials.instagram.sub} />}
                                {player.socials.twitch && <StatCard icon={<FaTwitch className="text-purple-500" />} label="Followers" value={player.socials.twitch.value} sub={player.socials.twitch.sub} />}
                            </div>
                        </SectionContainer>
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

    if (rank === '1st') {
        rankStyle = "text-yellow-400 bg-yellow-400/10 border-yellow-400/20 shadow-[0_0_10px_rgba(250,204,21,0.1)]";
        icon = <FaTrophy />;
    } else if (rank === '2nd') {
        rankStyle = "text-slate-300 bg-slate-400/10 border-slate-400/20";
        icon = <FaMedal />;
    } else if (rank === '3rd') {
        rankStyle = "text-amber-600 bg-amber-600/10 border-amber-600/20";
        icon = <FaMedal />;
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
                    <span className="text-lg font-black text-white font-mono leading-none">{year}</span>
                </div>

                {/* Tournament Name */}
                <div className="flex flex-col">
                    <h4 className="font-bold text-zinc-100 text-lg md:text-xl group-hover:text-cyan-400 transition-colors line-clamp-1">{name}</h4>
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:block">Tournament Result</span>
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

const CharacterCardMini = ({ name, img, color }) => (
    <div className={`rounded-2xl overflow-hidden relative h-48 border border-slate-700/50 group shadow-lg shadow-black/50`}>
        <img src={img} className="w-full h-full object-cover object-top opacity-100 group-hover:scale-110 transition-transform duration-500" />
        {/* Gradient only at the bottom for text readability */}
        <div className={`absolute inset-0 bg-gradient-to-t ${color} via-transparent to-transparent`}></div>
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
            <div className="font-black text-white italic text-xl uppercase tracking-wider">{name}</div>
        </div>
    </div>
);

const StatCard = ({ icon, label, value, sub }) => (
    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center gap-2 hover:border-cyan-500/30 transition-colors">
        <div className="text-3xl mb-2 opacity-90">{icon}</div>
        <div className="text-3xl font-black text-white">{value}</div>
        <div className="text-xs font-bold uppercase text-zinc-500 tracking-wider">{label}</div>
        <div className="text-xs text-cyan-900 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-500/20 mt-2">{sub}</div>
    </div>
);

export default Tekken8;
