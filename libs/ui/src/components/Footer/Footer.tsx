import { Container, Row, Col } from 'react-bootstrap';

interface FooterProps {}

export const Footer = (props: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>&copy; {currentYear} ProShop</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
