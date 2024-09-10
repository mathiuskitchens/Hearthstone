import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import profile_img from '../images/profile_img.jpeg'
import { formatDate } from '../utils/utilityFunctions'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [activeTab, setActiveTab] = useState('cards')
  const [user, setUser] = useState([])
  const [memberSince, setMemberSince] = useState(user.created_at || '1/1/2023')

  const userId = 'a11b4842-8d70-405a-87ba-66fce2694e7c'

  async function getProfile() {
    const result = await supabase.from('profiles').select().eq('id', userId)
    console.log(result.data)
    setUser(result.data[0])
  }

  useEffect(() => {
    getProfile()
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      <Navbar />

      <div id="profile-top-container" className="flex flex-wrap mt-20">
        {/* Profile Image */}
        <div id="profile-avatar" className="m-10 mx-auto avatar md:mx-20">
          <div className="w-64 rounded-full ">
            {isLoading ? (
              <div className="mx-auto rounded-full w-68 skeleton h-80"></div>
            ) : (
              <img src={profile_img} />
            )}
          </div>
        </div>
        {/* Profile Info */}
        <div
          id="profile-info"
          className="p-4 m-2 mx-auto my-auto border border-orange-300 md:mx-0 rounded-xl bg-base-200"
        >
          {isLoading ? (
            <div className="w-56 h-20 mx-auto skeleton"></div>
          ) : (
            <div>
              <h1 className="text-xl font-bold">Member since {memberSince}</h1>
              <p>Favorite Class: Warlock</p>
              <h3>Username: {user.username}</h3>
            </div>
          )}
        </div>
        {/* Favorites */}
      </div>
      <div id="profile-bottom-container" className="w-5/6 mx-auto my-10">
        <div role="tablist" className="tabs tabs-boxed">
          <a
            role="tab"
            className={'tab' + (activeTab === 'cards' ? ' tab-active' : '')}
            value="cards"
            onClick={() => setActiveTab('cards')}
          >
            Cards
          </a>
          <a
            role="tab"
            className={'tab' + (activeTab === 'decks' ? ' tab-active' : '')}
            value="decks"
            onClick={() => setActiveTab('decks')}
          >
            Decks
          </a>
        </div>
        {isLoading ? (
          <>
            <div className="w-5/6 h-20 mx-auto my-10 skeleton"></div>
            <div className="w-5/6 h-20 mx-auto my-10 skeleton"></div>
            <div className="w-5/6 h-20 mx-auto my-10 skeleton"></div>
            <div className="w-5/6 h-20 mx-auto my-10 skeleton"></div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

export default Profile
