import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true, // Required if using Next.js Images on static hosting
    },
    trailingSlash: true, // Ensures proper routing on GitHub Pages
};

export default nextConfig;
