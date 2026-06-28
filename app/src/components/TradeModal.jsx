import { useState } from 'react'
import { usePortfolioStore } from '../store/usePortfolioStore'

export default function TradeModal({ stock, mode, onClose }) {
  const [qty, setQty] = useState(1)
  const [error, setError] = useState('')
  const { buy, sell, cash, holdings } = usePortfolioStore()

  const total = (qty * stock.price).toFixed(2)
  const holding = holdings[stock.ticker]

  function handleSubmit() {
    setError('')
    try {
      if (mode === 'BUY') buy(stock.ticker, stock.price, Number(qty))
      else sell(stock.ticker, stock.price, Number(qty))
      onClose()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{mode} {stock.ticker}</h3>
        <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
          {stock.company} · ${stock.price.toFixed(2)}
        </p>
        <label className="card-label">Quantity</label>
        <input
          type="number" min="1" value={qty}
          onChange={e => setQty(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
          <span className="muted">Total cost</span>
          <span>${total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.85rem' }}>
          <span className="muted">{mode === 'BUY' ? 'Available cash' : 'Shares owned'}</span>
          <span>{mode === 'BUY' ? `$${cash.toLocaleString()}` : (holding?.qty ?? 0)}</span>
        </div>
        {error && <p style={{ color: 'var(--red)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{error}</p>}
        <div className="modal-actions">
          <button className={`btn ${mode === 'BUY' ? 'btn-buy' : 'btn-sell'}`} onClick={handleSubmit} style={{ flex: 1 }}>
            Confirm {mode}
          </button>
          <button className="btn" style={{ background: 'var(--border)', color: 'var(--text-primary)' }} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
