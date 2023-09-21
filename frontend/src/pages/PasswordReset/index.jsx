import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authValidator } from '../../utils/authVerify';

export default function index() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  // Use the useLocation hook to get the current location
  const location = useLocation();

  // Parse the query parameters from the location's search property
  const searchParams = new URLSearchParams(location.search);

  // Read the "token" and "id" query parameters
  const token = searchParams.get('token');
  const id = searchParams.get('id');

  console.log(token, id);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const notifyError = () => {
    toast.error('Ooops! Something went wrong, try again later', {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const notifySuccess = () => {
    toast.success('Password changed successfully', {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const onSubmit = async (data) => {
    if (data.password !== '' && token !== '' && id !== '') {
      try {
        const response = await axios.post('http://localhost:3001/auth/resetPassword', {
          password: data.password,
          resetToken: token,
          userId: id,
        });

        if (response.status === 200) {
          notifySuccess();
          //redirect to login page after successful password reset
          navigate('/login');
        } else {
          notifyError();
        }
      } catch (error) {
        console.error('Password reset error');
      }
    } else {
      notifyError();
    }
  };

  // check login status on page reload

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    if (authValidator()) {
      setIsLoggedIn(true);
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your new password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="resetToken"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password', {
                    required: true,
                    validate: {
                      minLength: (v) =>
                        v.length >= 5 || 'Password must be at least 8 characters long',
                      maxLength: (v) =>
                        v.length <= 50 || 'The email should have at most 50 characters',
                      matchPattern: (v) =>
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/.test(v) ||
                        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password?.message && (
                  <small className="text-red-600">{errors.password.message}</small>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="resetToken"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="cpassword"
                  name="cpassword"
                  type="password"
                  autoComplete="current-password"
                  {...register('cpassword', {
                    required: true,
                    validate: (value) => {
                      const { password } = getValues();
                      return password === value || 'Passwords should match!';
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.cpassword?.message && (
                  <small className="text-red-600">{errors.cpassword.message}</small>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change password
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account?{' '}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
