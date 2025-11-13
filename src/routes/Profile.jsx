import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../utils/supabase'
import profile_img from '../images/profile_img.jpeg'
import { formatDate } from '../utils/utilityFunctions'
import { sampleCards } from '../utils/sampleCards'
import CardDisplay from '../components/CardDisplay'

const Profile = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [activeTab, setActiveTab] = useState('cards')
  const [user, setUser] = useState(null)
  const [memberSince, setMemberSince] = useState('1/1/2023')
  const cards = sampleCards

  async function getProfile() {
    if (!id) return
    const result = await supabase.from('profiles').select().eq('id', id)
    console.log(result.data)
    const userData = result.data?.[0]
    setUser(userData)
    if (userData?.created_at) {
      setMemberSince(formatDate(new Date(userData.created_at)))
    }
  }

  useEffect(() => {
    getProfile()
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [id])

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
              <p>Favorite Class: Mage</p>
              <h3>Username: {user?.username || 'tennockey'}</h3>
            </div>
          )}
        </div>
        {/* Favorites */}
      </div>
      <h1 className='text-xl text-center '>Favorites</h1>
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
          <div className="grid gap-8 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {cards.map((card, index) => {
              return (
                <CardDisplay key={index} index={index} card={card} />
              )
            })}
          </div>

        )}
      </div>
    </>
  )
}

export default Profile
