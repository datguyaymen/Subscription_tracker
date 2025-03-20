import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      trim: true,
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [100, "Name must be at most 100 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "GBP", "DNT"],
      default: "USD",
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      enum: [
        "Entertainment",
        "Food",
        "Health",
        "Shopping",
        "Transportation",
        "Travel",
        "Utilities",
        "Other",
      ],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required"],
      trim: true,
      enum: [
        "Cash",
        "Credit Card",
        "Debit Card",
        "Mobile Money",
        "PayPal",
        "Other",
      ],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start Date is required"],
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start Date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "Renewal Date must be after Start Date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
  },
  { timestamps: true }
);

//auto-calculating the renewal date
subscriptionSchema,
  pre("save", async function (next) {
    if (!this.renewalDate) {
      const renewalPeriods = {
        daily: 1,
        weekly: 7,
        monthly: 30,
        yearly: 365,
      };
    }
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
    if (this.renewalDate < new Date()) {
      this.status = "expired";
    }
    next(); // Ensure to call next() to proceed with the save operation
  });
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
