import React from 'react';
import styles from '../../styles/games.module.css';

interface GameCardProps {
    imageUrl: string;
}

const GameCard: React.FC<GameCardProps> = ({imageUrl }) => {
    return (
        <div className={styles.gameCard}>
            <img src={imageUrl} className={styles.gameImage} />
        </div>
    );
};

const GamesGrid: React.FC = () => {
    const gameCardsData = [
        { imageUrl: 'https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg' },
        { imageUrl: 'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000029237/16af19f777a4f7f935fa0d18ed49f5c32b3571b8a94e8c3af0987e9211526e7e' },
        { imageUrl: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg' },
        { imageUrl: 'https://images.squarespace-cdn.com/content/v1/5c4f9c40f8370a0dd9949a42/1597841443616-RGS0UPYMB6CTB10X3ZGA/halo+2+ban.jpg?format=2500w' },
        { imageUrl: 'https://qmgames.b-cdn.net/wp-content/uploads/2023/09/1318376.jpeg' },
        { imageUrl: 'https://cdn1.epicgames.com/ark/offer/EGS_ARKSurvivalEvolved_StudioWildcard_S1-2560x1440-c316afb7c33a9dfb892eef6b99169e43.jpg' },
        { imageUrl: 'https://gaming-cdn.com/images/products/506/orig/hearthstone-heroes-of-warcraft-5x-booster-pack-pc-game-battle-net-europe-cover.jpg?v=1674143405' },
        { imageUrl: 'https://assets2.ignimgs.com/2014/02/14/wow-boss-compilation-wallpaperjpg-dc3b63.jpg?width=1280' },
        { imageUrl: 'https://imageio.forbes.com/specials-images/imageserve/63424d27fec9cfc1c8de06ab/FIFA-23/960x0.jpg?format=jpg&width=960' },
        { imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/capsule_616x353.jpg?t=1696622369' },
        { imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/2400/ac505d57a46e24dd96712263d89a150cb443af288c025ff2.jpg' },
        { imageUrl: 'https://dotesports.com/wp-content/uploads/2019/09/12195522/league-of-legends.jpg' },
        { imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg?t=1632930565' },
        { imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg?t=1632930565' },
        { imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg?t=1632930565' },
        { imageUrl: 'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg?t=1632930565' },
    ];

    const gameCards = gameCardsData.map((data, index) => (
        <GameCard key={index} imageUrl={data.imageUrl} />
    ));

    return <div className={styles.gamesGrid}>{gameCards}</div>;
};

const Games = (): JSX.Element => {
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
                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
                <div className={styles.gamesContainer}>
                    {/* grid of games */}
                    <GamesGrid />
                </div>
            </div>
        </div>
    );
};

export default Games;
