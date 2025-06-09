import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
  Tooltip,
  Circle,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart, // Added for the scatter plot
  Scatter, // Added for the scatter plot
  ReferenceDot, // Added for centroids in scatter plot
} from "recharts";

// Custom restaurant icon
const restaurantIcon = new L.Icon({
  iconUrl: "/icons/restaurant-logo.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Sample order points (for the map - kept as is)
const orderPoints = [
  { lat: 51.505, lng: -0.085, dish: "Spaghetti Carbonara" },
  { lat: 51.506, lng: -0.087, dish: "Margherita Pizza" },
  { lat: 51.504, lng: -0.088, dish: "Caesar Salad" },
  { lat: 51.507, lng: -0.084, dish: "Fish and Chips" },
  { lat: 51.5065, lng: -0.086, dish: "Ravioli" },
  { lat: 51.508, lng: -0.089, dish: "Steak Frites" },
  { lat: 51.502, lng: -0.081, dish: "Grilled Chicken" },
  { lat: 51.503, lng: -0.082, dish: "Cheeseburger" },
  { lat: 51.506, lng: -0.09, dish: "Tiramisu" },
];

// Hardcoded cluster assignments (for the map - kept as is)
const clusterAssignments = [0, 0, 1, 1, 0, 1, 2, 2, 1];
const clusterColors = ["#e74c3c", "#3498db", "#2ecc71"]; // Kept for map markers
const centroids = [
  { lat: 51.5052, lng: -0.086 },
  { lat: 51.5065, lng: -0.088 },
  { lat: 51.5025, lng: -0.0815 },
];

// NEW DATA FOR THE SCATTER PLOT (mimicking the image)
const scatterPoints = [
  { x: 0.5, y: 1.2, cluster: 0 },
  { x: 0.2, y: 0.9, cluster: 0 },
  { x: 4.8, y: 0.7, cluster: 1 },
  { x: 5.1, y: 1.1, cluster: 1 },
  { x: 0.7, y: 1.5, cluster: 0 },
  { x: 4.5, y: 0.4, cluster: 1 },
  { x: 2.5, y: 5.2, cluster: 2 },
  { x: 2.8, y: 5.5, cluster: 2 },
  { x: 4.9, y: 0.9, cluster: 1 },
  { x: 0.1, y: 1.0, cluster: 0 },
  { x: 0.6, y: 1.1, cluster: 0 },
  { x: 5.2, y: 0.6, cluster: 1 },
  { x: 2.3, y: 5.0, cluster: 2 },
  { x: 2.7, y: 5.3, cluster: 2 },
  { x: 0.3, y: 1.3, cluster: 0 },
  { x: 4.6, y: 0.8, cluster: 1 },
  { x: 2.9, y: 5.1, cluster: 2 },
  { x: 0.4, y: 0.8, cluster: 0 },
  { x: 5.0, y: 1.0, cluster: 1 },
  { x: 2.6, y: 5.4, cluster: 2 },
  { x: 0.8, y: 1.0, cluster: 0 },
  { x: 4.7, y: 0.5, cluster: 1 },
  { x: 2.4, y: 5.3, cluster: 2 },
  { x: 0.0, y: 1.1, cluster: 0 },
  { x: 4.9, y: 0.3, cluster: 1 },
  { x: 2.7, y: 5.0, cluster: 2 },
];

// Colors for the scatter plot clusters (matching the image as closely as possible)
const scatterClusterColors = ["#3498db", "#f39c12", "#2ecc71"]; // Blue, Orange, Green

// NEW CENTROIDS FOR THE SCATTER PLOT
const scatterCentroids = [
  { x: 0.4, y: 1.1, cluster: 0 }, // Centroid for blue cluster
  { x: 4.9, y: 0.75, cluster: 1 }, // Centroid for orange cluster
  { x: 2.6, y: 5.25, cluster: 2 }, // Centroid for green cluster
];


// Utility to check if point is near
const isNearby = (lat1, lng1, lat2, lng2, threshold = 0.0015) => {
  const dx = lat1 - lat2;
  const dy = lng1 - lng2;
  return Math.sqrt(dx * dx + dy * dy) <= threshold;
};

// Heatmap Layer (kept as is)
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heatData = points.map((p) => [p.lat, p.lng, 1]);
    const heatLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.2: "blue",
        0.4: "lime",
        0.6: "orange",
        0.8: "red",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

// Tooltip on hover near points (kept as is)
const HoverPopup = ({ orderPoints }) => {
  const map = useMap();
  const [hoverInfo, setHoverInfo] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { lat, lng } = e.latlng;
      const nearby = orderPoints.find((pt) =>
        isNearby(lat, lng, pt.lat, pt.lng)
      );
      if (nearby) {
        setHoverInfo({ lat: nearby.lat, lng: nearby.lng, dish: nearby.dish });
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setHoverInfo(null), 2000);
      } else {
        setHoverInfo(null);
      }
    };

    map.on("mousemove", handleMouseMove);
    return () => {
      map.off("mousemove", handleMouseMove);
    };
  }, [map, orderPoints]);

  return (
    <>
      {hoverInfo && (
        <Marker position={[hoverInfo.lat, hoverInfo.lng]} opacity={0}>
          <Tooltip direction="top" permanent offset={[0, -20]}>
            🍽️ Most Ordered: <strong>{hoverInfo.dish}</strong>
          </Tooltip>
        </Marker>
      )}
    </>
  );
};

// KMeans Cluster Visuals (for the map - kept as is)
const KMeansClusterLayer = () => {
  return (
    <>
      {orderPoints.map((point, idx) => (
        <CircleMarker
          key={idx}
          center={[point.lat, point.lng]}
          radius={8}
          pathOptions={{
            color: "#333",
            weight: 1,
            fillColor: clusterColors[clusterAssignments[idx]],
            fillOpacity: 0.8,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            {point.dish} (Cluster {clusterAssignments[idx] + 1})
          </Tooltip>
        </CircleMarker>
      ))}
      {centroids.map((c, i) => (
        <Circle
          key={`centroid-${i}`}
          center={[c.lat, c.lng]}
          radius={20}
          pathOptions={{
            color: clusterColors[i],
            fillColor: clusterColors[i],
            fillOpacity: 0.4,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]}>
            Cluster Center {i + 1}
          </Tooltip>
        </Circle>
      ))}
    </>
  );
};

// Cluster summary data (used for bar chart - kept as is)
const getClusterData = (assignments, clusterCount) => {
  const counts = Array(clusterCount).fill(0);
  assignments.forEach((c) => counts[c]++);
  return counts.map((count, i) => ({
    cluster: `Cluster ${i + 1}`,
    orders: count,
  }));
};

const Report = () => {
  const restaurantLatLng = [51.5055, -0.0865];
  const clusterData = getClusterData(clusterAssignments, 3); // For the bar chart

  return (
    <div style={{ padding: "20px" }}>
      {/* Existing Map Component */}
      <h2 style={{ marginBottom: "10px" }}>
        📍 Order Heatmap Around Bill’s London Bridge
      </h2>

      <MapContainer
        center={restaurantLatLng}
        zoom={15}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "40px", // Added space below the map
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Restaurant Marker */}
        <Marker position={restaurantLatLng} icon={restaurantIcon}>
          <Popup>Bill’s London Bridge Restaurant</Popup>
        </Marker>

        {/* Heatmap, hover tooltip, clusters */}
        <HeatmapLayer points={orderPoints} />
        <HoverPopup orderPoints={orderPoints} />
        <KMeansClusterLayer />
      </MapContainer>

      {/* NEW SECTION: Scatter Plot (Ideal Clustering) */}
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Top ordered dishes
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="X" unit="" />
          <YAxis type="number" dataKey="y" name="Y" unit="" />
          <ReTooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />

          {/* Render each cluster with its own color */}
          {scatterClusterColors.map((color, index) => (
            <Scatter
              key={`cluster-scatter-${index}`}
              name={`Dish ${index + 1}`}
              data={scatterPoints.filter((p) => p.cluster === index)}
              fill={color}
              shape="circle" // Small circles for points
            />
          ))}

          {/* Render centroids as ReferenceDots */}
          {scatterCentroids.map((c, index) => (
            <ReferenceDot
              key={`centroid-${index}`}
              x={c.x}
              y={c.y}
              r={8} // radius of the centroid dot
              fill="black" // Centroid color
              stroke="black"
              isFront={true} // ensures it's on top of other points
              // Optional: Add a tooltip for centroids
              // <ReTooltip content={({ payload }) => {
              //   if (payload && payload.length) {
              //     return (
              //       <div style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
              //         <p>{`Centroid of Cluster ${c.cluster + 1}`}</p>
              //       </div>
              //     );
              //   }
              //   return null;
              // }} />
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>

      {/* Cluster Summary Graph (remains the same) */}
      <h3 style={{ marginTop: "30px", marginBottom: "10px" }}>
        📊 Order Distribution by Cluster
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={clusterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cluster" />
          <YAxis />
          <ReTooltip />
          <Legend />
          <Bar dataKey="orders" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Report;