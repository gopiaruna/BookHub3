import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class ReactSlick extends Component {
  state = {topRatedList: [], dataStatus: 'loading'}

  componentDidMount() {
    this.getBooksData()
  }

  getBooksData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data.books)

    if (response.ok === true) {
      this.setState({
        dataStatus: 'success',
      })
      const formattedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))

      this.setState(
        {
          topRatedList: formattedData,
        },
        this.renderSlider,
      )
    } else {
      this.setState({
        dataStatus: 'failure',
      })
    }
  }

  renderSlider = () => {
    const {topRatedList} = this.state
    return (
      <Slider {...settings}>
        {topRatedList.map(eachLogo => {
          const {id, coverPic, title, authorName} = eachLogo
          return (
            <li key={id}>
              <Link to={`/books/${id}`}>
                <div className="slick-item" key={id}>
                  <img className="logo-image" src={coverPic} alt={title} />
                  <h1 className="book-title">{title}</h1>
                  <p className="author-name">{authorName}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </Slider>
    )
  }

  getSuccessData = () => (
    <ul className="slick-container">{this.renderSlider()}</ul>
  )

  getLoadingSpinner = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onclickTryAgainBtn = () => {
    this.getBooksData()
  }

  getErrorImage = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dbz8ckpbh/image/upload/v1651139403/Group_7522_uhwe2g_kz4cof.jpg"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={this.onclickTryAgainBtn}>
        Try Again
      </button>
    </div>
  )

  getDataBasedOnStatus = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case 'loading':
        return this.getLoadingSpinner()
      case 'success':
        return this.getSuccessData()
      case 'failure':
        return this.getErrorImage()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="heading-button-cont">
          <h1 className="topRated-books-text">Top Rated Books</h1>
          <Link to="/shelf">
            <button type="button" className="topRated-btn">
              Find Books
            </button>
          </Link>
        </div>
        {this.getDataBasedOnStatus()}
      </div>
    )
  }
}

export default ReactSlick
