import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Login from "./Login";
import MiniLogin from "./MiniLogin";
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://nwjjrnihbewinrgzjkad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ampybmloYmV3aW5yZ3pqa2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkwOTIwMTUsImV4cCI6MjAzNDY2ODAxNX0.NHU064kjZs8MGgTDGh0zpLIIF4_bD-Rd0tRF2ug7S-g')



const Profile = () => {
  const [session, setSession] = useState(null)
  const [activeTab, setActiveTab] = useState("cards");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    console.log(session)
  return (
    <>
      <Navbar />
      <div id="profile-top-container" className="flex flex-wrap mt-20">
        <div id="profile-avatar" className="avatar m-10 mx-auto md:mx-20">
          <div className=" w-64 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div
          id="profile-info"
          className="my-auto mx-auto md:mx-0 border-orange-300 border rounded-xl m-2 p-4 bg-base-200"
        >
          <h1 className="text-2xl font-bold">Member since DATE</h1>
          <p>Favorite Class: Warlock</p>
        </div>
      </div>
      <div id="profile-bottom-container" className="w-5/6 mx-auto my-10">
        <div role="tablist" className="tabs tabs-boxed">
          <a
            role="tab"
            className={"tab" + (activeTab === "cards" ? " tab-active" : "")}
            value="cards"
            onClick={() => setActiveTab("cards")}
          >
            Cards
          </a>
          <a
            role="tab"
            className={"tab" + (activeTab === "decks" ? " tab-active" : "")}
            value="decks"
            onClick={() => setActiveTab("decks")}
          >
            Decks
          </a>
        </div>
      </div>
    </>
  );
}




}
export default Profile;


