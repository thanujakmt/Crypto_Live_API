
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const coinIds = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'bitcoin-cash'];
  const [coinId, setCoinId] = useState('bitcoin')
  const [coinData,setCoinData] = useState(null)
  const  [loading, setLoading] = useState(false)

  const fetchData = async () => {

    try {
      setLoading(true)
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=CG-vcXreiWCNoF1XPuz6as7oejq`);
      const data = await response.data
      
      console.log(data)
      let Ojt = {
        'coinName': data.name,
        'coinSymbol': data.symbol.toLocaleUpperCase(),
        'marketRank': data.market_cap_rank,
        'currentPrice': data.market_data.current_price.usd,
        'high_24hours': data.market_data.high_24h.usd,
        'low_24hours': data.market_data.low_24h.usd,
        'totalVolume': data.market_data.total_volume.usd,
        'circulationSupply': data.market_data.circulating_supply,
        'totalSupply': data.market_data.total_supply
      }
      console.log(Ojt)
      setCoinData(Ojt)
      setLoading(false)
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [coinId]);

  return (
    <>
      <div className=' flex flex-col items-center justify-center'>
        <div className=' flex p-5'>
          <label htmlFor="coin" className=' px-2'>Select CoinID : </label>
          <select name="coin" className=' outline-none px-2' onChange={(e) => { setCoinId(e.target.value) }}>
            {
              coinIds.map((coin, index) => (
                <option value={coin}>{coin.toLocaleUpperCase()}</option>
              ))
            }
          </select>
        </div>
        <div className='flex items-center justify-center pt-24'>
          <table className=''>
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Name</th>
                <th className="border border-black px-4 py-2">Price</th>
                <th className="border border-black px-4 py-2">Market Rank</th>
                <th className="border border-black px-4 py-2">24 Hours High</th>
                <th className="border border-black px-4 py-2">24 Hours Low</th>
                <th className="border border-black px-4 py-2">Total Volume</th>
                <th className="border border-black px-4 py-2">Circulating Supply</th>
                <th className="border border-black px-4 py-2">Total Supply</th>
              </tr>
            </thead>
            <tbody>
             
              {coinData && !loading ? (
                 <tr>
                 <td className='border border-black px-4 py-2'>{coinData.coinName}</td>
                 <td className='border border-black px-4 py-2'>{coinData.currentPrice}</td>
                 <td className='border border-black px-4 py-2'>{coinData.marketRank}</td>
                 <td className='border border-black px-4 py-2'>{coinData.high_24hours}</td>
                 <td className='border border-black px-4 py-2'>{coinData.low_24hours}</td>
                 <td className='border border-black px-4 py-2'>{coinData.totalVolume}</td>
                 <td className='border border-black px-4 py-2'>{coinData.circulationSupply}</td>
                 <td className='border border-black px-4 py-2'>{coinData.totalSupply}</td>
               </tr>
              ) : (
                <tr>
                  <td colSpan="9" className="border border-black px-4 py-2">Loading...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
