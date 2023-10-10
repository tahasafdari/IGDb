// components/ReviewInput.tsx

import { useState } from 'react';
import Rating from '../rating/Rating';
import SubmitButton from '../submitButton/submitButton';
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
    <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: '20px', }}>
      <div style={{ width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <textarea 
          value={review}
          onChange={handleTextChange}
          style={{
            flex: 1,
            marginBottom: '0px',
            minHeight: '10px',
            maxHeight: '50px',
            padding: '10px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'vertical',
            fontFamily: 'Arial, sans-serif',
            fontSize: '16px'
          }}
        />
        <SubmitButton onSubmit={onSubmit} />  {/* Place the SubmitButton here */}
      </div>
      <Rating value={rating} onRatingChange={handleRatingChange} />

    </div>
  );
};

export default ReviewInput;
