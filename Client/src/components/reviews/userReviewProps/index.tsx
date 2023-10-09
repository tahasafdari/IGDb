// components/UserReviews.tsx

type UserReviewProps = {
    username: string;
    date: string;
    review: string;
    rating: number;
  };
  
  type UserReviewsProps = {
    reviews: UserReviewProps[];
  };
  
  const UserReviews = ({ reviews }: UserReviewsProps) => (
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          <h3>{review.username} - {review.rating} stars</h3>
          <p>{review.date}</p>
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
  
  export default UserReviews;
  