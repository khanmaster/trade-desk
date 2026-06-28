
export function buyStock(portfolio, ticker, price, qty) {
  if (qty <= 0) throw new Error('Quantity must be positive')
  const cost = price * qty
  if (portfolio.cash < cost) throw new Error('Insufficient funds')

  const holdings = { ...portfolio.holdings }
  const existing = holdings[ticker]

  if (existing) {
    const totalCost = existing.qty * existing.avgPrice + cost
    const totalQty = existing.qty + qty
    holdings[ticker] = { qty: totalQty, avgPrice: totalCost / totalQty }
  } else {
    holdings[ticker] = { qty, avgPrice: price }
  }

  return { ...portfolio, cash: portfolio.cash - cost, holdings }
}

export function sellStock(portfolio, ticker, price, qty) {
  if (qty <= 0) throw new Error('Quantity must be positive')
  const holding = portfolio.holdings[ticker]
  if (!holding || holding.qty < qty) throw new Error('Insufficient holdings')

  const holdings = { ...portfolio.holdings }
  const remaining = holding.qty - qty

  if (remaining === 0) {
    delete holdings[ticker]
  } else {
    holdings[ticker] = { ...holding, qty: remaining }
  }

  return { ...portfolio, cash: portfolio.cash + price * qty, holdings }
}

export function calcPortfolioValue(portfolio, priceMap) {
  const holdingsValue = Object.entries(portfolio.holdings).reduce(
    (sum, [ticker, { qty }]) => sum + qty * (priceMap[ticker] ?? 0),
    0
  )
  return portfolio.cash + holdingsValue
}

export function calcPnL(portfolio, priceMap) {
  return Object.entries(portfolio.holdings).map(([ticker, { qty, avgPrice }]) => {
    const currentPrice = priceMap[ticker] ?? 0
    const costBasis = qty * avgPrice
    const currentValue = qty * currentPrice
    return { ticker, qty, avgPrice, currentPrice, costBasis, currentValue, pnl: currentValue - costBasis }
  })
}
