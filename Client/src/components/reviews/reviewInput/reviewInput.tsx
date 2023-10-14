// components/ReviewInput.tsx

import { useState } from 'react';
import Rating from '../rating/Rating';
import SubmitButton from '../submitButton/submitButton';
import styles from '@/styles/review.module.css';
import { useEffect } from 'react';

type ReviewInputProps = {
  onReviewChange: (review: string, rating: number) => void;
  onSubmit: () => void;
  onRatingChange: (score: number) => void;  
  userReview: string;
};

const ReviewInput = ({ onReviewChange, onSubmit, onRatingChange, userReview } : ReviewInputProps) => {
  const [rating, setRating] = useState(0);


  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onReviewChange(e.target.value, rating);
  };

  const handleRatingChange = (newRating: number) => {
    console.log("user Rating : ", newRating);
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
