import { Alert, AlertProps } from 'react-bootstrap';
/* eslint-disable-next-line */
export interface MessageProps extends Pick<AlertProps, 'variant'> {
  children: React.ReactNode;
}

export const Message = ({ variant = 'info', children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
