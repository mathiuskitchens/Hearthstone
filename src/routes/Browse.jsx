import { useEffect, useState } from "react";
import { getNewToken, getAllCards } from "../utils/blizzardRequests";
import BrowseSkeleton from "../components/BrowseSkeleton";
import Navbar from "../components/Navbar";

const Browse = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCards();
  }, [page]);

  const fetchCards = async () => {
    try {
      if (localStorage.getItem("token") === null) {
        const token = await getNewToken();
        localStorage.setItem("token", token.data.access_token);
      } else {
        const c = await getAllCards(localStorage.getItem("token"), page);
        setCards(c.data.cards);
        console.log(c.data.cards);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-4xl font-bold text-center my-4 mx-8 mt-20">
          Browse Cards
        </h1>
        <section className="flex justify-between align-middle flex-1">
          <label id="setName" className="form-control w-full max-w-xs">
            <select className="select select-bordered select-md w-48 mx-8 my-auto">
              <option disabled selected>
                Filter by Set
              </option>
              <option value="showdown-in-the-badlands">
                Showdown in the Badlands
              </option>
              <option value="titans">TITANS</option>
              <option value="festival-of-legends">Festival of Legends</option>
            </select>
          </label>
          <div className="join mx-8 my-4">
            <button
              onClick={() => {
                if (page == 1) {
                  return;
                } else {
                  setIsLoading(true);
                  setPage(page - 1);
                }
              }}
              className="join-item btn btn-square"
            >
              «
            </button>
            <button className="join-item btn btn-square">{page}</button>
            <button
              onClick={() => {
                setPage(page + 1);
                setIsLoading(true);
              }}
              className="join-item btn"
            >
              »
            </button>
          </div>
        </section>
        {isLoading ? (
          <BrowseSkeleton />
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 p-6">
            {cards.map((card, index) => {
              return (
                <div key={index} className="card shadow-md bg-base-200 mx-auto">
                  <div className="card">
                    <img
                      src={card.image}
                      alt={card.name}
                      className=" w-56 border-transparent hover:scale-105 hover:ring-1 hover:cursor-pointer ring-yellow-500 ring-opacity-50 ring-inset hover:ring-opacity-100 transition-all duration-300 rounded-3xl sm:w-64"
                      onClick={() => {
                        console.log(card);
                        setSelectedCard(card);
                        document.getElementById("card-details").showModal();
                      }}
                    />

                    <dialog
                      id="card-details"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <h2 className="text-center">{selectedCard.name}</h2>
                        <img
                          src={selectedCard.image}
                          alt={selectedCard.name}
                          className="w-56 mx-auto"
                        />
                        <p className="py-4 mx-16">{selectedCard.flavorText}</p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn">Close</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Browse;
