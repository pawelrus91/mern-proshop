import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import {
  Product,
  Loader,
  Message,
  Paginate,
  ProductCarousel,
  Meta,
} from '@mern-proshop/ui';
import { useGetProductsQuery } from '@mern-proshop/state';

const HomeScreen = () => {
  const { pageNumber = '1', keyword } = useParams<{
    pageNumber: string;
    keyword: string;
  }>();
  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  if (isError) {
    <Message variant="danger">{JSON.stringify(error)}</Message>;
  }
  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      <Meta />
      <h1>Latest Products</h1>
      <Row>
        {data?.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <Paginate
        pages={data.pages}
        page={data.page}
        keyword={keyword ? keyword : ''}
      />
    </>
  );
};

export default HomeScreen;
