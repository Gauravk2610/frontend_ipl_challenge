import { CalendarIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { AnimatePresence, motion } from 'framer-motion'
import Papa from 'papaparse'
import { Link } from 'react-router-dom'


const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.8 }
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };
  
  const livariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };
  

function Teams() {

    
    const [year, setYear] = useState(2008)
    const [years, setYears] = useState([])
    const [teams, setTeams] = useState([])
    const [isOpen, setIsOpen] = useState(false)

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
        data.forEach(items => {
            if (!tempYears.includes(items.season) && items.season  !== undefined) {
                tempYears.push(items.season)
            }
            if(items.season == year){
                tempMacthes.push(items)
                if(!tempTeams.includes(items.team1)) {
                    tempTeams.push(items.team1)
                }
                if(!tempTeams.includes(items.team2)) {
                    tempTeams.push(items.team2)
                }
            }
        })
        setYears(tempYears.sort())
        setTeams(tempTeams)
    }


    useEffect(() => {
        getDetails()
        setIsOpen(true)
    }, [year])

  return (
    <div className='h-full pt-6 w-full overflow-y-scroll'>
        <Header title={'Teams'} />
        <AnimatePresence>
            {
                isOpen ? 
                <motion.div 
                    animate={isOpen ? "open" : "closed"}
                    className='mt-4'>
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

                    <motion.div 
                        animate="open"
                        exit={"closed"}
                        variants={variants}
                        className='grid sm:grid-cols-2 gap-4 my-4'>
                        {
                            teams.map((team, index) => (
                                <Link key={index} to={`/team/${team}`} >
                                    <motion.div 
                                        initial={{
                                            y: 50,
                                            opacity: 0,
                                            transition: {
                                            y: { stiffness: 1000 }
                                            }
                                        }}
                                        variants={livariants}
                                        whileTap={{ scale: 0.95 }}
                                        key={index} 
                                        className='flex justify-between items-center w-full sm:text-lg lg:text-2xl hover:bg-slate-700 hover:bg-opacity-60 bg-gray-800 bg-opacity-80 shadow rounded-xl py-3 cursor-pointer px-4'>
                                        <div>{team}</div>
                                        <img className='w-10 h-10 sm:h-16 object-contain' src="/assets/IPL-Logo.png" alt="" />
                                    </motion.div>
                                </Link>
                            ))
                        }
                    </motion.div>
                </motion.div>
                : null
            }
        </AnimatePresence>
    </div>
  )
}

export default Teams