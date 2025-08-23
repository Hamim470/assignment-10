// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Fade, Slide } from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";

import planeAnimation from "../assets/lottie/travel-plane.json"; // put a file here

// Icons (optional)
import { FaClock, FaMoneyBillWave, FaUmbrellaBeach, FaMapMarkedAlt } from "react-icons/fa";

const ALLOWED_COUNTRIES = [
  "Bangladesh",
  "Thailand",
  "Indonesia",
  "Malaysia",
  "Vietnam",
  "Cambodia",
];



// const SLIDES = [
//   {
//     img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1600&auto=format&fit=crop",
//     title: "Ha Long Bay, Vietnam",
//     caption: "Sail through emerald waters and limestone pillars.",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1600&auto=format&fit=crop",
//     title: "Phi Phi Islands, Thailand",
//     caption: "Turquoise lagoons and dramatic cliffs await.",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558980664-10ea9c90a86a?q=80&w=1600&auto=format&fit=crop",
//     title: "Cox’s Bazar, Bangladesh",
//     caption: "Walk the world’s longest natural sea beach.",
//   },
// ];

const Home = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem("homeTheme") === "dark");
  const [slide, setSlide] = useState(0);

  // Data state
  const [spots, setSpots] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loadingSpots, setLoadingSpots] = useState(true);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [errorSpots, setErrorSpots] = useState("");
  const [errorCountries, setErrorCountries] = useState("");
  const [SLIDES,setSLIDES]=useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE_URL; // e.g., http://localhost:5000

  useEffect(() => {
    fetch(`${API_BASE}/all_tourist_spots`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setSLIDES(data);
    })
  }, [])

    // Auto-advance slider
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(id);
  }, [SLIDES]);

  // Theme persist for home page only
  useEffect(() => {
    localStorage.setItem("homeTheme", dark ? "dark" : "light");
  }, [dark]);

  // Fetch Tourist Spots (limit to SEA)
  useEffect(() => {
    let ignore = false;
    setLoadingSpots(true);
    fetch(`${API_BASE}/spots`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        const filtered = (data || []).filter((s) => ALLOWED_COUNTRIES.includes(s.country_Name));
        setSpots(filtered.slice(0, 6)); // show 6 on home
        setErrorSpots("");
      })
      .catch((err) => setErrorSpots(err.message || "Failed to load spots"))
      .finally(() => setLoadingSpots(false));
    return () => (ignore = true);
  }, [API_BASE]);

  // Fetch Countries (SEA only)
  useEffect(() => {
    let ignore = false;
    setLoadingCountries(true);
    fetch(`${API_BASE}/countries`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        const filtered = (data || []).filter((c) => ALLOWED_COUNTRIES.includes(c.name));
        // Ensure we have 6 SEA countries
        setCountries(filtered.slice(0, 6));
        setErrorCountries("");
      })
      .catch((err) => setErrorCountries(err.message || "Failed to load countries"))
      .finally(() => setLoadingCountries(false));
    return () => (ignore = true);
  }, [API_BASE]);

  // fallback if your countries API isn’t ready yet (optional)
  const countryFallback = useMemo(
    () => [
      {
        name: "Bangladesh",
        image:
          "https://images.unsplash.com/photo-1580130381575-8125d6c75c86?q=80&w=1600&auto=format&fit=crop",
        description: "Rivers, mangroves, and the world’s longest beach.",
      },
      {
        name: "Thailand",
        image:
          "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1600&auto=format&fit=crop",
        description: "Golden temples, islands, and vibrant street food.",
      },
      {
        name: "Indonesia",
        image:
          "https://images.unsplash.com/photo-1543248939-ff40856f65d7?q=80&w=1600&auto=format&fit=crop",
        description: "Bali sunsets, Komodo dragons, and ancient temples.",
      },
      {
        name: "Malaysia",
        image:
          "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1600&auto=format&fit=crop",
        description: "Petronas towers, rainforests, and flavorful cuisine.",
      },
      {
        name: "Vietnam",
        image:
          "https://images.unsplash.com/photo-1511268559489-c7126210f999?q=80&w=1600&auto=format&fit=crop",
        description: "Karst bays, lantern towns, and mountain passes.",
      },
      {
        name: "Cambodia",
        image:
          "https://images.unsplash.com/photo-1558980394-0b0e9b70f2a4?q=80&w=1600&auto=format&fit=crop",
        description: "Angkor Wat, floating villages, and royal palaces.",
      },
    ],
    []
  );

  const isDarkClass = dark ? "dark" : "";

  return (
    <div className={`${isDarkClass}`}>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        {/* HERO / SLIDER */}
        <section className="relative">
          {/* Slide */}
          <div className="relative h-[68vh] md:h-[72vh] overflow-hidden">
            {SLIDES.map((s, idx) => (
              <motion.div
                key={s.tourists_spot_name}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: idx === slide ? 1 : 0, scale: idx === slide ? 1 : 1.05 }}
                transition={{ duration: 0.8 }}
                style={{
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

            {/* Headline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg"
              >
                Explore{" "}
                <span className="text-emerald-300">
                  <Typewriter
                    words={[
                      "Southeast Asia",
                      "Hidden Beaches",
                      "Ancient Temples",
                      "Lush Rainforests",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1400}
                  />
                </span>
              </motion.h1>

              <Fade delay={400} cascade>
                <p className="max-w-2xl mt-4 text-white/90">
                  Plan unforgettable journeys across Bangladesh, Thailand, Indonesia, Malaysia,
                  Vietnam, and Cambodia — curated spots, real costs, and seasonal tips.
                </p>
              </Fade>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/all-tourist-spots"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow"
                >
                  Browse Tourist Spots
                </Link>
                <a
                  href="#countries"
                  className="px-5 py-2 rounded-xl bg-white/90 hover:bg-white text-gray-800 font-semibold shadow"
                >
                  Explore Countries
                </a>
              </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-2.5 w-2.5 rounded-full ${i === slide ? "bg-white" : "bg-white/50 hover:bg-white/80"
                    }`}
                />
              ))}
            </div>

            {/* Dark/Light toggle (Home-only) */}
            <button
              onClick={() => setDark((d) => !d)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 text-white text-sm backdrop-blur hover:bg-black/70"
              title="Toggle theme (Home page only)"
            >
              {dark ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </section>

        {/* LOADING (global for sections) */}
        {(loadingSpots || loadingCountries) && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-40 h-40">
              <Lottie animationData={planeAnimation} loop />
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading your Southeast Asia feed…</p>
          </div>
        )}

        {/* SPOTS SECTION */}
        {!loadingSpots && (
          <section className="container mx-auto px-4 py-12">
            <div className="flex items-end justify-between gap-3 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">Top Tourist Spots</h2>
              <Link
                to="/all-tourist-spots"
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                View all →
              </Link>
            </div>

            {errorSpots ? (
              <p className="text-red-500">{errorSpots}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {spots.map((spot) => (
                  <Slide key={spot._id} direction="up" triggerOnce>
                    <div className="group rounded-2xl overflow-hidden shadow hover:shadow-lg bg-white dark:bg-gray-900 border dark:border-gray-800">
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={spot.image}
                          alt={spot.tourists_spot_name}
                          className="h-full w-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="text-lg font-semibold">{spot.tourists_spot_name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {spot.location} • {spot.country_Name}
                        </p>

                        <div className="flex flex-wrap gap-3 text-sm mt-2">
                          <span className="inline-flex items-center gap-1">
                            <FaMoneyBillWave /> ${spot.average_cost}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <FaClock /> {spot.travel_time}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <FaUmbrellaBeach /> {spot.seasonality}
                          </span>
                        </div>

                        <div className="pt-3">
                          <Link
                            to={`/spots/${spot._id}`}
                            className="inline-block px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Slide>
                ))}
              </div>
            )}
          </section>
        )}

        {/* COUNTRIES SECTION */}
        {!loadingCountries && (
          <section id="countries" className="bg-gray-50 dark:bg-gray-900/40">
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Countries (Southeast Asia)</h2>

              {errorCountries ? (
                <p className="text-red-500">{errorCountries}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(countries.length ? countries : countryFallback).map((c) => (
                    <Fade key={c.name} triggerOnce>
                      <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg bg-white dark:bg-gray-900 border dark:border-gray-800">
                        <div className="h-40 w-full overflow-hidden">
                          <img
                            src={c.image}
                            alt={c.name}
                            className="h-full w-full object-cover hover:scale-105 transition"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">{c.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {c.description}
                          </p>
                          <div className="pt-3">
                            <button
                              onClick={() => navigate(`/countries/${encodeURIComponent(c.name)}`)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                            >
                              <FaMapMarkedAlt /> View Spots
                            </button>
                          </div>
                        </div>
                      </div>
                    </Fade>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* EXTRA SECTION 1 — Seasonal Planner */}
        <section className="container mx-auto px-4 py-12">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
            <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold">Plan by Season</h3>
                <p className="mt-2 text-white/90">
                  Southeast Asia’s climate varies by region. Aim for **November–February** for
                  cooler, drier weather in many destinations. For islands like **Phuket** or **Phi
                  Phi**, check monsoon windows before booking.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/20">Best: Nov–Feb</span>
                  <span className="px-3 py-1 rounded-full bg-white/20">Shoulder: Mar–Apr</span>
                  <span className="px-3 py-1 rounded-full bg-white/20">Monsoon: May–Oct</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-40 h-40">
                  <Lottie animationData={planeAnimation} loop />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXTRA SECTION 2 — Tips */}
        <section className="container mx-auto px-4 pb-14">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Smart Travel Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Budget Wisely",
                desc: "Set daily budgets for food, transport, and entry fees. Many SEA cities are affordable with incredible street food.",
              },
              {
                title: "Respect Local Culture",
                desc: "When visiting temples (e.g., Angkor Wat), dress modestly and follow local etiquette.",
              },
              {
                title: "Move Efficiently",
                desc: "Use night trains/buses between cities to save on accommodation and maximize daytime exploration.",
              },
            ].map((t) => (
              <motion.div
                key={t.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-2xl bg-white dark:bg-gray-900 border dark:border-gray-800 shadow hover:shadow-lg"
              >
                <h4 className="text-lg font-semibold">{t.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
