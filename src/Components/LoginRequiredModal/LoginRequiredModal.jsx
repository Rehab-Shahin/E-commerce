import { Link } from "react-router-dom";
import {useSingleProductModal, useUserData } from "../../store";

export default function LoginRequiredModal() {
  const { showLoginModal, closeLoginModal } = useUserData();
  const { closeModal } = useSingleProductModal();
  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
        <p className="mb-6 text-gray-600">
          You must be logged in to continue.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-black text-white px-5 py-2 rounded-full"
            onClick={()=>{
                closeLoginModal();
                closeModal()
            }}
          >
            Go to Login
          </Link>
          <button
            onClick={closeLoginModal}
            className="bg-gray-300 text-black px-5 py-2 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
