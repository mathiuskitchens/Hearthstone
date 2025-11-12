import { useEffect, useState } from 'react';
import { getNewToken, getAllCards, getDeckByCardIds } from '../utils/blizzardRequests';
import BrowseSkeleton from '../components/BrowseSkeleton';
import Navbar from '../components/Navbar';
import DeckInProgress from '../components/DeckInProgress';

const Browse = () => {
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expansion, setExpansion] = useState('standard');
  const [classType, setClassType] = useState('all');
  const [rarity, setRarity] = useState('all');
  const [activeToken, setActiveToken] = useState(
    localStorage.getItem('hstoken')
  );
  const [search, setSearch] = useState('');
  const [deck, setDeck] = useState([]);
  const [cardLimitError, setCardLimitError] = useState(false);

  const cardIds = [906, 1099, 1363, 1367, 46706, 48099, 48759, 49184, 50071, 50278, 51714, 52109, 52632, 52715, 53409, 53413, 53756, 53969, 54148, 54425, 54431, 54874, 54898, 54917, 55166, 55245, 55438, 55441, 55907, 57416];


  const classNames = [
    'Death Knight',
    'Demon Hunter',
    'Druid',
    'Hunter',
    'Mage',
    'Paladin',
    'Priest',
    'Rogue',
    'Shaman',
    'Warlock',
    'Warrior',
  ];

  const rarities = ['Common', 'Rare', 'Epic', 'Legendary'];

  useEffect(() => {
    fetchCards();
  }, [page, expansion, classType, rarity, search]);

  useEffect(() => {
    setPage(1);
  }, [search, expansion, classType, rarity]);

  const fetchCards = async () => {
    setIsLoading(true);
    await tokenCheck();
    setTimeout(() => { }, 1000);
    try {
      const c = await getAllCards(
        activeToken,
        page,
        expansion,
        classType,
        rarity,
        search
      );
      setAllCards(c.data.cards);
      setCards(c.data.cards);
      console.log(c.data.cards);
      setIsLoading(false);
    } catch (error) {
      console.log('Error: ', error);
    }
    // const ID = await getDeckByCardIds(activeToken, cardIds);
    // console.log(ID)
  };

  const tokenCheck = async () => {
    if (localStorage.getItem('hstoken') === null) {
      console.log('tokenCheck failed, getting new token');
      const token = await getNewToken();
      localStorage.setItem('hstoken', token);
      setActiveToken(token);
    }
  };

  // Needs lots of upgrades, pull out into own util file and add checks for legendary, return deck limit reached or not
  const checkCardLimit = (currentCard) => {
    if (currentCard.rarityId == 5) {
      console.log('Legendary');
      let legendaryCardCount = deck.filter(
        (card) => card.id === currentCard.id
      ).length;
      console.log('legendary card count: ', legendaryCardCount);
      return legendaryCardCount >= 1;
    } else {
      let cardCount = deck.filter((card) => card.id === currentCard.id).length;
      // console.log("card count: ", cardCount);

      if (cardCount < 2) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="mx-8 my-4 mt-20 text-4xl font-bold text-center">
          Browse All Cards
        </h1>
        <DeckInProgress deck={deck} onCardSelect={setSelectedCard} />
        <section
          id="filters"
          className="flex flex-wrap justify-around align-middle"
        >
          <label id="setName" className="py-2 form-control">
            <select
              defaultValue="description"
              className="w-24 mx-2 my-auto md:w-36 lg:w-48 select select-bordered select-md"
              onChange={(e) => {
                setExpansion(e.target.value);
              }}
            >
              <option disabled value="description">
                Set
              </option>
              <option value="standard">All Standard</option>
              <option value="showdown-in-the-badlands">
                Showdown in the Badlands
              </option>
              <option value="titans">TITANS</option>
              <option value="festival-of-legends">Festival of Legends</option>
              <option value="whizbangs-workshop">Whizbangs Workshop</option>
              <option value="perils-in-paradise">Perils in Paradise</option>
              <option value="the-great-dark-beyond">
                The Great Dark Beyond
              </option>
              <option value="into-the-emerald-dream">
                Into the Emerald Dream
              </option>
              <option value="the-lost-city-of-ungoro">
                Lost City of Un'Goro
              </option>
              <option value="across-the-timeways">
                Across the Timeways
              </option>

            </select>
          </label>

          <label id="classType" className="max-w-xs py-2 form-control">
            <select
              defaultValue="description"
              className="w-24 mx-2 my-auto md:w-36 lg:w-48 select select-bordered select-md"
              onChange={(e) => {
                setClassType(e.target.value);
              }}
            >
              <option disabled value="description">
                Class
              </option>
              <option value="all">All Classes</option>
              {classNames.map((c, index) => {
                return (
                  <option
                    key={index}
                    value={c.toLowerCase().replaceAll(' ', '')}
                  >
                    {c}
                  </option>
                );
              })}
            </select>
          </label>

          <label id="rarity" className="max-w-xs py-2 form-control">
            <select
              defaultValue="description"
              className="w-24 mx-2 my-auto md:w-36 lg:w-48 select select-bordered select-md"
              onChange={(e) => {
                setRarity(e.target.value);
              }}
            >
              <option disabled value="description">
                Rarity
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
        <section>
          <label className="flex items-center w-1/2 gap-2 mx-auto my-2 input input-bordered">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.value !== '') {
                  setSearch(e.target.value);
                } else {
                  setSearch('');
                  setCards(allCards);
                }
              }}
            />
          </label>
        </section>

        <div className="block mx-8 my-4 text-center join lg:text-right">
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
          <div className="grid gap-8 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {cards.map((card, index) => {
              return (
                <div key={index} className="mx-auto shadow-md card bg-base-200">
                  <div className="card">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-64 transition-all duration-300 border-transparent md:w-56 hover:scale-105 hover:ring-1 hover:cursor-pointer ring-yellow-500 ring-opacity-50 ring-inset hover:ring-opacity-100 rounded-3xl sm:w-64"
                      onClick={() => {
                        console.log(card);
                        setSelectedCard(card);
                        document.getElementById('card-details').showModal();
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <dialog
          id="card-details"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <form method="dialog">
              <button className="absolute btn btn-sm btn-circle btn-ghost right-4 top-4">
                ✕
              </button>
            </form>
            <h2 className="text-3xl text-center">
              {selectedCard.name}
            </h2>
            <img
              src={selectedCard.image}
              alt={selectedCard.name}
              className="w-3/4 mx-auto"
            />
            <p className="py-4 mx-16 italic text-center">
              {selectedCard.flavorText}
            </p>
            <div className="modal-action">
              <div className="flex gap-2">
                <button
                  disabled={checkCardLimit(selectedCard)}
                  className="border-none btn btn-active ring-0 disabled"
                  onClick={() => {
                    // need function to check for duplicates based on card rarity and current number in deck
                    // also need function to limit deck to 30 cards
                    if (deck.length < 30) {
                      setDeck([...deck, selectedCard]);
                      console.log(deck);
                    } else {
                      setCardLimitError(true);
                      setTimeout(() => setCardLimitError(false), 3000);
                    }
                  }}
                >
                  {checkCardLimit(selectedCard)
                    ? 'Deck Limit Reached'
                    : 'Add to Deck'}
                </button>
                <button
                  className="border-none btn btn-active ring-0"
                  onClick={() => {
                    // also need function to limit deck to 30 cards
                    // setDeck([...deck, selectedCard]);
                    console.log(deck);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
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
        <div className="block mt-10 mb-20 text-center join">
          <button
            onClick={() => {
              if (page === 1) {
                return;
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
              className="w-6 h-6 stroke-current shrink-0"
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
