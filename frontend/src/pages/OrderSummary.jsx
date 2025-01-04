import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to format the cost with commas
const formatCost = (cost) => {
  return cost.toLocaleString("en-IN", { style: "currency", currency: "INR" });
};

const OrderSummary = () => {
  const { bookingId } = useParams();
  const [orderSummary, setOrderSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/${bookingId}`
        );
        setOrderSummary(response.data);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.msg || "Error fetching order summary."
        );
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchOrderSummary();
    } else {
      setError("No booking ID provided.");
    }
  }, [bookingId]);

  
  const initiatePayment = async () => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/payments/createPaymentOrder",
        {
          bookingId: bookingId,
          totalCost: orderSummary.totalCost, // Pass total cost from order summary
        }
      );
      const { orderId, amount } = response.data;
  
      const options = {
        key: "rzp_test_Gd862noZ7vPnYB", // Replace with your Razorpay key
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "Occasia Event",
        description: "Event Booking Payment",
        order_id: orderId,
        // handler: function (response) {
        //   // Now sending payment details directly to save them in the database
        //   axios
        //     .post("http://localhost:3000/api/payments/verifyPayment", {
        //       razorpay_order_id: response.razorpay_order_id,
        //       razorpay_payment_id: response.razorpay_payment_id,
        //       amount: response.amount / 100, // Pass amount in INR
        //     })
        //     .then(() => {
        //       toast.success("Payment saved successfully!");
        //     })
        //     .catch(() => {
        //       toast.error("Error saving payment details.");
        //     });
        // },
        prefill: {
          name: orderSummary.user.firstname,
          email: orderSummary.user.email,
          contact: orderSummary.user.phonenumber,
        },
        theme: {
          color: "#007bff",
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(
        "Error initiating payment: " + (error.response?.data?.msg || error.message)
      );
    }
  };

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
          resolve(); // Script already loaded
          return;
        }
  
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Razorpay script"));
        document.body.appendChild(script);
      });
    };
  
    loadRazorpayScript()
      .then(() => {
        console.log("Razorpay script loaded successfully");
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  
  useEffect(() => {
    const checkRazorpay = setInterval(() => {
      if (window.Razorpay) {
        clearInterval(checkRazorpay);
      }
    }, 100);
  
    return () => clearInterval(checkRazorpay);
  }, []);
    
  if (loading) {
    return (
      <p className="text-center text-xl text-gray-600">
        Loading order summary...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">Error: {error}</p>;
  }

  if (!orderSummary) {
    return (
      <p className="text-center text-xl text-gray-500">
        No order summary available.
      </p>
    );
  }

  const { booking, event, venue, guestCount, totalCost } = orderSummary;

  return (
    <div className="w-full h-full p-0 bg-gradient-to-r from-pink-50 via-teal-50 to-blue-50 shadow-xl rounded-xl">
      {/* Page Heading */}
      <div className="text-center mb-8 ">
        <h2 className="text-3xl font-semibold text-blue-700">Your Order Summary</h2>
        <p className="text-lg text-gray-500 mt-2">
          Please review your booking details below.
        </p>
      </div>

      {/* Booking Details Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 max-w-2xl mx-auto">
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Booking ID:</strong> {booking._id}
          </p>
          <p>
            <strong>Event Date:</strong>{" "}
            {new Date(booking.eventDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Event:</strong> {event.eventName}
          </p>
          <p>
            <strong>Event Price:</strong> {formatCost(event.eventPrice)}
          </p>
          <p>
            <strong>Venue:</strong> {venue.venueName}
          </p>
          <p>
            <strong>Venue Cost Per Hour:</strong>{" "}
            {formatCost(venue.costPerHour)}
          </p>
          <p>
            <strong>Total Guests:</strong> {guestCount}
          </p>
          <p>
            <strong>Total Cost:</strong> {formatCost(totalCost)}
          </p>
        </div>
      </div>

      {/* Payment Button Section */}
      <div className="text-center mt-8">
        <button
          onClick={initiatePayment}
          className="bg-blue-600 text-white py-3 px-6 mb-5 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Proceed to Payment
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default OrderSummary;
