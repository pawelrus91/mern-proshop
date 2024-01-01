import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../slices/productsApiSlices';
import { addToCart } from '../slices/cartSlice';
import { useAppDispatch } from '../store';

import { Loader, Rating, Message } from '@mern-proshop/ui';

const ProductScreen = () => {
  const { id: productId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery({ id: productId as string });

  const addToCartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!product) {
      return;
    }

    dispatch(addToCart({ product, qty }));
    navigate(`/cart`);
  };

  if (isError) {
    return (
      <>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        <Message variant="danger">{JSON.stringify(error)}</Message>;
      </>
    );
  }

  if (isLoading || !product) {
    return (
      <>
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
        <Loader />;
      </>
    );
  }

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product?.image} alt={product?.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
            <ListGroup.Item>
              Description: ${product?.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product?.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product?.countInStock).keys()].map(
                          (product) => (
                            <option key={product + 1} value={product + 1}>
                              {product + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product?.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
