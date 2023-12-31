import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Product as ProductType } from '@mern-proshop/types';
import { Rating } from '../Rating/Rating';
export interface ProductProps {
  product: ProductType;
}

export const Product = (props: ProductProps) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${props.product._id}`}>
        <Card.Img src={props.product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${props.product._id}`}>
          <Card.Title as="div" className="product-title">
            {props.product.name}
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={props.product.rating}
            text={`${props.product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${props.product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
