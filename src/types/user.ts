
export type Image = {
  url : string,
  note? : string,
  report : string,
}
export type User = {
    displayName?: string,
    email: string,
    photoURL?: string,
    emailVerified: boolean,
    uid: string,
    providerId?: string,
    points?: number,
    images : Image[],
  };
  export type UpdatUser = {
    displayName?: string,
    email?: string,
    photoURL?: string,
    emailVerified?: boolean,
    uid?: string,
    providerId?: string,
    points?: number,
    images : Image[],
  }

  export type UserData = {
    uid: string,
    email: string,
    displayName: string,
    photoURL: string,
    emailVerified: boolean,
    providerData? : [
        {
            providerId: string,
        }
    ],
  };