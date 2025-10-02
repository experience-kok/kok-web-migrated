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
      // CDN: Cloud front
      {
        protocol: 'https',
        hostname: 'd2gsv5nutdeogm.cloudfront.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      // S3
      {
        protocol: 'https',
        hostname: 'kok-main-service-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      // S3: ckokservice
      {
        protocol: 'https',
        hostname: 'ckokservice.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
      // KAKAO: 카카오 프로필 이미지
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
