import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { useAuth } from "../provider/AuthProvider"; // Correct import path
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleSignIn, signInWithGitHub } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post('/users', userInfo)
          .then(res => {
            console.log(res.data);
            navigate('/');
          });
      })
      .catch(error => {
        console.error(error);
        toast.error("Login with Google failed");
      });
  };

  const handleGitHubSignIn = async () => {
    try {
      const result = await signInWithGitHub();
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          navigate('/');
        });
      toast.success("Login with GitHub successful");
    } catch (error) {
      console.error(error);
      toast.error("Login with GitHub failed");
    }
  };

  return (
    <div className="p-8">
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle className="mr-2" />
          Google
        </button>
      </div>
      <div>
        <button onClick={handleGitHubSignIn} className="btn">
          <FaGithub className="mr-2" />
          GitHub
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
