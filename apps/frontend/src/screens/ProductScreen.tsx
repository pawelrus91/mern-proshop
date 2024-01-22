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
import {
  useGetProductDetailsQuery,
  addToCart,
  useAppDispatch,
  useAppSelector,
  useCreateReviewMutation,
} from '@mern-proshop/state';
import { toast } from 'react-toastify';

import { Loader, Rating, Message, Meta } from '@mern-proshop/ui';
import { Review } from '@mern-proshop/types';

const ProductScreen = () => {
  const { id: productId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState<Review['rating']>(0);
  const [comment, setComment] = useState<Review['comment']>('');

  const { userInfo } = useAppSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
    error,
  } = useGetProductDetailsQuery({ id: productId as string });

  const [createReview, { isLoading: isReviewLoading }] =
    useCreateReviewMutation();

  const addToCartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!product) {
      return;
    }

    dispatch(addToCart({ product, qty }));
    navigate(`/cart`);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!productId) {
        return;
      }
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      toast.success('Review Submitted!');
      setRating(0);
      setComment('');
      refetch();
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
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
      <Meta title={product?.name} />
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
      <Row className="review">
        <Col md={6}>
          <h2>Reviews</h2>
          {product?.reviews.length === 0 && <Message>No Reviews</Message>}
          <ListGroup variant="flush">
            {product?.reviews.map((review) => (
              <>
                {/* eslint-disable-next-line */}
                {/* @ts-ignore */}
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  {/* eslint-disable-next-line */}
                  {/* @ts-ignore */}
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              </>
            ))}

            <ListGroup.Item>
              <h2>Write a Customer Review</h2>

              {isReviewLoading && <Loader />}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    disabled={isReviewLoading}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
