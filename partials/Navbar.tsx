import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LogoutIcon } from '@heroicons/react/solid';
import { useAppDispatch, useAppSelector, useAuth } from '@/hooks';
import { logout } from '@/slices/auth/auth';

const Links = [
  {
    text: 'home',
    link: '/',
  },
  {
    text: 'about',
    link: '/about',
  },
  
];

const authLinks = [
  {
    text: 'login',
    link: '/auth/login',
  },
  {
    text: 'signup',
    link: '/auth/signup',
  },
];

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isDrop, setIsDrop] = useState(false);
  const { user, isAuthenticated} = useAppSelector((state) => state.auth);

  const handleClick = (e: any) => {
    const navlinks = document.getElementsByClassName('nav-links')[0];
    navlinks.classList.toggle('hidden');
    setIsOpen(!isOpen);
  };

  const drop = () => {
    const el = document.getElementById('dropdown');
    el?.classList.toggle('hidden');
    setIsDrop(!isDrop);
  }
  
  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  }

  return (
    <>
      {
        isAuthenticated
         ? 
        (<>
        <header className="fixed py-2 w-screen z-20 text-gray-600 body-font bg-[#f6f7f9]">
          <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">CourseBox</span>
            </a>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
              <p>Welcome to CourseBox 🍾</p>
            </nav>
            <button onClick={drop} className="items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-2 h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </button>
            <div id="dropdown" className='hidden absolute top-20 right-0 z-10 items-center bg-gray-300 rounded py-1 px-3 mx-2' style={{ minWidth: "10rem" }}>
              <button onClick={() => handleLogout()} className="flex items-center gap-2 py-1 px-1"><LogoutIcon width={30}/>Logout</button>
            </div>
          </div>
        </header>  
        </>) :
        <nav className="nav">
          <p className="logo">CourseBox</p>

          <ul className="hidden nav-links" id="nav-links">
            {Links.map((link, i) => {
              return (
                <li key={i} className="nav-link" onClick={handleClick}>
                  <Link href={link.link}>{link.text}</Link>
                </li>
              );
            })}

            <ul className="" id="authLinks">
              {authLinks.map((link, i) => {
                return (
                  <li key={i} className="nav-link" onClick={handleClick}>
                    <Link href={link.link}>{link.text}</Link>
                  </li>
                );
              })}
            </ul>
          </ul>

          <span className="toggle-btn" onClick={handleClick}>
            <span className="bar"></span>
            <span className="bar"></span>
          </span>
        </nav>
      }
    </>
    
  );
};

export default Navbar;