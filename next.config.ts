import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'drxgfm74s70w1.cloudfront.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ckokservice.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'imagescdn.gettyimagesbank.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
        port: '',
      },
    ],
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  experimental: {
    nextScriptWorkers: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.ts',
        },
      },
    },
  },
};

export default nextConfig;
