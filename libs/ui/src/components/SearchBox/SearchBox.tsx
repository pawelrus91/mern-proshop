import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface SearchBoxProps {}

export const SearchBox = (props: SearchBoxProps) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword = '' } = useParams<{ keyword: string }>();
  const [keyword, setKeyword] = useState(urlKeyword);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword('');
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
        value={keyword}
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-light"
        className="p-2 mx-2"
        onClick={() => navigate(keyword ? `/search/${keyword}` : '/')}
      >
        Search
      </Button>
    </Form>
  );
};
