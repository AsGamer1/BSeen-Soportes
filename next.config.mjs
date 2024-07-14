/** @type {import {'next'}".NextConfig"} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  reloadOnOnline: true,
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true
  }
});

export default withPWA({});