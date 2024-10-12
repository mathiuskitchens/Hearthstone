import { useState } from 'react';

const DeckInProgress = ({ deck }) => {
  const [selectedCard, setSelectedCard] = useState({});
  const [deckName, setDeckName] = useState('Name your deck');

  return (
    <>
      <div className="z-50 drawer ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="relative">
            {/* Front button */}
            <label
              htmlFor="my-drawer-4"
              className=" w-16 h-24 drawer-button btn btn-primary z-50 border border-black fixed lg:w-28 lg:h-40 right-4 bottom-4 mx-2 translate-x-2 -rotate-2 bg-cover bg-center bg-size-100% bg-no-repeat"
              /*               style={{
                backgroundImage:
                  'url("https://youre.outof.games/media/uploads/85/cf/85cf8f45-6b87-4769-aabe-40bb0376432b/cardback_215.png")',
              }} */
              onClick={() => {}}
            >
              Deck {deck.length}/30
            </label>

            <label
              htmlFor="my-drawer-4"
              className="fixed right-0 z-40 w-16 h-24 mx-2 border border-black border-solid drawer-button btn btn-primary lg:w-28 lg:h-40 bottom-6 rotate-1"
              onClick={() => {}}
            ></label>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="w-auto min-h-full p-4 menu bg-base-200 text-base-content">
            <section className=" bg-base-200 menu">
              <input
                type="text"
                value={deckName}
                className="px-2 pb-0 text-2xl font-bold input"
                onChange={(e) => {
                  setDeckName(e.target.value);
                }}
              />
              <div className="divider divider-neutral"></div>
              <ul className="">
                {deck.map((card, index) => {
                  return (
                    <li
                      key={index}
                      className="flex"
                      onClick={() => {
                        setSelectedCard(card);
                        document.getElementById('card-details').showModal();
                      }}
                    >
                      <span className="rounded bg-base-300 py-1 px-4 my-0.5 h-8">
                        <p className="w-4 m-0 font-black text-center text-black bg-white border rounded p-1/2">
                          {card.manaCost}
                        </p>
                        {card.name} x {card.quantity}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DeckInProgress;
