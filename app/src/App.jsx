import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Portfolio from './pages/Portfolio'
import Trade from './pages/Trade'
import config from './config'
import './styles.css'

export default function App() {
  return (
    <BrowserRouter basename={config.basePath}>
      <nav className="nav">
        <span className="logo">📈 StockMVP</span>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/trade">Trade</NavLink>
        <span className="env-badge">{config.env.toUpperCase()}</span>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </BrowserRouter>
  )
}
