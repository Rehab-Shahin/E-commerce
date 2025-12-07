import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import supabase from "../../supabase";
import { useUserData } from "../../store";

export default function Login() {
  const { setUser } = useUserData();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailForResend, setEmailForResend] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          setErrorMessage(
            "Your email is not confirmed. Please check your inbox or resend confirmation."
          );
          setEmailForResend(values.email);
        } else if (error.message.includes("Invalid login credentials")) {
          setErrorMessage("Invalid email or password.");
        } else {
          setErrorMessage(error.message);
        }
        return;
      }

      if (data.user) {
        setUser(data.user, data.session?.access_token || "");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("jwt", data.session?.access_token || "");
        navigate("/account"); // أو "/" حسب المكان اللي عايزاها
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // طريقة عملية لإعادة إرسال تأكيد البريد
  const handleResendConfirmation = async () => {
    if (!emailForResend) return;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(emailForResend, {
        redirectTo: window.location.origin, // الرابط اللي هيروح بعد التأكيد
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        alert("Confirmation email resent! Please check your inbox.");
      }
    } catch (err) {
      setErrorMessage("Could not resend confirmation. Try again later.");
    }
  };

  const LoginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="w-full min-h-[90vh] flex justify-center items-center px-4 pt-25">
      <div className="w-full max-w-md flex flex-col gap-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Login</h1>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5 items-center w-full">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="email" className="text-[#555259]">Email</label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="rounded-full border border-[#9c9b9b] w-full h-[3rem] px-5"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="password" className="text-[#555259]">Password</label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="rounded-full border border-[#9c9b9b] w-full h-[3rem] px-5"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm text-center">{errorMessage}</div>
              )}

              {errorMessage.includes("not confirmed") && (
                <button
                  type="button"
                  onClick={handleResendConfirmation}
                  className="text-blue-500 underline mb-2"
                >
                  Resend confirmation email
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex justify-center items-center bg-black text-white rounded-full p-3 w-full md:w-[150px] h-[50px] hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              <Link
                to="/register"
                className="text-[#555259] underline hover:text-black text-center text-sm md:text-base"
              >
                New customer? Sign up for an account
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
