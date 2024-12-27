import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


const SignIn = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' }); // Initialize with keys
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart()); // Dispatch action to set loading state

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        // Handle error response
        dispatch(signInFailure(data.message || 'Invalid email or password'));
        return;
      }

      dispatch(signInSuccess(data)); // Dispatch action to set user data
      navigate('/'); // Redirect to home or dashboard
    } catch (err) {
      dispatch(signInFailure(err.message || 'Something went wrong.'));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-In</h1>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg my-3"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-90"
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700 hover:underline">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
