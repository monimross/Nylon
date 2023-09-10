import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./stripe";
import PayPal from "./paypal";
import CustomDrawer from "../drawer";

export default function CreatePayment({
  open,
  data,
  paymentId,
  setOpen,
  payment,
  createdOrderData,
  setCheckoutContent,
  closeDrawer,
}) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const options = {
    clientSecret: `${data?.paymentIntent.client_secret}`,
  };
  return (
    <div>
      <CustomDrawer title="Stripe payment" open={open} setOpen={setOpen}>
        <div className="payment-wrapper">
          {payment?.tag === "paypal" && (
            <PayPal
              payment={payment}
              setCheckoutContent={setCheckoutContent}
              createdOrderData={createdOrderData}
              closeDrawer={closeDrawer}
            />
          )}
          {payment?.tag === "stripe" && data && (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                paymentId={paymentId}
                paymentIntent={data?.paymentIntent}
                closeDrawer={closeDrawer}
                setOpen={setOpen}
                setCheckoutContent={setCheckoutContent}
              />
            </Elements>
          )}
        </div>
      </CustomDrawer>
    </div>
  );
}
