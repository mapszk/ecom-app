## Ecom-app

This is a self-managed e-commerce website, you can create categories, subcategories and products. Also you can edit your website colors, your logo and a welcome message.

## Configuration

Web's database and auth is provided by Firebase, you can start a firebase project and create `.env.local` to save the keys. Files that use keys are:

1 'util/firebaseClient.js'
2 'util/firebaseServer.js'
3 'pages/api/payment.js'

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).
