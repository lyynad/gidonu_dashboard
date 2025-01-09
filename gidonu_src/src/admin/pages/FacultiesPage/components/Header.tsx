import '../styles/header.css';
import logo from '../assets/iconONU_faculties.svg';

const Header = () => {
    return(
        <div className="header">

            <div className="header-text">
                <a href="/gidonu/web">
                    <img src={logo} alt="logo" className="header-logo" />
                </a>

                <div className="header-text-container">
                    <h1>НАВІГАТОР</h1>
                    <span>по Одеському національному університету імені І.І. Мечникова</span>
                </div>
            </div>

            <div className="header-buttons">
                <button className="header-buttons-buildings-btn">Корпуси</button>
                <button className="header-buttons-buildings-btn">Типи відділів</button>
                <button className="header-buttons-buildings-btn">Відділи ОНУ</button>
                <button className="header-buttons-faculties-btn">Факультети</button>
            </div>

        </div>
    )
}

export default Header;