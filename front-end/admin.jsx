'use client'
import Head from 'next/head';

export default function AdminPanel() {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <style jsx>{`
        body {
          background-color: #f2f2f2;
          font-family: "Times New Roman", sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          flex-direction: column;
          overflow: hidden;
        }

        h2 {
          text-align: center;
          margin-top: 0;
        }

        form {
          max-width: 300px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
        }

        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        input[type="submit"] {
          width: 100%;
          padding: 10px;
          background-color: #333;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        a {
          text-decoration: none;
          color: #333;
        }

        p {
          text-align: center;
        }

        header {
          background-color: #f2f2f2;
          color: #fff;
          padding: 10px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
        }

        header img {
          margin-right: 10px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>

      <header>
        <a href="/home.html">
          <img src="/logo.png" alt="Concordia Travel Logo" />
        </a>
      </header>

      <div className="container">
        <h2>Admin Panel</h2>

        <form action="/create_agent" method="post">
          <label htmlFor="agentname">Agent Name:</label>
          <input type="text" id="agentname" name="agentname" required />

          <label htmlFor="email">Email ID:</label>
          <input type="text" id="email" name="email" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <input type="submit" value="Create" />
        </form>
      </div>
    </>
  );
}
