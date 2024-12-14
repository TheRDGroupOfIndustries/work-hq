// Constent
export const VENDOR = "vendor";
export const CLIENT = "client";
export const CEO = "ceo";
export const DEVELOPER = "developer";
export const MANAGER = "manager";

export type Role = typeof VENDOR | typeof CLIENT | typeof CEO | typeof DEVELOPER | typeof MANAGER;

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