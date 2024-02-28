import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 z-50 w-full flex justify-between">
      <div className="">
        <Link to={`../Login`} className="btn btn-ghost text-xl">
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
      <div className="flex-end gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end mx-4">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`../profile/1`} className="justify-between">
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
