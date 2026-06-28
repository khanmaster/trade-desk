import { stocks } from '../services/mockStocks'
import { usePortfolioStore } from '../store/usePortfolioStore'
import StockTable from '../components/StockTable'

export default function Trade() {
  const { cash } = usePortfolioStore()

  return (
    <div className="page">
      <h1 className="page-title">Trade</h1>

      <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="card-label">Available Cash</div>
          <div className="card-value">${cash.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="muted" style={{ fontSize: '0.8rem', textAlign: 'right' }}>
          Paper trading only<br />No real money involved
        </div>
      </div>

      <div className="section-title">Select Stock to Trade</div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <StockTable stocks={stocks} showActions={true} />
      </div>
    </div>
  )
}
