import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Footer from '../Footer'
import ShelfItem from '../ShelfItem'
import BookItem from '../BookItem'

import Header from '../Header'
import HeaderContext from '../../HeaderContext/HeaderContext'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    activeId: bookshelvesList[0].value,
    searchInput: '',
    booksList: [],
    dataStatus: 'loading',
  }

  componentDidMount() {
    this.getDataOfBooks()
  }

  getDataOfBooks = async () => {
    const {activeId, searchInput} = this.state
    // console.log(activeId)
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.setState({
        dataStatus: 'success',
      })
      const formattedData = data.books.map(eachBook => ({
        id: eachBook.id,
        title: eachBook.title,
        readStatus: eachBook.read_status,
        rating: eachBook.rating,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
      }))
      this.setState(
        {
          booksList: formattedData,
        },
        this.checkImageLength,
      )
    } else {
      this.setState({
        dataStatus: 'failure',
      })
    }
  }

  checkImageLength = () => {
    const {booksList} = this.state
    const showNoData = booksList.length === 0

    if (showNoData) {
      this.setState({
        dataStatus: 'nodata',
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearchBtn = () => {
    this.getDataOfBooks()
  }

  onClickBtnChangeActiveID = id => {
    const dataObject = bookshelvesList.filter(each => id === each.id)
    this.setState({activeId: dataObject[0].value}, this.getDataOfBooks)
  }

  getNoMatchImage = () => {
    const {searchInput} = this.state
    return (
      <div className="no-data-cont">
        <img
          src="https://res.cloudinary.com/dbz8ckpbh/image/upload/v1651139734/Asset_1_1_prhe9e_ojrhjk.jpg"
          alt="no books"
          className="no-book-image"
        />
        <p>Your search for {searchInput} did not find any matches.</p>
      </div>
    )
  }

  getLoadingSpinner = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  getSuccessData = () => {
    const {booksList} = this.state
    const updateBooksList = booksList
    return (
      <ul className="books-list-cont">
        {updateBooksList.map(eachBook => (
          <BookItem key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    )
  }

  onclickTryAgainBtn = () => {
    this.getDataOfBooks()
  }

  getErrorImage = () => (
    <div className="image-cont">
      <img
        src="https://res.cloudinary.com/dbz8ckpbh/image/upload/v1651139403/Group_7522_uhwe2g_kz4cof.jpg"
        alt="failure view"
        className="no-book-image"
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
      case 'nodata':
        return this.getNoMatchImage()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    const getArray = bookshelvesList.filter(
      eachBook => eachBook.value === activeId,
    )
    const presentBook = getArray[0].label
    return (
      <HeaderContext.Consumer>
        {value => {
          const {theme} = value
          const homeCont = theme ? 'dark-home' : ''
          const heading = theme ? 'h1-dark' : ''
          const shelfCont = theme ? 'slick-dark' : ''
          return (
            <>
              <Header />

              <div className={`shelf-cont ${homeCont}`}>
                <div className={`book-shelves-cont ${shelfCont}`}>
                  <h1 className={`shelf-heading ${heading}`}>Bookshelves</h1>
                  <ul className="list-links-cont">
                    {bookshelvesList.map(eachShelf => (
                      <ShelfItem
                        key={eachShelf.id}
                        details={eachShelf}
                        onClickBtnChangeActiveID={this.onClickBtnChangeActiveID}
                        isActive={activeId === eachShelf.value}
                      />
                    ))}
                  </ul>
                </div>
                <div className="shelf-search-details-cont">
                  <div className="heading-search-cont">
                    <h1 className={`shelf-heading ${heading}`}>
                      {presentBook} Books
                    </h1>
                    <div className="search-input-btn-cont">
                      <input
                        type="search"
                        placeholder="Search"
                        className="search-input"
                        onChange={this.onChangeSearchInput}
                      />
                      <button
                        testid="searchButton"
                        type="button"
                        className="shelf-search-btn"
                        onClick={this.onClickSearchBtn}
                      >
                        <BsSearch size={12} />
                      </button>
                    </div>
                  </div>
                  <h1 className="small-book-shelf-heading">Bookshelves</h1>
                  <ul className="small-list-links-cont">
                    {bookshelvesList.map(eachShelf => (
                      <ShelfItem
                        key={eachShelf.id}
                        details={eachShelf}
                        onClickBtnChangeActiveID={this.onClickBtnChangeActiveID}
                        isActive={activeId === eachShelf.value}
                      />
                    ))}
                  </ul>
                  {this.getDataBasedOnStatus()}
                </div>
                <Footer />
              </div>
            </>
          )
        }}
      </HeaderContext.Consumer>
    )
  }
}

export default BookShelves
