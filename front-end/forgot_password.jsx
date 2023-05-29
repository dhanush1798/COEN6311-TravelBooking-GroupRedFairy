'use client'
const ForgotPassword = () => {
  return (
    <>
      <style jsx>{`
        
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
