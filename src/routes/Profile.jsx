import Navbar from "../components/Navbar";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("cards");

  return (
    <>
      <Navbar />
      <div id="profile-top-container" className="flex flex-wrap mt-20">
        <div id="profile-avatar" className="avatar m-10 mx-auto md:mx-20">
          <div className=" w-64 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div
          id="profile-info"
          className="my-auto mx-auto md:mx-0 border-orange-300 border rounded-xl m-2 p-4 bg-base-200"
        >
          <h1 className="text-2xl font-bold">Member since DATE</h1>
          <p>Favorite Class: Warlock</p>
        </div>
      </div>
      <div id="profile-bottom-container" className="w-5/6 mx-auto my-10">
        <div role="tablist" className="tabs tabs-boxed">
          <a
            role="tab"
            className={"tab" + (activeTab === "cards" ? " tab-active" : "")}
            value="cards"
            onClick={() => setActiveTab("cards")}
          >
            Cards
          </a>
          <a
            role="tab"
            className={"tab" + (activeTab === "decks" ? " tab-active" : "")}
            value="decks"
            onClick={() => setActiveTab("decks")}
          >
            Decks
          </a>
        </div>
      </div>
    </>
  );
};

export default Profile;
