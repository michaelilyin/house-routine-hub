export interface Authorization {
  displayName: string | null | undefined;
  email: string | null | undefined;
  phoneNumber: string | null | undefined;
  photoURL: string | null | undefined;
  providerId: string;
  uid: string;
}
