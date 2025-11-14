// Home.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./profile";
import PostMatch from "./PostMatches";
import FindUsers from "./FindUsers";
import NotificationPanel from "./NotificationPanel";
import {
  FaHome,
  FaSearch,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import logo2 from "/logo2.png";

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [isPostMatchOpen, setIsPostMatchOpen] = useState(false);
  const [isFindUsersOpen, setIsFindUsersOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [activityView, setActivityView] = useState("Weekly");
  const [leaderboardView, setLeaderboardView] = useState("Weekly");
  // sample activity
  const activityWeekly = [
    { day: "Mon", sessions: 2 },
    { day: "Tue", sessions: 3 },
    { day: "Wed", sessions: 4 },
    { day: "Thu", sessions: 5 },
    { day: "Fri", sessions: 3 },
    { day: "Sat", sessions: 5 },
    { day: "Sun", sessions: 2 },
  ];
  const activityMonthly = [
    { day: "Week 1", sessions: 14 },
    { day: "Week 2", sessions: 18 },
    { day: "Week 3", sessions: 12 },
    { day: "Week 4", sessions: 20 },
  ];
  const activity = activityView === "Weekly" ? activityWeekly : activityMonthly;

  // sample leaderboard
  const leaderboardWeekly = [
    { name: "Karan", matches: 10, img: 1 },
    { name: "Suraj", matches: 9, img: 2 },
    { name: "Atul", matches: 8, img: 3 },
    { name: "You", matches: 7, img: 4 },
  ];
  const leaderboardMonthly = [
    { name: "Karan", matches: 35, img: 1 },
    { name: "Suraj", matches: 30, img: 2 },
    { name: "Atul", matches: 28, img: 3 },
    { name: "You", matches: 25, img: 4 },
  ];
  const leaderboard =
    leaderboardView === "Weekly" ? leaderboardWeekly : leaderboardMonthly;

  const recommendedMatches = [
    {
      id: 1,
      title: "Cricket Tournament",
      place: "ABC Stadium",
      time: "7:00 PM",
      need: "Need 4 players",
      img: "/image.png",
      players: 14,
      level: "Intermediate",
      organizer: "XYZ Club",
    },
    {
      id: 2,
      title: "Football Friendly",
      place: "Blue Ground",
      time: "8:30 PM",
      need: "Need 2 players",
      img: "/football.jpg",
      players: 10,
      level: "All levels",
      organizer: "Neighborhood FC",
    },
    {
      id: 3,
      title: "Evening Badminton",
      place: "City Court",
      time: "6:00 PM",
      need: "Need 1 player",
      img: "/badminton.jpg",
      players: 6,
      level: "Casual",
      organizer: "City Sports",
    },
    {
      id: 4,
      title: "Sunday Fun Match",
      place: "Riverside Arena",
      time: "5:30 PM",
      need: "Need 6 players",
      img: "/fun match.jpg",
      players: 18,
      level: "Friendly",
      organizer: "Weekend Crew",
    },
  ];

  const featuredMatches = [
    {
      id: "f1",
      title: "Mohali Stadium - Cricket",
      summary: "Great match for intermediate players. 10/14 players joined.",
      time: "7:00 PM",
      organizer: "Jai ho Group",
      img: "/mohali.webp",
    },
    {
      id: "f2",
      title: "Blue Ground - Football",
      summary: "Casual 7-a-side. Open to all skill levels.",
      time: "8:30 PM",
      organizer: "Friendly League",
      img: "/football2.webp",
    },
  ];
  useEffect(() => {
    if (isPostMatchOpen) {
      document.body.style.overflow = "hidden"; // scroll 
    } else {
      document.body.style.overflow = "auto"; // scroll
    }
  }, [isPostMatchOpen]);
  useEffect(() => {
    if (isFindUsersOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFindUsersOpen]);
  useEffect(() => {
    if (isNotificationPanelOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isNotificationPanelOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-[#001A2A] fixed left-0 top-0 bottom-0 text-white flex flex-col justify-between transition-all duration-300 z-50 shadow-lg`}
      >
        <div>
          <div className="flex items-center justify-between px-4 py-4">
            <img
              src={logo2}
              alt="Fitmate"
              className={`object-contain transition-all duration-300 ${
                isOpen ? "w-28 h-28" : "w-7 h-7"
              }`}
            />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
              className="p-2 rounded-md hover:bg-gray-700 text-gray-300"
            >
              <FaBars className="text-lg" />
            </button>
          </div>

          <nav className="mt-6 px-4 flex flex-col gap-6 text-lg">
            <Link
              to="#"
              onClick={() => setActiveSection("home")}
              className="flex items-center gap-3 text-gray-100 hover:text-blue-300"
            >
              <FaHome />
              {isOpen && <span className="text-base">Home</span>}
            </Link>

            <Link
              to="#"
              onClick={() => setIsFindUsersOpen(true)} // modal open
              className="flex items-center gap-3 text-gray-100 hover:text-blue-300"
            >
              <FaSearch />
              {isOpen && <span className="text-base">Find User</span>}
            </Link>
            {/* Notifications Modal */}
            {isNotificationPanelOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                {/* Background blur */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                  onClick={() => setIsNotificationPanelOpen(false)} // click se close
                ></div>
              </div>
            )}

            <Link
              to="#"
              onClick={() => setIsNotificationPanelOpen(true)}
              className="flex items-center gap-3 text-gray-100 hover:text-blue-300"
            >
              <FaBell />
              {isOpen && <span className="text-base">Notifications</span>}
            </Link>

            <Link
              to="#"
              onClick={() => setActiveSection("profile")}
              className="flex items-center gap-3 text-gray-100 hover:text-blue-300"
            >
              <FaUser />
              {isOpen && <span className="text-base">Profile</span>}
            </Link>

            <Link
              to="/settings"
              onClick={() => setActiveSection("settings")}
              className="flex items-center gap-3 text-gray-100 hover:text-blue-300"
            >
              <FaCog />
              {isOpen && <span className="text-base">Settings</span>}
            </Link>
          </nav>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
            {isOpen && (
              <div>
                <div className="font-semibold text-sm">John Doe</div>
                <div className="text-xs text-gray-300">Online</div>
              </div>
            )}
          </div>

          <a
            href="#"
            className="mt-4 flex items-center gap-3 text-red-400 hover:text-red-600"
          >
            <FaSignOutAlt />
            {isOpen && <span className="text-sm">Logout</span>}
          </a>
        </div>
      </aside>

      {/* Main area */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        {activeSection === "home" && (
          <>
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 py-5">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/FindMatches")}
                  className="bg-[#001A2A] text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-[#151521] transition"
                >
                  Find Matches Near You
                </button>
                {isPostMatchOpen && (
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Background blur */}
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                      onClick={() => setIsPostMatchOpen(false)} // background click se close
                    ></div>

                    {/* Modal content */}
                    <div className="relative z-10 w-[90%] max-w-5xl">
                      <PostMatch onClose={() => setIsPostMatchOpen(false)} />
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setIsPostMatchOpen(true)}
                  className="bg-[#001A2A] text-white px-5 py-3 rounded-lg font-semibold shadow hover:bg-[#151521] transition"
                >
                  Post a Match Requirement
                </button>
              </div>

              <h1 className="text-4xl font-extrabold text-gray-800">
                Welcome 🎉
              </h1>
            </div>

            {/* Content grid */}
            <div className="px-8 pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left + middle main area */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  {/* Activity & Leaderboard */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Activity */}
                    <section className="md:col-span-2 bg-white rounded-xl p-6 shadow-md">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <FaChartLine className="text-2xl text-blue-600" />
                          <h2 className="text-2xl font-semibold">Activity</h2>
                        </div>
                        <select
                          value={activityView}
                          onChange={(e) => setActivityView(e.target.value)}
                          className="border rounded-md px-3 py-1 text-sm"
                        >
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>

                      <div style={{ height: 260 }} className="w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={activity}
                            margin={{ left: 0, right: 24 }}
                          >
                            <CartesianGrid
                              stroke="#f1f5f9"
                              strokeDasharray="3 3"
                            />
                            <XAxis dataKey="day" tick={{ fill: "#64748b" }} />
                            <YAxis tick={{ fill: "#64748b" }} />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="sessions"
                              stroke="#2563eb"
                              strokeWidth={3}
                              dot={{ r: 4, stroke: "#fff", strokeWidth: 2 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </section>

                    {/* Leaderboard */}
                    <section className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-semibold">Leaderboard</h3>
                        <select
                          value={leaderboardView}
                          onChange={(e) => setLeaderboardView(e.target.value)}
                          className="border rounded-md px-3 py-1 text-sm"
                        >
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>

                      <ul className="space-y-3">
                        {leaderboard.map((p) => (
                          <li
                            key={p.name}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={`https://randomuser.me/api/portraits/men/${p.img}.jpg`}
                                alt={p.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="leading-tight">
                                <div className="font-medium">{p.name}</div>
                                <div className="text-xs text-gray-400">
                                  Pro player
                                </div>
                              </div>
                            </div>
                            <div className="text-lg font-semibold text-gray-700">
                              {p.matches}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Recommended & Featured */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recommended */}
                    <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md flex flex-col">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                          Recommended Matches
                        </h2>
                        <div className="text-sm text-gray-500">
                          Suggestions based on your location & activity
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {recommendedMatches.map((m) => (
                          <article
                            key={m.id}
                            className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
                          >
                            <div className="h-44 w-full overflow-hidden">
                              <img
                                src={m.img}
                                alt={m.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="p-4 flex flex-col justify-between flex-1">
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {m.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                                  <FaMapMarkerAlt /> {m.place}
                                </p>
                                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                  <FaClock /> {m.time} • <FaUsers /> {m.level}
                                </p>
                                <p className="text-sm text-blue-600 font-medium mt-2">
                                  {m.need}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Organized by {m.organizer}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-gray-700">
                                  Players:{" "}
                                  <span className="font-semibold">
                                    {m.players}
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  <button className="px-3 py-1.5 rounded-md border bg-white text-sm hover:bg-gray-100">
                                    Details
                                  </button>
                                  <button className="px-4 py-1.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700">
                                    Join Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    </section>

                    {/* Featured */}
                    <section className="bg-white rounded-2xl p-6 shadow-md">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                          Featured Matches Today
                        </h2>
                        <div className="text-sm text-gray-500">Top picks</div>
                      </div>

                      <div className="space-y-6">
                        {featuredMatches.map((f) => (
                          <div
                            key={f.id}
                            className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                          >
                            <div className="w-full h-40 sm:h-48 md:h-56">
                              <img
                                src={f.img}
                                alt={f.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-lg">
                                    {f.title}
                                  </h4>
                                  <div className="text-xs text-gray-400">
                                    Organized by {f.organizer}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600 whitespace-nowrap">
                                  {f.time}
                                </div>
                              </div>

                              <p className="text-sm text-gray-600 mt-3">
                                {f.summary}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>

                {/* Right panel: top-to-bottom full height */}
                <aside className="flex-[0.35] bg-gray-50 p-6 rounded-xl shadow-md min-h-screen flex flex-col gap-5">
                  {/* User Card */}
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col items-center">
                      <img
                        src="https://randomuser.me/api/portraits/men/10.jpg"
                        alt="User"
                        className="w-20 h-20 rounded-full mb-3 object-cover"
                      />
                      <div className="text-lg font-semibold">John Doe</div>
                      <div className="text-xs text-gray-400">
                        Sydney, Australia
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center mt-5">
                      <div>
                        <div className="font-semibold text-lg">75</div>
                        <div className="text-xs text-gray-400">Weight</div>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">6.5</div>
                        <div className="text-xs text-gray-400">Height</div>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">25</div>
                        <div className="text-xs text-gray-400">Age</div>
                      </div>
                    </div>
                  </div>

                  {/* Game history */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold mb-3">Your game history</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span>🏏</span>
                          <div>
                            <div className="font-medium">Cricket</div>
                            <div className="text-xs text-gray-400">
                              Competitive matches
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-500">15</div>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span>⚽</span>
                          <div>
                            <div className="font-medium">Football</div>
                            <div className="text-xs text-gray-400">
                              Friendly matches
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-500">5</div>
                      </li>
                      <li className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span>🎾</span>
                          <div>
                            <div className="font-medium">Tennis</div>
                            <div className="text-xs text-gray-400">
                              Practice sessions
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-500">3</div>
                      </li>
                    </ul>
                  </div>

                  {/* Monthly Progress */}
                  <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                    <h4 className="font-semibold mb-3">Monthly Progress</h4>
                    <div className="mx-auto w-28 h-28 rounded-full relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                      <div
                        className="absolute inset-0 rounded-full border-8 border-blue-500"
                        style={{ clipPath: "inset(0 0 40% 0)" }}
                      />
                      <div className="relative font-bold text-lg">80%</div>
                    </div>
                    <div className="text-xs text-gray-400 mt-3">
                      You are in top 80% users of this month
                    </div>
                  </div>

                  {/* Scheduled Matches */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold mb-3">
                      Your Scheduled matches
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="font-medium">Cricket Match</div>
                        <div className="text-xs text-gray-400">
                          ABC Cricket Stadium — Today, 6:00 PM
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Cricket Match</div>
                        <div className="text-xs text-gray-400">
                          ABC Stadium — Tomorrow, 6:00 PM
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">Football Practice</div>
                        <div className="text-xs text-gray-400">
                          Blue Ground — Tomorrow, 8:30 PM
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Suggested Players (to fill vacant space) */}
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h4 className="font-semibold mb-3">Suggested Players</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-3">
                        <img
                          src="https://randomuser.me/api/portraits/men/32.jpg"
                          alt="Player"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">Aman Verma</div>
                          <div className="text-xs text-gray-400">
                            Football lover
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center gap-3">
                        <img
                          src="https://randomuser.me/api/portraits/women/45.jpg"
                          alt="Player"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium">Neha Sharma</div>
                          <div className="text-xs text-gray-400">
                            Tennis partner
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#001A2A] rounded-xl p-2 shadow-sm flex gap-2">
                    <button
                      className="flex-1 text-slate-100 text-lg py-2 rounded-lg"
                      onClick={() =>
                        navigate("/profile", {
                          state: { from: "edit-profile" },
                        })
                      } // ✅ state pass kiya
                    >
                      Edit Profile
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          </>
        )}
        {activeSection === "profile" && <Profile />}
      </main>
      <FindUsers
        isOpen={isFindUsersOpen}
        onClose={() => setIsFindUsersOpen(false)}
      />
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />
    </div>
  );
}
