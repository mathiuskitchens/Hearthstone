import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <img
          src="https://i.redd.it/l6bgb9eilbw11.png"
          alt=""
          width="300px"
          className="fixed top-4 -rotate-12"
        />
        <img
          src="https://i.redd.it/l6bgb9eilbw11.png"
          alt=""
          width="300px"
          className="fixed top-4 "
        />
        <img
          src="https://i.redd.it/l6bgb9eilbw11.png"
          alt=""
          width="300px"
          className="fixed top-4 rotate-12 z-20"
        />
        <div className="hero-content text-center fixed bottom-2 md:relative">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold">HS Deck Manager</h1>
            <p className="py-6">
              Welcome to the ultimate Hearthstone deck tracking hub! Unleash
              your inner strategist as you craft, fine-tune, and export decks
              effortlessly, propelling yourself towards legendary victories in
              the ever-shifting halls of the Tavern!
            </p>
            <div>
              <button className="btn btn-primary mx-2">
                <Link
                  to={`login`}
                  className="text-black font-bold hover:text-black"
                >
                  Login or Signup
                </Link>
              </button>
              <button className="btn btn-primary mx-2">
                <Link
                  to={`browse`}
                  className="text-black font-bold hover:text-black"
                >
                  {" "}
                  Browse
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
