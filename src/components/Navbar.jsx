import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MiniLogin from "../routes/MiniLogin";
import { createClient } from '@supabase/supabase-js'
import profile_img from "../images/profile_img.jpeg";

const supabase = createClient('https://nwjjrnihbewinrgzjkad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ampybmloYmV3aW5yZ3pqa2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwOTIwMTUsImV4cCI6MjAzNDY2ODAxNX0.NHU064kjZs8MGgTDGh0zpLIIF4_bD-Rd0tRF2ug7S-g')

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(1);

  useEffect(() => {
  checkUser()    

  })

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    console.log(user)
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex justify-between w-full navbar bg-base-100">
      <div className="">
        <Link to={`../Login`} className="text-xl btn btn-ghost">
          HS DeckMaster
        </Link>
      </div>
      <section className="flex">
        <div>
          <Link to={`../Browse`} className="hidden btn btn-ghost text-md">
            Browse
          </Link>
        </div>
        <div>
          <Link to={`../Browse`} className="hidden btn btn-ghost text-md">
            Search by Code
          </Link>
        </div>
      </section>
      <div className="gap-2 flex-end">

        <div className="mx-4 dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={profile_img}
              />
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
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
