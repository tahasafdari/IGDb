// components/GameDetails.tsx


type GameDetailsProps = {
    title: string;
    releaseDate: string;
    genre: string;
    coverImage: string;
  };
  
  const GameDetails = ({ title, releaseDate, genre, coverImage }: GameDetailsProps) => (
    <div  style={{
      display: 'flex',
      alignItems: 'center', 
      padding: '50px 0',
      justifyContent: 'center',
      color: 'white',
      
      
    }}>
      <div style={{
        marginRight: '30%',
      }}>
        <h1>{title}</h1>
        <p>Release Date: {releaseDate}</p>
        <p>Genre: {genre}</p>
      </div>
      <img src={coverImage} alt={`Cover for ${title}`} style={{
        borderRadius: '10px',
        padding: '10px',
        minHeight: '150px',
        maxHeight: '150px',
        minWidth: '220px',
        maxWidth: '220px',
      }} />
      
    </div>
  );
  
  export default GameDetails;
  