import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

/* eslint-disable-next-line */
export interface RatingProps {
  value: number;
  text: string;
}

export const Rating = (props: RatingProps) => {
  return (
    <div className="rating">
      <span>
        {props.value >= 1 ? (
          <FaStar />
        ) : props.value >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {props.value >= 2 ? (
          <FaStar />
        ) : props.value >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {props.value >= 3 ? (
          <FaStar />
        ) : props.value >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {props.value >= 4 ? (
          <FaStar />
        ) : props.value >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {props.value >= 5 ? (
          <FaStar />
        ) : props.value >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className="rating-text">{props.text && props.text}</span>
    </div>
  );
};
