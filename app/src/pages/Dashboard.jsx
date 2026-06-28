import { usePortfolioStore } from '../store/usePortfolioStore'
import { stocks } from '../services/mockStocks'
import { calcPortfolioValue, calcPnL } from '../services/portfolioEngine'
import StockTable from '../components/StockTable'

export default function Dashboard() {
  const { cash, holdings, priceMap } = usePortfolioStore()
  const totalValue = calcPortfolioValue({ cash, holdings }, priceMap)
  const pnl = calcPnL({ cash, holdings }, priceMap)
  const totalPnL = pnl.reduce((s, h) => s + h.pnl, 0)
  const totalCost = pnl.reduce((s, h) => s + h.costBasis, 0)

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>

      <div className="grid grid-4">
        <div className="card">
          <div className="card-label">Portfolio Value</div>
          <div className="card-value">${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="card">
          <div className="card-label">Cash Balance</div>
          <div className="card-value">${cash.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="card">
          <div className="card-label">Unrealised P&L</div>
          <div className={`card-value ${totalPnL >= 0 ? 'positive' : 'negative'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
          </div>
        </div>
        <div className="card">
          <div className="card-label">Cost Basis</div>
          <div className="card-value">${totalCost.toFixed(2)}</div>
        </div>
      </div>

      <div className="section-gap">
        <div className="section-title">Market Overview</div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <StockTable stocks={stocks} />
        </div>
      </div>
    </div>
  )
}
