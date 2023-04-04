import React, { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(0);

  

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="selected" onClick={() => setRating(i)}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} onClick={() => setRating(i)}>
          ☆
        </span>
      );
    }
  }

  return (
    <div>
      <p>Valoración: {stars}</p>
    </div>
  );
}

export default StarRating;
