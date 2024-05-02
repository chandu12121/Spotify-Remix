import {Component} from 'react'
import Cookies from 'js-cookie'

import GenresAndMoodsPlayList from '../GenresAndMoodsPlayList'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GenresAndMoodsRoute extends Component {
  state = {
    genresList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGeneresAndMoods()
  }

  getGeneresAndMoods = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.categories.map(each => ({
        href: each.href,
        href: each.item.href, //how can I changed fetched data into camelCase. there are multiple elements with same.if I try to change to camelCase, then it gives an istruction "do not allowed duplicates"
      }))
      this.setState({
        genresList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderPrimeDealsList = () => {
    const {genresList} = this.state
    return (
      <div>
        <h1>Genres & Moods</h1>
        <ul className="products-list">
          {genresList.map(eachGenre => (
            <GenresAndMoodsPlayList genreList={eachGenre} key={eachGenre.id} />
          ))}
        </ul>
      </div>
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
        return this.renderPrimeDealsList()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
}

export default GenresAndMoodsRoute
