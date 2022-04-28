import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import HeaderContext from '../../HeaderContext/HeaderContext'
import './index.css'

const BookItem = props => {
  const {bookDetails} = props
  const {id, authorName, title, readStatus, rating, coverPic} = bookDetails
  return (
    <HeaderContext.Consumer>
      {value => {
        const {theme} = value

        const para = theme ? 'p-dark' : ''

        return (
          <li>
            <Link to={`/books/${id}`}>
              <div className="book-items-cont">
                <img src={coverPic} alt={title} className="book-image" />
                <div className="books-content-cont">
                  <h1 className={`shelf-book-title ${para}`}>{title}</h1>
                  <p className={`shelf-author-name ${para}`}>{authorName}</p>
                  <div className="rating-cont">
                    <p className={`shelf-book-rating ${para}`}>Avg Rating</p>
                    <div className="star-icon">
                      <BsFillStarFill color="#FBBF24" size={15} />
                    </div>
                    <p className={`rating ${para}`}> {rating}</p>
                  </div>
                  <p className={`shelf-book-status ${para}`}>
                    Status: <span className="status-text">{readStatus}</span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </HeaderContext.Consumer>
  )
}

export default BookItem
