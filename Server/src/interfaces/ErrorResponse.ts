import MessageResponse from './MessageResonse';

export default interface ErrorResponse extends MessageResponse {
  stack?: string;
}
