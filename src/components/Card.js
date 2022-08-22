const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((ptype) => (
          <div key={ptype.type.name}>
            <span className="typeName">{ptype.type.name}</span>
          </div>
        ))}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p>重さ: {pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p>高さ: {pokemon.height}</p>
        </div>
        <div className="cardData">
          <p>特性: {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};
export default Card;
