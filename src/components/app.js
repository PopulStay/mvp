import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// Components
import ScrollToTop from './scroll-to-top.js'
import Listings from './listings-grid.js'
import ListingDetail from './listing-detail.js'
import ListingCreate from './listing-create.js'
import GuestInfo from './guest-info.js'
import HostInfo from './host-info.js'
import HostOrder from './host-orderlist.js'
import Footer from './footer'
import NavBar from './navbar'
import Overlay from './overlay'

// CSS
import '../css/becomehost.css'
import '../css/detail.css'
import '../css/homepage.css'
import '../css/main.css'
import '../css/search.css'




const HomePage = (props) => (
  <Layout {...props}>
    <div className="container">
      <Listings />
    </div>
  </Layout>
)

const ListingDetailPage = (props) => (
  <Layout {...props}  hideTagHeader={true}>
    <ListingDetail listingId={props.match.params.listingId} />
  </Layout>
)

const CreateListingPage = (props) => (
    <Layout {...props} hideTagHeader={true}>
    <div className="container">
      <ListingCreate />
    </div>
  </Layout>
)

const GuestInfoPage = (props) => (
  <Layout {...props}  hideTagHeader={true}>
    <div className="container">
      <GuestInfo />
    </div>
  </Layout>
)

const HostInfoPage = (props) => (
  <Layout {...props}  hideTagHeader={true}>
    <div className="container">
      <HostInfo />
    </div>
  </Layout>
)

const HostOrderPage = (props) => (
  <Layout {...props}  hideTagHeader={true}>
    <div className="container">
      <HostOrder />
    </div>
  </Layout>
)





const Layout = ({ children, hideTagHeader }) => (
  <div>
    
      <NavBar hideTagHeader={hideTagHeader} />
      {children}
    
    <Footer />
  </div>
)

// Top level component
const App = () => (
  <Router>
    <ScrollToTop>
        <div>
          <Route exact path="/" component={HomePage}/>
          <Route path="/page/:activePage" component={HomePage}/>
          <Route path="/listing/:listingId" component={ListingDetailPage}/>
          <Route path="/create" component={CreateListingPage}/>
          <Route path="/guestinfo" component={GuestInfoPage}/>
          <Route path="/hostinfo" component={HostInfoPage}/>
          <Route path="/hostorder" component={HostOrderPage}/>
        </div>
    </ScrollToTop>
  </Router>
)

export default App
