'use client';

import React from 'react';
import classNames from "classnames";
import { style, schema, baseURL } from '@/app/resources/config';
import { Background, Column, Flex } from "@/once-ui/components";
import { Schema } from "@/once-ui/modules";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const primary = Geist({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;

export default function MainLayout({ 
  children, 
  title 
}: { 
  children: React.ReactNode, 
  title?: string 
}) {
  return (
    <Flex
      as="div"
      fillHeight
      background="page"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-border={style.border}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-surface={style.surface}
      data-transition={style.transition}
      data-scaling={style.scaling}
      className={classNames(
        primary.variable,
        code.variable,
        secondary ? secondary.variable : "",
        tertiary ? tertiary.variable : "",
      )}
    >
      {title && (
        <title>{title || schema.name}</title>
      )}
      <Schema
        as="organization"
        title={schema.name}
        description={schema.description}
        baseURL={baseURL}
        path="/"
        image={schema.logo}
      />
      <Column as="div" fillWidth margin="0" padding="0">
        <Background
          position="absolute"
          mask={{
            x: 100,
            y: 0,
            radius: 100,
          }}
          gradient={{
            display: true,
            x: 100,
            y: 60,
            width: 70,
            height: 50,
            tilt: -40,
            opacity: 90,
            colorStart: "accent-background-strong",
            colorEnd: "page-background",
          }}
          grid={{
            display: true,
            opacity: 100,
            width: "0.25rem",
            color: "neutral-alpha-medium",
            height: "0.25rem",
          }}
        />
        {children}
      </Column>
    </Flex>
  );
} 