/**
 * Interface for User
 * @interface User
 * @param {string} id - User id
 * @param {string} user_name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} profile_image - User profile image
 * @param {string[]} favourite_games - User favourite games
 * @exports User
 */
interface User {
    id?: string;
    user_name?: string;
    email?: string;
    password?: string;
    profile_image: string;
    favourite_games?: string[];
}
/**
 * Interface for UserModify
 * @interface UserModify
 * @param {string} user_name - User name
 *  
 * @param {string} email - User email
 * @param {string} password - User password
 * @exports UserModify
 */
interface UserModify {
    user_name?: string;
    email?: string;
    password?: string;
}

export  type {User, UserModify};
