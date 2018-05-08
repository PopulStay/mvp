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
import ManagementPanel from './management-panel.js'
import HostOrder from './host-orderlist.js'
import Footer from './footer'
import NavBar from './navbar'
import Overlay from './overlay'
import Search from './search.js'
import Listingexperience from './listing-experience.js'

// CSS
import '../css/becomehost.css'
import '../css/detail.css'
import '../css/homepage.css'
import '../css/main.css'
import '../css/search.css'
import '../css/media.css'
import '../css/Modal.css'

const SearchPage = (props) => (
  <Layout {...props} hideTagHeader={true}>
      <Search />
  </Layout>
)


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

const ManagePanelPage = (props) => (
  <Layout {...props}  hideTagHeader={true}>
    <div className="container">
      <ManagementPanel />
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


const experiencePage = (props) => (
  <Layout {...props}>
    <div className="container">
      <Listingexperience />
    </div>
  </Layout>
)


// Top level component
const App = () => (
  <Router>
    <ScrollToTop>
        <div>
          <Route exact path="/" component={SearchPage}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/experience" component={experiencePage}/>
          <Route path="/page/:activePage" component={HomePage}/>
          <Route path="/listing/:listingId" component={ListingDetailPage}/>
          <Route path="/create" component={CreateListingPage}/>
          <Route path="/managepanel" component={ManagePanelPage}/>
          <Route path="/hostorder" component={HostOrderPage}/>
        </div>
    </ScrollToTop>
  </Router>
)

export default App
