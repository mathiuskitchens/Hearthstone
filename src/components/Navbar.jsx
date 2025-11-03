import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../utils/supabase'
import profile_img from '../images/profile_img.jpeg'

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    console.log(user)
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex justify-between w-full navbar bg-base-100">
      <div className="mx-4 dropdown dropdown-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={`../Browse`}>Browse Cards</Link>
            </li>
            <li>
              <a className="justify-between">
                Build a Deck
                <span className="badge">WIP</span>
              </a>
            </li>
            <li>
              <a className="justify-between">
                Find Friends
                <span className="badge">WIP</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="justify-start navbar-center">
        <a className="justify-start text-xl btn btn-ghost">HS Deck Manager</a>
      </div>
      <div className="gap-2 flex-end">
        <div className="mx-4 dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={profile_img} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link
                to={`../profile/${currentUser}`}
                className="justify-between"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
		to="../settings"
		className="justify-between"
		>
                Settings
                <span className="badge">WIP</span>
              </Link>
            </li>
            <li>
              <a>
                Logout
                <span className="badge">WIP</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
