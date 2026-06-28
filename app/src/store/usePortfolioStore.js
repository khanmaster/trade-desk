import { create } from 'zustand'
import { buyStock, sellStock, calcPortfolioValue, calcPnL } from '../services/portfolioEngine'
import { getPriceMap } from '../services/mockStocks'

const INITIAL_CASH = 100_000

export const usePortfolioStore = create((set, get) => ({
  cash: INITIAL_CASH,
  holdings: {},
  trades: [],
  priceMap: getPriceMap(),

  buy(ticker, price, qty) {
    const { cash, holdings, trades } = get()
    const updated = buyStock({ cash, holdings }, ticker, price, qty)
    set({
      cash: updated.cash,
      holdings: updated.holdings,
      trades: [...trades, { type: 'BUY', ticker, price, qty, timestamp: new Date().toISOString() }],
    })
  },

  sell(ticker, price, qty) {
    const { cash, holdings, trades } = get()
    const updated = sellStock({ cash, holdings }, ticker, price, qty)
    set({
      cash: updated.cash,
      holdings: updated.holdings,
      trades: [...trades, { type: 'SELL', ticker, price, qty, timestamp: new Date().toISOString() }],
    })
  },

  get portfolioValue() {
    const { cash, holdings, priceMap } = get()
    return calcPortfolioValue({ cash, holdings }, priceMap)
  },

  get pnlBreakdown() {
    const { holdings, priceMap } = get()
    return calcPnL({ cash: 0, holdings }, priceMap)
  },
}))
