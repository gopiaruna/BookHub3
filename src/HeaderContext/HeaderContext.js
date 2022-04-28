import React from 'react'

const HeaderContext = React.createContext({
  activeLink: 'home',
  showNavCont: false,
  onClickBookShelves: () => {},
  onClickHome: () => {},
  oncClickFavouriteLink: () => {},
  theme: false,
  onClickThemeChanger: () => {},
  favBookList: [],
  onClickFavIcon: () => {},
  removeFavBook: () => {},
  removeAllFavBooks: () => {},
  onClickNavIcon: () => {},
})

export default HeaderContext
