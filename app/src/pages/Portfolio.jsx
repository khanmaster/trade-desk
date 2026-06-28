import { usePortfolioStore } from '../store/usePortfolioStore'
import { calcPortfolioValue, calcPnL } from '../services/portfolioEngine'

export default function Portfolio() {
  const { cash, holdings, priceMap, trades } = usePortfolioStore()
  const totalValue = calcPortfolioValue({ cash, holdings }, priceMap)
  const pnlRows = calcPnL({ cash, holdings }, priceMap)

  return (
    <div className="page">
      <h1 className="page-title">Portfolio</h1>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-label">Total Value</div>
          <div className="card-value">${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="card">
          <div className="card-label">Cash Balance</div>
          <div className="card-value">${cash.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
        </div>
      </div>

      <div className="section-gap">
        <div className="section-title">Holdings</div>
        {pnlRows.length === 0 ? (
          <div className="card muted" style={{ textAlign: 'center', padding: '2rem' }}>
            No holdings yet. Go to Trade to buy stocks.
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Qty</th>
                  <th>Avg Price</th>
                  <th>Current Price</th>
                  <th>Cost Basis</th>
                  <th>Value</th>
                  <th>P&L</th>
                  <th>P&L %</th>
                </tr>
              </thead>
              <tbody>
                {pnlRows.map(h => {
                  const pnlPct = ((h.pnl / h.costBasis) * 100).toFixed(2)
                  return (
                    <tr key={h.ticker}>
                      <td style={{ fontWeight: 600 }}>{h.ticker}</td>
                      <td>{h.qty}</td>
                      <td>${h.avgPrice.toFixed(2)}</td>
                      <td>${h.currentPrice.toFixed(2)}</td>
                      <td>${h.costBasis.toFixed(2)}</td>
                      <td>${h.currentValue.toFixed(2)}</td>
                      <td className={h.pnl >= 0 ? 'positive' : 'negative'}>
                        {h.pnl >= 0 ? '+' : ''}${h.pnl.toFixed(2)}
                      </td>
                      <td className={h.pnl >= 0 ? 'positive' : 'negative'}>
                        {h.pnl >= 0 ? '+' : ''}{pnlPct}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="section-gap">
        <div className="section-title">Trade History</div>
        {trades.length === 0 ? (
          <div className="card muted" style={{ textAlign: 'center', padding: '2rem' }}>No trades yet.</div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="table">
              <thead>
                <tr><th>Type</th><th>Ticker</th><th>Qty</th><th>Price</th><th>Total</th><th>Time</th></tr>
              </thead>
              <tbody>
                {[...trades].reverse().map((t, i) => (
                  <tr key={i}>
                    <td className={t.type === 'BUY' ? 'positive' : 'negative'}>{t.type}</td>
                    <td style={{ fontWeight: 600 }}>{t.ticker}</td>
                    <td>{t.qty}</td>
                    <td>${t.price.toFixed(2)}</td>
                    <td>${(t.qty * t.price).toFixed(2)}</td>
                    <td className="muted">{new Date(t.timestamp).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
