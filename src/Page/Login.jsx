import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);

  const { signIn } = useContext(AuthContext);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      })
      .catch(error => console.error(error));
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src="https://i.ibb.co/pj5RH5d/cat1.jpg" alt="Login Illustration" className="w-32 h-32 object-cover rounded-full shadow-md" />
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <h5 className="text-2xl font-bold text-center text-gray-900">Sign in to our platform</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="flex flex-col items-start">
            <LoadCanvasTemplate />
            <input
              onBlur={handleValidateCaptcha}
              type="text"
              name="captcha"
              placeholder="type your captcha"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2"
              required
            />
            <button type="button" className="mt-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Validate
            </button>
          </div>
          <input
            disabled={disabled}
            type="submit"
            name="submit"
            value="Login"
            className="w-full p-2.5 bg-blue-500 text-white rounded-lg focus:ring-4 focus:ring-blue-300 cursor-pointer disabled:bg-gray-300"
          />
          <div className="text-sm font-medium text-gray-500 text-center">
            Not registered? 
            <Link to='/signup' className="text-blue-500 hover:underline"> Create an Account</Link>
          </div>
        </form>
        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
