"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getBearerToken, isUserLoggedIn } from "src/shared/cookies";
import axios from "axios";

export default function MenuComponent(props: any) {
  const [isSession, setIsSession] = useState(false);
  const router = useRouter();

  useEffect(() => {
    lol();
  }, [router]);

  const lol = async () => {
    try {
      const e = await isUserLoggedIn();
      console.log(e);
      setIsSession(e);
    } catch (error) {
      setIsSession(false);
    }
  };

  const logoutUser = async () => {
    try {
      const bearer = await getBearerToken();
      if (!bearer || !bearer.token || !bearer.token.value) return;
      const request = await axios.get(
        decodeURI(
          "http://localhost:3000/api/auth/logout?token=" + bearer.token.value
        )
      );
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <></>
    // <Menu>
    //   <MenuButton
    //     as={IconButton}
    //     variant="unstyled"
    //     size="sm"
    //     icon={<HamburgerIcon boxSize={6} />}
    //   ></MenuButton>
    //   <MenuList
    //     borderRadius={0}
    //     padding={0}
    //     border={"1px solid"}
    //     borderColor={"black"}
    //   >
    //     {isSession ? (
    //       <>
    //         <MenuItem
    //           borderBottom={"1px solid"}
    //           borderColor={"black"}
    //           onClick={logoutUser}
    //         >
    //           Logout
    //         </MenuItem>
    //         <MenuItem
    //           borderBottom={"1px solid"}
    //           borderColor={"black"}
    //           onClick={() => router.push("/user")}
    //         >
    //           Profile
    //         </MenuItem>
    //         <MenuItem
    //           borderBottom={"1px solid"}
    //           borderColor={"black"}
    //           onClick={() => router.push("/reminders")}
    //         >
    //           Reminders
    //         </MenuItem>
    //       </>
    //     ) : (
    //       <MenuItem
    //         borderBottom={"1px solid"}
    //         borderColor={"black"}
    //         onClick={() => router.push("/auth/login")}
    //       >
    //         Login
    //       </MenuItem>
    //     )}
    //     <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
    //   </MenuList>
    // </Menu>
  );
}
