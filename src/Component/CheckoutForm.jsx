import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useAuth } from "../provider/AuthProvider"; // Correct import path

const CheckoutForm = ({ donationAmount, campaignId, onPaymentSuccess }) => {
  const { user } = useAuth(); // Assumes you have an Auth context to get the current user
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const totalPrice = parseFloat(donationAmount);

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: totalPrice, email: user.email })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      })
      .catch(error => {
        console.error('Error fetching client secret:', error);
      });
  }, [axiosSecure, totalPrice, user.email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentMethodError) {
      console.error('Payment method error:', paymentMethodError);
      setError(paymentMethodError.message);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      console.error('Error confirming card payment:', confirmError);
      setError(confirmError.message);
      return;
    }

    axiosSecure.post(`/update-donation/${campaignId}`, { amount: totalPrice, email: user.email })
      .then(response => {
        onPaymentSuccess(response.data.updatedAmount);
      })
      .catch(error => {
        console.error('Error updating donation:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-10 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" disabled={!stripe}>
        Pay
      </button>
      <p className="text-red-400">{error}</p>
    </form>
  );
};

export default CheckoutForm;
