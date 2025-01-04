import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const { bookingId } = useParams(); // Get booking ID from URL params
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(0); // Amount in INR
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/payments/createPaymentOrder",
          { bookingId }
        );
        const { orderId, amount } = response.data; // Backend should return Razorpay order ID and amount
        setOrderId(orderId);
        setAmount(amount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Failed to fetch payment details. Please try again.");
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchOrderDetails();
    }
  }, [bookingId]);

  const initiatePayment = () => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }

    const options = {
      key: "rzp_test_Gd862noZ7vPnYB", // Replace with your Razorpay test/live key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Occasia Event",
      description: "Event Booking Payment",
      order_id: orderId, // Razorpay order ID
      handler: async (response) => {
        try {
          await axios.post("http://localhost:3000/api/payments/verifyPayment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          toast.success("Payment successful!");
        } catch (error) {
          console.error("Payment verification failed:", error);
          toast.error("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: { color: "#007bff" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="payment-container w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-r from-pink-50 via-teal-50 to-blue-50">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
      {loading ? (
        <p className="text-lg text-gray-600">Loading payment details...</p>
      ) : (
        <div className="payment-summary bg-white p-6 rounded-lg shadow-md max-w-md">
          <h3 className="font-semibold text-lg">Booking ID: {bookingId}</h3>
          <p className="text-gray-700 mt-2">
            Total Amount: ₹{amount.toFixed(2)}
          </p>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            onClick={initiatePayment}
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
