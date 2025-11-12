import Navbar from "../components/Navbar.jsx"

const Friends = () => {

  const friends = [
    {
      name: "Ted",
      favoriteClass: "Mage"
    },
    {
      name: "John",
      favoriteClass: "Hunter"
    },
    {
      name: "Sarah",
      favoriteClass: "Warlock"
    }
  ]

  return (
    <div className="relative bg-base-100 px-24 w-full h-screen">
      <Navbar />
      <h1 className="pt-20 align-left">
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {friends.map((f) => {
          return (
            <div className="col-span-1 w-56 h-56 bg-slate-700">
              <p className="text-xl">{f.name}</p>
              <span>{f.favoriteClass}</span>
            </div>
          )

        })}
      </div>
    </div>
  )
}

export default Friends;
