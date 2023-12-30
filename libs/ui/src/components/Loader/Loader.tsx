import { Spinner } from 'react-bootstrap';

/* eslint-disable-next-line */
export interface LoaderProps {}

export const Loader = (props: LoaderProps) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    />
  );
};
