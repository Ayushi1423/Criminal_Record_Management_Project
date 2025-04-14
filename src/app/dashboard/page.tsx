"use client";

import React from "react";
import {
  Heading,
  Text,
  Row,
  Column,
  Background,
  Button,
} from "@/once-ui/components";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
  };

  return (
    <Column fillWidth paddingY="40" paddingX="l" horizontal="center" flex={1}>
      <Column
        fillWidth
        horizontal="center"
        gap="48"
        radius="xl"
        paddingTop="40"
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
          <Column fillWidth paddingX="32" gap="2" horizontal="center" position="relative">
            <Row
              marginY="40"
              background="overlay"
              fillWidth
              radius="xl"
              border="neutral-alpha-weak"
              overflow="hidden"
            >
              <Column fillWidth horizontal="center" gap="20" padding="32" position="relative">
                <Heading as="h3" variant="display-default-s" align="center">
                  Criminal Record Management Dashboard
                </Heading>
                <Text onBackground="neutral-medium" marginBottom="12">
                  Welcome to your dashboard, {session?.user?.name || session?.user?.email}. Here you can manage criminal records and perform various operations.
                </Text>

                <Row fillWidth gap="16" wrap>
                  <Button
                    label="View Records"
                    variant="primary"
                    fillWidth
                    onClick={() => router.push('/criminals')}
                  />
                  <Button
                    label="Add New Record"
                    variant="secondary"
                    fillWidth
                    onClick={() => router.push('/criminals/add')}
                  />
                  <Button
                    label="Search Records"
                    variant="tertiary"
                    fillWidth
                    onClick={() => router.push('/criminals/search')}
                  />
                </Row>
                
                <Button
                  label="Logout"
                  variant="danger"
                  fillWidth
                  onClick={handleLogout}
                  style={{ marginTop: '20px' }}
                />
              </Column>
            </Row>
          </Column>
        </Column>
      </Column>
    </Column>
  );
} 