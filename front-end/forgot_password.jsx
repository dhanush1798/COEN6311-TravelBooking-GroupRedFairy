'use client'
const ForgotPassword = () => {
  return (
    <>
      <style jsx>{`
        
        body {
          background-color: #f2f2f2;
          font-family: "Times New Roman", sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          flex-direction: column;
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

        input[type="email"],
        input[type="date"] {
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
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        p {
          text-align: center;
        }
        
      `}</style>

      <div className="container">
        <h2>Forgot Password</h2>

        <form action="/agent-reset-password" method="post">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" required />

          <input type="submit" value="Reset Password" />
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
