'use client';

import React from 'react';
import { Column, Row, Background } from '@/once-ui/components';
import MainLayout from './MainLayout';

interface CriminalsLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function CriminalsLayout({ children, title }: CriminalsLayoutProps) {
  return (
    <MainLayout title={title}>
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
                  {children}
                </Column>
              </Row>
            </Column>
          </Column>
        </Column>
      </Column>
    </MainLayout>
  );
} 