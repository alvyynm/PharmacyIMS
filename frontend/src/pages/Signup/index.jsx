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
    toast.error('Ooops! Please fill all required credentials', {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const notifySuccess = () => {
    toast.success('Account created successfully', {
      position: toast.POSITION.TOP_LEFT,
    });
  };

  const onSubmit = async (data) => {
    if (data.email !== '' && data.password !== '' && data.name !== '') {
      try {
        const response = await axios.put('http://localhost:3001/auth/signup', {
          email: data.email,
          password: data.password,
          role: data.role,
          name: data.name,
        });

        console.log(email, password);

        console.log(response.data); // log api response to console

        const token = response.data.token;

        //redirect to login page after successful a/c creation
        navigate('/login');
        notifySuccess();
      } catch (error) {
        console.error('Account creation failed');
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
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  {...register('name', {
                    required: true,
                    validate: {
                      minLength: (v) =>
                        v.length >= 2 || 'The name should have at least 2 characters',
                      maxLength: (v) =>
                        v.length <= 30 || 'The name should have at most 30 characters',
                      matchPattern: (v) =>
                        /^[A-Za-z]+(?: [A-Za-z]+)?$/.test(v) ||
                        'Name must contain only letters and a space',
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name?.message && (
                  <small className="text-red-600">{errors.name.message}</small>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Select your role
              </label>
              <select
                id="role"
                {...register('role', {
                  required: true,
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Choose a role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
              {errors.role?.type === 'required' && (
                <small className="text-red-600">Role is required</small>
              )}
            </div>

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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
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
