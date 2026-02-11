import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuoteRequest {
    createdBy: string;
    windowNumber: bigint;
    zipCode: bigint;
    address: string;
    notes?: string;
    lastName: string;
    firstName: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllQuoteRequests(): Promise<Array<QuoteRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isMaintenanceMode(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setMaintenanceMode(mode: boolean): Promise<void>;
    submitQuoteRequest(request: QuoteRequest): Promise<void>;
}
