/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_URL: "https://api.goshops.org",
    IMG_URL: "",
    API_ADMIN_URL: "https://admin.goshops.org/login",
    BASE_URL: "https://goshops.org",
    MAP_KEY: "AIzaSyDZQUsmwnkCmD3HMNFCABo8YSE54FCTFYo",
    SITE_KEY: "6LcHmFQmAAAAAAGlVQYO5yto8C1yOfLi40DudLMY",
    DEFAULT_LOCATION: `${40.409264},${49.867092}`,
    API_KEY: "AIzaSyCuDSljHjF4pKT9yJWtnJgsCXf6rxi40Tg",
    AUTH_DOMAIN: "goshops-7c405.firebaseapp.com",
    PROJECT_ID: "goshops-7c405",
    STORAGE_BUCKET: "goshops-7c405.appspot.com",
    MESSAGING_SENDER_ID: "732738074097",
    APP_ID: "1:732738074097:web:de58947609d53efc6fc050",
    MEASUREMENT_ID: "G-SK0FJ6BCPH",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      "pk_test_51LaGXyLrMlc0ddAAYc8wxwq8eFj9HbgpvValjxRtg2OZzTJDwFz0ZmATL1TOqAWUFBM3CeHbI5Cny71MzkrAXRxa00XTCJArPr",
    STRIPE_SECRET_KEY:
      "sk_test_51LaGXyLrMlc0ddAAFGTcyYkpVuaASL6XyY0djSEbnbhjFmaD51n1SL7hakh7UkjubMnykJ1wrH15QfbEWN7byuIG00kMcA2yxg",
  },
};

module.exports = nextConfig;
