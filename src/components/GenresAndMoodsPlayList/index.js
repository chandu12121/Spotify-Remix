const GenresAndMoodsPlayList = props => {
  const {genreList} = props

  const {href} = genreList

  return (
    <li className="product-item">
      <img src={href} alt="website logo" className="thumbnail" />
    </li>
  )
}
export default GenresAndMoodsPlayList
