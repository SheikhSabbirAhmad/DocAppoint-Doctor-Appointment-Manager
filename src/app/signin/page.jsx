"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { toast } from "react-toastify";

import Lottie from "lottie-react";
import animationData from "@/lottie/docappoint.json";

export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      toast.error("Invalid email or password. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    if (data) {
      setEmail("");
      setPassword("");

      e.target.reset();

      toast.success("Welcome back! Successfully signed in.", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored",
      });
    }

    console.log({ data, error });
  };

  const handlGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });

      toast.success("Redirecting to Google sign in...", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Google sign in failed. Try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-10 mt-10 flex-wrap">
      
      {/* Lottie Animation */}
      <div className="w-[400px]">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Sign In Card */}
      <Card className="border mx-auto w-125 py-10 px-6">
        <h1 className="text-center text-2xl font-bold">Login Now</h1>

        <Form
          autoComplete="off"
          className="flex w-96 mx-auto flex-col gap-4"
          onSubmit={onSubmit}
        >
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>

            <Input
              autoComplete="off"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>

            <Input
              autoComplete="new-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          <div className="flex gap-2">
            <Button type="submit">
              <Check />
              Submit
            </Button>

            <Button
              type="reset"
              variant="secondary"
              onClick={() => {
                setEmail("");
                setPassword("");
              }}
            >
              Reset
            </Button>
          </div>
        </Form>

        <p className="text-center my-3">Or</p>

        <Button
          onClick={handlGoogleSignIn}
          variant="outline"
          className={"w-full"}
        >
          <GrGoogle /> Sign In With Google
        </Button>

        {/* Register Link */}
        <p className="text-center mt-5 text-[18px]">
          Don't Have An Account ?{" "}
          <Link
            href="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}