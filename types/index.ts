// Constent
export const VENDOR = "vendor";
export const CLIENT = "client";
export const CEO = "ceo";
export const DEVELOPER = "developer";
export const MANAGER = "manager";

export type Role =
  | typeof VENDOR
  | typeof CLIENT
  | typeof CEO
  | typeof DEVELOPER
  | typeof MANAGER;

export interface TicketCreatePayload {
  ticketNo: string;
  subject: string;
  issueType: string;
  priority: string;
  ticketDate: string;
  issueMessage: string;
  status: string;
  userID: string;
  channelID?: string; // Optional field
}

export interface PayrollHistory {
  amount: number;
  bonus: number;
  createdAt: string;
  from: {
    role: "client" | "vendor" | "manager";
    userID: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      position: string[];
      profileImage: string;
      role:
        | "client"
        | "vendorClient"
        | "developer"
        | "vendor"
        | "manager"
        | "ceo";
    };
  };
  isRequested: false;
  paymentDate: string;
  paymentProof: string;
  paymentTitle: string;
  requestDescription: string;
  requestedDate: string;
  status:
    | "requested"
    | "fulfilled"
    | "cancelled"
    | "rejected"
    | "approved"
    | "upcoming";
  to: {
    role: "company" | "developer";
    userID: {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      profileImage: string;
      position: string[];
      role:
        | "client"
        | "vendorClient"
        | "developer"
        | "vendor"
        | "manager"
        | "ceo";
    };
  };
  transactionID: string;
  type: "salary" | "payment";
  updatedAt: string;
  _id: string;
}
