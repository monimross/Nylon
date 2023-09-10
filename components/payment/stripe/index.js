import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { TransactionsApi } from "../../../api/main/transactions";
import { useDispatch } from "react-redux";
import { clearCart, clearOrderShops } from "../../../redux/slices/cart";
import { clearOrder } from "../../../redux/slices/order";
const CheckoutForm = ({
  paymentIntent,
  paymentId,
  setOpen,
  setCheckoutContent,
  closeDrawer,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-result",
      },
      redirect: "if_required",
    });
    if (result.paymentIntent?.status === "succeeded") {
      TransactionsApi.create(parseInt(paymentIntent?.metadata?.order_id), {
        payment_sys_id: paymentId,
      })
        .then((res) => {
          console.log(res);
          dispatch(clearOrderShops());
          dispatch(clearCart());
          dispatch(clearOrder());
          setCheckoutContent("status");
          closeDrawer(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toast.error(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="row">
        <button className="btn-success mt-17" disabled={!stripe}>
          Submit
        </button>
        <button type="button" className="btn-dark mt-17" onClick={setOpen}>
          Pay later
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
