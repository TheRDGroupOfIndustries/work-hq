import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface PaymentDBTypes {
  paymentTitle: string; // Title of the payment
  status: "requested" | "fulfilled" | "cancelled" | "rejected" | "approved" | "upcoming"; // Enum of possible statuses
  type: "salary" | "payment"; // Type of payment
  from: {
    role: "client" | "vendor" | "manager"; // Role of the sender
    userID: Schema.Types.ObjectId; // Reference to the sender's user ID
  };
  amount: number; // Amount of the payment
  transactionID?: string; // Optional transaction ID
  paymentProof?: string; // Optional proof of payment
  to: {
    role: "company" | "developer"; // Role of the recipient
    userID?: Schema.Types.ObjectId; // User ID of recipient (required if type is "salary")
  };
  paymentDate?: Date; // Payment date (only applicable if status is "fulfilled")
  requestedDate?: Date; // Date when payment was requested
  bonus?: number; // Applicable only for "salary" type
  requestDescription?: string; // Description, only applicable for "requested" status
}

// Define the schema
const paymentSchema = new Schema<PaymentDBTypes>(
  {
    paymentTitle: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["requested", "fulfilled", "cancelled", "rejected", "approved", "upcoming"],
    },
    type: { type: String, required: true, enum: ["salary", "payment"] },
    from: {
      role: { type: String, required: true, enum: ["client", "vendor", "manager"] },
      userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    amount: { type: Number, required: true },
    transactionID: { type: String },
    paymentProof: { type: String },
    to: {
      role: { type: String, required: true, enum: ["company", "developer"] },
      userID: { type: Schema.Types.ObjectId, ref: "User" }, // Conditional on type being "salary"
    },
    paymentDate: { type: Date },
    requestedDate: { type: Date },
    bonus: { type: Number }, // Optional
    requestDescription: { type: String }, // Optional
  },
  { timestamps: true }
);

// Export the model
const Payment =
  models && (models.Payment || model<PaymentDBTypes>("Payment", paymentSchema));

export default Payment;