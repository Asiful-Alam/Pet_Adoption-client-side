import Navbar from './Navbar';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const donationAmount = searchParams.get('amount');
    const campaignId = searchParams.get('id');

    return (
        <div>
            <Navbar />
            <div>
                <h2>Payment</h2>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm donationAmount={donationAmount} campaignId={campaignId} onPaymentSuccess={(updatedAmount) => {
                    // handle post-payment success actions, if any
                    console.log(`Donation successful! New donated amount: $${updatedAmount}`);
                }} />
            </Elements>
        </div>
    );
};

export default Payment;
