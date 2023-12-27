import { Card } from 'react-bootstrap';

import { Product as ProductType } from '@mern-proshop/types';

export interface ProductProps {
  product: ProductType;
}

export const Product = (props: ProductProps) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/product/${props.product._id}`}>
        <Card.Img src={props.product.image} variant="top" />
      </a>

      <Card.Body>
        <a href={`/product/${props.product._id}`}>
          <Card.Title as="div">{props.product.name}</Card.Title>
        </a>

        <Card.Text as="h3">${props.product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
