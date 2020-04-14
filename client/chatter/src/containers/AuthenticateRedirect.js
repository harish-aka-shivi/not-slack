import { useSelector } from 'react-redux';
import { useHistory } from './Router';
import { isUserLoggedIn } from '../redux/user';

const AuthenticateRedirect = () => {
  const isLoggedIn = useSelector(isUserLoggedIn);
  const history = useHistory();
  if (!isLoggedIn && history.location.pathname !== '/login') {
    history.replace('/login');
  }
  return null;
};

export default AuthenticateRedirect;
