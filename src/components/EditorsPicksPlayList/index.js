const EditorsPicksPlayList = props => {
  const {editorsPicks} = props
  const {description, images} = editorsPicks

  return (
    <li>
      <img src={images} alt="editorsPicks" />
      <p>{description}</p>
    </li>
  )
}
export default EditorsPicksPlayList
