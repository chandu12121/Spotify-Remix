import {Component} from 'react'

import Cookies from 'js-cookie'

import EditorsPicksPlayList from '../EditorsPicksPlayList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class EditorsPicksRoute extends Component {
  state = {
    editorsPicksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getEditordPicks()
  }

  getEditordPicks = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const api = `https://apis2.ccbp.in/spotify-clone/featured-playlists`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.playlists)
      const updatedData = fetchedData.playlists.map(each => ({
        //how can I changed fetched data into camelCase. there are multiple elements with same.if I try to change to camelCase, then it gives an istruction "do not allowed duplicates"
        href: each.href,
        collaborative: each.items.collaborative,
        description: each.items.description,
        externalUrls: each.items.external_urls.spotify,
      }))
      this.setState({
        editorsPicksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProductsList = () => {
    const {editorsPicksList} = this.state
    return (
      <>
        <h1>Editor's Pick</h1>
        <ul className="products-list">
          {editorsPicksList.map(eachPick => (
            <EditorsPicksPlayList editorsPicks={eachPick} key={eachPick.id} />
          ))}
        </ul>
      </>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/debrk14uy/image/upload/v1714556953/NotFound_Icon_pjysc5.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="retry-heading">Something went wrong. Please try again </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onClickRetryJobDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container">
      <img
        src="https://res.cloudinary.com/debrk14uy/image/upload/v1713351895/music_1x_wtcjng.png"
        alt="headerImg"
      />
      <h1>Loading...</h1>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default EditorsPicksRoute
