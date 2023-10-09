// components/Rating.tsx

import React from 'react';
import ReactStars from 'react-stars';

type Props = {
  maxRating?: number,
  onRatingChange: (rating: number) => void,
};

const Rating = ({ maxRating = 5, onRatingChange } : Props) => {

  return (
    <ReactStars
      count={maxRating}
      onChange={onRatingChange}
      size={24}
      color1={'gray'}
      color2={'#ffd700'}
      half={true} 
    />
  );
};

export default Rating;
