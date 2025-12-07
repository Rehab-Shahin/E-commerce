import { useEffect, useState } from "react";
import { useCart } from "../../store/cartStore";
import { Link } from "react-router-dom";
import { Lock, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CheckoutSchema = Yup.object().shape({
  email: Yup.string().required("Enter an email or phone number"),
  firstName: Yup.string().required("Enter a first name"),
  lastName: Yup.string().required("Enter a last name"),
  address: Yup.string().required("Enter an address"),
  city: Yup.string().required("Enter a city"),
  cardNumber: Yup.string().required("Enter a card number"),
  expiry: Yup.string().required("Enter a valid expiration date"),
  cvv: Yup.string().required("Enter the CVV or security code on your card"),
  nameOnCard: Yup.string().required(
    "Enter your name exactly as it’s written on your card"
  ),
});

export default function Checkouts() {
  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  const { cartItems, buyNowItem } = useCart();
  const [openSummary, setOpenSummary] = useState(false);

  const itemsToCheckout = buyNowItem ? [buyNowItem] : cartItems;

  const subtotal = itemsToCheckout.reduce(
    (acc, item) => acc + item.price_after * item.quantity,
    0
  );
  const shipping = 0;
  const taxes = subtotal * 0.15;
  const total = subtotal + shipping + taxes;

  return (
    <div className="md:grid md:grid-cols-2 gap-10 bg-[#F5F5F5]">
      
      <div className="block md:hidden shadow mt-[100px]">
        <button
          onClick={() => setOpenSummary(!openSummary)}
          className="w-full flex justify-between items-center px-4 py-3 font-semibold"
        >
          <span>Order summary</span>
          <span className="flex items-center gap-2">
            ৳ {total.toLocaleString()}
            {openSummary ? (
              <ChevronUp size={18} className="text-gray-600" />
            ) : (
              <ChevronDown size={18} className="text-gray-600" />
            )}
          </span>
        </button>

        {openSummary && (
          <div className="p-4">
            <div className="flex flex-col gap-4 max-h-[200px] overflow-y-auto pr-2">
              {itemsToCheckout.map((item) => (
                <div
                  key={item.documentId}
                  className="flex items-center gap-3"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded object-cover border border-gray-300"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ৳ {item.price_after.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Estimated Taxes</span>
                <span>৳ {taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg my-2">
                <span>Total</span>
                <span>৳ {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="lg:pl-50 lg:pt-[130px] pb-5 lg:col-span-1 flex flex-col gap-6 bg-white">
        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            postal: "",
            cardNumber: "",
            expiry: "",
            cvv: "",
            nameOnCard: "",
          }}
          validationSchema={CheckoutSchema}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-xl">Contact</h2>
                  <Link
                    to="/login"
                    className="text-[#6B776B] text-[16px] underline"
                  >
                    Sign in
                  </Link>
                </div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email or mobile phone number"
                  className={`w-full border p-3 rounded mb-1 focus:outline-none ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-[#9cca81]"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-green-700 w-4 h-4 border-gray-300 rounded"
                  />
                  Email me with news and offers
                </label>
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-lg mb-3">Delivery</h2>

                <select className="w-full border p-3 rounded my-3 focus:outline-none focus:ring-2 focus:ring-[#9cca81] border-gray-300">
                  <option>Bangladesh</option>
                  <option>Egypt</option>
                  <option>USA</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Field
                      name="firstName"
                      placeholder="First name"
                      className={`border p-3 rounded w-full focus:outline-none ${
                        errors.firstName && touched.firstName
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : "border-gray-300 focus:ring-2 focus:ring-[#9cca81]"
                      }`}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <Field
                      name="lastName"
                      placeholder="Last name"
                      className={`border p-3 rounded w-full focus:outline-none ${
                        errors.lastName && touched.lastName
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : "border-gray-300 focus:ring-2 focus:ring-[#9cca81]"
                      }`}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <Field
                    name="address"
                    placeholder="Address"
                    className={`w-full border p-3 rounded focus:outline-none ${
                      errors.address && touched.address
                        ? "border-red-500 focus:ring-2 focus:ring-red-500"
                        : "border-gray-300 focus:ring-2 focus:ring-[#9cca81]"
                    }`}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <Field
                      name="city"
                      placeholder="City"
                      className={`border p-3 rounded w-full focus:outline-none ${
                        errors.city && touched.city
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : "border-gray-300 focus:ring-2 focus:ring-[#9cca81]"
                      }`}
                    />
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <Field
                    name="postal"
                    placeholder="Postal code"
                    className="border p-3 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#9cca81]"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-700 mt-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-green-700 w-4 h-4 border-gray-300 rounded"
                  />
                  Save this information for next time
                </label>
              </div>

              <div className="p-5">
                <h2 className="font-semibold text-lg mb-3">Shipping method</h2>
                <label className="flex items-center justify-between border rounded cursor-pointer p-3 bg-[#F6FBF5]">
                  <span>Standard</span>
                  <span className="font-semibold">FREE</span>
                </label>
              </div>

              <div className="border border-gray-400 mx-4 rounded-lg shadow-sm">
                <div className="bg-[#F6FBF5] border-b flex justify-between items-center p-3 rounded-t-lg">
                  <h3 className="font-medium text-gray-900">Credit card</h3>
                  <span className="bg-[#D6E9D2] text-[#3E5E3A] px-2 py-1 text-sm font-bold rounded">
                    B
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3 relative">
                  <div className="relative">
                    <Field
                      name="cardNumber"
                      placeholder="Card number"
                      className={`border p-3 rounded w-full pr-10 focus:outline-none ${
                        errors.cardNumber && touched.cardNumber
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : "border-gray-400 focus:ring-2 focus:ring-[#9cca81]"
                      }`}
                    />
                    <Lock
                      size={18}
                      className="absolute right-3 top-3 text-gray-400"
                    />
                  </div>
                  <ErrorMessage
                    name="cardNumber"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Field
                        name="expiry"
                        placeholder="Expiration date (MM/YY)"
                        className={`border p-3 rounded w-full focus:outline-none ${
                          errors.expiry && touched.expiry
                            ? "border-red-500 focus:ring-2 focus:ring-red-500"
                            : "border-gray-400 focus:ring-2 focus:ring-[#9cca81]"
                        }`}
                      />
                      <ErrorMessage
                        name="expiry"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="relative">
                      <Field
                        name="cvv"
                        placeholder="Security code"
                        className={`border p-3 rounded w-full focus:outline-none ${
                          errors.cvv && touched.cvv
                            ? "border-red-500 focus:ring-2 focus:ring-red-500"
                            : "border-gray-400 focus:ring-2 focus:ring-[#9cca81]"
                        }`}
                      />
                      <HelpCircle
                        size={18}
                        className="absolute right-3 top-3 text-gray-400"
                      />
                      <ErrorMessage
                        name="cvv"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Field
                      name="nameOnCard"
                      placeholder="Name on card"
                      className={`border p-3 rounded w-full focus:outline-none ${
                        errors.nameOnCard && touched.nameOnCard
                          ? "border-red-500 focus:ring-2 focus:ring-red-500"
                          : "border-gray-400 focus:ring-2 focus:ring-[#9cca81]"
                      }`}
                    />
                    <ErrorMessage
                      name="nameOnCard"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <label className="flex items-center gap-2 bg-[#F6FBF5] p-3 rounded text-sm text-gray-700">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-green-700"
                    />
                    Use shipping address as billing address
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#A3B996] mx-4 text-black w-110 md:w-127 py-3 rounded-lg font-semibold hover:opacity-90 transition mb-5 mt-5"
              >
                {isSubmitting ? "Processing..." : "Pay now"}
              </button>
              <hr className="text-gray-300 w-130 mx-4 " />

              <div className="mt-5">
                <Link to="#" className="mx-4 text-sm text-[#86ad81] underline">
                  Privacy policy
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="hidden md:flex pr-80 pt-[120px] flex-col">
        <div className="flex flex-col gap-4 max-h-[230px] overflow-y-auto pr-2">
          {itemsToCheckout.map((item) => (
            <div key={item.documentId} className="flex items-center gap-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 rounded object-cover border border-gray-300"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                ৳ {item.price_after.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>৳ {subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Estimated Taxes</span>
            <span>৳ {taxes.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-lg my-4">
            <span>Total</span>
            <span>৳ {total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
