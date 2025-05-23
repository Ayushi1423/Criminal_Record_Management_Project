"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  Heading,
  Text,
  Button,
  Input,
  PasswordInput,
  Row,
  Column,
  Background,
  SmartLink,
  useToast,
  SmartImage,
} from "@/once-ui/components";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = 'force-dynamic';

// Create a client component that uses useSearchParams
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  const { status } = useSession();
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const validateLogin = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return "Email and / or password is invalid.";
    }
    return null;
  };

  const handleLogin = async () => {
    const error = validateLogin();
    if (error) {
      addToast({
        variant: "danger",
        message: error,
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (result?.error) {
        addToast({
          variant: "danger",
          message: "Invalid email or password",
        });
        console.error("Login error:", result.error);
      } else if (result?.url) {
        addToast({
          variant: "success",
          message: "Login successful!",
        });
        // Use the URL provided by NextAuth for redirection
        router.push(result.url);
      } else {
        // Fallback to manual redirect
        addToast({
          variant: "success",
          message: "Login successful! Redirecting...",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      addToast({
        variant: "danger",
        message: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Column fillWidth paddingY="80" paddingX="l" horizontal="center" flex={1}>
      <Column
        fillWidth
        horizontal="center"
        gap="48"
        radius="xl"
        paddingTop="80"
        position="relative"
      >
        <Column
          overflow="hidden"
          as="main"
          maxWidth="l"
          position="relative"
          radius="xl"
          horizontal="center"
          border="neutral-alpha-weak"
          fillWidth
        >
          <Background
            mask={{
              x: 80,
              y: 0,
              radius: 100,
            }}
            position="absolute"
            gradient={{
              display: true,
              tilt: -35,
              height: 50,
              width: 75,
              x: 100,
              y: 40,
              colorStart: "accent-solid-medium",
              colorEnd: "static-transparent",
            }}
          />
          <Background
            mask={{
              x: 100,
              y: 0,
              radius: 100,
            }}
            position="absolute"
            gradient={{
              display: true,
              opacity: 100,
              tilt: -35,
              height: 20,
              width: 120,
              x: 120,
              y: 35,
              colorStart: "brand-solid-strong",
              colorEnd: "static-transparent",
            }}
          />

          <Column fillWidth paddingX="32" gap="2" horizontal="center" position="relative" zIndex={1}>
            <Row
              marginY="40"
              background="overlay"
              fillWidth
              radius="xl"
              border="neutral-alpha-weak"
              overflow="hidden"
            >
              <Row fill hide="m">
                <SmartImage src="/images/login.png" alt="Criminal Record Management System Login" sizes="560px" />
              </Row>
              <Column fillWidth horizontal="center" gap="20" padding="32" position="relative">
                <Heading as="h3" variant="display-default-s" align="center">
                  Welcome to Criminal Record Management System
                </Heading>
                <Text onBackground="neutral-medium" marginBottom="24">
                  Don't have an account?
                  <SmartLink href="/auth/signup">Sign up</SmartLink>
                </Text>

                <Column gap="-1" fillWidth>
                  <Input
                    id="email"
                    label="Email"
                    labelAsPlaceholder
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    validate={validateLogin}
                    errorMessage={false}
                    radius="top"
                  />
                  <PasswordInput
                    autoComplete="current-password"
                    id="password"
                    label="Password"
                    labelAsPlaceholder
                    radius="bottom"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    validate={validateLogin}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin();
                      }
                    }}
                  />
                </Column>
                <Button
                  id="login"
                  label="Log in"
                  arrowIcon
                  fillWidth
                  loading={isLoading}
                  onClick={handleLogin}
                />
              </Column>
            </Row>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}

// Create a loading fallback for Suspense
function LoginLoading() {
  return (
    <Column fillWidth paddingY="80" paddingX="l" horizontal="center" flex={1}>
      <Column
        fillWidth
        horizontal="center"
        gap="48"
        radius="xl"
        paddingTop="80"
        position="relative"
      >
        <Text>Loading login form...</Text>
      </Column>
    </Column>
  );
}

// Export the main page component with Suspense
export default function Login() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}