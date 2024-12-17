"use client";
import { useEffect, useState } from "react";
import { getAllUsers } from "../actions/user-actions";
import { RecombeeUser } from "../types";
import { useLocalStorage } from "@uidotdev/usehooks";

type Props = { loadAllUsers?: boolean } | undefined;

export const useUserData = (
  { loadAllUsers }: Props = { loadAllUsers: false }
) => {
  const [users, setUsers] = useState<RecombeeUser[]>([]);
  const [mainUser, setMainUser] = useLocalStorage<RecombeeUser>(
    "userData",
    undefined
  );

  const changeUser = (id: string) => {
    const foundUser = users.find((u) => u.userId === id);
    if (!foundUser) return;

    setMainUser(foundUser);
  };

  useEffect(() => {
    (async () => {
      let requestedUsers: RecombeeUser[] = [];

      if (loadAllUsers) {
        requestedUsers = await getAllUsers();
        setUsers(requestedUsers);
      }

      if (!mainUser) {
        setMainUser(requestedUsers[0]);
      }
    })();
  }, []);

  return { mainUser, users, changeUser };
};
