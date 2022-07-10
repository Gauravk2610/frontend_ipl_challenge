import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarIcon } from '@heroicons/react/outline'
import Header from '../components/Header'
import Papa from 'papaparse'
import MatchesChart from '../components/MatchesChart'


function TeamDetail() {

    const params = useParams()

    const team_name = params.team_name

    const [year, setYear] = useState(2008)
    const [years, setYears] = useState([])
    const [teams, setTeams] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [matches, setMatches] = useState([])
    const [wins, setWins] = useState()
    const [loss, setLoss] = useState()

    const fetchCsv = async() => {
        return fetch('/data/matches.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }

    const getDetails = async() => {
        const csvFile = await fetchCsv()
        const csv = Papa.parse(csvFile, {header: true})
        const data = csv?.data

        var tempMacthes = []
        var tempYears = []
        var tempTeams = []
        var tempWins = 0
        var tempLoss = 0
        data.forEach(items => {
            if (!tempYears.includes(items.season) && items.season  !== undefined) {
                tempYears.push(items.season)
            }
            if(items.season == year){
                if(!tempTeams.includes(items.team1)) {
                    tempTeams.push(items.team1)
                }
                if(!tempTeams.includes(items.team2)) {
                    tempTeams.push(items.team2)
                }
                if(items.team1 == team_name || items.team2 == team_name) {
                    tempMacthes.push(items)
                }
            }
        })
        tempMacthes.map(t => t.winner == team_name ? tempWins++ : tempLoss++)
        setYears(tempYears.sort())
        setTeams(tempTeams)
        setMatches(tempMacthes)
        setWins(tempWins)
        setLoss(tempLoss)
    }


    useEffect(() => {
        getDetails()
        setIsOpen(true)
    }, [year])

  return (
    <div className='h-full pt-6 w-full overflow-y-scroll'>
        <Header title={team_name.split(" ").map(t => t[0])} />
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
            {/* Total Wins and Loss */}
            <div className='flex items-center space-x-4'>
                <div>Total Wins : <span>{wins}</span></div>
                <div>Total Loss : <span>{loss}</span></div>
            </div>
            {/* Chart */}
            <MatchesChart macthes={matches} team={team_name} />

            {/* Matches */}
            {
                matches.map((match, index) => (
                    <div key={index} className='bg-gray-800 shadow bg-opacity-80 py-2 px-4 rounded-xl my-4'>
                        <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-2 justify-between'>
                            <div className='text-2xl'>{match.team1.split(" ").map(t => t[0])} VS {match.team2.split(" ").map(t => t[0])}</div>
                            <div>Won by: {match.winner.split(" ").map(t => t[0])}</div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:space-x-2 sm:items-center justify-between'>
                            <div>Date: {match.date}</div>
                            <div>Player of match: {match.player_of_match}</div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:space-x-2 sm:items-center'>
                            <div>Win by Runs: {match.win_by_runs}</div>
                            <div>Win by Wickets: {match.win_by_wickets}</div>
                        </div>
                        <div className='flex flex-col sm:flex-row sm:space-x-2 justify-between sm:items-center'>
                            <div>Venue: {match.venue}</div>
                            <div>City: {match.city}</div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default TeamDetail