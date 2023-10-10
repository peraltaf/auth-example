import { Link, useNavigate } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate();
  const user = !!localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    alert('Successfully logged out');
    navigate('/login');
  }

  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-[#1a1a1a]/90 text-zinc-300'>
      <Link to='/'>
        <h1 className='text-3xl'>AuthDB</h1>
      </Link>
      
      <ul className='flex gap-6'>
        {
          !user ? <>
            <Link to='/login'>
              <li>Log In</li>
            </Link>

            <Link to='/signup'>
              <li>Sign Up</li>
            </Link>
          </>
        : <>
            <Link to='/account'>
              <li>Account</li>
            </Link>

            <li>
              <button onClick={handleSignOut}>Logout</button>
            </li>
          </>
        }
      </ul>
    </nav>
  )
}

export default NavBar;