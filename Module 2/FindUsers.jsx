// src/pages/FindUsers.jsx
import React, { useState } from "react";

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    sport: "Football",
    city: "New York",
    level: "Intermediate",
    bio: "Passionate football player. Loves weekend games.",
    img: "/user1.jpg",
    joined: "2025-01-10",
  },
  {
    id: 2,
    name: "Alice Smith",
    sport: "Tennis",
    city: "Chicago",
    level: "Beginner",
    bio: "New to tennis, looking for friendly matches.",
    img: "/user2.jpg",
    joined: "2025-03-05",
  },
  {
    id: 3,
    name: "Mike Johnson",
    sport: "Basketball",
    city: "San Francisco",
    level: "Advanced",
    bio: "Competitive player, available most evenings.",
    img: "/user3.jpg",
    joined: "2025-02-20",
  },
  {
    id: 4,
    name: "Ravi Kumar",
    sport: "Cricket",
    city: "Chicago",
    level: "Intermediate",
    bio: "Love playing cricket every Sunday afternoon.",
    img: "/user4.jpg",
    joined: "2025-04-15",
  },
];

const FindUsers = ({ isOpen, onClose }) => {
  const users = initialUsers;
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [filters, setFilters] = useState({ sport: "All", city: "All" });
  const [sortBy, setSortBy] = useState("name");

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearSearch = (term) =>
    setRecentSearches(recentSearches.filter((s) => s !== term));

  const filteredUsers = users
    .filter(
      (u) =>
        (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.city.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filters.sport === "All" || u.sport === filters.sport) &&
        (filters.city === "All" || u.city === filters.city)
    )
    .sort((a, b) =>
      sortBy === "name"
        ? a.name.localeCompare(b.name)
        : new Date(b.joined) - new Date(a.joined)
    );

  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100 z-40" : "opacity-0 -z-10"
        }`}
        onClick={onClose}
      ></div>

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col p-6 z-50`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-[#001A2A] tracking-wide">
            Discover Players
          </h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center mb-4 border rounded-md px-4 py-2 w-full focus-within:ring-2 focus-within:ring-blue-500 bg-white transition"
        >
          <input
            type="text"
            placeholder="Search by name, sport, or city"
            className="flex-1 outline-none text-lg"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="ml-3 bg-[#001A2A] text-white px-4 py-2 rounded-md hover:bg-blue-900 transition"
          >
            Search
          </button>
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term, idx) => (
                <span
                  key={idx}
                  className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {term}
                  <button
                    onClick={() => clearSearch(term)}
                    className="ml-2 text-red-500 hover:text-red-700 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <select
            className="border px-3 py-2 rounded-md"
            value={filters.sport}
            onChange={(e) =>
              setFilters({ ...filters, sport: e.target.value })
            }
          >
            <option value="All">All Sports</option>
            <option value="Football">Football</option>
            <option value="Tennis">Tennis</option>
            <option value="Basketball">Basketball</option>
            <option value="Cricket">Cricket</option>
          </select>
          <select
            className="border px-3 py-2 rounded-md"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          >
            <option value="All">All Cities</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="San Francisco">San Francisco</option>
          </select>
          <select
            className="border px-3 py-2 rounded-md ml-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort: A–Z</option>
            <option value="recent">Sort: Recently Joined</option>
          </select>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center gap-4 bg-white rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border">
                  <img
                    src={u.img}
                    alt={u.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-[#001A2A]">
                    {u.name}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {u.sport} | {u.level} | {u.city}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">{u.bio}</p>
                </div>
                <button className="bg-[#001A2A] text-white px-3 py-1.5 rounded-md hover:bg-blue-900 text-sm">
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <div className="text-gray-500 text-center mt-6">
              No users found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FindUsers;
