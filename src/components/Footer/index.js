import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'
import HeaderContext from '../../HeaderContext/HeaderContext'

const Footer = () => (
  <HeaderContext.Consumer>
    {value => {
      const {theme} = value
      const color = theme ? 'white' : 'black'
      const heading = theme ? 'h1-dark' : ''
      return (
        <div className="contact-cont">
          <ul className="list-cont">
            <li>
              <button type="button" className="contact-btn">
                <FaGoogle size={20} color={color} />
              </button>
            </li>
            <li>
              <button type="button" className="contact-btn">
                <FaTwitter size={20} color={color} />
              </button>
            </li>
            <li>
              <button type="button" className="contact-btn">
                <FaInstagram size={20} color={color} />
              </button>
            </li>
            <li>
              <button type="button" className="contact-btn">
                <FaYoutube size={20} color={color} />
              </button>
            </li>
          </ul>
          <p className={`contact-us ${heading}`}>Contact Us</p>
        </div>
      )
    }}
  </HeaderContext.Consumer>
)

export default Footer
