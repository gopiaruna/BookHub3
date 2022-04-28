import './index.css'

const ShelfItem = props => {
  const {details, onClickBtnChangeActiveID, isActive} = props
  const {id, label} = details

  const onClickBtn = () => {
    onClickBtnChangeActiveID(id)
  }
  const activeClass = isActive
    ? 'shelf-link-btn active-shelf-btn'
    : 'shelf-link-btn'
  return (
    <li className="list-item">
      <button type="button" className={activeClass} onClick={onClickBtn}>
        {label}
      </button>
    </li>
  )
}

export default ShelfItem
