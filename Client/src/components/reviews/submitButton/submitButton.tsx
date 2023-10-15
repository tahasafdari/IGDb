// components/SubmitButton.tsx
import SendIcon from '@mui/icons-material/Send';

type SubmitButtonProps = {
    onSubmit: () => void;
  };
  
/**
 * A button component specialized for submission actions.
 * 
 * This component provides a button visualized with a send icon. It's designed to be used
 * for submission actions, such as sending a form or message.
 * 
 * @param onSubmit - Callback function that is triggered when the button is clicked.
 * 
 * @example
 * // Usage:
 * <SubmitButton onSubmit={() => console.log("Button clicked!")} />
 */
  const SubmitButton = ({ onSubmit }: SubmitButtonProps) => (
    <button onClick={onSubmit}>
      <SendIcon style={{color:"white"}}/>
    </button>
  );
  
  export default SubmitButton;
  