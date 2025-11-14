// src/pages/FindMatches.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const initialMatches = [
  {
    id: 1,
    title: "Sunday Football Fun",
    sport: "Football",
    date: "Sep 20, 2025",
    time: "05:00 PM",
    place: { area: "Central Park", city: "New York", state: "NY", map: "#" },
    players: "8/12",
    level: "Intermediate",
    organizer: "John Doe",
    need: "Looking for 4 players",
    bio: "Join us for a fun football match! All skill levels welcome. Bring your energy and enjoy the game with fellow enthusiasts.",
    img: "/football.jpg",
  },
  {
    id: 2,
    title: "Morning Tennis Match",
    sport: "Tennis",
    date: "Sep 21, 2025",
    time: "08:00 AM",
    place: { area: "Greenwood Courts", city: "Brooklyn", state: "NY", map: "#" },
    players: "1/2",
    level: "Beginner",
    organizer: "Alice Smith",
    need: "Looking for 1 player",
    bio: "A relaxed morning tennis match. Perfect for beginners. Come and improve your skills while having fun.",
    img: "/tennis.jpg",
  },
  {
    id: 3,
    title: "Evening Basketball Game",
    sport: "Basketball",
    date: "Sep 19, 2025",
    time: "06:30 PM",
    place: { area: "Downtown Gym", city: "San Francisco", state: "CA", map: "#" },
    players: "5/10",
    level: "Advanced",
    organizer: "Mike Johnson",
    need: "Looking for 5 players",
    bio: "Competitive basketball game in the evening. Advanced players only. Show your skills and teamwork!",
    img: "/basketball.jpg",
  },
  {
    id: 4,
    title: "Friendly Cricket Match",
    sport: "Cricket",
    date: "Sep 22, 2025",
    time: "03:00 PM",
    place: { area: "Riverside Ground", city: "Chicago", state: "IL", map: "#" },
    players: "7/11",
    level: "Intermediate",
    organizer: "Ravi Kumar",
    need: "Looking for 4 players",
    bio: "Casual cricket match for friends and enthusiasts. Intermediate level players welcome.",
    img: "/cricket.jpg",
  },
  {
    id: 5,
    title: "Sunday Volleyball",
    sport: "Volleyball",
    date: "Sep 23, 2025",
    time: "04:00 PM",
    place: { area: "Beach Court", city: "Miami", state: "FL", map: "#" },
    players: "6/12",
    level: "Beginner",
    organizer: "Sara Lee",
    need: "Looking for 6 players",
    bio: "Fun beach volleyball on Sunday afternoon. Beginners encouraged to join.",
    img: "/volleyball.jpg",
  },
];

const FindMatches = () => {
  const navigate = useNavigate(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState(initialMatches);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = initialMatches.filter(
      (m) =>
        m.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        m.sport.toLowerCase().includes(e.target.value.toLowerCase()) ||
        m.place.area.toLowerCase().includes(e.target.value.toLowerCase()) ||
        m.place.city.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMatches(filtered);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <button
        onClick={() => navigate(-1)} // go back to previous page
        className="absolute top-6 right-6 bg-[#001A2A] text-white px-4 py-2 rounded-md hover:bg-blue-900 font-medium"
      >
        Back
      </button>
      {/* Logo + Page Title */}
      <div className="flex items-center mb-6 gap-4">
        <img
          src="/logo2.png"
          alt="App Logo"
          className="w-12 h-12 object-contain"
        />

        <h1 className="text-3xl font-bold text-[#001A2A]">Find Matches Near You</h1>
      </div>

      {/* Search Bar */}
      <div className="flex items-center mb-6 border rounded-md px-4 py-2 w-full max-w-xl focus-within:ring-2 focus-within:ring-blue-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
        </svg>
        <input
          type="text"
          placeholder="Search by game, sport, or location"
          className="flex-1 outline-none text-lg"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Matches List */}
      <div className="flex flex-col gap-4">
        {matches.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl shadow p-4 flex items-center gap-4 hover:shadow-lg transition cursor-pointer"
            style={{ minHeight: "160px" }}
          >
            {/* Thumbnail */}
            <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
              <img src={m.img} alt={m.sport} className="w-full h-full object-cover" />
            </div>

            {/* Match Details */}
            <div className="flex-1 flex flex-col justify-between">
              <h3 className="font-semibold text-2xl text-[#001A2A]">{m.title}</h3>
              <div className="flex flex-wrap justify-start mt-1 text-sm md:text-base text-gray-700 gap-x-4 gap-y-1">
                <span>{m.sport}</span>|<span>{m.level}</span>|<span>{m.date}</span>|<span>{m.time}</span>|<span>{m.place.area}</span>
              </div>
              <p className="text-blue-600 font-medium mt-1">{m.need}</p>
            </div>

            {/* Know More Button */}
            <div className="flex-shrink-0 flex items-center">
              <button
                className="bg-[#001A2A] text-white px-4 py-2 rounded-md font-medium hover:bg-blue-900"
                onClick={() => setSelectedMatch(m)}
              >
                Know More
              </button>
            </div>
          </div>
        ))}
        {matches.length === 0 && <div className="text-gray-500 text-center mt-10">No matches found</div>}
      </div>

      {/* Details Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl relative shadow-lg">
            <button
              className="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-gray-700"
              onClick={() => setSelectedMatch(null)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-[#001A2A] mb-6">{selectedMatch.title}</h2>

            <div className="flex gap-6 mb-6">
              <div className="w-36 h-36 overflow-hidden rounded-md shadow-md">
                <img src={selectedMatch.img} alt={selectedMatch.sport} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between text-gray-700 text-lg gap-4">
                {/* Section: Sport & Level */}
                <div className="flex gap-4">
                  <p><strong>Sport:</strong> {selectedMatch.sport}</p>
                  <p><strong>Level:</strong> {selectedMatch.level}</p>
                </div>

                {/* Section: Date & Time */}
                <div className="flex gap-4">
                  <p><strong>Date:</strong> {selectedMatch.date}</p>
                  <p><strong>Time:</strong> {selectedMatch.time}</p>
                </div>

                {/* Section: Location */}
                <div className="flex items-center gap-2">
                  <strong>Location:</strong>
                  <span>{selectedMatch.place.area}, {selectedMatch.place.city}, {selectedMatch.place.state}</span>
                  <a
                    href={selectedMatch.place.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {/* Better location pin icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                    Map
                  </a>
                </div>

                {/* Section: Players */}
                <div>
                  <p><strong>Players:</strong> {selectedMatch.players}</p>
                </div>
              </div>
            </div>

            {/* Section: Bio */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">About the Match</h3>
              <p className="text-gray-800 leading-relaxed">{selectedMatch.bio}</p>
            </div>

            <button className="bg-[#001A2A] text-white px-6 py-3 rounded-md font-medium hover:bg-blue-900">
              Join Now
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default FindMatches;