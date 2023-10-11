// components/SubmitButton.tsx
import SendIcon from '@mui/icons-material/Send';

type SubmitButtonProps = {
    onSubmit: () => void;
  };
  
  const SubmitButton = ({ onSubmit }: SubmitButtonProps) => (
    <button onClick={onSubmit}>
      <SendIcon style={{color:"white"}}/>
    </button>
  );
  
  export default SubmitButton;
  