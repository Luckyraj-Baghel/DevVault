import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {user ? (
        <h1>Welcome {user.name}</h1>
      ) : (
        <h1>User not logged in</h1>
      )}
    </div>
  );
};

export default HomePage;