import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/* eslint-disable-next-line */
export interface PaginateProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  // keyword?: string
}

export const Paginate = (props: PaginateProps) => {
  return (
    props.pages > 1 && (
      <Pagination>
        {[...Array(props.pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              props.isAdmin ? `/admin/productlist/${x + 1}` : `/page/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === props.page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
