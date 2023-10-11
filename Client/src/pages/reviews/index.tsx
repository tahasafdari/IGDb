// pages/review.tsx

import React, { useState } from 'react';
import GameDetails from '@/components/reviews/gameDetails/gamedetails';
import ReviewInput from '@/components/reviews/reviewInput/reviewInput';
import SubmitButton from '@/components/reviews/submitButton/submitButton';
import UserReviews from '@/components/reviews/userReviewProps/userReview';
import Loading from '@/components/reviews/load/loading';
import aboutIGDB from '@/components/image/aboutIGDB.png'
import avatar1 from '../../../public/assets/avatars/avatar1.png'

function ReviewPage() {
  const [userReview, setUserReview] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Assuming you start by fetching data
  
  // Mock data, replace with actual API data
  const gameDetails = {
    title: "Awesome Game",
    releaseDate: "2023-10-08",
    genre: "Adventure",
    coverImage: 'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534',
  };
  
  const userReviews = [
    { username: "John",profileImage: 'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534' ,  date: "2023-10-07", review: "Loved it!", rating: 5 },
    { username: "John",profileImage:'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534' , date: "2023-10-07", review: "Loved it!", rating: 5 },
    { username: "John",profileImage:'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534', date: "2023-10-07", review: "Loved it!", rating: 4.5 },
    { username: "John",profileImage:'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534', date: "2023-10-07", review: "Loved it!", rating: 3 },
    { username: "John",profileImage:'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534' ,date: "2023-10-07", review: "Loved it!", rating: 1 },
    { username: "John",profileImage:'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534', date: "2023-10-07", review: "Loved it!", rating: 5 },
    { username: "John",profileImage:'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534' ,date: "2023-10-07", review: "Loved it!", rating: 2 },
    { username: "John",profileImage:'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534' ,date: "2023-10-07", review: "Loved it!", rating: 4 },
    { username: "Jane",profileImage:'https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534' ,date: "2023-10-06", review: "Good game but has bugs.", rating: 3 }
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
      <ReviewInput onReviewChange={setUserReview} onSubmit={handleSubmit} />
    </div>
  );
}

export default ReviewPage;
