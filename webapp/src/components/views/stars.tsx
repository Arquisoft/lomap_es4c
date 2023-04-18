import React, { useState } from "react";



function StarRating() {
  const [rating, setRating] = useState(0);

  
  
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="selected" onMouseDown={() => setRating(i)}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} onMouseDown={() => setRating(i)}>
          ☆
        </span>
      );
    }
  }

  return (
    <div  id = "estrellas_ivan">
      <p  id = "estrellas_ivan">Valoración: {stars}</p>
    </div>
  );
}

export default StarRating;
