import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IndianRupee, Copy, CheckCircle2, ArrowLeft, Shield, QrCode } from "lucide-react";
import upiQrImage from "@/assets/upi-qr.jpg";

const planDetails: Record<string, { name: string; price: string; amount: number }> = {
  premium: { name: "Premium Plan", price: "₹99/month", amount: 99 },
  salon: { name: "Salon Partner Plan", price: "₹499/month", amount: 499 },
  facescan: { name: "AI Face Scan", price: "₹2", amount: 2 },
  booking: { name: "Booking Service Fee", price: "₹2", amount: 2 },
};

const UPI_ID = "9044506803@naviaxis";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planId = searchParams.get("plan") || "premium";
  const plan = planDetails[planId] || planDetails.premium;
  const returnTo = searchParams.get("return") || "/";

  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "verifying" | "success">("pending");

  const copyUPI = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentDone = () => {
    setPaymentStatus("verifying");
    setTimeout(() => {
      setPaymentStatus("success");
      setTimeout(() => {
        navigate(returnTo);
      }, 2000);
    }, 2000);
  };

  const openUPIApp = () => {
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=Zarkobit&am=${plan.amount}&cu=INR&tn=${encodeURIComponent(plan.name)}`;
    window.location.href = upiLink;
  };

  if (paymentStatus === "success") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">Payment Successful!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {plan.name} has been activated. Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mx-auto max-w-lg">
        {/* Order summary */}
        <div className="rounded-2xl bg-card p-6 gold-border mb-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Payment Details</h2>
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div>
              <p className="text-sm font-medium text-foreground">{plan.name}</p>
              <p className="text-xs text-muted-foreground">One-time payment via UPI</p>
            </div>
            <span className="font-display text-2xl font-bold gold-gradient-text">{plan.price}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>100% Secure Payment • Instant Activation</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="rounded-2xl bg-card p-6 gold-border mb-6 text-center">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Scan QR Code to Pay</h3>
          <div className="mx-auto mb-4 w-64 h-64 rounded-xl overflow-hidden bg-white p-2">
            <img
              src={upiQrImage}
              alt="UPI QR Code"
              className="h-full w-full object-contain"
            />
          </div>

          {/* UPI ID */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">UPI ID:</span>
            <code className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-mono text-foreground">
              {UPI_ID}
            </code>
            <button
              onClick={copyUPI}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary hover:bg-secondary/80"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Amount */}
          <div className="rounded-xl bg-primary/10 p-3 mb-4">
            <p className="text-xs text-muted-foreground">Amount to pay</p>
            <p className="font-display text-3xl font-bold gold-gradient-text">₹{plan.amount}</p>
          </div>

          {/* UPI App button */}
          <button
            onClick={openUPIApp}
            className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90 mb-3"
          >
            <IndianRupee className="inline h-4 w-4 mr-1" />
            Pay with UPI App
          </button>

          {/* I've paid button */}
          <button
            onClick={handlePaymentDone}
            disabled={paymentStatus === "verifying"}
            className="w-full rounded-full border border-primary/30 py-3 text-sm font-medium text-foreground hover:bg-secondary disabled:opacity-50"
          >
            {paymentStatus === "verifying" ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                Verifying Payment...
              </span>
            ) : (
              "I've Completed Payment ✓"
            )}
          </button>
        </div>

        {/* Instructions */}
        <div className="rounded-xl bg-card p-4">
          <h4 className="text-sm font-medium text-foreground mb-2">How to Pay</h4>
          <ol className="space-y-2 text-xs text-muted-foreground">
            <li className="flex gap-2"><span className="font-bold text-primary">1.</span> Scan the QR code or copy the UPI ID</li>
            <li className="flex gap-2"><span className="font-bold text-primary">2.</span> Open any UPI app (GPay, PhonePe, Paytm)</li>
            <li className="flex gap-2"><span className="font-bold text-primary">3.</span> Pay ₹{plan.amount} to the UPI ID</li>
            <li className="flex gap-2"><span className="font-bold text-primary">4.</span> Click "I've Completed Payment" button</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Payment;
