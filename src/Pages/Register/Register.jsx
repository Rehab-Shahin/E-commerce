import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { useUserData } from "../../store";
import Footer from "../../Components/Footer/Footer";
import NavHeader from "../../Components/NavHeader/NavHeader";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useUserData();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "At least 6 chars")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setErrorMessage("");
    try {
      // محاولة تسجيل المستخدم مباشرة
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { username: `${values.firstName} ${values.lastName}` },
        },
      });

      if (error) {
        // التعامل مع الإيميل المسجل مسبقًا
        if (
          error.message.includes("For security purposes") ||
          error.message.includes("duplicate") // أحيانًا بيرجع duplicate
        ) {
          setErrorMessage("This email is already registered. Please login instead.");
        } else {
          setErrorMessage(error.message);
        }
        setSubmitting(false);
        return;
      }

      if (data.user) {
        setUser(data.user, data.session?.access_token || "");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("jwt", data.session?.access_token || "");
        navigate("/");
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <NavHeader />
      <div className="w-full h-[103vh] flex justify-center items-center flex-col gap-10">
        <h1 className="text-5xl font-bold">Create account</h1>
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5 items-center">
              <Field type="text" name="firstName" placeholder="First Name" className="rounded-full border border-[#9c9b9b] w-[30rem] h-[3.3rem] px-5"/>
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm"/>
              <Field type="text" name="lastName" placeholder="Last Name" className="rounded-full border border-[#9c9b9b] w-[30rem] h-[3.3rem] px-5"/>
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm"/>
              <Field type="email" name="email" placeholder="Email" className="rounded-full border border-[#9c9b9b] w-[30rem] h-[3.3rem] px-5"/>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
              <Field type="password" name="password" placeholder="Password" className="rounded-full border border-[#9c9b9b] w-[30rem] h-[3.3rem] px-5"/>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
              {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}

              <button type="submit" disabled={isSubmitting} className="flex justify-center items-center bg-black text-white rounded-full p-3 w-[120px] h-[50px] hover:translate-y-[-5px] transition-all duration-300 ease-in-out">
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </div>
  );
}
