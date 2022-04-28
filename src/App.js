import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import BookShelves from './components/BookShelves'
// import Favourite from './components/Favourite'
import NotFound from './components/NotFound'
import HeaderContext from './HeaderContext/HeaderContext'
import BookItemDetails from './components/BookItemDetails'
import './App.css'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  state = {
    activeLink: 'home',
    theme: false,
    favBookList: [],
    showNavCont: false,
  }

  onClickNavIcon = () => {
    this.setState(prevState => ({
      showNavCont: !prevState.showNavCont,
    }))
  }

  onClickFavIcon = async id => {
    const {favBookList} = this.state
    const bookId = id
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
        id: book.id,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        rating: book.rating,
        readStatus: book.read_status,
        title: book.title,
      }

      const findObject = favBookList.filter(eachBook => bookId === eachBook.id)

      if (findObject[0] === undefined) {
        this.setState(prevState => ({
          favBookList: [...prevState.favBookList, updatedData],
        }))
      }
    }
  }

  removeFavBook = id => {
    const {favBookList} = this.state
    const removedFavList = favBookList.filter(eachBook => id !== eachBook.id)

    this.setState({
      favBookList: removedFavList,
    })
  }

  removeAllFavBooks = () => {
    this.setState({
      favBookList: [],
    })
  }

  onClickBookShelves = () => {
    this.setState({activeLink: 'bookShelf'})
  }

  onClickHome = () => {
    this.setState({
      activeLink: 'home',
    })
  }

  oncClickFavouriteLink = () => {
    this.setState({
      activeLink: 'favourite',
    })
  }

  onClickThemeChanger = () => {
    this.setState(prevState => ({
      theme: !prevState.theme,
    }))
  }

  render() {
    const {activeLink, theme, favBookList, showNavCont} = this.state
    return (
      <HeaderContext.Provider
        value={{
          activeLink,
          theme,
          favBookList,
          showNavCont,
          onClickBookShelves: this.onClickBookShelves,
          onClickHome: this.onClickHome,
          onClickThemeChanger: this.onClickThemeChanger,
          oncClickFavouriteLink: this.oncClickFavouriteLink,
          onClickFavIcon: this.onClickFavIcon,
          removeFavBook: this.removeFavBook,
          removeAllFavBooks: this.removeAllFavBooks,
          onClickNavIcon: this.onClickNavIcon,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/shelf" component={BookShelves} />
            <ProtectedRoute
              exact
              path="/books/:id"
              component={BookItemDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </>
      </HeaderContext.Provider>
    )
  }
}

export default App
