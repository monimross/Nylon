import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch } from "react-redux";
import { TransactionsApi } from "../../../api/main/transactions";
import { clearCart, clearOrderShops } from "../../../redux/slices/cart";
import { clearOrder } from "../../../redux/slices/order";

function PayPal({
  createdOrderData,
  payment,
  setCheckoutContent,
  closeDrawer,
}) {
  const dispatch = useDispatch();
  if (!createdOrderData?.price) return "";
  return (
    <PayPalScriptProvider
      options={{
        "client-id": payment?.client_id,
        currency: "USD",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${createdOrderData?.price}`,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            TransactionsApi.create(createdOrderData.id, {
              payment_sys_id: payment.id,
            })
              .then(() => {
                dispatch(clearOrderShops());
                dispatch(clearCart());
                dispatch(clearOrder());
                closeDrawer(false);
                setCheckoutContent("status");
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }}
      />
    </PayPalScriptProvider>
  );
}

export default PayPal;
