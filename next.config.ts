import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
  assetPrefix: isProd ? 'https://d2gsv5nutdeogm.cloudfront.net' : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2gsv5nutdeogm.cloudfront.net',
        port: '',
      },
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
