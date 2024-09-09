import React from 'react';
import useAuth from '../../hooks/useAuth';

const UserGreeting: React.FC = () => {
  const auth = useAuth();

  return <UserGreetingView auth={auth} />;
};

interface UserGreetingViewProps {
  auth: {
    type: 'loading' | 'guest' | 'user';
    user?: { name: string; email: string };
  };
}

const UserGreetingView: React.FC<UserGreetingViewProps> = ({ auth }) => {
  return (
    <div style={{ paddingBottom: '2em' }}>
      {auth.type === 'loading' && 'Loading...'}
      {auth.type === 'guest' && 'Hello, guest.'}
      {auth.type === 'user' && `Hello, ${auth.user?.name} (${auth.user?.email})`}
    </div>
  );
};

export { UserGreetingView };
export default UserGreeting;
