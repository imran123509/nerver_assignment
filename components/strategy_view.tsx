'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const dateArray = ['25 Apr 2024', '02 May 2024', '09 May 2024', '31 May 2024', '21 Jun 2024']

const strategyArray = [
  {
    'View': 'Bullish',
    'Value': {
      '25 Apr 2024': ['Bull Call Spread', 'Bull Put Spread', 'Long Call'],
      '02 May 2024': ['Bull Call Spread', 'Bull Put Spread', 'Long Call'],
    }
  },
  {
    'View': 'Bearish',
    'Value': {
      '25 Apr 2024': ['Long Put', 'Bear Put Spread', 'Bear Put Spread', 'Bear Put Spread', 'Bear Put Spread', 'Bear Put Spread', 'Bear Put Spread', 'Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread'],
    }
  },
  {
    'View': 'Rangebound',
    'Value': {
      '25 Apr 2024': ['Iron Condor', 'Iron Butterfly'],
    }
  },
  {
    'View': 'Volatile',
    'Value': {
      '25 Apr 2024': ['Long Straddle', 'Long Strangle'],
    }
  }
]

export default function Component() {
  const [selectedView, setSelectedView] = useState('Bearish')
  const [selectedDate, setSelectedDate] = useState(dateArray[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleView = (view: string) => {
    setSelectedView(view)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const selectDate = (date: string) => {
    setSelectedDate(date)
    setIsDropdownOpen(false)
  }

  const getStrategiesForSelectedDate = () => {
    const viewData = strategyArray.find(item => item.View === selectedView)
    return viewData?.Value[selectedDate] || []
  }

  const getStrategyCount = (strategies: string[]) => {
    const counts: { [key: string]: number } = {}
    strategies.forEach(strategy => {
      counts[strategy] = (counts[strategy] || 0) + 1
    })
    return Object.entries(counts).map(([name, count]) => ({ name, count }))
  }

  const strategies = getStrategiesForSelectedDate()
  const strategyCards = getStrategyCount(strategies)

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6 bg-gray-100 rounded-full p-1">
          {['Bullish', 'Bearish', 'Rangebound', 'Volatile'].map((view) => (
            <button
              key={view}
              className={`px-4 py-2 rounded-l-lg rounded-r-lg text-sm font-medium transition-colors ${
                selectedView === view ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => toggleView(view)}
            >
              {view}
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <button
            className="w-full text-left bg-white border border-gray-300 rounded-md px-4 py-2 flex justify-between items-center font-bold"
            onClick={toggleDropdown}
          >
            <span>{selectedDate}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {dateArray.map((date) => (
                <button
                  key={date}
                  className="w-full font-bold text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => selectDate(date)}
                >
                  {date}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`space-y-3 transition-all duration-300 ${isDropdownOpen ? 'mt-40' : ''}`}>
          {strategyCards.length > 0 ? (
            strategyCards.map(({ name, count }) => (
              <div key={name} className="bg-white border border-gray-200 rounded-md p-4 flex justify-between items-center ">
                <h3 className="font-bold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">
                  {count} {count === 1 ? 'Strategy' : 'Strategies'}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p>
               There are no strategies for <br /> <span className="font-bold">{selectedDate}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}