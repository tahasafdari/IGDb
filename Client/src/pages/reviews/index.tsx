// pages/review.tsx
import React, { useState } from 'react';
import GameDetails from '@/components/reviews/gameDetails/gamedetails';
import ReviewInput from '@/components/reviews/reviewInput/reviewInput';
import SubmitButton from '@/components/reviews/submitButton/submitButton';
import UserReviews from '@/components/reviews/userReviewProps/userReview';
import Loading from '@/components/reviews/load/loading';
import { EXTERNAL_GAME_BY_ID } from '@/graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '@/graphql/mutations';
import { GET_REVIEWS_BY_GAME_ID } from '@/graphql/queries';

function ReviewPage() {
  const [userReview, setUserReview] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Assuming you start by fetching data

  const [rating, setRating] = useState(1);

  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  const gameId = localStorage.getItem('gameId') || '0';

  const { loading : gameLoading, error: gameError, data : gameData } = useQuery(EXTERNAL_GAME_BY_ID, {
    variables: { gameApiId: parseInt(gameId) },
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }
  });



  // Fetch reviews for the game
  const { loading: reviewsLoading, error: reviewsError, data: reviewsData } = useQuery(GET_REVIEWS_BY_GAME_ID, {
    variables: { gameApiId: parseInt(gameId) },
    context: {
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }
});
  console.log("Review Data: " , reviewsData)


  const [createReview] = useMutation(CREATE_REVIEW, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }
  });


  if (gameLoading || reviewsLoading) return <Loading />;
    if (gameError) {
        console.error(gameError);
        return <div>Error: {gameError.message}</div>;
    }
    if (reviewsError) {
        console.error(reviewsError);
        return <div>Error: {reviewsError.message}</div>;
    }

  const info = gameData.externalGameByApiId;

  let profileImageFromLocalStorage = null as string | null;
  if (typeof window !== 'undefined') {
  const userData = localStorage.getItem('user');
  if (userData) {
    const parsedUserData = JSON.parse(userData);
    profileImageFromLocalStorage = parsedUserData.profile_image;
  }
}
  const userReviews = reviewsData.reviewsByGameId.map( review => ({
    username: review.owner.user_name,
    profileImage: profileImageFromLocalStorage,
    date: new Date(review.createdAt).toISOString().split('T')[0], // format the date
    review: review.text,
    rating: review.score,
}));

  const handleSubmit = () => {
    createReview({
      variables: {
        review: {
          text: userReview,
          score: rating,
          game: { gameApiId: parseInt(gameId) }
        }
      },
      context: {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.error("Error creating review:", err);
      });
  };

  // if (isLoading) return <Loading />;

  return (
    <div className='h-screen bg-cover'
      style={{ backgroundImage: 'url(https://media.discordapp.net/attachments/1142756461026476043/1161685359084699719/image.png?ex=653932cc&is=6526bdcc&hm=15ecf8791d994fe7bd83ffb393617f073f469cd406d88522082dfba6e4c18cb9&)' }}
    >
      <GameDetails title={info.title} description={info.description} coverImage={info.image} />
      <UserReviews reviews={userReviews} />
      <ReviewInput onReviewChange={setUserReview} onSubmit={handleSubmit} onRatingChange={setRating} />
      <style>
        {`
        /* scroll bar styling has to be here because of nextjs */
          /* Track */
          ::-webkit-scrollbar {
            width: 12px;
          }

          ::-webkit-scrollbar-track {
            background-color: transparent;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.75);
            border-radius: 6px;
            border: 3px solid transparent;
            transition: ease-in-out 0.3s;
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background-color: rgb(255, 255, 255);
          }

          /* Buttons (arrows) */
          ::-webkit-scrollbar-button {
            display: none;
          }
        `}
      </style>
    </div>
  );
}

export default ReviewPage;
