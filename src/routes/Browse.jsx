import { useEffect, useState } from "react";
import { getNewToken, getAllCards } from "../utils/blizzardRequests";
import BrowseSkeleton from "../components/BrowseSkeleton";
import Navbar from "../components/Navbar";
import DeckInProgress from "../components/DeckInProgress";

const Browse = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expansion, setExpansion] = useState("standard");
  const [classType, setClassType] = useState("all");
  const [rarity, setRarity] = useState("all");
  const [activeToken, setActiveToken] = useState(
    localStorage.getItem("hstoken")
  );
  const [deck, setDeck] = useState([]);
  const [cardLimitError, setCardLimitError] = useState(false);

  const classNames = [
    "Death Knight",
    "Demon Hunter",
    "Druid",
    "Hunter",
    "Mage",
    "Paladin",
    "Priest",
    "Rogue",
    "Shaman",
    "Warlock",
    "Warrior",
  ];

  const rarities = ["Common", "Rare", "Epic", "Legendary"];

  useEffect(() => {
    fetchCards();
  }, [page, expansion, classType, rarity]);

  const fetchCards = async () => {
    await tokenCheck();
    setTimeout(() => {}, 1000);
    try {
      const c = await getAllCards(
        activeToken,
        page,
        expansion,
        classType,
        rarity
      );
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

  // Needs lots of upgrades, pull out into own util file and add checks for legendary, return deck limit reached or not
  const checkCardLimit = (currentCard) => {
    if (currentCard.rarityId == 5) {
      console.log("Legendary");
      let legendaryCardCount = deck.filter(
        (card) => card.id === currentCard.id
      ).length;
      console.log("legendary card count: ", legendaryCardCount);
    } else {
      let cardCount = deck.filter((card) => card.id === currentCard.id).length;
      // console.log("card count: ", cardCount);

      if (cardCount < 2) {
        return false;
      } else {
        console.log("card limit reached");
        return true;
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="text-4xl font-bold text-center my-4 mx-8 mt-20">
          Deck Builder
        </h1>
        <DeckInProgress deck={deck} />
        <section
          id="filters"
          className="flex flex-wrap justify-around md:justify-between align-middle"
        >
          <label id="setName" className="form-control  py-2">
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
              <option value="whizbangs-workshop">Whizbang's Workshop</option>
              <option value="showdown-in-the-badlands">
                Showdown in the Badlands
              </option>
              <option value="titans">TITANS</option>
              <option value="festival-of-legends">Festival of Legends</option>
            </select>
          </label>

          <label id="classType" className="form-control max-w-xs py-2">
            <select
              defaultValue="description"
              className="select select-bordered select-md w-48 mx-8 my-auto"
              onChange={(e) => {
                setClassType(e.target.value);
              }}
            >
              <option disabled value="description">
                Filter by Class
              </option>
              <option value="all">All Classes</option>
              {classNames.map((c, index) => {
                return (
                  <option
                    key={index}
                    value={c.toLowerCase().replaceAll(" ", "")}
                  >
                    {c}
                  </option>
                );
              })}
            </select>
          </label>

          <label id="rarity" className="form-control max-w-xs py-2">
            <select
              defaultValue="description"
              className="select select-bordered select-md w-48 mx-8 my-auto"
              onChange={(e) => {
                setRarity(e.target.value);
              }}
            >
              <option disabled value="description">
                Filter by Rarity
              </option>
              <option value="all">All</option>
              {rarities.map((c, index) => {
                return (
                  <option key={index} value={c.toLowerCase()}>
                    {c}
                  </option>
                );
              })}
            </select>
          </label>
        </section>

        <div className="join mx-8 my-4 block text-center lg:text-right">
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
                            <button
                              disabled={checkCardLimit(selectedCard)}
                              className="btn btn-active ring-0 border-none disabled"
                              onClick={() => {
                                // need function to check for duplicates based on card rarity and current number in deck
                                // also need function to limit deck to 30 cards
                                setDeck([...deck, selectedCard]);
                                console.log(deck);
                              }}
                            >
                              {checkCardLimit(selectedCard)
                                ? "Deck Limit Reached"
                                : "Add to Deck"}
                            </button>
                            <button
                              className="btn btn-active ring-0 border-none"
                              onClick={() => {
                                // also need function to limit deck to 30 cards
                                // setDeck([...deck, selectedCard]);
                                console.log(deck);
                              }}
                            >
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
        <div className="join block mb-20 mt-10 text-center">
          <button
            onClick={() => {
              if (page === 1) {
                return;
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
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
              window.scrollTo({ top: 0, behavior: "smooth" });
              setPage(page + 1);
              setIsLoading(true);
            }}
            className="join-item btn"
          >
            »
          </button>
        </div>
      </div>
      {cardLimitError && (
        <>
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Task failed successfully.</span>
          </div>
        </>
      )}
    </>
  );
};

export default Browse;
