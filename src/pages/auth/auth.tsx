import './auth.css';

const Auth = () => {
  return (
    <div className='login-container'>
      <form>
        <div className='input-group'>
          <h1>Bienvenido</h1>
          <div className='input-group success'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' />
            <span className='msg'>Valid Email</span>
          </div>

          <div className='input-group error'>
            <label htmlFor='password'>Pasword</label>
            <input type='password' name='password' id='password' />
            <span className='msg'>Incorrect Password</span>
          </div>

          <button type='submit' className='login-button'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
