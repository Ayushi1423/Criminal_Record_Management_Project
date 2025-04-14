"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();
  const router = useRouter();

  const validateSignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (fullName.length < 3) {
      return "Please enter your full name.";
    }
    return null;
  };

  const handleSignUp = async () => {
    const error = validateSignUp();
    if (error) {
      addToast({
        variant: "danger",
        message: error,
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred during registration');
      }

      addToast({
        variant: "success",
        message: "Account created successfully! You can now log in.",
      });
      
      // Redirect to login page
      router.push('/auth/login');
    } catch (error) {
      console.error('Registration error:', error);
      addToast({
        variant: "danger",
        message: error instanceof Error ? error.message : 'An error occurred during registration',
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

          <Column fillWidth paddingX="32" gap="2" horizontal="center" position="relative">
            <Row
              marginY="40"
              background="overlay"
              fillWidth
              radius="xl"
              border="neutral-alpha-weak"
              overflow="hidden"
            >
              <Row fill hide="m">
                <SmartImage 
                  src="/images/login.png" 
                  alt="Criminal Record Management System Signup"
                  sizes="560px"
                  priority
                />
              </Row>
              <Column fillWidth horizontal="center" gap="20" padding="32" position="relative">
                <Heading as="h3" variant="display-default-s" align="center">
                  Create Your Account
                </Heading>
                <Text onBackground="neutral-medium" marginBottom="24">
                  Already have an account?
                  <SmartLink href="/auth/login">Log in</SmartLink>
                </Text>

                <Column gap="-1" fillWidth>
                  <Input
                    id="fullName"
                    label="Full Name"
                    labelAsPlaceholder
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    validate={validateSignUp}
                    errorMessage={false}
                    radius="top"
                  />
                  <Input
                    id="email"
                    label="Email"
                    labelAsPlaceholder
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    validate={validateSignUp}
                    errorMessage={false}
                    radius="none"
                  />
                  <PasswordInput
                    autoComplete="new-password"
                    id="password"
                    label="Password"
                    labelAsPlaceholder
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    validate={validateSignUp}
                    radius="none"
                  />
                  <PasswordInput
                    autoComplete="new-password"
                    id="confirmPassword"
                    label="Confirm Password"
                    labelAsPlaceholder
                    radius="bottom"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    validate={validateSignUp}
                  />
                </Column>
                <Button
                  id="signup"
                  label="Sign Up"
                  arrowIcon
                  fillWidth
                  loading={isLoading}
                  onClick={handleSignUp}
                />
              </Column>
            </Row>
          </Column>
        </Column>
      </Column>
    </Column>
  );
} 