/**
 * @file This file defines the Rating component which provides a star-based rating functionality.
 */
import React from 'react';
import ReactStars from 'react-stars';
/**
 * @typedef {Object} Props
 * @property {number} [value] - The initial value or rating of the stars. Default is undefined.
 * @property {number} [maxRating=5] - The maximum rating possible. Default is 5.
 * @property {(rating: number) => void} [onRatingChange] - Callback function when the rating changes.
 * @property {boolean} [isEditable=true] - Determines if the star ratings are editable. Default is true.
 */
type Props = {
  value?: number;  
  maxRating?: number,
  onRatingChange?: (rating: number) => void,
  isEditable?: boolean
};
/**
 * @function
 * @name Rating
 * @description A component that displays and handles star-based ratings.
 * 
 * This component leverages the ReactStars library to provide a customizable star-based rating system.
 * Users can view the rating and, if allowed, can also change the rating. The component allows for
 * settings like the maximum rating value, custom colors for the stars, and the size of the stars.
 * 
 * @param {Props} props - The properties passed to the component.
 * @param {number} [props.value] - The initial value or rating of the stars.
 * @param {number} [props.maxRating=5] - The maximum rating possible.
 * @param {(rating: number) => void} [props.onRatingChange] - Callback function when the rating changes.
 * @param {boolean} [props.isEditable=true] - Determines if the star ratings are editable.
 * 
 * @returns {JSX.Element} The rating component.
 * 
 * @example
 * // Usage:
 * <Rating value={4} onRatingChange={(rating) => console.log(rating)} isEditable={false} />
 */
const Rating = ({ value, maxRating = 5, onRatingChange, isEditable = true } : Props) => {

  return (
    <ReactStars
      value={value}  
      count={maxRating}
      onChange={onRatingChange || (() => {})} 
      size={24}
      color1={'gray'}
      color2={'#ffd700'}
      half={true} 

      edit={isEditable}
    />
  );
};

export default Rating;
