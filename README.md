Credits: This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

#### To Run The Project Locally(After setting up the project)


To run the development server using:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## Setup
Copy the **.env.example** as **.env** file And add the environment variable shown there.

### **Getting JWT Secret**
You can generate a secure JWT secret using OpenSSL with the following command:
```bash
openssl rand -base64 32
```
Or if you prefer a manually generated secret, you can "spam the keyboard" and get one and add it in env 

### Download the dependencies
Run following command
```bash
npm install
```

### **Run the Project**
Ensure your Firebase setup is complete and start the development server:
```bash
npm run dev
```
Now your app should be connected to Firebase!



## Assumptions


## Additional features


#### Build with Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

#### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
