import { login, logo, logoOnly, google, facebook } from "@/Assets";
import { Button } from "antd";
import { facebookProvider, googleProvider } from "@/Firebase/config";
import { loginUser } from "@/Redux/Auth/AuthSlice";
import { useAppDispatch } from "@/Hooks";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleGoogleLogin = () => {
    dispatch(loginUser(googleProvider));
  };

  const handleFacebookLogin = () => {
    dispatch(loginUser(facebookProvider));
  };

  return (
    <div className="w-full h-[100vh] flex justify-center font-sans">
      <div className="sm:max-w-[1280px] flex-1">
        <div className="p-4">
          <img src={logo} alt="logo" className="mb-[100px]" />
          <div className="flex justify-between">
            <div
              className="text-center shadow-custom rounded-md 
              p-4 flex flex-col items-center flex-1 h-auto"
            >
              <img src={logoOnly} alt="logoOnly" className="mb-4" />
              <h1 className="mb-8 font-medium text-[36px]">LOGIN</h1>
              <Button
                className="w-[250px] mb-2 text-[18px] h-auto"
                onClick={handleGoogleLogin}
              >
                <div className="flex gap-2 justify-center">
                  <img src={google} alt="google" />
                  Login with Google
                </div>
              </Button>
              <Button className="w-[250px] text-[18px] h-auto" disabled>
                <div
                  className="flex gap-2 justify-center"
                  onClick={handleFacebookLogin}
                >
                  <img src={facebook} alt="facebook" />
                  Login with Facebook
                </div>
              </Button>
            </div>
            <img
              src={login}
              alt="login"
              className="hidden sm:block w-[70%] h-[70vh] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
