// components/UserReviews.tsx
import React from 'react';
import Card from '@/components/card/Card'
import Rating from '@/components/reviews/rating/Rating'

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
  <div className="max-h-[500px] overflow-y-auto items-center mb-2 rounded-lg flex flex-col">
    {reviews.map((review, index) => (
      <div 
        key={index} 
        className="w-3/5 mb-2 p-2 border rounded-xl justify-center items-center text-black bg-white"
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <img src={review.profileImage} alt={`${review.username}'s profile`} className="w-8 h-8 rounded-full" />
            <h3 className="font-bold">{review.username}</h3>
          </div>
          <Rating value={review.rating} isEditable={false} onRatingChange={() => { }} />
        </div>
        
        <p className='items-center'>{review.review}</p>
        <p className="text-sm mb-1">{review.date}</p>
      </div>
    ))}
  </div>
);

export default UserReviews;
