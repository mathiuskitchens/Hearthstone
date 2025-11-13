

const CardDisplay = ({ card, index, onCardSelect }) => {
  return (
    <div key={index} className="mx-auto shadow-md card bg-base-200">
      <div className="card">
        <img
          src={card.image}
          alt={card.name}
          className="w-64 transition-all duration-300 border-transparent md:w-56 hover:scale-105 hover:ring-1 hover:cursor-pointer ring-yellow-500 ring-opacity-50 ring-inset hover:ring-opacity-100 rounded-3xl sm:w-64"
          onClick={() => {
            console.log(card);
            onCardSelect(card);
            document.getElementById('card-details').showModal();
          }}
        />
      </div>
    </div>
  )

}

export default CardDisplay;
