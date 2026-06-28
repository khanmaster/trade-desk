export const stocks = [
  { ticker: 'AAPL', company: 'Apple Inc.', price: 182.63, change: 1.24, sector: 'Technology' },
  { ticker: 'NVDA', company: 'NVIDIA Corp.', price: 487.21, change: 3.87, sector: 'Technology' },
  { ticker: 'AMZN', company: 'Amazon.com Inc.', price: 134.57, change: -0.92, sector: 'Consumer' },
  { ticker: 'MSFT', company: 'Microsoft Corp.', price: 374.51, change: 0.65, sector: 'Technology' },
  { ticker: 'TSLA', company: 'Tesla Inc.', price: 248.42, change: -2.31, sector: 'Automotive' },
  { ticker: 'JPM',  company: 'JPMorgan Chase', price: 196.88, change: 0.43, sector: 'Finance' },
  { ticker: 'GOOGL',company: 'Alphabet Inc.', price: 141.96, change: 1.02, sector: 'Technology' },
  { ticker: 'META', company: 'Meta Platforms', price: 502.77, change: 2.15, sector: 'Technology' },
]

export const getPriceMap = () =>
  Object.fromEntries(stocks.map(s => [s.ticker, s.price]))
