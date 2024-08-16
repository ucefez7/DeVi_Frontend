import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slice/authSlice';
import "./navbar.scss";
import signoutIcon from '../../assets/signout.jpeg';
import helpIcon from '../../assets/Help.png'
import logo from '../../assets/DeVi.png'
import settings from '../../assets/settings.jpeg'
import search from '../../assets/search.jpg';


const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img
        //  src="logo.svg"
        src={logo}
        style={{height:'60px'}}
          alt="" />
        <span>lamAdmin</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src={search} alt="" className="icon2" />
        <img src={settings} alt="" className="icon1" />
        <div className="account-dropdown">
          <div className="user" onClick={toggleDropdown}>
            <img
              src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
              alt="User"
            />
            <span>Account</span>
            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleLogout}>
                <img src={signoutIcon} alt="Logout Icon" /> {/* Use the imported image */}
                <span>Sign out</span>
              </div>
              <div className="dropdown-item">
                <img src={helpIcon} alt="Help Icon" />
                <span>Help</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
