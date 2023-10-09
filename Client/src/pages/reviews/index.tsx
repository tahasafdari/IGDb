// pages/review.tsx

import React, { useState } from 'react';
import GameDetails from '@/components/reviews/gameDetails/gamedetails';
import ReviewInput from '@/components/reviews/reviewInput/reviewInput';
import SubmitButton from '@/components/reviews/submitButton/submitButton';
import UserReviews from '@/components/reviews/userReviewProps/index';
import Loading from '@/components/reviews/load/loading';
import aoubtIGDB from '@/components/images/aboutIGDB.png'

function ReviewPage() {
  const [userReview, setUserReview] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Assuming you start by fetching data
  
  // Mock data, replace with actual API data
  const gameDetails = {
    title: "Awesome Game",
    releaseDate: "2023-10-08",
    genre: "Adventure",
    coverImage: "url(https://source.unsplash.com/random?gaming)"
  };
  
  const userReviews = [
    { username: "John", date: "2023-10-07", review: "Loved it!", rating: 5 },
    { username: "Jane", date: "2023-10-06", review: "Good game but has bugs.", rating: 3 }
  ];

  const handleSubmit = () => {
    // Logic to submit the userReview to API
  };

 // if (isLoading) return <Loading />;

  return (
    <div className='h-screen bg-cover'
    style={{ backgroundImage: 'url(https://media.discordapp.net/attachments/942001801799024643/1160607909701500948/ok.png?ex=65354758&is=6522d258&hm=539acedecf8372cce680b764e201ef62b1dac70d9aebd279eff2ac6fb3c2f700&)' }}
    >
      <GameDetails {...gameDetails} />
      <UserReviews reviews={userReviews} />
      <ReviewInput onReviewChange={setUserReview} />
    </div>
  );
}

export default ReviewPage;
