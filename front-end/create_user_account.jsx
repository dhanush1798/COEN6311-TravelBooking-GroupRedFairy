'use client'
const CreateAccount = () => {
  return (
    <>
      <style jsx>{`

        
      `}</style>

      <div className="container">
        <h2>Create Account</h2>

        <form action="/signup" method="post">
          <div className="form-row">
            <label htmlFor="firstName">First Name:</label>
            <label htmlFor="lastName">Last Name:</label>
          </div>

          <div className="form-row">
            <input type="text" id="firstName" name="firstName" required />
            <input type="text" id="lastName" name="lastName" required />
          </div>

          <div className="form-row">
            <label htmlFor="dob">Date of Birth:</label>
            <label htmlFor="phone">Phone Number:</label>
          </div>

          <div className="form-row">
            <input type="date" id="dob" name="dob" required />
            <input type="tel" id="phone" name="phone" required />
          </div>

          <label htmlFor="email">Email ID:</label>
          <input type="email" id="email" name="email" required />

          <div className="form-row">
            <label htmlFor="password">Password:</label>
            <label htmlFor="confirmPassword">Confirm Password:</label>
          </div>

          <div className="form-row">
            <input type="password" id="password" name="password" required />
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </div>

          <div className="form-row">
            <label htmlFor="state">State:</label>
            <label htmlFor="city">City:</label>
          </div>

          <div className="form-row">
            <input type="text" id="state" name="state" required />
            <input type="text" id="city" name="city" required />
          </div>

          <label htmlFor="country">Country:</label>
          <input type="text" id="country" name="country" required />

          <input type="submit" value="Create Account" />

          <p>
            Already have an account? <a href="/front-end/user_login.html">Login</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default CreateAccount;
