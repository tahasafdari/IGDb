/**
 * @file This file defines the ReviewInput component which allows users to input reviews and ratings.
 */
import { useState } from 'react';
import Rating from '../rating/Rating';
import SubmitButton from '../submitButton/submitButton';
import styles from '@/styles/review.module.css';

type ReviewInputProps = {
  onReviewChange: (review: string, rating: number) => void;
  onSubmit: () => void;
  onRatingChange: (score: number) => void;  
  userReview: string;
};

/**
 * A component that allows users to input their reviews and ratings.
 * 
 * This component provides a textarea for users to write their reviews and a rating system to provide their ratings.
 * It has callback functionalities to handle changes in the review text, rating, and the submission of the review.
 * 
 * @param onReviewChange - Callback function when the review text or rating changes.
 * @param onSubmit - Callback function when the review is submitted.
 * @param onRatingChange - Callback function when the rating changes.
 * @param userReview - The current user review text.
 * 
 * @example
 * // Usage:
 * <ReviewInput 
 *   onReviewChange={(review, rating) => ... }
 *   onSubmit={() => ... }
 *   onRatingChange={(score) => ... }
 *   userReview="This game is great!"
 * />
 */

const ReviewInput = ({ onReviewChange, onSubmit, onRatingChange, userReview } : ReviewInputProps) => {
  const [rating, setRating] = useState(0);


  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onReviewChange(e.target.value, rating);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRatingChange(newRating);
    
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.textAreaDiv}>
        <textarea 
          value={userReview}
          onChange={handleTextChange}
          className={styles.textArea}
        />
        <SubmitButton onSubmit={onSubmit} />
      </div>
      <Rating value={rating} onRatingChange={handleRatingChange} />
    </div>
  );
};

export default ReviewInput;
