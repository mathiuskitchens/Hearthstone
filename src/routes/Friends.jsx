import CardDisplay from "../components/CardDisplay.jsx"
import Navbar from "../components/Navbar.jsx"

const Friends = () => {

  const friends = [
    {
      name: "Ted",
      favoriteClass: "Mage",
      image: "https://assetsio.gnwcdn.com/winstreak23.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp"
    },
    {
      name: "John",
      favoriteClass: "Hunter",
      image: "https://assetsio.gnwcdn.com/winstreak23.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp"
    },
    {
      name: "Sarah",
      favoriteClass: "Warlock",
      image: "https://assetsio.gnwcdn.com/winstreak23.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp"
    }
  ]

  return (
    <div className="relative bg-base-100 px-24 w-full h-screen">
      <Navbar />
      <h1 className="pt-20 align-left">
      </h1>
      <div className="mt-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {friends.map((f, index) => {
          return (
            <CardDisplay key={index} index={index} card={f} />
          )

        })}
      </div>
    </div>
  )
}

export default Friends;
