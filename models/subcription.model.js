import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 100,
  },
  price: {
    type:Number,
    required: true,
    min: [0, 'Price must be a greater than zero'],

  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP', 'INR'],
    default: 'INR',
  },
  frequency: {
    type: String,
    enum:['daily', 'weekly', 'monthly', 'yearly'],

    default: 'monthly',
  },
  category: {
    type: String,
    enum: ["sports", "news", "entertainment", "education", "health", "technology", "lifestyle", "others"],
    default: "entertainment",
  },
  paymentMethod: {
    type: String,
    enum: ["credit_card", "debit_card", "paypal", "bank_transfer"],
    default: "credit_card",
    required: true,
    trim: true,
  },
    status: {
        type: String,
        enum: ["active", "inactive", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (v) {
                return v <= new Date();
            },
            message: (props) => `${props.value} is not a valid start date!`,
        },
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (v) {
                return v > this.startDate;
            },
            message: (props) => `${props.value} is not a valid renewal date!`,
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
}, { timestamps: true });


subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renealPeriod = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renealPeriod[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = "expired";
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;