import {Component} from 'react'

import Cookies from 'js-cookie'

import NewReleasesPlayList from '../NewReleasesPlayList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class NewReleasesRoute extends Component {
  state = {
    newplayLists: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getNewReleases()
  }

  getNewReleases = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.albums.map(each => ({
        href: each.href,
        albumType:each.items.album_type,
        //I haven't understand, how to change fetched Data into camelCase.
      }))
      this.setState({
        newplayLists: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderProductsList = () => {
    const {newplayLists} = this.state
    return (
      <>
        <h1>New releases</h1>
        <ul className="products-list">
          {newplayLists.map(eachRelease => (
            <NewReleasesPlayList
              newPlayList={eachRelease}
              key={eachRelease.id}
            />
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

export default NewReleasesRoute
