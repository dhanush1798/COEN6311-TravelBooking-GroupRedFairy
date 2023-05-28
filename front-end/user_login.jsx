const Login = () => {
  return (
    <div
      style={{
        backgroundColor: '#f2f2f2',
        fontFamily: 'Times New Roman, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '300px',
          margin: '0 auto',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ textAlign: 'center', marginTop: 0, fontSize: '22px', fontWeight: 'bold', color: '#333333' }}>User Login</h2>
        <form action="/login" method="post">
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px', color: '#333333' }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />

          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#333333' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            style={{
              width: '100%',
              padding: '8px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />

          <input
            type="submit"
            value="Login"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          />

          <a
            href="/front-end/forgot_password.html"
            style={{ textDecoration: 'none', color: '#4CAF50' }}
          >
            Forgot Password?
          </a>

          <p style={{ textAlign: 'center', color: '#333333' }}>
            Don't have an account?{' '}
            <a href="/front-end/create_user_account.html" style={{ textDecoration: 'none', color: '#4CAF50' }}>
              Create Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
