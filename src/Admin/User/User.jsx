import React, { useState, useEffect } from "react";
import { Search, Eye, Mail, Star, MoreVertical, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmailModal from "./EmailModal";

const User = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Users");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleMailClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSendEmail = (data) => {
    console.log("Sending email:", data);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const users = [
    {
      id: "U001",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 234-567-8901",
      role: "driver",
      trips: "328/342",
      rating: 4.8,
      status: "active",
      image: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      id: "U002",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 234-567-8902",
      role: "passenger",
      trips: "156/156",
      rating: 4.9,
      status: "active",
      image: "https://i.pravatar.cc/150?u=michael",
    },
    {
      id: "U003",
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      phone: "+1 234-567-8903",
      role: "driver",
      trips: "475/489",
      rating: 4.9,
      status: "active",
      image: "https://i.pravatar.cc/150?u=emily",
    },
    {
      id: "U004",
      name: "James Wilson",
      email: "james.w@email.com",
      phone: "+1 234-567-8904",
      role: "passenger",
      trips: "87/89",
      rating: 4.7,
      status: "active",
      image: "https://i.pravatar.cc/150?u=james",
    },
    {
      id: "U005",
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "+1 234-567-8905",
      role: "driver",
      trips: "255/267",
      rating: 4.6,
      status: "suspended",
      image: "https://i.pravatar.cc/150?u=lisa",
    },
    {
      id: "U006",
      name: "David Martinez",
      email: "david.m@email.com",
      phone: "+1 234-567-8906",
      role: "driver",
      trips: "398/412",
      rating: 4.8,
      status: "active",
      image: "https://i.pravatar.cc/150?u=david",
    },
    {
      id: "U007",
      name: "Anna Thompson",
      email: "anna.t@email.com",
      phone: "+1 234-567-8907",
      role: "passenger",
      trips: "201/203",
      rating: 4.8,
      status: "active",
      image: "https://i.pravatar.cc/150?u=anna",
    },
    {
      id: "U008",
      name: "Robert Brown",
      email: "robert.b@email.com",
      phone: "+1 234-567-8908",
      role: "driver",
      trips: "560/578",
      rating: 4.9,
      status: "active",
      image: "https://i.pravatar.cc/150?u=robert",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesTab = 
      activeTab === "All Users" || 
      (activeTab === "Drivers" && user.role === "driver") || 
      (activeTab === "Passengers" && user.role === "passenger");
    
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Search and Filters */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm inter-font focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          {["All Users", "Drivers", "Passengers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider inter-font">User</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider inter-font">Contact</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider inter-font">Role</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider inter-font">Trips</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider inter-font">Rating</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider inter-font">Status</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider inter-font">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.image} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                      <div className="flex flex-col">
                        <span className="text-gray-900 text-sm font-semibold inter-font">{user.name}</span>
                        <span className="text-gray-500 text-[11px] inter-font">{user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-gray-900 text-sm inter-font">{user.email}</span>
                      <span className="text-gray-500 text-[11px] inter-font">{user.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${
                      user.role === 'driver' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 inter-font">
                    {user.trips}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900 inter-font">{user.rating}</span>
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => navigate(`/admin/user-management/${user.id}`)}
                        className="p-1.5 hover:bg-blue-50 text-blue-500 rounded-lg transition-all active:scale-95" 
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="p-1.5 hover:bg-gray-50 text-gray-500 rounded-lg transition-all active:scale-95"
                        title="Send Message"
                        onClick={() => handleMailClick(user)}
                      >
                        <Mail size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Modal */}
      <EmailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={selectedUser} 
        onSend={handleSendEmail} 
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top duration-300">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10">
            <div className="bg-green-500 p-1 rounded-full">
              <CheckCircle size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium inter-font">Email sent successfully to {selectedUser?.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;