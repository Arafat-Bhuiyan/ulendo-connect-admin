import React from "react";

const users = [
  {
    id: 1,
    name: "Alex Murphy",
    role: "passenger",
    date: "2026-03-09",
    image: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: 2,
    name: "Jessica Lee",
    role: "driver",
    date: "2026-03-09",
    image: "https://i.pravatar.cc/150?u=jess",
  },
  {
    id: 3,
    name: "Tom Hardy",
    role: "passenger",
    date: "2026-03-08",
    image: "https://i.pravatar.cc/150?u=tom",
  },
  {
    id: 4,
    name: "Rachel Green",
    role: "driver",
    date: "2026-03-08",
    image: "https://i.pravatar.cc/150?u=rachel",
  },
];

const NewUsers = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 flex flex-col gap-6 shadow-sm">
      <h3 className="text-gray-900 text-lg font-semibold inter-font">
        Newly Registered Users
      </h3>
      <div className="flex flex-col gap-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between pb-2 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-100"
              />
              <div className="flex flex-col">
                <span className="text-gray-900 text-sm font-semibold inter-font">
                  {user.name}
                </span>
                <span className="text-gray-500 text-xs inter-font uppercase tracking-wider">
                  {user.role}
                </span>
              </div>
            </div>
            <span className="text-gray-400 text-xs inter-font font-medium">
              {user.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewUsers;
