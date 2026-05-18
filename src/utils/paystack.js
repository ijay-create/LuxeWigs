export const payWithPaystack = ({
  email,
  amount,
  onSuccess,
  onClose
}) => {

  if (!window.PaystackPop) {
    alert("Paystack failed to load");
    return;
  }

  if (!email) {
    alert("Email is required");
    return;
  }

  const handler = window.PaystackPop.setup({

    key: "pk_test_a751a2b5600c751cdd22b8e0a841f90748fbeaa3",

    email,

    amount: Number(amount) * 100,

    currency: "NGN",

    ref: "" + Math.floor(Math.random() * 1000000000 + 1),

    metadata: {
      custom_fields: [
        {
          display_name: "LuxeWigs Customer",
          variable_name: "customer_email",
          value: email
        }
      ]
    },

    callback: function (response) {
      console.log("PAYSTACK SUCCESS:", response);

      if (onSuccess) {
        onSuccess(response);
      }
    },

    onClose: function () {
      console.log("PAYSTACK CLOSED");

      if (onClose) {
        onClose();
      }
    }

  });

  handler.openIframe();
};