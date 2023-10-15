interface User {
    id?: string;
    user_name?: string;
    email?: string;
    password?: string;
    profile_image: string;
    favourite_games?: string[];
}

interface UserModify {
    user_name?: string;
    email?: string;
    password?: string;
}

export  type {User, UserModify};
