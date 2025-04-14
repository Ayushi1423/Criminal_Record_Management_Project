import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from "classnames";

import { style, schema, meta, baseURL, og } from '@/app/resources/config';
import { Background, Column, Flex, ThemeProvider, ToastProvider } from "@/once-ui/components";
import { Meta, Schema } from "@/once-ui/modules";
import { Providers } from './providers';

import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Metadata } from 'next';

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

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

export async function generateMetadata(): Promise<Metadata> {
  // Ensure meta.baseURL in config.ts is the correct production URL (e.g., 'https://yourdomain.com')
  const configuredBaseUrl = meta.baseURL || 'localhost:3000'; // Fallback just in case
  
  // Ensure the base URL has a scheme for use with new URL()
  const getAbsoluteUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Default to http for localhost or if scheme is missing
    return `http://${url}`;
  }

  const baseUrlWithScheme = getAbsoluteUrl(configuredBaseUrl);

  const productionBaseUrl = process.env.NODE_ENV === 'production'
    ? baseUrlWithScheme // Use the corrected configured URL for production
    : 'http://localhost:3000'; // Use localhost for development

  // Use the image defined in og config, default to meta image if not present
  const openGraphImage = og.image || "/images/login.png"; 

  return {
    title: meta.title,
    description: meta.description,
    metadataBase: new URL(productionBaseUrl),
    openGraph: {
      title: og.title || meta.title,
      description: og.description || meta.description,
      url: new URL("/", productionBaseUrl).toString(), // Use the base path for the canonical OG URL
      siteName: schema.name || meta.title, // Use schema name or fallback to meta title
      images: [
        {
          url: new URL(openGraphImage, productionBaseUrl).toString(), // Construct absolute URL
          // You might need to add width and height here if known
        }
      ],
      locale: 'en_US', // Optional: specify locale
      type: meta.type || 'website', // Use type from meta config or default
    },
    // Add other metadata fields like twitter, icons, etc. if needed
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
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
      <Schema
        as="organization"
        title={schema.name}
        description={schema.description}
        baseURL={baseURL}
        path="/"
        image={schema.logo}
      />
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'system';
                  const root = document.documentElement;
                  if (theme === 'system') {
                    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
                  } else {
                    root.setAttribute('data-theme', theme);
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <ThemeProvider>
        <ToastProvider>
          <Providers>
            <Column as="body" fillWidth margin="0" padding="0">
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
          </Providers>
        </ToastProvider>
      </ThemeProvider>
    </Flex>
  );
}