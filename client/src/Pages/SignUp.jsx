import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';


const SignUp = () => {
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(''); // Clear any previous error messages
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        // Check for HTTP error or unsuccessful response
        setError(data.message || 'An error occurred during sign-up.');
        setLoading(false);
        return;
      }

      // Success: Redirect to sign-in page
      setLoading(false);
      navigate('/sign-in');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-Up</h1>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg my-3"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-90"
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
