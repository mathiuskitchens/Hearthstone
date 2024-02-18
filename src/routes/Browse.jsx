import { useEffect, useState } from 'react';
import { getNewToken, getAllCards } from '../utils/blizzardRequests';
import BrowseSkeleton from '../components/BrowseSkeleton';

const Browse = () => {

  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { 
        fetchCards()

    }, [])

    const fetchCards = async () => {
        try {
            const tempToken = await getNewToken()
            console.log(tempToken)
            const c = await getAllCards(tempToken)
          setCards(c.data.cards)
          setIsLoading(false)
            
        }
        catch(error) {
            console.log("Error: ", error)
        }
    }


  return (
    <div className="container">
      <h1 className="text-5xl font-bold text-center my-4 mx-8">All Standard Cards</h1>
      {isLoading ? <BrowseSkeleton /> :
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 p-6">
        {cards.map((card, index) => {
          return (
            <div key={index} className="card shadow-md bg-base-200 mx-auto">
              <div className="card">
                      <img src={card.image} alt={card.name} className=' w-56 border-transparent hover:scale-105 hover:ring-1 ring-yellow-500 ring-opacity-50 ring-inset hover:ring-opacity-100 transition-all duration-300 rounded-3xl'/>

              </div>
            </div>
            
          )
        })}
      </div>}
    </div>
  )
}

export default Browse