import 'dotenv/config';

const config = {
      port: process.env.PORT || 3000,
      icon: {
        url:process.env.ICON_URL,
        apiKey: process.env.ICON_API_KEY,},
        app: {
          secretKey: process.env.SECRET_KEY,
          dbUrl: process.env.DB_URL,
        },
}

export const jph={
  url: process.env.JPH_URL,
}

export default config;
