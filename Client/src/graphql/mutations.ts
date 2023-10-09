import { gql } from '@apollo/client';

const UPDATE_USER1 = gql`
    mutation UpdateUser($user: UserModify!) {
        updateUser(user: $user) {
            token
            message
            user {
                id
                user_name
                email
                profile_image
                favourite_games
            }
        }
    }
`;

export default UPDATE_USER1;
