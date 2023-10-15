import React from 'react';
import {inspect} from "util";
import styles from '../../styles/top10.module.css';
/**
 * `Top10` React component.
 * 
 * Represents a visual display of the top 10 games based on IGDB ratings. Each game title in the list 
 * is presented as a clickable link that redirects to its respective official or store page. 
 * The component also includes an aesthetic background and a header indicating the list's context.
 * 
 * @returns {JSX.Element} A visual representation of the top 10 games list.
 */
const Top10 = (): JSX.Element => {
    return (<div className='h-screen bg-cover'
                 style={{backgroundImage: 'url(https://media.discordapp.net/attachments/1142756461026476043/1161689305215946804/image.png?ex=65393679&is=6526c179&hm=9c994f15138392fbb82ce67260aa008c4b729dcaa620d4576a17b7c7de1e4cfd&)'}}
        >
            <div className={styles.titleContainer}>
                <h1 className={styles.title1}>Top 10</h1>
                <h1 className={styles.title2}>IGDB</h1>
            </div>
            <div className={styles.top10Container}>
                <div className={styles.top10}>
                    <div className={styles.imageContainer}>
                        <img className={styles['top-img']} src='https://media.discordapp.net/attachments/1069253343475666964/1161733661868163113/image.png?ex=65395fc8&is=6526eac8&hm=6646d57114699e1a0b6969955552a9c46a9338fc65f307ba8e4ed44dea190488&=&width=726&height=711' alt="top-img" />
                        <div className={styles.smallText}>©IGDB</div>
                    </div>
                    <a className={styles.top10Item} href="https://store.steampowered.com/app/1817230/HiFi_RUSH/">1. Hi-FI Rush</a>
                    <a className={styles.top10Item} href="https://www.residentevil.com/4/">2. Resident Evil 4</a>
                    <a className={styles.top10Item} href="https://store.steampowered.com/app/1562430/DREDGE/">3. Dredge</a>
                    <a className={styles.top10Item} href="https://store.steampowered.com/app/1774580/STAR_WARS_Jedi_Survivor/">4. Star Wars Jedi: Survivor</a>
                    <a className={styles.top10Item} href="https://zelda.nintendo.com/tears-of-the-kingdom/">5. The Legend of Zelda: Tears of the Kingdom</a>
                    <a className={styles.top10Item} href="https://store.steampowered.com/app/1364780/Street_Fighter_6/">6. Street Fighter 6</a>
                    <a className={styles.top10Item} href="https://store.steampowered.com/app/2344520/Diablo_IV/">7. Diablo IV</a>
                    <a className={styles.top10Item} href="https://store.steampowered.com/app/1868140/DAVE_THE_DIVER/">8. Dave the Diver</a>
                    <a className={styles.top10Item} href="https://na.finalfantasyxvi.com/">9. Final Fantasy XVI</a>
                    <a className={styles.top10Item} href="https://www.nintendo.com/us/store/products/pikmin-4-switch/">10. Pikmin 4</a>
                </div>
            </div>
        </div>
    );
}
export default Top10;
