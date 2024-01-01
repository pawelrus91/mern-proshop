import { Row, Col } from 'react-bootstrap';
import { Product, Loader, Message } from '@mern-proshop/ui';
import { useGetProductsQuery } from '@mern-proshop/state';

const HomeScreen = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();

  if (isError) {
    <Message variant="danger">{JSON.stringify(error)}</Message>;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
