import styles from '../../styles/games.module.css';
import { EXTERNAL_GAMES_BY_NAME } from '../../graphql/queries';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { isPropertyAccessOrQualifiedName } from 'typescript';
import { useRouter } from 'next/router';

interface GameCardProps {
    imageUrl: string;
    ID: string;
}

const GameCard = ({imageUrl, ID } : GameCardProps) => {
    const Router = useRouter()
    function redirect() {
        if(typeof window !== 'undefined'){
        localStorage.setItem('gameId', ID)
        }
        console.log(`gameId saved to localStorage: ${localStorage.getItem('gameId')}`);
        Router.push(`/reviews`)
    }

    return (
        <div className={styles.gameCard} onClick={redirect}>
            <img src={imageUrl} className={styles.gameImage} id={ID} />
        </div>
    );
};

interface GamesGridProps {
    term: string;
}


const GamesGrid: React.FC<GamesGridProps> = ({term}) => {
    let token : string | null = null
    if(typeof window !== 'undefined'){
        token = localStorage.getItem('token') 
        }
    const {data, error, loading} = useQuery(EXTERNAL_GAMES_BY_NAME, {
        variables: {name: term},
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }
    });

    if (error) {
        console.log(error);
        return <p>Error :c</p>;
    }

    if (loading) return <p>Loading...</p>;

    const info = data.externalGamesByName;
    
    const gameCards = info.map((data: any, index: number) => (
        <GameCard key={index} imageUrl={data.image} ID = {data.gameApiId} />
    ));

    return <div className={styles.gamesGrid}>{gameCards}</div>;
};

export default function Games(): JSX.Element {
    const [term, setTerm] = useState('');
    if(typeof window !== 'undefined'){
        if (typeof localStorage.getItem('token') == undefined) {
            const Router = useRouter()
            alert('Log in, dumbass')
            Router.push('/sign-in')
        }
    }
    


    return (
        <div
            className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center p-8 bg-cover z-10"
            style={{
                backgroundImage:
                    'url(https://media.discordapp.net/attachments/942001801799024643/1160654694507610133/image.png?ex=653572eb&is=6522fdeb&hm=6bf38c3b430fbe675b62c85b669a27a9e390414bdfa3d3e80e073ee5e00275e2&=&width=1079&height=622)',
            }}
        >
            {/* Overlay with reduced opacity */}
            <div className="absolute inset-0 opacity-50"></div>
            {/* Content */}
            <div className={styles.content}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchTitle}>Search for games:</div>
                        <input className={styles.searchBar} type="text" placeholder="Search..." onChange={e => setTerm(e.target.value)}/>
                </div>
                <div className={styles.gamesContainer}>
                    {/* grid of games */}
                    <GamesGrid term={term} />
                </div>
            </div>
        </div>
    );
};
