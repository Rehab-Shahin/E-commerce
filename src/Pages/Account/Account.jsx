import { useUserData } from "../../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";

export default function Account() {
  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  const { user, logout, restoreUser } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="pt-15 lg:pt-25">
      <PageHeader/>
      <div className="p-10">
      <h1 className="text-4xl font-bold mb-5">Account</h1>
      <p className="text-lg">Hello, {user.username} welcome to your dashboard!</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Account details</h2>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="mt-6 bg-black text-white px-5 py-2 rounded-full"
      >
        Log out
      </button>
    </div>
    </div>
  );
}
