// pages/review.tsx
import React, { useState } from 'react';
import GameDetails from '@/components/reviews/gameDetails/gamedetails';
import ReviewInput from '@/components/reviews/reviewInput/reviewInput';
import UserReviews from '@/components/reviews/userReviewProps/userReview';
import Loading from '@/components/reviews/load/loading';
import { EXTERNAL_GAME_BY_ID } from '@/graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '@/graphql/mutations';
import { GET_REVIEWS_BY_GAME_ID } from '@/graphql/queries';
import {USER_BY_ID} from '@/graphql/queries'
import { useEffect } from 'react'
import { User } from '@/components/interfaces/User'

function NoReviewsMessage() {
  return (
    <div className="flex justify-center items-center h-32 my-4">
      <p className="text-center text-white">
        No review for this game yet. You can make one!
      </p>
    </div>
  );
}

function ReviewPage() {
  const [userReview, setUserReview] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Assuming you start by fetching data

  const [rating, setRating] = useState(1);
  const [user, setUser] = useState<User | null>(null)
  //const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null


  
 

  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }


  let gameId = '0';
if (typeof window !== 'undefined') {
  gameId = localStorage.getItem('gameId') || '0';
}

  const { loading : gameLoading, error: gameError, data : gameData } = useQuery(EXTERNAL_GAME_BY_ID, {
    variables: { gameApiId: parseInt(gameId) },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  });



  // Fetch reviews for the game
  const { loading: reviewsLoading, error: reviewsError, data: reviewsData } = useQuery(GET_REVIEWS_BY_GAME_ID, {
    variables: { gameApiId: parseInt(gameId) },
    context: {
        headers: {
          authorization: `Bearer ${token}`,
        }
    },
    pollInterval: 1000 // refetch the data every 1 seconds
});

  const [createReview] = useMutation(CREATE_REVIEW, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      }
    }
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null')
    if (userData) {
      setUser(userData)
    }
  }, [])

  const { data, loading, error } = useQuery(USER_BY_ID, {
    variables: { id: user?.id },
    context: {
      headers: {
        Authorization: `Bearer ${token || ''}`,
      },
    },
  })


  if (gameLoading || reviewsLoading) return <Loading />;
    if (gameError) {
        return <div>Error: {gameError.message}</div>;
    }
    if (reviewsError) {
        return <div>Error: {reviewsError.message}</div>;
    }

  const info = gameData.externalGameByApiId;




  const userReviews = reviewsData.reviewsByGameId.map( (review: { owner: { user_name: any; profile_image: any }; createdAt: string | number | Date; text: any; score: any;  }) => ({
    username: review.owner.user_name,
    profileImage: review.owner.profile_image,
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
        setUserReview('');
      })
      .catch(err => {
        alert(err);
      });
  };

  // if (isLoading) return <Loading />;

  return (
    <div className='h-screen bg-cover'
      style={{ backgroundImage: 'url(https://media.discordapp.net/attachments/1142756461026476043/1161685359084699719/image.png?ex=653932cc&is=6526bdcc&hm=15ecf8791d994fe7bd83ffb393617f073f469cd406d88522082dfba6e4c18cb9&)' }}
    >
      <GameDetails title={info.title} description={info.description} coverImage={info.image} />
      { userReviews.length === 0 ? <NoReviewsMessage /> : <UserReviews reviews={userReviews} /> }
      <ReviewInput onReviewChange={setUserReview} onSubmit={handleSubmit} onRatingChange={setRating} userReview={userReview} />
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
