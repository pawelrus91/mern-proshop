import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { Loader, Message } from '@mern-proshop/ui';

import { useGetUsersQuery } from '@mern-proshop/state';

const UserListScreen = () => {
  const {
    data: users,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetUsersQuery();

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure')) {
      // delete products
    }
  };

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{JSON.stringify(error)}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={JSON.stringify(user._id)}>
                <td>{JSON.stringify(user._id)}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green ' }} />
                  ) : (
                    <FaTimes style={{ color: 'red ' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`admin/users/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(JSON.stringify(user._id))}
                  >
                    <FaTrash color="white" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
