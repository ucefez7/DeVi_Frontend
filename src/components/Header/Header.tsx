
import './Header.css';
import logo from '../../assets/DeVi.png'; 

function Header() {

  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo"/>
      <h1 className="header-title">DeVi</h1>
    </header>
  );
}

export default Header;
