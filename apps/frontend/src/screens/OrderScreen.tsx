import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  // Form,
  Button,
  Card,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
  PayPalButtonsComponentProps,
} from '@paypal/react-paypal-js';
import { Message, Loader } from '@mern-proshop/ui';

import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
  useAppSelector,
} from '@mern-proshop/state';

const OrderScreen = () => {
  const { id: orderId } = useParams<{ id: string }>();

  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetOrderDetailsQuery(orderId!);

  const [deliverOrder, { isLoading: isDeliverLoading }] =
    useDeliverOrderMutation();

  const [
    payOrder,
    // { isLoading: isPayLoading }
  ] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: payPal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && payPal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            clientId: payPal.clientId,
            currency: 'USD',
          },
        });

        paypalDispatch({
          type: 'setLoadingStatus',
          value: {
            state: SCRIPT_LOADING_STATE.PENDING,
            message: 'Loading PayPal...',
          },
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [payPal, order, paypalDispatch, loadingPayPal, errorPayPal]);

  if (isError) {
    return <Message variant="danger">{JSON.stringify(error)}</Message>;
  }
  if (isLoading || !order) {
    return <Loader />;
  }

  if (!order) {
    return <Loader />;
  }

  type OnApproveFn = PayPalButtonsComponentProps['onApprove'];

  const onApprove: OnApproveFn = async (data, actions) => {
    return actions?.order?.capture().then(async (details) => {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success('Payment Success');
      } catch (error) {
        toast.error(JSON.stringify(error));
      }
    });
  };
  // const onApproveTest = async () => {
  //   await payOrder({ orderId, details: { payer: {} } });
  //   refetch();
  //   toast.success('Payment Success');
  // };
  const onError: PayPalButtonsComponentProps['onError'] = async (err) => {
    toast.error(JSON.stringify(err));
  };

  const createOrder: PayPalButtonsComponentProps['createOrder'] = async (
    data,
    actions
  ) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice?.toFixed(2),
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const deliverOrderHandle = async () => {
    try {
      await deliverOrder(orderId!);
      refetch();
      toast.success('Order Delivered');
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user?.name}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order?.deliveredAt?.toString()}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {order?.paidAt?.toString()}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map((item) => (
                    <ListGroup.Item key={item.name}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty! * item.price!).toFixed(2)}
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
                  <Col>Items</Col>
                  <Col>${order.itemsPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice?.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={() => refetch()}
                  >
                    Refresh Payment Status
                  </Button>
                </ListGroup.Item>
              )}

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPayPal && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      {/* <Button
                        onClick={onApproveTest}
                        style={{
                          marginBottom: '10px',
                        }}
                      >
                        Test Pay Order
                      </Button> */}
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}

              {isDeliverLoading && <Loader />}

              {userInfo &&
                userInfo?.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandle}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
