import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'
import {AiFillHeart} from 'react-icons/ai'
import HeaderContext from '../../HeaderContext/HeaderContext'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

class BookItemDetails extends Component {
  state = {bookData: {}, dataStatus: 'loading'}

  componentDidMount() {
    this.getBookItemData()
  }

  getBookItemData = async () => {
    const {match} = this.props
    const {params} = match
    const bookId = params.id
    const url = `https://apis.ccbp.in/book-hub/books/${bookId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    // console.log(id)
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const book = data.book_details
      console.log(book)
      const updatedData = {
        authorName: book.author_name,
        coverPic: book.cover_pic,
        aboutBook: book.about_book,
        rating: book.rating,
        readStatus: book.read_status,
        title: book.title,
        aboutAuthor: book.about_author,
      }
      this.setState({bookData: updatedData, dataStatus: 'success'})
    } else {
      this.setState({
        dataStatus: 'failure',
      })
    }
  }

  getBookItemDetails = () => {
    const {bookData} = this.state
    const {
      title,
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
    } = bookData

    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme, onClickFavIcon} = value

          const {match} = this.props
          const {params} = match
          const bookId = params.id

          const homeCont = theme ? 'dark-home' : ''
          const heading = theme ? 'h1-dark' : ''
          const innerCont = theme ? 'slick-dark' : ''
          const para = theme ? 'p-dark' : ''

          const onClickFavBtn = () => {
            onClickFavIcon(bookId)
            console.log(bookId)
          }

          return (
            <>
              <div className={`book-item-details-cont ${homeCont}`}>
                <div className={`book-details-cont ${innerCont}`}>
                  <div className="book-details-items-cont">
                    <img src={coverPic} alt={title} className="book-image" />
                    <div className="books-content-cont ">
                      <h1 className={`shelf-book-title ${heading}`}>{title}</h1>
                      <p className={`shelf-author-name ${para}`}>
                        {authorName}
                      </p>
                      <div className="rating-cont">
                        <p className={`shelf-book-rating ${para}`}>
                          Avg Rating
                        </p>
                        <BsFillStarFill
                          color="#FBBF24"
                          size={15}
                          className="star-icon"
                        />
                        <p className={`${para}`}> {rating}</p>
                      </div>
                      <p className={`shelf-book-status ${para}`}>
                        Status:{' '}
                        <span className="status-text">{readStatus}</span>
                      </p>
                      <button
                        type="button"
                        className="add-to-fav"
                        onClick={onClickFavBtn}
                      >
                        Add to Favourites <AiFillHeart color="red" />
                      </button>
                    </div>
                  </div>
                  <hr className="book-item-line" />
                  <div>
                    <h1 className={`item-heading ${heading}`}>About Author</h1>
                    <p className={`item-desc ${para}`}>{aboutAuthor}</p>
                    <h1 className={`item-heading ${heading}`}>About Book</h1>
                    <p className={`item-desc ${para}`}>{aboutBook}</p>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }

  onclickTryAgainBtn = () => {
    this.getBookItemData()
  }

  getFailureImage = () => (
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

  getLoader = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getDataOnTheBasicsOfStatus = () => {
    const {dataStatus} = this.state
    switch (dataStatus) {
      case 'loading':
        return this.getLoader()
      case 'success':
        return this.getBookItemDetails()
      case 'failure':
        return this.getFailureImage()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div className="blog-container">
          {this.getDataOnTheBasicsOfStatus()}
          <Footer />
        </div>
      </>
    )
  }
}

export default BookItemDetails
