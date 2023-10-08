import React from 'react';
import styles from '../../styles/about.module.css';

const About = (): JSX.Element => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center p-8 bg-cover z-10"
             style={{ backgroundImage: 'url(https://media.discordapp.net/attachments/942001801799024643/1160607909701500948/ok.png?ex=65354758&is=6522d258&hm=539acedecf8372cce680b764e201ef62b1dac70d9aebd279eff2ac6fb3c2f700&)' }}
        >
            <div className={styles.myWhiteBox}>
                <div className={styles.backgroundImage} />
                <div className={styles.contentContainer}>
                    <div className={styles.textContainer}>
                        <div className={styles.mainTitle}>What is IGDB?</div>
                        <div className="text-xl mb-4"> </div>
                        <div className="mb-4 text-black">
                            <p>IGDB is your one-stop destination for all things related to video games from around the world. Whether you're a passionate gamer, a developer, or simply curious about the vast world of gaming, our database has you covered. Explore a treasure trove of information about games, developers, platforms, and more. Dive into our comprehensive collection of game data, reviews, trailers, and news to stay up-to-date with the latest in the gaming universe.</p>

                            <div className={styles.miniTitle}>How it works?</div>

                            <p>Discover every facet of your favorite games. From plot summaries and developer insights to user reviews and community discussions, our detailed game pages provide a comprehensive overview. Dive into the rich narratives, stunning visuals, and immersive gameplay experiences that make each game unique. Be part of the conversation by sharing your own thoughts and reviews.</p>
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        <img className={styles['about-img']} src='https://cdn.discordapp.com/attachments/942001801799024643/1160596019915018250/image.png?ex=65353c45&is=6522c745&hm=f920b05c32c25f511d216b0b5889ee7888aa25457242414b51e67432040ee6a5&' alt="Game 1" />
                        <div className={styles.smallText}>Fire Emblem Engage. Credit: Nintendo.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
