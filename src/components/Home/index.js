import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

import ReactSlick from '../ReactSlick'
import HeaderContext from '../../HeaderContext/HeaderContext'
import './index.css'

class Home extends Component {
  render() {
    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme} = value

          const homeCont = theme ? 'dark-home' : ''
          const heading = theme ? 'h1-dark' : ''
          const para = theme ? 'p-dark' : ''
          return (
            <>
              <Header />
              <div className={`home-cont ${homeCont}`}>
                <h1 className={`home-heading ${heading}`}>
                  Find Your Next Favorite Books?
                </h1>
                <p className={`home-desc ${para}`}>
                  You are in the right place. Tell us what titles or genres you
                  have enjoyed in the past, and we will give you surprisingly
                  insightful recommendations.
                </p>
                <div className="find-books-cont">
                  <Link to="/shelf">
                    <button type="button" className="topRated-btn">
                      Find Books
                    </button>
                  </Link>
                </div>
                <ReactSlick />
                <Footer />
              </div>
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default Home
