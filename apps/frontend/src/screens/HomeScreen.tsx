// import { useEffect, useState } from 'react';
// import axios, { AxiosResponse } from 'axios';
import { Row, Col } from 'react-bootstrap';
// import { Product as TProduct } from '@mern-proshop/types';
import { Product } from '@mern-proshop/ui';
import { useGetProductsQuery } from '../slices/productsApiSlices';

const HomeScreen = () => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();

  if (isError) {
    <div>{JSON.stringify(error)}</div>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
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
