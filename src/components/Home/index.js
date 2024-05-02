import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import EditorsPicksRoute from '../EditorsPicksRoute'
import GenresAndMoodsRoute from '../GenresAndMoodsRoute'
import NewReleasesRoute from '../NewReleasesRoute'

import Header from '../Header'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />

      <div className="product-sections">
        <EditorsPicksRoute />
        <GenresAndMoodsRoute />
        <NewReleasesRoute />
      </div>
    </>
  )
}

export default Home
