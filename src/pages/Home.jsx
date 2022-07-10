import { CalendarIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { motion } from "framer-motion"
import BarChart from '../components/BarChart'
import Papa from "papaparse";


function Home() {

    const [year, setYear] = useState(2008)
    const [years, setYears] = useState([])
    const [matches, setMatches] = useState([])
    const [teams, setTeams] = useState({})
    const [top5, setTop5] = useState([])

    const fetchCsv = async() => {
        return fetch('/data/matches.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }

    const getTop5 = (temp) => {
        
        // Create items array
        var items = Object.keys(temp).map(function(key) {
        return [key, temp[key]];
        });
    
        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1].win - first[1].win;
        });

        console.log(items.slice(0, 5))
        setTop5(items.slice(0, 5));
    }

    const getDetails = async() => {
        const csvFile = await fetchCsv()
        const csv = Papa.parse(csvFile, {header: true})
        const data = csv?.data
        var temp = {}
        var tempMacthes = []
        var tempYears = []
        console.log(data)
        data.forEach(items => {
            // console.log(tempYears.includes(items.season))
            if (!tempYears.includes(items.season) && items.season  !== undefined) {
                console.log(items.season)
                tempYears.push(items.season)
            }
            if(items.season == year) {
                tempMacthes.push(items)
                const team1 = items.team1
                const team2 = items.team2
                const team1Exists = temp[team1]
                const team2Exists = temp[team2]
                if(team1 == items.winner) {
                    temp[team1] = {win: team1Exists == undefined ? 1 : team1Exists.win + 1, loss: team1Exists == undefined ? 0 : team1Exists.loss}
                    temp[team2] = {win: team2Exists == undefined ? 0 : team2Exists.win, loss: team2Exists == undefined ? 1 : team2Exists.loss + 1}
                }else if(team2 == items.winner) {
                    temp[team1] = {win: team1Exists == undefined ? 1 : team1Exists.win, loss: team1Exists == undefined ? 0 : team1Exists.loss + 1}
                    temp[team2] = {win: team2Exists == undefined ? 0 : team2Exists.win + 1, loss: team2Exists == undefined ? 1 : team2Exists.loss}
                }
                // console.log(temp)
            }
        });
        setTeams(temp)
        setYears(tempYears.sort())
        getTop5(temp)
        setMatches(tempMacthes)
    }

    useEffect(() => {
        getDetails()
    }, [year])

  

  return (
    <div className='h-full pt-6 w-full overflow-y-scroll'>
        <Header title={'Dashboard'} />
        <div className='mt-4'>
            {/* Heading */}
            <div className='flex justify-between'>
                <div className='text-4xl'>Indian Premier League</div>
                <div className='flex items-center space-x-2'>
                    <CalendarIcon className='w-7 h-7' />
                    <motion.select 
                        whileTap={{ scale: 0.95 }}
                        onChange={e => setYear(e.target.value)}
                        className=' cursor-pointer outline-none px-4 bg-gray-700 py-1 rounded-lg' 
                        name="year" 
                        id="year">
                            {
                                years.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))
                            }
                    </motion.select>
                </div>
            </div>
            {/* Short Counts */}
            <div className='flex xl:space-x-4 py-4 flex-col xl:flex-row space-y-4 xl:space-y-0'>
                {/* Team List */}
                <div className='bg-gray-800 h-fit py-2 px-4 rounded-xl w-full xl:w-1/2 bg-opacity-60 shadow'>
                    <div className='text-2xl'>Team List</div>
                    <ul className='py-2'>
                        {
                            Object.keys(teams).map((team, index) => (
                                <li key={index} className='py-2 px-4 rounded-xl transition-all duration-200 cursor-pointer text-xl hover:bg-slate-700 hover:bg-opacity-60 '>{team}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className='w-full xl:w-1/2'>
                    {/* Score Counts */}
                    <div className=' grid grid-cols-2 gap-4'>
                        <div className='bg-gray-800 h-fit flex items-center justify-between  py-2 px-4 rounded-xl w-full bg-opacity-60 shadow'>
                            <div>
                                <div className='text-md sm:text-2xl'>Total Matches</div>
                                <div className='text-4xl'>{matches.length}</div>
                            </div>
                            <img className='w-10 h-20 object-contain' src="/assets/IPL-Logo.png" alt="" />
                        </div>
                        <div className='bg-gray-800 h-fit flex items-center justify-between  py-2 px-4 rounded-xl w-full bg-opacity-60 shadow'>
                            <div>
                                <div className='text-md sm:text-2xl'>Winner</div>
                                <div className='text-xl'>{top5?.length > 0 && top5[0][0]}</div>
                            </div>
                            <img className='w-8 sm:w-16 h-20 object-contain' src="https://www.freeiconspng.com/uploads/crown-png-32.png" alt="" />
                        </div>
                    </div>
                    {/* Top 5 */}
                    <div className='my-4 bg-gray-800 h-fit bg-opacity-60 shadow py-2 px-4 rounded-xl'>
                        <div className='text-md sm:text-2xl'>Top 5 Rankings</div>
                        <ul className='my-4'>
                            {
                                top5?.map((items, index) => (
                                    <li key={index} className='flex space-x-2 py-2 px-4 rounded-xl transition-all duration-200 cursor-pointer text-xl hover:bg-slate-700 hover:bg-opacity-60'><span>{index+1}.</span><span>{items[0]}</span></li>
                                ))

                            }
                        </ul>
                    </div>
                </div>
            </div>
            {/* Charts */}
            <BarChart teams={teams} />
        </div>

    </div>
  )
}

export default Home