'use client'
const CreateAccount = () => {
  return (
    <>
      <style jsx>{`
        
        input[type="text"],
        input[type="password"],
        input[type="date"],
        input[type="email"],
        input[type="tel"] {
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

        a {
          text-decoration: none;
          color: #4CAF50;
        }

        p {
          text-align: center;
        }
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
