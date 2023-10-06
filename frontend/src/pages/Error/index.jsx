import { Link } from 'react-router-dom';

export default function index() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Oop! You're lost
          </h2>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Go to{' '}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>{' '}
          or{' '}
          <Link
            to="/dashboard"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Dashboard
          </Link>
        </p>
      </div>
    </>
  );
}
