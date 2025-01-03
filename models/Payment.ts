import { Schema, model, models } from "mongoose";

export interface PaymentDBTypes {
  paymentTitle: string;
  projectID: Schema.Types.ObjectId;
  isRequested: boolean;
  status:
    | "requested"
    | "fulfilled"
    | "cancelled"
    | "rejected"
    | "approved"
    | "upcoming";
  type: "salary" | "payment";
  from: {
    role: "client" | "vendor" | "manager";
    userID: Schema.Types.ObjectId;
  };
  amount: number;
  transactionID?: string;
  paymentProof?: string;
  to: {
    role: "company" | "developer";
    userID?: Schema.Types.ObjectId;
  };
  paymentDate?: Date;
  requestedDate?: Date;
  bonus?: number;
  requestDescription?: string;
}

const paymentSchema = new Schema<PaymentDBTypes>(
  {
    paymentTitle: { type: String, required: true },
    projectID: { type: Schema.Types.ObjectId, ref: "User", required: false },
    isRequested: { type: Boolean, required: false, default: false },
    status: {
      type: String,
      required: true,
      enum: [
        "requested",
        "fulfilled",
        "cancelled",
        "rejected",
        "approved",
        "upcoming",
      ],
    },
    type: { type: String, required: true, enum: ["salary", "payment"] },
    from: {
      role: {
        type: String,
        required: true,
        enum: ["client", "vendor", "manager"],
      },
      userID: { type: Schema.Types.ObjectId, ref: "User", },
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
