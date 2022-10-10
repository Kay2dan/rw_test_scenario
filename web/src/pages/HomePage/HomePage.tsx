import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

// import BtnDefault from '$components/BtnDefault'
// import BtnDefault from '$components/BtnDefault/BtnDefault'
// import BtnDefault from "$Btn/BtnDefault"

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <p>
        Find me in <code>./web/src/pages/HomePage/HomePage.tsx</code>
      </p>
      <p>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.home()}>Home</Link>`
      </p>
      {/* <BtnDefault /> */}
    </>
  )
}

export default HomePage
