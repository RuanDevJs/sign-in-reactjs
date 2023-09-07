import { useEffect, useState } from "react";
import { auth, database } from "../services/firebase";
import { useNavigate } from "react-router-dom";

import { AuthUser, Authenticate } from "../@types/AuthUser";

export function useAuthenticate(): Authenticate {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState<AuthUser | null>({} as AuthUser);
  const [loadingAuthUser, setLoadingAuthUser] = useState<boolean>(true);

  const userRef = database.ref("Users");

  async function verifyIfUserExistsById(_id: string): Promise<boolean> {
    const userExists = (await userRef.child(`/${_id}`).get()).exists();
    return userExists;
  }

  async function getUserInDataBaseById(id: string): Promise<AuthUser> {
    const userFromDataBase = (await (
      await userRef.child(`/${id}`).get()
    ).val()) as AuthUser;

    return userFromDataBase;
  }

  function validIfUserIsSignedIn() {
    setLoadingAuthUser(true);
    auth.onAuthStateChanged(async (user) => {
      if (user && user.email && user.uid) {
        const userFromDataBase = await (
          await userRef.child(`/${user.uid}`).get()
        ).val();

        setAuthUser({
          ...userFromDataBase,
          _id: user.uid,
        });
        setLoadingAuthUser(false);
      } else {
        setAuthUser(null);
        setLoadingAuthUser(false);
      }
    });
  }

  async function signInUserWithEmailAndPassword(
    email: string,
    password: string
  ) {
    setLoadingAuthUser(true);
    try {
      const authenticatedUser = await (
        await auth.signInWithEmailAndPassword(email, password)
      ).user;

      if (authenticatedUser !== null && authenticatedUser.uid) {
        const userFromDataBase = await getUserInDataBaseById(
          authenticatedUser.uid
        );
        setAuthUser({
          ...userFromDataBase,
          _id: authenticatedUser.uid,
        });
      }
      setLoadingAuthUser(false);
    } catch (error) {
      console.debug(error);

      setAuthUser(null);
      setLoadingAuthUser(false);
      throw new Error("E-mail ou senha do usuário está incorreto!");
    }
  }

  async function signUpUserWithEmailAndPassword(
    email: string,
    password: string,
    phonenumber: string
  ) {
    setLoadingAuthUser(true);
    try {
      const authenticatedUser = await (
        await auth.createUserWithEmailAndPassword(email, password)
      ).user;

      if (authenticatedUser && authenticatedUser.email) {
        userRef.child(`/${authenticatedUser.uid}`).set({
          _id: authenticatedUser.uid,
          email: authenticatedUser.email,
          phone: phonenumber,
          displayName: "",
          picture: "",
        });
        setAuthUser({
          _id: authenticatedUser.uid,
          email: authenticatedUser.email,
          phone: phonenumber,
          displayName: "",
          picture: "",
        });
        setLoadingAuthUser(false);
        navigate("/finish");
      }
    } catch (error) {
      setAuthUser(null);
      setLoadingAuthUser(false);
      throw new Error("Senha deve contever no mínimo 6 caracteres");
    }
  }

  async function updateUserById(
    _id: string,
    displayName: string,
    picture: string
  ) {
    setLoadingAuthUser(true);

    try {
      const userExits = await verifyIfUserExistsById(_id);

      if (userExits) {
        const userFromDataBase = (await (
          await userRef.child(`/${_id}`).get()
        ).val()) as AuthUser;

        await userRef.child(`/${_id}`).update({
          displayName: displayName,
          picture: picture,
        });

        setAuthUser({
          _id: _id,
          email: userFromDataBase.email,
          phone: userFromDataBase.phone,
          displayName: displayName,
          picture: picture,
        });

        setLoadingAuthUser(false);
        navigate("/");
      }
    } catch (error) {
      setAuthUser(null);
      setLoadingAuthUser(false);
      throw new Error("E-mail ou senha do usuário está incorreto!");
    }
  }

  async function signOut() {
    await auth.signOut();

    setAuthUser(null);
    navigate("/");
  }

  useEffect(validIfUserIsSignedIn, []);

  return {
    signInUserWithEmailAndPassword,
    signUpUserWithEmailAndPassword,
    updateUserById,
    signOut,
    authUser,
    loadingAuthUser,
  };
}
