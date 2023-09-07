export interface AuthUser {
  _id: string;
  email: string;
  phone: string;
  displayName?: string;
  picture?: string;
}

export interface Authenticate {
  authUser: AuthUser | null;
  loadingAuthUser: boolean;
  signInUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  signUpUserWithEmailAndPassword: (
    email: string,
    phonenumber: string,
    password: string
  ) => Promise<void>;
  updateUserById: (
    _id: string,
    displayName: string,
    picture: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
}
