import { useEffect, useState } from "react";

const RazorpayCheckout = () => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        if (!window.Razorpay) {
            alert("Razorpay SDK is still loading. Please try again.");
            return;
        }

        setIsLoading(true);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: 50000,

            currency: "INR",

            name: "ArisingBox",

            description: "Test Payment",

            // Your existing Razorpay test order
            order_id: "order_TO8LVUqtdSdhxM",

            prefill: {
                name: "Test Client",
                email: "test@example.com",
                contact: "9876543210",
            },

            theme: {
                color: "#111827",
            },

            handler: function (response) {
                console.log("Payment Successful!");

                console.log(
                    "Payment ID:",
                    response.razorpay_payment_id
                );

                console.log(
                    "Order ID:",
                    response.razorpay_order_id
                );

                console.log(
                    "Signature:",
                    response.razorpay_signature
                );

                setIsLoading(false);

                alert("Payment successful!");
            },
        };

        const razorpay = new window.Razorpay(options);

        razorpay.on("payment.failed", function (response) {
            console.log("Payment Failed:", response);

            setIsLoading(false);

            alert("Payment failed!");
        });

        razorpay.open();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">
                        ArisingBox
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Test Payment
                    </p>
                </div>

                <div className="mb-6 rounded-lg bg-gray-50 p-4">

                    <div className="flex justify-between">
                        <span>Amount</span>

                        <span className="font-semibold">
                            ₹500
                        </span>
                    </div>

                    <div className="mt-2 flex justify-between text-sm text-gray-500">

                        <span>
                            Order ID
                        </span>

                        <span className="truncate ml-4">
                            order_TO8LVUqtdSdhxM
                        </span>

                    </div>

                </div>

                <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading
                        ? "Opening Checkout..."
                        : "Pay ₹500"
                    }
                </button>

                <p className="mt-4 text-center text-xs text-gray-400">
                    Razorpay Test Mode · No real money will be charged
                </p>

            </div>

        </div>
    );
};

export default RazorpayCheckout;