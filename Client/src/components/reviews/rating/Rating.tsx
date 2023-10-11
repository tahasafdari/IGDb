import React from 'react';
import ReactStars from 'react-stars';

type Props = {
  value?: number;  // <- Add this prop to set a fixed value
  maxRating?: number,
  onRatingChange?: (rating: number) => void,
  isEditable?: boolean
};

const Rating = ({ value, maxRating = 5, onRatingChange, isEditable = true } : Props) => {

  return (
    <ReactStars
      value={value}  // <- Use the value prop here
      count={maxRating}
      onChange={onRatingChange || (() => {})} // <- Prevent errors when onRatingChange is not provided
      size={24}
      color1={'gray'}
      color2={'#ffd700'}
      half={true} 
     // edit={onRatingChange ? true : false} // <- Allow editing only if the onRatingChange function is provided
      edit={isEditable}
    />
  );
};

export default Rating;
