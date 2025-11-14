// ProfilePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCamera, FaUpload, FaArrowLeft, FaTimes } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  // Show back button ONLY if navigation state says we came from "edit-profile"
  const [showBack, setShowBack] = useState(
    location.state?.from === "edit-profile"
  );

  // Profile data + editing state
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [profile, setProfile] = useState({
    name: "Karan Singh Ranawat",
    title: "Senior Product Designer",
    email: "karansinghranawat17.com",
    phone: "+917726980057",
    bio: "Crafting digital experiences that delight users and drive business growth. Specialized in design systems, user research, and product strategy with over 8 years of experience working with Fortune 500 companies.",
    location: "Jaipur, Rajasthan, India",
    website: "Fitmate.com",
    company: "Design Studio Pro",
    experience: "8+ Years",
    education: "MFA Design, Chandigarh University",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const [skills] = useState([
    { name: "UI/UX Design", level: 95 },
    { name: "Figma", level: 90 },
    { name: "Design Systems", level: 88 },
    { name: "User Research", level: 85 },
    { name: "Prototyping", level: 92 },
    { name: "Leadership", level: 80 },
  ]);

  const stats = [
    { label: "Matches", value: "12", icon: "📊" },
    { label: "Friends", value: "0", icon: "👥" },
    { label: "Awards", value: "12", icon: "🏆" },
    { label: "Experience", value: "8 Yrs", icon: "⭐" },
  ];

  const socialLinks = [
    { name: "LinkedIn", icon: "🔗", color: "bg-blue-500" },
    { name: "Twitter", icon: "🐦", color: "bg-sky-400" },
    { name: "GitHub", icon: "💻", color: "bg-gray-700" },
    { name: "Dribbble", icon: "🎨", color: "bg-pink-500" },
  ];

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    // here you can also upload to backend etc.
    setProfile(tempProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // -----------------------
  // Image upload / camera
  // -----------------------
  const [preview, setPreview] = useState(null); // preview URL
  const [showMenu, setShowMenu] = useState(false); // small menu (Take / Upload)
  const [showCameraModal, setShowCameraModal] = useState(false); // camera modal visible
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // file upload handler
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setShowMenu(false);
    // TODO: upload file to server if needed
  };

  // Open camera (getUserMedia)
  const openCamera = async () => {
    setShowMenu(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setShowCameraModal(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Browser permission required.");
    }
  };

  // Capture snapshot from video to preview
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        setPreview(url);
        // TODO: you can upload blob to backend here
      },
      "image/jpeg",
      0.95
    );
    // close camera
    stopCamera();
    setShowCameraModal(false);
  };
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
  };

  // cleanup camera on unmount
  useEffect(() => {
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When location.state changes, update showBack
  useEffect(() => {
    setShowBack(location.state?.from === "edit-profile");
  }, [location]);

  // Close menu when clicking outside (optional)
  useEffect(() => {
    const onDocClick = (e) => {
      const target = e.target;
      // if click is outside any menu toggles, close the small menu
      if (!target.closest || !target.closest(".profile-image-menu-toggle")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Background */}
      <div className="absolute inset-x-0 top-0 h-96 bg-[#001A2A]" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Back button top-left (only when showBack true) */}
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium hover:bg-white/30 transition-all duration-300 flex items-center gap-2 border border-white/30 shadow-lg z-20"
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
          )}

          {/* Top Actions Bar */}
          <div className="flex justify-between items-center mb-8 relative">
            <div className="flex items-center gap-2"></div>

            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-full font-medium hover:bg-white/30 transition-all duration-300 flex items-center gap-2 border border-white/30"
                >
                  ✏️ Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-6 py-2.5 rounded-full font-medium hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-full font-medium hover:bg-white/30 transition-all duration-300 border border-white/30"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/50 relative">
            {/* Profile Header */}
            <div className="px-8 pt-8 pb-6 relative">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                {/* Avatar with upload UI */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-indigo-50 flex items-center justify-center">
                    {/* show preview if available, else initials */}
                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile"
                        className="w-32 h-32 object-cover rounded-2xl"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-purple-600">
                        {profile.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  {/* Camera / upload small button (bottom-right on avatar) */}
                  <div className="absolute -bottom-1 -right-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu((s) => !s);
                      }}
                      aria-expanded={showMenu}
                      className="profile-image-menu-toggle bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 focus:outline-none"
                      title="Change photo"
                    >
                      <FaCamera />
                    </button>

                    {/* small popup menu */}
                    {showMenu && (
                      <div className="absolute right-0 bottom-full mb-2 w-44 bg-white rounded-lg shadow-lg p-2 z-30">
                        <button
                          onClick={() => {
                            openCamera();
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 rounded-md"
                        >
                          <FaCamera className="text-indigo-600" /> Take Photo
                        </button>

                        <label
                          htmlFor="upload-photo"
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-50 rounded-md cursor-pointer"
                        >
                          <FaUpload className="text-indigo-600" /> Upload Photo
                        </label>
                        <input
                          id="upload-photo"
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1 text-center lg:text-left">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={tempProfile.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className="text-3xl font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                      />
                      <input
                        type="text"
                        value={tempProfile.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        className="text-lg text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {profile.name}
                      </h1>
                      <p className="text-lg text-gray-600 mb-4">
                        {profile.title}
                      </p>
                    </>
                  )}

                  <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.company}
                          onChange={(e) =>
                            handleInputChange("company", e.target.value)
                          }
                          className="bg-transparent focus:outline-none w-32"
                        />
                      ) : (
                        profile.company
                      )}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className="bg-transparent focus:outline-none w-40"
                        />
                      ) : (
                        profile.location
                      )}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-100">
              <div className="flex gap-1 px-8 bg-gray-50/50">
                {["overview", "skills", "contact"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium capitalize transition-all duration-300 border-b-2 ${
                      activeTab === tab
                        ? "text-indigo-600 border-indigo-600"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Bio Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      About
                    </h3>
                    {isEditing ? (
                      <textarea
                        value={tempProfile.bio}
                        onChange={(e) =>
                          handleInputChange("bio", e.target.value)
                        }
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                    ) : (
                      <p className="text-gray-600 leading-relaxed">
                        {profile.bio}
                      </p>
                    )}
                  </div>

                  {/* Experience & Education */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Experience
                      </h4>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.experience}
                          onChange={(e) =>
                            handleInputChange("experience", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-700">{profile.experience}</p>
                      )}
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Education
                      </h4>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.education}
                          onChange={(e) =>
                            handleInputChange("education", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white/70 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      ) : (
                        <p className="text-gray-700">{profile.education}</p>
                      )}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Connect
                    </h3>
                    <div className="flex gap-3">
                      {socialLinks.map((link, index) => (
                        <button
                          key={index}
                          className={`${link.color} text-white w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <span className="text-xl">{link.icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Professional Skills
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">
                            {skill.name}
                          </span>
                          <span className="text-sm font-semibold text-indigo-600">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group bg-gray-50 rounded-xl p-5">
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={tempProfile.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {profile.email}
                        </p>
                      )}
                    </div>

                    <div className="group bg-gray-50 rounded-xl p-5">
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={tempProfile.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {profile.phone}
                        </p>
                      )}
                    </div>

                    <div className="group bg-gray-50 rounded-xl p-5">
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Website
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.website}
                          onChange={(e) =>
                            handleInputChange("website", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {profile.website}
                        </p>
                      )}
                    </div>

                    <div className="group bg-gray-50 rounded-xl p-5">
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Location
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfile.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">
                          {profile.location}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Camera modal (simple) */}
          {showCameraModal && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-60 p-4">
              <div className="bg-white rounded-lg overflow-hidden max-w-md w-full">
                <div className="flex items-center justify-between p-3 border-b">
                  <h3 className="font-semibold">Take Photo</h3>
                  <button
                    onClick={() => {
                      stopCamera();
                      setShowCameraModal(false);
                    }}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="p-4">
                  <div className="w-full h-64 bg-black flex items-center justify-center">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      playsInline
                      muted
                    />
                  </div>

                  <div className="mt-3 flex gap-2 justify-end">
                    <button
                      onClick={() => {
                        stopCamera();
                        setShowCameraModal(false);
                      }}
                      className="px-4 py-2 rounded border"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleCapture}
                      className="px-4 py-2 rounded bg-indigo-600 text-white"
                    >
                      Capture
                    </button>
                  </div>

                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
