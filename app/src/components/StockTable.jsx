import { useState } from 'react'
import TradeModal from './TradeModal'

export default function StockTable({ stocks, showActions = false }) {
  const [modal, setModal] = useState(null)

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Company</th>
            <th>Price</th>
            <th>Change</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {stocks.map(s => (
            <tr key={s.ticker}>
              <td style={{ fontWeight: 600 }}>{s.ticker}</td>
              <td className="muted">{s.company}</td>
              <td>${s.price.toFixed(2)}</td>
              <td className={s.change >= 0 ? 'positive' : 'negative'}>
                {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
              </td>
              {showActions && (
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-buy" onClick={() => setModal({ stock: s, mode: 'BUY' })}>Buy</button>
                  <button className="btn btn-sell" onClick={() => setModal({ stock: s, mode: 'SELL' })}>Sell</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {modal && <TradeModal {...modal} onClose={() => setModal(null)} />}
    </>
  )
}
