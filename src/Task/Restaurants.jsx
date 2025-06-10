"use client"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsDatabase,
  BsExclamationTriangle,
  BsCurrencyDollar,
  BsTrash,
  BsCheck2Circle,
  BsArrowUpShort,
  BsArrowDownShort,
  BsCalendarCheck,
  BsGraphUp,
  BsCloudRain,
  BsSun,
  BsCloud,
  BsSnow,
  BsChevronDown,
  BsChevronUp,
  BsThermometer,
  BsDroplet,
  BsWind,
  BsEye,
  BsCalendar3,
  BsGeoAlt,
  BsStarFill,
  BsPersonCheck,
  BsClipboardCheck,
  BsBarChart,
  BsShift,
  BsStopwatch,
  BsPersonPlus,
  BsClockHistory,
  BsAward,
  BsMusicNote,
  BsCup,
  BsTrophy,
  BsCamera,
  BsFlag,
  BsArrowLeft,
  BsRecycle,
  BsTree,
  BsDropletHalf,
  BsBoxSeam,
} from "react-icons/bs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts"
import "../styles/content.css"
import "bootstrap/dist/css/bootstrap.min.css"

const statusColors = {
  vacant: "border-success text-success bg-light", // Green
  occupied: "border-warning text-warning bg-light", // Yellow
}

const Restaurant = () => {
  const navigate = useNavigate()
  const [tableStatuses, setTableStatuses] = useState(Array(12).fill("vacant")) // default green
  const [isWeatherExpanded, setIsWeatherExpanded] = useState(false)
  const [isEventsExpanded, setIsEventsExpanded] = useState(false)
  const [isLaborExpanded, setIsLaborExpanded] = useState(false)
  const [showWasteDetails, setShowWasteDetails] = useState(false)

  // Waste tracking data
  const wasteData = [
    { name: "Food Waste", value: 8.5, color: "#f093fb", percentage: 45.2 },
    { name: "Bar & Alcohol", value: 4.1, color: "#ff6b9d", percentage: 21.8 },
    { name: "Packaging", value: 3.2, color: "#667eea", percentage: 17.0 },
    { name: "Organic", value: 2.1, color: "#43e97b", percentage: 11.2 },
    { name: "Recyclables", value: 0.9, color: "#4facfe", percentage: 4.8 },
  ]

  const wasteByCategory = [
    { category: "Vegetables", amount: 3.2, cost: 45.5, trend: "up" },
    { category: "Meat", amount: 2.8, cost: 89.2, trend: "down" },
    { category: "Wine & Spirits", amount: 2.4, cost: 156.8, trend: "up" },
    { category: "Beer", amount: 1.7, cost: 68.3, trend: "stable" },
    { category: "Dairy", amount: 1.5, cost: 23.8, trend: "up" },
    { category: "Bread", amount: 1.0, cost: 12.4, trend: "stable" },
  ]

  const wasteTimeline = [
    { time: "6:00", food: 0.5, bar: 0.1, packaging: 0.2, organic: 0.1, recyclables: 0.1 },
    { time: "9:00", food: 1.2, bar: 0.2, packaging: 0.4, organic: 0.3, recyclables: 0.2 },
    { time: "12:00", food: 2.8, bar: 0.8, packaging: 1.1, organic: 0.7, recyclables: 0.4 },
    { time: "15:00", food: 1.5, bar: 0.6, packaging: 0.6, organic: 0.4, recyclables: 0.2 },
    { time: "18:00", food: 3.1, bar: 1.2, packaging: 1.2, organic: 0.8, recyclables: 0.5 },
    { time: "21:00", food: 2.2, bar: 1.2, packaging: 0.8, organic: 0.5, recyclables: 0.3 },
  ]

  const wasteReductionTips = [
    {
      icon: <BsTree />,
      title: "Portion Control",
      description: "Implement smaller portion sizes to reduce plate waste",
      impact: "Reduce food waste by 25%",
    },
    {
      icon: <BsCup />,
      title: "Bar Inventory Management",
      description: "Track pour costs and implement proper bottle rotation",
      impact: "Reduce alcohol waste by 30%",
    },
    {
      icon: <BsRecycle />,
      title: "Composting Program",
      description: "Start composting organic waste for garden use",
      impact: "Divert 40% from landfill",
    },
    {
      icon: <BsBoxSeam />,
      title: "Smart Packaging",
      description: "Switch to biodegradable packaging materials",
      impact: "Reduce packaging waste by 30%",
    },
    {
      icon: <BsDropletHalf />,
      title: "Inventory Management",
      description: "Improve FIFO system and expiry tracking",
      impact: "Reduce spoilage by 35%",
    },
  ]

  // Dashboard data
  const data = [
    {
      name: "Jan",
      sales: 4000,
      revenue: 2400,
      profit: 2000,
    },
    {
      name: "Feb",
      sales: 3000,
      revenue: 1398,
      profit: 1800,
    },
    {
      name: "Mar",
      sales: 2000,
      revenue: 9800,
      profit: 2290,
    },
    {
      name: "Apr",
      sales: 2780,
      revenue: 3908,
      profit: 2500,
    },
    {
      name: "May",
      sales: 1890,
      revenue: 4800,
      profit: 2181,
    },
    {
      name: "Jun",
      sales: 2390,
      revenue: 3800,
      profit: 2500,
    },
    {
      name: "Jul",
      sales: 3490,
      revenue: 4300,
      profit: 2800,
    },
  ]

  const pieData = [
    { name: "Food", value: 400 },
    { name: "Beverages", value: 300 },
    { name: "Supplies", value: 200 },
    { name: "Equipment", value: 100 },
  ]

  const weatherSalesData = [
    { date: "25/05", temp: 22, sales: 1200, weather: "sunny", forecast: 1350 },
    { date: "26/05", temp: 18, sales: 980, weather: "rainy", forecast: 1100 },
    { date: "27/05", temp: 25, sales: 1450, weather: "sunny", forecast: 1500 },
    { date: "28/05", temp: 15, sales: 850, weather: "cloudy", forecast: 950 },
    { date: "29/05", temp: 28, sales: 1600, weather: "sunny", forecast: 1650 },
    { date: "30/05", temp: 12, sales: 750, weather: "rainy", forecast: 800 },
    { date: "31/05", temp: 20, sales: 1100, weather: "cloudy", forecast: 1200 },
  ]

  const laborPlanningData = [
    { day: "Mon", predicted: 85, actual: 82, staff: 12 },
    { day: "Tue", predicted: 92, actual: 88, staff: 14 },
    { day: "Wed", predicted: 78, actual: 75, staff: 10 },
    { day: "Thu", predicted: 105, actual: 102, staff: 16 },
    { day: "Fri", predicted: 120, actual: 118, staff: 18 },
    { day: "Sat", predicted: 140, actual: 135, staff: 20 },
    { day: "Sun", predicted: 95, actual: 92, staff: 15 },
  ]

  const upcomingEvents = [
    {
      name: "Summer Music Festival",
      date: "June 15-17",
      impact: "High",
      expectedIncrease: "+45%",
      type: "Music Event",
      distance: "0.5 km",
      attendance: "15,000",
      icon: <BsMusicNote />,
      historicalImpact: 42,
    },
    {
      name: "Food & Wine Expo",
      date: "June 22-24",
      impact: "Very High",
      expectedIncrease: "+65%",
      type: "Food Event",
      distance: "0.2 km",
      attendance: "25,000",
      icon: <BsCup />,
      historicalImpact: 68,
    },
    {
      name: "Local Marathon",
      date: "June 8",
      impact: "Medium",
      expectedIncrease: "+25%",
      type: "Sports Event",
      distance: "1.2 km",
      attendance: "8,000",
      icon: <BsTrophy />,
      historicalImpact: 28,
    },
    {
      name: "Art Gallery Opening",
      date: "June 12",
      impact: "Low",
      expectedIncrease: "+15%",
      type: "Cultural Event",
      distance: "0.8 km",
      attendance: "3,000",
      icon: <BsCamera />,
      historicalImpact: 18,
    },
  ]

  const eventImpactData = [
    { month: "Jan", musicEvents: 2, foodEvents: 1, sportsEvents: 3, salesIncrease: 25 },
    { month: "Feb", musicEvents: 1, foodEvents: 2, sportsEvents: 2, salesIncrease: 18 },
    { month: "Mar", musicEvents: 3, foodEvents: 1, sportsEvents: 4, salesIncrease: 35 },
    { month: "Apr", musicEvents: 2, foodEvents: 3, sportsEvents: 2, salesIncrease: 28 },
    { month: "May", musicEvents: 4, foodEvents: 2, sportsEvents: 3, salesIncrease: 42 },
    { month: "Jun", musicEvents: 3, foodEvents: 4, sportsEvents: 5, salesIncrease: 55 },
  ]

  const staffScheduleData = [
    { time: "6:00", kitchen: 3, service: 2, management: 1, total: 6 },
    { time: "8:00", kitchen: 4, service: 3, management: 1, total: 8 },
    { time: "10:00", kitchen: 5, service: 4, management: 2, total: 11 },
    { time: "12:00", kitchen: 8, service: 6, management: 2, total: 16 },
    { time: "14:00", kitchen: 6, service: 5, management: 2, total: 13 },
    { time: "16:00", kitchen: 5, service: 4, management: 1, total: 10 },
    { time: "18:00", kitchen: 9, service: 7, management: 2, total: 18 },
    { time: "20:00", kitchen: 8, service: 6, management: 2, total: 16 },
    { time: "22:00", kitchen: 4, service: 3, management: 1, total: 8 },
  ]

  const staffPerformanceData = [
    { name: "John Smith", efficiency: 95, tasks: 24, rating: 4.8, shift: "Morning" },
    { name: "Sarah Johnson", efficiency: 88, tasks: 22, rating: 4.6, shift: "Evening" },
    { name: "Mike Wilson", efficiency: 92, tasks: 26, rating: 4.7, shift: "Morning" },
    { name: "Emma Davis", efficiency: 85, tasks: 20, rating: 4.5, shift: "Evening" },
    { name: "Alex Brown", efficiency: 90, tasks: 23, rating: 4.6, shift: "Night" },
  ]

  const laborMetrics = [
    { metric: "Efficiency", value: 89, target: 85, color: "#43e97b" },
    { metric: "Attendance", value: 94, target: 90, color: "#667eea" },
    { metric: "Productivity", value: 87, target: 80, color: "#f093fb" },
    { metric: "Satisfaction", value: 91, target: 85, color: "#4facfe" },
  ]

  const COLORS = ["#667eea", "#f093fb", "#4facfe", "#43e97b"]

  useEffect(() => {
    const fetchTableStatuses = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:8000/api/table/tableStatus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const tableData = response.data // this is an array of table objects

        // Get table numbers that are present in the response
        const activeTableNumbers = tableData.map((t) => t.table_number)

        const updatedStatuses = Array(12).fill("vacant") // default all to vacant (green)

        activeTableNumbers.forEach((tableNumber) => {
          if (tableNumber >= 1 && tableNumber <= 12) {
            updatedStatuses[tableNumber - 1] = "occupied" // mark as occupied (yellow)
          }
        })

        setTableStatuses(updatedStatuses)
      } catch (error) {
        console.error("Failed to fetch table statuses:", error)
      }
    }

    fetchTableStatuses()
  }, [])

  const handleCardClick = (tableNumber) => {
    navigate(`/table/${tableNumber}`)
  }

  const handleReportClick = () => {
    navigate("/alltask")
  }

  const updateStatus = (index, newStatus) => {
    const updatedStatuses = [...tableStatuses]
    updatedStatuses[index] = newStatus
    setTableStatuses(updatedStatuses)
  }

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "sunny":
        return <BsSun className="weather-icon sunny" />
      case "rainy":
        return <BsCloudRain className="weather-icon rainy" />
      case "cloudy":
        return <BsCloud className="weather-icon cloudy" />
      case "snowy":
        return <BsSnow className="weather-icon snowy" />
      default:
        return <BsSun className="weather-icon" />
    }
  }

  const getEventIcon = (type) => {
    switch (type) {
      case "Music Event":
        return <BsMusicNote className="event-type-icon music" />
      case "Food Event":
        return <BsCup className="event-type-icon food" />
      case "Sports Event":
        return <BsTrophy className="event-type-icon sports" />
      case "Cultural Event":
        return <BsCamera className="event-type-icon cultural" />
      default:
        return <BsFlag className="event-type-icon" />
    }
  }

  const handleWasteClick = () => {
    setShowWasteDetails(true)
  }

  const handleBackToMain = () => {
    setShowWasteDetails(false)
  }

  if (showWasteDetails) {
    return (
      <main className="main-container">
        <div className="waste-details-container">
          {/* Header */}
          <div className="waste-header">
            <button className="back-button" onClick={handleBackToMain}>
              <BsArrowLeft />
              <span>Back to Dashboard</span>
            </button>
            <div className="waste-title-section">
              <h2>Waste Management Dashboard</h2>
              <p>Detailed waste tracking and reduction insights</p>
            </div>
            <div className="waste-date">
              <BsCalendarCheck className="icon" />
              <span>July 6, 2025</span>
            </div>
          </div>

          {/* Waste Overview Cards */}
          <div className="waste-overview-cards">
            <div className="waste-card total">
              <div className="waste-card-icon">
                <BsTrash />
              </div>
              <div className="waste-card-content">
                <h3>Total Waste</h3>
                <div className="waste-amount">18.8 lbs</div>
                <div className="waste-trend negative">
                  <BsArrowUpShort />
                  +8% from yesterday
                </div>
              </div>
            </div>

            <div className="waste-card cost">
              <div className="waste-card-icon">
                <BsCurrencyDollar />
              </div>
              <div className="waste-card-content">
                <h3>Waste Cost</h3>
                <div className="waste-amount">$456.80</div>
                <div className="waste-trend negative">
                  <BsArrowUpShort />
                  +12% from yesterday
                </div>
              </div>
            </div>

            <div className="waste-card reduction">
              <div className="waste-card-icon">
                <BsRecycle />
              </div>
              <div className="waste-card-content">
                <h3>Reduction Goal</h3>
                <div className="waste-amount">20%</div>
                <div className="waste-trend positive">
                  <BsArrowDownShort />
                  On track this month
                </div>
              </div>
            </div>

            <div className="waste-card recycled">
              <div className="waste-card-icon">
                <BsTree />
              </div>
              <div className="waste-card-content">
                <h3>Recycled</h3>
                <div className="waste-amount">3.3 lbs</div>
                <div className="waste-trend positive">
                  <BsArrowUpShort />
                  22% of total waste
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="waste-charts-grid">
            {/* Waste Distribution Pie Chart */}
            <div className="waste-chart-card">
              <h3>Waste Distribution by Type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wasteData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
                  >
                    {wasteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} lbs`, "Amount"]}
                    contentStyle={{
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Waste Timeline */}
            <div className="waste-chart-card">
              <h3>Daily Waste Timeline</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={wasteTimeline}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="var(--text-secondary)" />
                  <YAxis stroke="var(--text-secondary)" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="food" stackId="1" stroke="#f093fb" fill="#f093fb" name="Food Waste" />
                  <Area
                    type="monotone"
                    dataKey="bar"
                    stackId="1"
                    stroke="#ff6b9d"
                    fill="#ff6b9d"
                    name="Bar & Alcohol"
                  />
                  <Area
                    type="monotone"
                    dataKey="packaging"
                    stackId="1"
                    stroke="#667eea"
                    fill="#667eea"
                    name="Packaging"
                  />
                  <Area type="monotone" dataKey="organic" stackId="1" stroke="#43e97b" fill="#43e97b" name="Organic" />
                  <Area
                    type="monotone"
                    dataKey="recyclables"
                    stackId="1"
                    stroke="#4facfe"
                    fill="#4facfe"
                    name="Recyclables"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Waste by Category */}
          <div className="waste-category-section">
            <h3>Food Waste by Category</h3>
            <div className="waste-category-grid">
              {wasteByCategory.map((item, index) => (
                <div key={index} className="waste-category-card">
                  <div className="category-header">
                    <h4>{item.category}</h4>
                    <div className={`trend-indicator ${item.trend}`}>
                      {item.trend === "up" && <BsArrowUpShort />}
                      {item.trend === "down" && <BsArrowDownShort />}
                      {item.trend === "stable" && <span>—</span>}
                    </div>
                  </div>
                  <div className="category-stats">
                    <div className="stat">
                      <span className="label">Amount</span>
                      <span className="value">{item.amount} lbs</span>
                    </div>
                    <div className="stat">
                      <span className="label">Cost Impact</span>
                      <span className="value">${item.cost}</span>
                    </div>
                  </div>
                  <div className="category-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(item.amount / 3.2) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reduction Tips */}
          <div className="waste-reduction-section">
            <h3>Waste Reduction Recommendations</h3>
            <div className="reduction-tips-grid">
              {wasteReductionTips.map((tip, index) => (
                <div key={index} className="reduction-tip-card">
                  <div className="tip-icon">{tip.icon}</div>
                  <div className="tip-content">
                    <h4>{tip.title}</h4>
                    <p>{tip.description}</p>
                    <div className="tip-impact">
                      <span className="impact-label">Expected Impact:</span>
                      <span className="impact-value">{tip.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h2>Restaurant Dashboard Overview</h2>
        <div className="header-actions">
          <div className="header-date">
            <BsCalendarCheck className="icon" />
            <span>July 6, 2025</span>
          </div>
          <div className="relative">
            <div className="header-icon">
              <BsFillBellFill className="icon" />
              <span className="notification-badge">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Forecasting Section */}
      <div className="weather-forecasting-section">
        <div className="weather-header" onClick={() => setIsWeatherExpanded(!isWeatherExpanded)}>
          <div className="weather-title">
            <BsCloudRain className="weather-main-icon" />
            <div>
              <h3>Weather Forecasting & Sales Impact</h3>
              <p>25/05/2025 - 25/06/2025</p>
            </div>
          </div>
          <div className="weather-toggle">{isWeatherExpanded ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>

        {isWeatherExpanded && (
          <div className="weather-content">
            {/* Current Weather Overview */}
            <div className="weather-overview">
              <div className="current-weather">
                <div className="weather-card">
                  <BsSun className="current-weather-icon" />
                  <div className="weather-details">
                    <h4>Today's Weather</h4>
                    <div className="temp">24°C</div>
                    <div className="weather-stats">
                      <span>
                        <BsDroplet /> 65%
                      </span>
                      <span>
                        <BsWind /> 12 km/h
                      </span>
                      <span>
                        <BsEye /> 10km
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="weather-impact-cards">
                <div className="impact-card positive">
                  <BsArrowUpShort className="impact-icon" />
                  <div>
                    <h5>Sales Boost</h5>
                    <p>+15% expected</p>
                  </div>
                </div>
                <div className="impact-card neutral">
                  <BsThermometer className="impact-icon" />
                  <div>
                    <h5>Optimal Temp</h5>
                    <p>Perfect for dining</p>
                  </div>
                </div>
                <div className="impact-card info">
                  <BsPeopleFill className="impact-icon" />
                  <div>
                    <h5>Staff Needed</h5>
                    <p>16 recommended</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather & Sales Correlation Chart */}
            <div className="weather-charts-grid">
              <div className="weather-chart-card">
                <h4>Weather vs Sales Correlation</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weatherSalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#667eea" strokeWidth={3} name="Actual Sales" />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="#f093fb"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Forecasted Sales"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="weather-chart-card">
                <h4>7-Day Weather Forecast</h4>
                <div className="forecast-grid">
                  {weatherSalesData.map((day, index) => (
                    <div key={index} className="forecast-day">
                      <div className="forecast-date">{day.date}</div>
                      {getWeatherIcon(day.weather)}
                      <div className="forecast-temp">{day.temp}°C</div>
                      <div className="forecast-sales">
                        <span>Sales: ${day.sales}</span>
                        <span className="forecast-prediction">Est: ${day.forecast}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nearby Events Section */}
      <div className="events-section-container">
        <div className="events-header" onClick={() => setIsEventsExpanded(!isEventsExpanded)}>
          <div className="events-title">
            <BsCalendar3 className="events-main-icon" />
            <div>
              <h3>Nearby Events & Impact Analysis</h3>
              <p>Real-time event tracking and sales correlation</p>
            </div>
          </div>
          <div className="events-toggle">{isEventsExpanded ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>

        {isEventsExpanded && (
          <div className="events-content">
            {/* Events Overview */}
            <div className="events-overview">
              <div className="events-summary">
                <div className="summary-card">
                  <BsCalendarCheck className="summary-icon" />
                  <div className="summary-details">
                    <h4>This Month</h4>
                    <div className="summary-number">12</div>
                    <p>Events nearby</p>
                  </div>
                </div>
                <div className="summary-card">
                  <BsGraphUp className="summary-icon" />
                  <div className="summary-details">
                    <h4>Avg Impact</h4>
                    <div className="summary-number">+38%</div>
                    <p>Sales increase</p>
                  </div>
                </div>
                <div className="summary-card">
                  <BsGeoAlt className="summary-icon" />
                  <div className="summary-details">
                    <h4>Radius</h4>
                    <div className="summary-number">2km</div>
                    <p>Tracking area</p>
                  </div>
                </div>
              </div>

              <div className="events-impact-metrics">
                <div className="impact-metric">
                  <div className="metric-header">
                    <h5>High Impact Events</h5>
                    <span className="metric-value">3</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill high" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="impact-metric">
                  <div className="metric-header">
                    <h5>Medium Impact Events</h5>
                    <span className="metric-value">5</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill medium" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="impact-metric">
                  <div className="metric-header">
                    <h5>Low Impact Events</h5>
                    <span className="metric-value">4</span>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill low" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Events Charts */}
            <div className="events-charts-grid">
              <div className="events-chart-card">
                <h4>Event Impact on Sales</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={eventImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="musicEvents" fill="#667eea" name="Music Events" />
                    <Bar dataKey="foodEvents" fill="#f093fb" name="Food Events" />
                    <Bar dataKey="sportsEvents" fill="#43e97b" name="Sports Events" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="events-chart-card">
                <h4>Historical Event Performance</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={eventImpactData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="salesIncrease"
                      stroke="#4facfe"
                      strokeWidth={3}
                      name="Sales Increase %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Upcoming Events List */}
            <div className="upcoming-events">
              <h4>
                <BsCalendar3 /> Upcoming Events
              </h4>
              <div className="events-grid">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="event-card">
                    <div className="event-card-header">
                      <div className="event-icon-wrapper">{getEventIcon(event.type)}</div>
                      <div className="event-basic-info">
                        <h5>{event.name}</h5>
                        <span className={`impact-badge ${event.impact.toLowerCase().replace(" ", "-")}`}>
                          {event.impact}
                        </span>
                      </div>
                    </div>
                    <div className="event-details">
                      <div className="event-detail-row">
                        <BsCalendarCheck />
                        <span>{event.date}</span>
                      </div>
                      <div className="event-detail-row">
                        <BsGeoAlt />
                        <span>{event.distance} away</span>
                      </div>
                      <div className="event-detail-row">
                        <BsPeopleFill />
                        <span>{event.attendance} expected</span>
                      </div>
                      <div className="event-detail-row">
                        <BsGraphUp />
                        <span>{event.expectedIncrease} sales boost</span>
                      </div>
                    </div>
                    <div className="event-historical">
                      <div className="historical-label">Historical Impact</div>
                      <div className="historical-bar">
                        <div className="historical-fill" style={{ width: `${event.historicalImpact}%` }}></div>
                      </div>
                      <div className="historical-value">{event.historicalImpact}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Labor Planning Section */}
      <div className="labor-section-container">
        <div className="labor-header" onClick={() => setIsLaborExpanded(!isLaborExpanded)}>
          <div className="labor-title">
            <BsPersonCheck className="labor-main-icon" />
            <div>
              <h3>Labor Planning & Optimization</h3>
              <p>AI-driven staff scheduling and performance tracking</p>
            </div>
          </div>
          <div className="labor-toggle">{isLaborExpanded ? <BsChevronUp /> : <BsChevronDown />}</div>
        </div>

        {isLaborExpanded && (
          <div className="labor-content">
            {/* Labor Overview */}
            <div className="labor-overview">
              <div className="labor-summary">
                <div className="labor-summary-card">
                  <BsPeopleFill className="labor-summary-icon" />
                  <div className="labor-summary-details">
                    <h4>Active Staff</h4>
                    <div className="labor-summary-number">24</div>
                    <p>Currently scheduled</p>
                  </div>
                </div>
                <div className="labor-summary-card">
                  <BsClockHistory className="labor-summary-icon" />
                  <div className="labor-summary-details">
                    <h4>Efficiency</h4>
                    <div className="labor-summary-number">89%</div>
                    <p>Above target</p>
                  </div>
                </div>
                <div className="labor-summary-card">
                  <BsAward className="labor-summary-icon" />
                  <div className="labor-summary-details">
                    <h4>Performance</h4>
                    <div className="labor-summary-number">4.6</div>
                    <p>Average rating</p>
                  </div>
                </div>
              </div>

              <div className="labor-metrics">
                {laborMetrics.map((metric, index) => (
                  <div key={index} className="labor-metric-item">
                    <div className="labor-metric-header">
                      <h5>{metric.metric}</h5>
                      <span className="labor-metric-value">{metric.value}%</span>
                    </div>
                    <div className="labor-metric-bar">
                      <div
                        className="labor-metric-fill"
                        style={{
                          width: `${metric.value}%`,
                          backgroundColor: metric.color,
                        }}
                      ></div>
                      <div className="labor-metric-target" style={{ left: `${metric.target}%` }}></div>
                    </div>
                    <div className="labor-metric-target-label">Target: {metric.target}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labor Charts */}
            <div className="labor-charts-grid">
              <div className="labor-chart-card">
                <h4>Daily Staff Schedule Optimization</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={staffScheduleData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="kitchen"
                      stackId="1"
                      stroke="#667eea"
                      fill="#667eea"
                      name="Kitchen Staff"
                    />
                    <Area
                      type="monotone"
                      dataKey="service"
                      stackId="1"
                      stroke="#f093fb"
                      fill="#f093fb"
                      name="Service Staff"
                    />
                    <Area
                      type="monotone"
                      dataKey="management"
                      stackId="1"
                      stroke="#43e97b"
                      fill="#43e97b"
                      name="Management"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="labor-chart-card">
                <h4>Weekly Labor vs Demand</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={laborPlanningData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" stroke="var(--text-secondary)" />
                    <YAxis stroke="var(--text-secondary)" />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="predicted" fill="#4facfe" name="Predicted Demand" />
                    <Bar dataKey="actual" fill="#43e97b" name="Actual Traffic" />
                    <Bar dataKey="staff" fill="#f093fb" name="Staff Scheduled" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Staff Performance */}
            <div className="staff-performance">
              <h4>
                <BsAward /> Staff Performance Dashboard
              </h4>
              <div className="performance-grid">
                {staffPerformanceData.map((staff, index) => (
                  <div key={index} className="performance-card">
                    <div className="performance-header">
                      <div className="staff-avatar">
                        <BsPersonCheck />
                      </div>
                      <div className="staff-info">
                        <h5>{staff.name}</h5>
                        <span className={`shift-badge ${staff.shift.toLowerCase()}`}>{staff.shift}</span>
                      </div>
                    </div>
                    <div className="performance-metrics">
                      <div className="performance-metric">
                        <div className="metric-label">Efficiency</div>
                        <div className="metric-value">{staff.efficiency}%</div>
                        <div className="metric-bar">
                          <div className="metric-bar-fill efficiency" style={{ width: `${staff.efficiency}%` }}></div>
                        </div>
                      </div>
                      <div className="performance-metric">
                        <div className="metric-label">Tasks Completed</div>
                        <div className="metric-value">{staff.tasks}</div>
                      </div>
                      <div className="performance-metric">
                        <div className="metric-label">Rating</div>
                        <div className="metric-value">
                          <BsStarFill className="star-icon" />
                          {staff.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="labor-actions">
              <h4>
                <BsClipboardCheck /> Quick Actions
              </h4>
              <div className="actions-grid">
                <div className="action-card">
                  <BsPersonPlus className="action-icon" />
                  <div className="action-content">
                    <h5>Add Staff</h5>
                    <p>Schedule additional staff for peak hours</p>
                  </div>
                </div>
                <div className="action-card">
                  <BsShift className="action-icon" />
                  <div className="action-content">
                    <h5>Adjust Shifts</h5>
                    <p>Optimize shift patterns based on demand</p>
                  </div>
                </div>
                <div className="action-card">
                  <BsBarChart className="action-icon" />
                  <div className="action-content">
                    <h5>View Reports</h5>
                    <p>Generate detailed labor analytics</p>
                  </div>
                </div>
                <div className="action-card">
                  <BsStopwatch className="action-icon" />
                  <div className="action-content">
                    <h5>Real-time Tracking</h5>
                    <p>Monitor current staff performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Stats Cards */}
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <div>
              <h3>PRODUCTS</h3>
              <p>300</p>
              <span className="stat-change positive">
                <BsArrowUpShort /> 12% from last month
              </span>
            </div>
            <BsFillArchiveFill className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>
              <h3>CATEGORIES</h3>
              <p>12</p>
              <span className="stat-change positive">
                <BsArrowUpShort /> 4% from last month
              </span>
            </div>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>
              <h3>CUSTOMERS</h3>
              <p>33</p>
              <span className="stat-change negative">
                <BsArrowDownShort /> 2% from last month
              </span>
            </div>
            <BsPeopleFill className="card_icon" />
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>
              <h3>ALERTS</h3>
              <p>42</p>
              <span className="stat-change positive">
                <BsArrowUpShort /> 8% from last month
              </span>
            </div>
            <BsFillBellFill className="card_icon" />
          </div>
        </div>
      </div>

      {/* Key Metrics and Recent Activity Section */}
      <div className="dashboard-grid">
        {/* Key Metrics */}
        <div className="dashboard-section">
          <h3 className="section-title">Key Metrics</h3>

          <div className="metrics-grid">
            {/* Total Inventory */}
            <div className="metric-item">
              <div className="metric-icon blue">
                <BsDatabase />
              </div>
              <div className="metric-content">
                <h4>Total Inventory</h4>
                <p>300 items</p>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="metric-item">
              <div className="metric-icon orange">
                <BsExclamationTriangle />
              </div>
              <div className="metric-content">
                <h4>Low Stock Alerts</h4>
                <p>10 items</p>
              </div>
            </div>

            {/* Total Sales */}
            <div className="metric-item">
              <div className="metric-icon green">
                <BsCurrencyDollar />
              </div>
              <div className="metric-content">
                <h4>Total Sales</h4>
                <p>$25,000</p>
              </div>
            </div>

            {/* Net Profit */}
            <div className="metric-item">
              <div className="metric-icon purple">
                <BsGraphUp />
              </div>
              <div className="metric-content">
                <h4>Net Profit</h4>
                <p>$15,000</p>
              </div>
            </div>

            {/* Waste Recorded - Now Clickable */}
            <div className="metric-item clickable" onClick={handleWasteClick}>
              <div className="metric-icon red">
                <BsTrash />
              </div>
              <div className="metric-content">
                <h4>Waste Recorded</h4>
                <p>18.8 lbs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Logs */}
        <div className="dashboard-section">
          <h3 className="section-title">Recent Activity</h3>

          <div className="activity-list">
            {/* Item Added */}
            <div className="activity-item">
              <div className="activity-icon">
                <BsCheck2Circle />
              </div>
              <div className="activity-content">
                <h4>Item Added to Inventory</h4>
                <p>Successfully added 20 units of Item A</p>
                <span className="activity-time">3:34 PM</span>
              </div>
            </div>

            {/* Item Removed */}
            <div className="activity-item">
              <div className="activity-icon">
                <BsCheck2Circle />
              </div>
              <div className="activity-content">
                <h4>Item Removed from Inventory</h4>
                <p>Successfully removed 15 units of Item B</p>
                <span className="activity-time">2:15 PM</span>
              </div>
            </div>

            {/* Order Completed */}
            <div className="activity-item">
              <div className="activity-icon">
                <BsCheck2Circle />
              </div>
              <div className="activity-content">
                <h4>Order Completed</h4>
                <p>Order #1042 marked as completed - $156.50</p>
                <span className="activity-time">1:30 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="dashboard-section">
        <h3 className="section-title">Top Selling Items</h3>

        <div className="top-selling-grid">
          {/* Food */}
          <div className="top-selling-category">
            <h4>Food Items</h4>

            <div className="top-selling-items">
              {/* Burger */}
              <div className="top-selling-item">
                <div className="top-selling-rank">1</div>
                <div className="top-selling-info">
                  <h5>Burger</h5>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "100%" }}></div>
                  </div>
                  <div className="top-selling-stats">
                    <span>200 units</span>
                    <span>$2,400 revenue</span>
                  </div>
                </div>
              </div>

              {/* Pasta */}
              <div className="top-selling-item">
                <div className="top-selling-rank">2</div>
                <div className="top-selling-info">
                  <h5>Pasta</h5>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "75%" }}></div>
                  </div>
                  <div className="top-selling-stats">
                    <span>150 units</span>
                    <span>$1,800 revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Beverages */}
          <div className="top-selling-category">
            <h4>Beverages</h4>

            <div className="top-selling-items">
              {/* Red Wine */}
              <div className="top-selling-item">
                <div className="top-selling-rank">1</div>
                <div className="top-selling-info">
                  <h5>Red Wine</h5>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "100%" }}></div>
                  </div>
                  <div className="top-selling-stats">
                    <span>100 bottles</span>
                    <span>$1,500 revenue</span>
                  </div>
                </div>
              </div>

              {/* Craft Beer */}
              <div className="top-selling-item">
                <div className="top-selling-rank">2</div>
                <div className="top-selling-info">
                  <h5>Craft Beer</h5>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "80%" }}></div>
                  </div>
                  <div className="top-selling-stats">
                    <span>80 pints</span>
                    <span>$960 revenue</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        <div className="chart-card">
          <h3>Sales Performance</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="sales" stroke="#667eea" fill="url(#colorSales)" fillOpacity={0.3} />
              <Area type="monotone" dataKey="revenue" stroke="#f093fb" fill="url(#colorRevenue)" fillOpacity={0.3} />
              <Area type="monotone" dataKey="profit" stroke="#43e97b" fill="url(#colorProfit)" fillOpacity={0.3} />
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#667eea" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f093fb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f093fb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#43e97b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#43e97b" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Inventory Distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Restaurant Table Management Section */}
      <div className="dashboard-section" style={{ marginTop: "50px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="section-title">Restaurant Table Management</h3>
          <button className="btn btn-primary" onClick={handleReportClick}>
            Back to Tasks
          </button>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {tableStatuses.map((status, index) => {
            const tableNumber = index + 1
            const statusClass = statusColors[status] || "border-secondary"

            return (
              <div className="col" key={tableNumber}>
                <div
                  className={`card text-center shadow-sm ${statusClass}`}
                  style={{ cursor: "pointer", minHeight: "150px" }}
                  onClick={() => handleCardClick(tableNumber)}
                >
                  <div className="card-body d-flex flex-column justify-content-center">
                    <h5 className="card-title">Table {tableNumber}</h5>
                    <p className="card-text text-capitalize">{status}</p>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <button className="btn btn-sm btn-outline-success" onClick={() => updateStatus(index, "vacant")}>
                    Vacant
                  </button>
                  <button className="btn btn-sm btn-outline-warning" onClick={() => updateStatus(index, "occupied")}>
                    Occupied
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}

export default Restaurant
