// components/ReviewInput.tsx

import { useState } from 'react';
import Rating from '../rating/Rating';
import SubmitButton from '../submitButton/submitButton';
import styles from '@/styles/review.module.css'

type ReviewInputProps = {
  onReviewChange: (review: string, rating: number) => void;
  onSubmit: () => void;  
};

const ReviewInput = ({ onReviewChange, onSubmit } : ReviewInputProps) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
    onReviewChange(e.target.value, rating);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onReviewChange(review, newRating);
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.textAreaDiv}>
        <textarea 
          value={review}
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
