import { Container, Row, Col } from 'react-bootstrap';

/* eslint-disable-next-line */
export interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer = (props: FormContainerProps) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
