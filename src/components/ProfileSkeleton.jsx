const BrowseSkeleton = () => {
  return (
    <div>
      <div className="w-56 mx-auto skeleton h-80"></div>
      <div id="profile-top-container" className="flex flex-wrap mt-20">
        <div id="profile-avatar" className="m-10 mx-auto avatar md:mx-20">
          <div className="w-64 rounded-full ">
            <div className="w-56 mx-auto skeleton h-80 rounded-2xl"></div>
          </div>
        </div>
        <div
          id="profile-info"
          className="p-4 m-2 mx-auto my-auto border border-orange-300 md:mx-0 rounded-xl bg-base-200"
        >
          <h1 className="text-xl font-bold">Member since {memberSince}</h1>
          <p>Favorite Class: Warlock</p>
          <h3>Username: {user.username}</h3>
        </div>
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
      </div>
    </div>
  )
}

export default BrowseSkeleton
