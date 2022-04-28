import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaBars} from 'react-icons/fa'

import './index.css'
import HeaderContext from '../../HeaderContext/HeaderContext'

class Header extends Component {
  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {
            activeLink,
            onClickBookShelves,
            onClickHome,
            theme,

            onClickNavIcon,
          } = value

          const onClickNavButton = () => {
            onClickNavIcon()
          }

          const onClickLogout = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          const onClickHomeLink = () => {
            onClickHome()
          }

          const onClickShelf = () => {
            onClickBookShelves()
          }

          const headerCont = theme ? 'dark' : ''
          const iconColor = theme ? 'white' : 'black'
          return (
            <div className={`nav-cont ${headerCont}`}>
              <Link to="/">
                {theme ? (
                  <h1 className="navbar-logo-dark">Book Hub</h1>
                ) : (
                  <img
                    src="https://res.cloudinary.com/dbz8ckpbh/image/upload/v1651161887/Group_7731_xjdbqj_1_bjencr.jpg"
                    alt="website logo"
                    className="navbar-logo"
                  />
                )}
              </Link>
              <div className="nav-icon">
                <button
                  type="button"
                  className="nav-btn"
                  onClick={onClickNavButton}
                >
                  <FaBars color={iconColor} />
                </button>
              </div>

              <ul className="nav-links-cont">
                <li className="nav-links">
                  <Link
                    to="/"
                    className={
                      activeLink === 'home' ? 'nav-links active' : 'nav-links'
                    }
                    onClick={onClickHomeLink}
                  >
                    <p>Home</p>
                  </Link>
                </li>
                <li className="nav-links">
                  <Link
                    to="/shelf"
                    className={
                      activeLink === 'bookShelf'
                        ? 'nav-links active'
                        : 'nav-links'
                    }
                    onClick={onClickShelf}
                  >
                    <p>Bookshelves</p>
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    className="logout-btn"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default withRouter(Header)
