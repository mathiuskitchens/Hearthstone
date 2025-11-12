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
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {friends.map((f) => {
          return (
            <div className="col-span-1 w-64 h-64 bg-base-200 my-10 rounded-xl hover:ring-1 hover:scale-105 ring-yellow-500 transition-all duration-300 flex flex-col items-center hover:font-bold">
              <h3 className="text-xl block pt-6">{f.name}</h3>
              <img src="https://assetsio.gnwcdn.com/winstreak23.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp" className="w-1/2 h-1/2 rounded-md mt-4" />
              <p className="mt-4">Favorite Class: {f.favoriteClass}</p>
            </div>
          )

        })}
      </div>
    </div>
  )
}

export default Friends;
