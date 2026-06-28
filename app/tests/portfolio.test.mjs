// portfolioEngine is ESM — Vitest transforms it, but we need to ensure
// the transform pipeline is active. Using .test.mjs forces ESM context.
import { describe, it, expect } from 'vitest'
import { buyStock, sellStock, calcPortfolioValue, calcPnL } from '../src/services/portfolioEngine.js'

const base = { cash: 10000, holdings: {} }

describe('buyStock', () => {
  it('deducts cash and adds holding', () => {
    const result = buyStock(base, 'AAPL', 100, 5)
    expect(result.cash).toBe(9500)
    expect(result.holdings.AAPL.qty).toBe(5)
    expect(result.holdings.AAPL.avgPrice).toBe(100)
  })

  it('calculates correct avg price on second buy', () => {
    const after1 = buyStock(base, 'AAPL', 100, 5)
    const after2 = buyStock(after1, 'AAPL', 200, 5)
    expect(after2.holdings.AAPL.avgPrice).toBe(150)
    expect(after2.holdings.AAPL.qty).toBe(10)
  })

  it('throws on insufficient funds', () => {
    expect(() => buyStock(base, 'AAPL', 100, 200)).toThrow('Insufficient funds')
  })
})

describe('sellStock', () => {
  it('increases cash and reduces holdings', () => {
    const bought = buyStock(base, 'AAPL', 100, 5)
    const result = sellStock(bought, 'AAPL', 150, 3)
    expect(result.cash).toBe(9500 + 450)
    expect(result.holdings.AAPL.qty).toBe(2)
  })

  it('removes holding when fully sold', () => {
    const bought = buyStock(base, 'AAPL', 100, 5)
    const result = sellStock(bought, 'AAPL', 100, 5)
    expect(result.holdings.AAPL).toBeUndefined()
  })

  it('throws on insufficient holdings', () => {
    expect(() => sellStock(base, 'AAPL', 100, 1)).toThrow('Insufficient holdings')
  })
})

describe('calcPortfolioValue', () => {
  it('sums cash and holdings value', () => {
    const portfolio = { cash: 5000, holdings: { AAPL: { qty: 10, avgPrice: 100 } } }
    const value = calcPortfolioValue(portfolio, { AAPL: 200 })
    expect(value).toBe(7000)
  })
})

describe('calcPnL', () => {
  it('calculates correct PnL per holding', () => {
    const portfolio = { cash: 0, holdings: { AAPL: { qty: 10, avgPrice: 100 } } }
    const pnl = calcPnL(portfolio, { AAPL: 150 })
    expect(pnl[0].pnl).toBe(500)
    expect(pnl[0].costBasis).toBe(1000)
    expect(pnl[0].currentValue).toBe(1500)
  })
})
