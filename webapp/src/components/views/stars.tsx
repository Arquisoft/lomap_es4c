import React, { useState } from "react";



function StarRating():JSX.Element {
  const [rating, setRating] = useState(0);
  var finalRating = 0;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="selected" onMouseDown={() => setRating(i)}>
          ★
        </span>
      );
      finalRating++;
    } else {
      stars.push(
        <span key={i} onMouseDown={() => setRating(i)}>
          ☆
        </span>
      );
    }
  }

  return (
    <div  id = "estrellas_ivan-div">
      <p  id = "estrellas_ivan">Valoración: {stars}</p>
    </div>
  );
}

export default StarRating;
