import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.SyntheticEvent) => {
    e.preventDefault();

    fetch('http://localhost:3001/register', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, username, password })
    }).then(() => {
      alert('Sucessful registration');
      navigate('/');
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div className='w-full h-screen flex'>
      <div
        className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'
        onSubmit={handleRegister}
      >
        <form className='text-center border rounded-lg w-[600px] h-[300px] p-9'>
          <div className='flex justify-between mb-4 items-center'>
            <label>Email</label>
            <input
              className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
              type='text'
              placeholder='Email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex justify-between mb-4 items-center'>
            <label>Username</label>
            <input
              className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
              type='text'
              placeholder='Username'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='flex justify-between mb-4 items-center'>
            <label>Password</label>
            <input
              type='password' className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
              placeholder='Password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='flex flex-row-reverse'>
            <button
              className='w-[200px] h-[50px] border hover:bg-teal-900 rounded-xl'
              type='submit'
            >Submit</button>
          </div>
        </form>
      </div>

      <div className='w-[50%] h-[100%] bg-teal-800 flex justify-center items-center'>
        <h2 className='text-3xl text-white'>Sign Up</h2>
      </div>
    </div>
  )
}

export default SignUp;