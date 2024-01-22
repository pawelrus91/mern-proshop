import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { Loader } from '../Loader/Loader';
import { Message } from '../Message/Message';
import { useGetTopProductsQuery } from '@mern-proshop/state';

/* eslint-disable-next-line */
export interface ProductCarouselProps {}

export function ProductCarousel(props: ProductCarouselProps) {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{JSON.stringify(error)}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
