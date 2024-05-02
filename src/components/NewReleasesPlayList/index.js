const NewReleasesPlayList = props => {
  const {newPlayList} = props
  const {imageUrl} = newPlayList

  return (
    <li className="product-item">
      <img src={imageUrl} alt="website logo" className="thumbnail" />
    </li>
  )
}
export default NewReleasesPlayList
