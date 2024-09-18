/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
                port: '',
                pathname: '/VO_nfLYqcOXLb5WCIb9kZg/**'
            }
        ]
    },
    // i18n: {
    //     locales: ['es', 'en', 'pt', 'es-mx'],
    //     defaultLocale: 'es'
    // }
};

export default nextConfig;
