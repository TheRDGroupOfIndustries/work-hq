import { Schema, model, models } from "mongoose";

// Define the TypeScript interface
export interface PaymentInfoDBTypes {
  qrCode?: string; // Optional QR Code for payment
  ifsc: string; // IFSC code of the bank
  accountNo: string; // Account number
  upiID?: string; // Optional UPI ID
  phoneNo?: string; // Optional phone number
  bankName: string; // Name of the bank
  userID?: Schema.Types.ObjectId; // Optional user ID (not required for company)
  isCompanyDetail: boolean; // Flag to indicate if the details are for a company
}

// Define the schema
const paymentInfoSchema = new Schema<PaymentInfoDBTypes>(
  {
    qrCode: { type: String },
    ifsc: { type: String, required: true },
    accountNo: { type: String, required: true },
    upiID: { type: String },
    phoneNo: { type: String },
    bankName: { type: String, required: true },
    userID: { type: Schema.Types.ObjectId, ref: "User" },
    isCompanyDetail: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// Export the model
const PaymentInfo =
  models && (models.PaymentInfo || model<PaymentInfoDBTypes>("PaymentInfo", paymentInfoSchema));

export default PaymentInfo;