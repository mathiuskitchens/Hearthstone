import { useEffect, useState } from "react";
import { getNewToken, getAllCards } from "../utils/blizzardRequests";
import BrowseSkeleton from "../components/BrowseSkeleton";
import Navbar from "../components/Navbar";

const Browse = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expansion, setExpansion] = useState("standard");
  const [activeToken, setActiveToken] = useState(
    localStorage.getItem("hstoken")
  );

  useEffect(() => {
    fetchCards();
  }, [page, expansion]);

  const fetchCards = async () => {
    await tokenCheck();
    setTimeout(() => {}, 1000);
    try {
      const c = await getAllCards(activeToken, page, expansion);
      setCards(c.data.cards);
      setIsLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const tokenCheck = async () => {
    if (localStorage.getItem("hstoken") === null) {
      console.log("tokenCheck failed, getting new token");
      const token = await getNewToken();
      setActiveToken(token);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container grid">
        <h1 className="text-4xl font-bold text-center my-4 mx-8 mt-20">
          Browse Cards
        </h1>
        <section className="flex justify-around md:justify-between align-middle">
          <label id="setName" className="form-control w-full max-w-xs">
            <select
              defaultValue="description"
              className="select select-bordered select-md w-48 mx-8 my-auto"
              onChange={(e) => {
                setExpansion(e.target.value);
              }}
            >
              <option disabled value="description">
                Filter by Set
              </option>
              <option value="standard">All Standard</option>
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
                if (page === 1) {
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
                      className=" w-64 md:w-56 border-transparent hover:scale-105 hover:ring-1 hover:cursor-pointer ring-yellow-500 ring-opacity-50 ring-inset hover:ring-opacity-100 transition-all duration-300 rounded-3xl sm:w-64"
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
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                            ✕
                          </button>
                        </form>
                        <h2 className="text-center text-3xl">
                          {selectedCard.name}
                        </h2>
                        <img
                          src={selectedCard.image}
                          alt={selectedCard.name}
                          className="w-3/4 mx-auto"
                        />
                        <p className="py-4 mx-16 text-center italic">
                          {selectedCard.flavorText}
                        </p>
                        <div className="modal-action">
                          <div class="buttons-div" className="flex gap-2">
                            <button className="btn btn-active ring-0 border-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                // change fill later when has DB
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="join my-4 block mx-auto">
          <button
            onClick={() => {
              if (page === 1) {
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
      </div>
    </>
  );
};

export default Browse;
