import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Truck } from "lucide-react";
import "leaflet/dist/leaflet.css";

const allVendorsData = [
  {
    id: 2,
    name: "Wiggy's Ice Cream",
    position: [23.7461, 90.3742], // Near Dhanmondi Lake
    locationName: "Near Dhanmondi Lake",
    status: "active",
    updatedTime: "Updated 2 mins ago",
    requests: 0,
  },
  {
    id: 3,
    name: "Sweet Treats on Wheels",
    position: [23.7771, 90.3994], // Gulshan 1
    locationName: "Gulshan 1 Circle",
    status: "active",
    updatedTime: "Updated 5 mins ago",
    requests: 3,
  },
  {
    id: 4,
    name: "Frosty Bites",
    position: [23.8103, 90.4125], // Uttara
    locationName: "Uttara Sector 10",
    status: "active",
    updatedTime: "Updated 10 mins ago",
    requests: 1,
  },
  {
    id: 5,
    name: "Chill Out Corner",
    position: [23.7925, 90.4078], // Banani
    locationName: "Banani Road 11",
    status: "offline",
    updatedTime: "Updated 1 hour ago",
    requests: 4,
  },
];

const createActiveVendorIcon = () => {
  return L.divIcon({
    className: "custom-vendor-icon",
    html: renderToStaticMarkup(
      <div className="relative flex items-center justify-center">
        {/* Pulsating halo for 'active' effect */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#00C950] opacity-75 animate-ping"></span>
        {/* The main icon container */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#00C950]">
          <Truck className="h-6 w-6 text-white" />
        </div>
      </div>
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
  });
};

const createOfflineVendorIcon = () => {
  return L.divIcon({
    className: "custom-vendor-icon",
    html: renderToStaticMarkup(
      // The main icon container with gray background and no animation
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#6A7282]">
        <Truck className="h-6 w-6 text-white" />
      </div>
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -40], // Point from which the popup should open relative to the iconAnchor
  });
};

// Leaflet marker icon fix for bundlers like Vite/Webpack
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
export const Map = () => {
  const activeVendorsCount = allVendorsData.filter(
    (v) => v.status === "active"
  ).length;
  const offlineVendorsCount = allVendorsData.filter(
    (v) => v.status === "offline"
  ).length;
  const totalRequests = allVendorsData.reduce((sum, v) => sum + v.requests, 0);

  const customersCards = [
    {
      title: "Active Drivers",
      number: activeVendorsCount.toString(),
      numberColor: "#101828",
    },
    {
      title: "Offline Drivers",
      number: offlineVendorsCount.toString(),
      numberColor: "#1A9F42",
    },
    {
      title: "Total Requests",
      number: totalRequests.toString(),
      numberColor: "#2B7FFF",
    },
  ];

  const vendorPositions = allVendorsData.map((vendor) => vendor.position);
  return (
    <div className="flex flex-col gap-6">
      {/* Pass the driver-specific data to the reusable component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customersCards.map((card, idx) => {
          return (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E5E7EB] p-4 flex items-center rounded-xl shadow-md"
            >
              <div className="text-[#2B2B2B] flex flex-col gap-2">
                <h2 className="text-gray-600 text-sm font-normal">
                  {card.title}
                </h2>
                <p
                  className="text-2xl font-normal"
                  style={{ color: card.numberColor }}
                >
                  {card.number}
                </p>
              </div>
            </div>
          );
        })}
      </div>

<div>
  
</div>
      {/* Map */}
      <div className="w-full flex items-start justify-center gap-4">
        {/* Left Side */}
        <div className="w-2/3 h-[600px] relative">
          <MapContainer
            scrollWheelZoom={false}
            bounds={vendorPositions}
            style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-white p-3 rounded-xl shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00C950]"></div>
                <span className="text-sm text-gray-700">Active Driver</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 rounded-full bg-[#6A7282]"></div>
                <span className="text-sm text-gray-700">Offline Driver</span>
              </div>
            </div>
            {allVendorsData.map((vendor) => (
              <Marker
                key={vendor.id}
                position={vendor.position}
                icon={
                  vendor.status === "active"
                    ? createActiveVendorIcon()
                    : createOfflineVendorIcon()
                }
              >
                <Popup>{vendor.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Right Side */}
        <div className="w-1/3">
          <div className="w-full h-[600px] overflow-y-auto relative bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <div className="justify-start text-gray-900 text-lg font-normal leading-7">
                Active & Offline Drivers
              </div>
            </div>
            <div className="flex flex-col gap-3 pr-2">
              {allVendorsData.map((vendor) => (
                <div
                  key={vendor.id}
                  className="self-stretch p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col gap-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex justify-start items-center gap-2">
                      <div
                        className={`w-2 h-2 relative rounded-full ${
                          vendor.status === "active"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                      <div className="flex justify-start items-start">
                        <div className="justify-start text-gray-900 text-base font-normal leading-6">
                          {vendor.name}
                        </div>
                      </div>
                    </div>
                    <div className="px-2 py-0.5 bg-blue-500/10 rounded-[10px] border border-blue-500/20 flex justify-center items-center gap-1">
                      <div className="justify-start text-blue-500 text-xs font-medium leading-4">
                        {vendor.requests}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="justify-start text-gray-600 text-xs font-normal leading-4">
                      {vendor.locationName}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="justify-start text-gray-600 text-xs font-normal leading-4">
                      {vendor.updatedTime}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
