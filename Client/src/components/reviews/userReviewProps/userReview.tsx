// components/UserReviews.tsx
import React from 'react';
import Card from '@/components/card/Card'
import Rating from '@/components/reviews/rating/Rating'
import styles from '@/styles/review.module.css'

type UserReviewProps = {
  username: string;
  profileImage: string;
  date: string;
  review: string;
  rating: number;
};

type UserReviewsProps = {
  reviews: UserReviewProps[];
};

const UserReviews = ({ reviews }: UserReviewsProps) => (
  <div className={styles.userReviewsContainer}>
    {reviews.map((review, index) => (
      <div key={index} className={styles.singleReview}>
        <div className={styles.profileInfo}>
          <div className="flex items-center space-x-2">
            <img src={review.profileImage} alt={`${review.username}'s profile`} className={styles.profileImage} />
            <h3 className="font-bold">{review.username}</h3>
          </div>
          <Rating value={review.rating} isEditable={false} onRatingChange={() => { }} />
        </div>
        
        <p className='items-center'>{review.review}</p>
        <p className={styles.dateText}>{review.date}</p>
      </div>
    ))}
  </div>
);

export default UserReviews;
