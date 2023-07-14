"use client";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

export default function LogIn() {
  const router = useRouter();

  const signInUser = async () => {
    try {
      const request = await axios.post("http://localhost:3000/api/auth/login", {
        email: "fatso@gmail.com",
        password: "kkman123",
      });
      if (request.data.token) {
        router.push("/");
      }
    } catch (error) {}
  };

  return (
    <div>
      <Button onClick={() => signInUser()}>
        Login <ExternalLinkIcon mx="2px" />
      </Button>
    </div>
  );
}
