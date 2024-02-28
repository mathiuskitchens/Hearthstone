import { useState } from "react";

const DeckInProgress = ({ deck }) => {
  const [selectedCard, setSelectedCard] = useState({});

  return (
    <>
      <div className="drawer z-50 ">
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
              className="w-16 h-24 drawer-button btn btn-primary border border-black border-solid z-40 fixed lg:w-28 lg:h-40 right-0 bottom-6 mx-2 rotate-1"
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
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <section className=" bg-base-200 menu">
              <h2 className=" text-2xl px-2 pb-0 font-bold">Current Deck</h2>
              <div className="divider divider-neutral"></div>
              <ul className="">
                {deck.map((card, index) => {
                  return (
                    <li
                      key={index}
                      className=""
                      onClick={() => {
                        setSelectedCard(card);
                        document.getElementById("card-details").showModal();
                      }}
                    >
                      <p className="rounded bg-base-300 py-2 px-4 my-0.5 h-8">
                        {card.name}
                      </p>
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
