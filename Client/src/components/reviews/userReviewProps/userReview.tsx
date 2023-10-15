// components/UserReviews.tsx
import React from 'react';
import Card from '@/components/card/Card'
import Rating from '@/components/reviews/rating/Rating'
import styles from '@/styles/review.module.css'
/**
 * A component that displays a single user review.
 *
 */
type UserReviewProps = {
  username: string;
  profileImage: string;
  date: String;
  review: string;
  rating: number;
};

type UserReviewsProps = {
  reviews: UserReviewProps[];
};
/**
 * A component that displays a list of user reviews.
 * 
 * This component is responsible for rendering a list of reviews provided by users. Each review includes
 * the user's profile picture, username, rating, review text, and the date of the review.
 * 
 * @param reviews - An array of user review objects, each containing username, profile image, date, review text, and rating.
 * 
 * @example
 * // Usage:
 * const sampleReviews = [
 *   {
 *     username: "JohnDoe",
 *     profileImage: "/path/to/image.jpg",
 *     date: "2023-01-01",
 *     review: "This is a sample review.",
 *     rating: 4
 *   },
 *   ...
 * ];
 * <UserReviews reviews={sampleReviews} />
 */
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
