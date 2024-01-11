import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

import { CheckoutSteps, Message, Loader } from '@mern-proshop/ui';
import {
  useAppSelector,
  useAppDispatch,
  useCreateOrderMutation,
  clearCartItems,
} from '@mern-proshop/state';
import { NewOrder } from '@mern-proshop/types';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [createOrder, { isLoading, isError, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [navigate, cart.paymentMethod, cart.shippingAddress.address]);

  console.log(cart.cartItems);

  const orderItems = cart.cartItems.map(({ product, qty: quantity }) => ({
    qty: quantity,
    name: product.name,
    image: product.image,
    price: product.price,
    product: product._id,
  }));

  console.log('@@@@ orderItems', orderItems);
  const placeOrderHandler = async () => {
    try {
      const newOrder: NewOrder = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        orderItems: cart.cartItems.map(({ product, qty: quantity }) => ({
          qty: quantity,
          name: product.name,
          image: product.image,
          price: product.price,
          product: product._id,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: Number(cart.itemsPrice),
        shippingPrice: Number(cart.shippingPrice),
        taxPrice: Number(cart.taxPrice),
        totalPrice: Number(cart.totalPrice),
      };

      const res = await createOrder(newOrder).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <h3>Cookie</h3>
      {document.cookie}

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map(({ product: item, qty }) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>

                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>

                        <Col md={4}>
                          {qty} x ${item.price} = $
                          {(qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {isError && (
                  <Message variant="danger">{JSON.stringify(error)}</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item className="d-grid gap-2">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
