import Link from 'next/link';
import React from 'react';
import {useRouter} from "next/router";
import {inspect} from "util";
import styles from '../../styles/dashboard.module.css';
import {transition} from "@chakra-ui/react";
/**
 * `Dashboard` React component.
 * 
 * The Dashboard component serves as the main landing page that users see after logging in.
 * It presents a background image, a captivating title, a brief description of the IGDB platform,
 * and a series of thumbnails representing different games.
 * 
 * The user is also provided with a "Learn More" button that redirects them to the "About" section of IGDB.
 * 
 * @component
 * @returns {JSX.Element} A visual representation of the user's dashboard on IGDB.
 */
const Dashboard = (): JSX.Element => {
  const router = useRouter();

  const navigateToAbout = () => {
    router.push('/about');
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center p-8 bg-cover z-10"
      style={{ backgroundImage: 'url(https://media.discordapp.net/attachments/942001801799024643/1160619636899983430/image.png?ex=65355244&is=6522dd44&hm=9458fd675372ab736ad3a2b174476f1d708621c4ee9222d194efd39062120c9f&=&width=1058&height=622)' }}
    >
      {/* Overlay with reduced opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className={styles.mainTitle}>
        <div className={styles.explore}>Explore the best games</div>
        <div className={styles.titleIGDB}>IGDB</div>
        </div>
        <div className="mb-4 text-white">International Game database offers you the most accurate reviews of all the existing games.</div>
        <button onClick={navigateToAbout} className={styles.learnButton}>
          Learn More
        </button>
        <div className={styles.thumbnailContainer}>
          {/* Images for demo */}
          <img className={styles.thumbnail} src='https://media.discordapp.net/attachments/942001801799024643/1160620037208543444/image.png?ex=653552a4&is=6522dda4&hm=70796db29d951010a44b1eebffc35d53561e29b98bad24b59ec7ca122f5ed8fc&=&width=756&height=534' alt="Game 1" />
          <img className={styles.thumbnail} src='https://media.discordapp.net/attachments/942001801799024643/1160620036906569819/image.png?ex=653552a4&is=6522dda4&hm=e17947216646deed164e621d9d573095abbd89d3d44c4f96a6f0dd8213b940fd&=&width=757&height=534' alt="Game 2" />
          <img className={styles.thumbnail} src='https://media.discordapp.net/attachments/942001801799024643/1160620036361298100/image.png?ex=653552a3&is=6522dda3&hm=b0fa0338804ce92bcf22bf4d0a2ccf7cbead53468c6609159d1c2b8c8109a670&=&width=756&height=534' alt="Game 3" />
          <img className={styles.thumbnail} src='https://media.discordapp.net/attachments/942001801799024643/1160620036038332547/image.png?ex=653552a3&is=6522dda3&hm=7091cd0ab56720deed60a26105da840965a89e026b08cb94f2e091f5f4032cca&=&width=757&height=534' alt="Game 4" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
