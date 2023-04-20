import auth from '@react-native-firebase/auth';
import {setLoading, setError, setUser} from '../redux/slice/authSlice';

export const signUp =
  ({name, email, password}) =>
  async dispatch => {
    try {
      dispatch(setLoading(true));
      await auth().createUserWithEmailAndPassword(email, password);
      const currentUser = await auth().currentUser;
      await currentUser.updateProfile({
        displayName: name,
      });
      const updatedUser = await auth().currentUser;
      dispatch(setUser(updatedUser));
      return {user: updatedUser, error: null};
    } catch (error) {
      console.log('New user error : ', error.message);
      dispatch(setError(error.message));
      return {user: null, error: error};
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signIn =
  ({email, password}) =>
  async dispatch => {
    try {
      dispatch(setLoading(true));

      const {user} = await auth().signInWithEmailAndPassword(email, password);

      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signOut = () => async dispatch => {
  try {
    dispatch(setLoading(true));

    await auth().signOut();

    dispatch(setUser(null));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
