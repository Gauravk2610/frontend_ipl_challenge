import React, { useEffect, useState } from 'react'
import { HomeIcon as HomeFilled, UserGroupIcon as UserGroup, UserIcon as User, CogIcon as Cog, PuzzleIcon as Puzzle, XIcon, SpeakerphoneIcon } from '@heroicons/react/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom';
import { navbarState } from '../atom/navbarState';
import { useRecoilState } from "recoil"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
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

const navVariants = {
  open: { 
    x: 0, 
    // position: 'fixed',
    transition: {duration: 0.2, delay: 0.2} 
  },
  closed: { 
    x: '-120%', 
    // position: 'fixed',
    transition: { staggerChildren: 0.07, delayChildren: 0.2 } 
  }
}

const MenuList = [
  {
    title: 'Dashboard',
    icon: <HomeFilled className='w-6 h-6' />,
    link: '/'
  },
  {
    title: 'Matches',
    icon: <SpeakerphoneIcon className='w-6 h-6' />,
    link: 'matches'
  },
  {
    title: 'Teams',
    icon: <UserGroup className='w-6 h-6' />,
    link: 'teams'
  },
  {
    title: 'Trivia',
    icon: <Puzzle className='w-6 h-6' />,
    link: '/trivia'
  },
  {
    title: 'Profile',
    icon: <User className='w-6 h-6' />,
    link: '/profile'
  },
  {
    title: 'Settings',
    icon: <Cog className='w-6 h-6' />,
    link: '/settings'
  },
]

function Navbar() {

  const [isOpen, setIsOpen] = useRecoilState(navbarState);
  const { pathname } = useLocation()
  const [active, setActive] = useState('')

  useEffect(() =>{ 
      const URL = (pathname.replace('/', ''));
      if (URL==='') {
          return setActive('/')
      }
      setActive(URL)
  }, [pathname])


  return (
    <AnimatePresence>
      {
        isOpen ?
        <motion.div 
          // initial={{ x: '-120%', transition: { staggerChildren: 0.07, delayChildren: 0.2 } }}
          // animate={{ position: 'relative'}}
          exit={{ x: '-120%', transition: {duration: 0.8} }}
          animate={[isOpen ? "open" : "closed", {height: '100%', position: "realtive"}]}
          // variants={navVariants}
          className='h-full py-6'>
          <motion.nav 
            initial={{
              height: 0,
            }}
            // animate={[isOpen ? "open" : "closed", {height: '100%', delay: 200}]}
            animate={{height: '100%', delay: 200}}
            className='fixed md:!relative shadow py-4 px-4 backdrop-blur-sm md:backdrop-blur-0 bg-gray-800 bg-opacity-80 md:bg-opacity-60 w-64 rounded-xl  h-full overflow-auto'>
            <div className='flex justify-between items-center space-x-2 mb-1'>
              <div className='flex items-center space-x-2'>
                <img className='w-auto h-12 object-contain' src="/assets/IPL-Logo.png" alt="" />
                <span className='text-3xl '>IPL</span>
              </div>
              <XIcon onClick={() => setIsOpen(false)} className='w-7 md:hidden cursor-pointer' />
            </div>
            <div className='swissline' />
            <motion.ul 
              animate="open"
              exit={"closed"}
              variants={variants}
              className='my-4 space-y-4'>
                {
                  MenuList.map(({title, icon, link} , index) => (
                    <div>
                      <Link className='' to={link}>
                        <motion.li 
                          initial={{
                            y: 50,
                            opacity: 0,
                            transition: {
                              y: { stiffness: 1000 }
                            }
                          }}
                          variants={livariants}
                          whileTap={{ scale: 0.95 }}
                          className={`${active == link ? 'bg-slate-700 bg-opacity-60 shadow' : 'hover:bg-slate-700 hover:bg-opacity-60'} flex items-center space-x-2 py-3 px-4 cursor-pointer rounded-xl transition-all duration-200`}>
                          {icon}
                          <span className='text-xl'>{title}</span>
                        </motion.li>
                      </Link>
                    </div>
                  ))
                }
            </motion.ul>
          </motion.nav>
        </motion.div>
        : null
      }
    </AnimatePresence>
  )
}

export default Navbar