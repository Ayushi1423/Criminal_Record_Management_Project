export const baseURL = "localhost:3000";

// default customization applied to the HTML in the main layout.tsx
export const style = {
  theme: "dark", // dark | light - not needed when using ThemeProvider
  neutral: "gray", // sand | gray | slate
  brand: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  accent: "indigo", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  solid: "contrast", // color | contrast | inverse
  solidStyle: "flat", // flat | plastic
  border: "playful", // rounded | playful | conservative
  surface: "filled", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
} as const;

export const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: 2,
    color: "brand-on-background-weak",
    opacity: 20,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    width: "24",
    height: "24",
    opacity: 100,
  },
} as const;

// default metadata
export const meta = {
  title: "Criminal Record Management System",
  description:
    "A system for managing criminal records.",
  baseURL: "localhost:3000",
  type: "website",

  
} as const;

// default open graph data
export const og = {
  title: meta.title,
  description: meta.description,
  image: "/images/login.png",
} as const;

// default schema data
export const schema = {
  logo: "/images/logo.png",
  type: "Organization",
  name: "Criminal Record Management System",
  description: meta.description,
  email: "main@xsystems.one",
} as const;
