import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
// import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authValidator } from '../../utils/authVerify';

export default function index() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notifyError = () => {
    toast.error('Password change request failed', {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const notifySuccess = () => {
    toast.success('Close with window and check your email', {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const onSubmit = async (data) => {
    if (data.email !== '') {
      try {
        const response = await axios.post('http://localhost:3001/auth/requestResetPassword', {
          email: data.email,
        });

        console.log(email);

        console.log(response.data); // log api response to console

        const resetToken = response.data.resetToken;
        const userId = response.data.userId;

        //redirect to resetemail page after successful 200 response
        navigate('/passwordresetemail');
        notifySuccess();
      } catch (error) {
        console.error('Password change request failed');
        console.log(response.data); // log api response to console
      }
    } else {
      // display error message
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
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    validate: {
                      maxLength: (v) =>
                        v.length <= 50 || 'The email should have at most 50 characters',
                      matchPattern: (v) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        'Email address must be a valid address',
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email?.message && (
                  <small className="text-red-600">{errors.email.message}</small>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Request password reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
