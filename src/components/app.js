import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// Components
import Base64Service from '../services/Base64-service'
import NavBar from './navbar'
import ScrollToTop from './scroll-to-top.js'
import Listings from './listings-grid.js'
import ListingDetail from './listing-detail.js'
import ListingCreate from './listing-create.js'
import ManagementPanel from './management-panel.js'
import HostOrder from './host-orderlist.js'
import Footer from './footer'
import Overlay from './overlay'
import Search from './search.js'
import Listingexperience from './listing-experience.js'
import Listingall from './listing-all.js'
import Experienceintro from './experience-intro.js'
import Itrolist from './intro-list.js'
import Registerlist from './register-list.js'
import Verifyid from './verify-id.js'
import Helpbox from './helpbox.js'
import ProfileReceipt from './profile_receipt.js'
import ProfileConfrim from './profile_confrim.js'
import Password from './password.js'

// CSS
import '../css/becomehost.css'
import '../css/detail.css'
import '../css/homepage.css'
import '../css/main.css'
import '../css/search.css'
import '../css/Modal.css'
import '../css/experience.css'
import '../css/help.css'
import '../css/media.css'

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





const Layout = ({ children, hideTagHeader , hideTagFooter}) => (
  <div>
    
      <NavBar hideTagHeader={hideTagHeader} />
      {children}
    
    <Footer hideTagFooter={hideTagFooter} />
  </div>
)


const experiencePage = (props) => (
  <Layout {...props}>
    <div className="container">
      <Listingexperience />
    </div>
  </Layout>
)

const all = (props) => (
  <Layout {...props}>
    <div className="container">
      <Listingall />
    </div>
  </Layout>
)

const HELPBOX = (props) => (
  <Layout {...props}  hideTagHeader={true}>
    <div className="container">
      <Helpbox />
    </div>
  </Layout>
)


const Intro = (props) => (
  <Layout {...props}  hideTagHeader="NO">
      <Experienceintro />
  </Layout>
)


const experiencelist = (props) => (
  <Layout {...props}  hideTagHeader="NO" hideTagFooter="NO">
      <Itrolist />
  </Layout>
)

const Register = (props) => (
  <Layout {...props}  hideTagHeader="NO" hideTagFooter="NO">
      <Registerlist />
  </Layout>
)

const VerifyID = (props) => (
  <Layout {...props}  hideTagHeader="NO" hideTagFooter="NO">
      <Verifyid />
  </Layout>
)

const Receipt = (props) => (
  <Layout {...props}  >
      <ProfileReceipt />
  </Layout>
)

const Confrim = (props) => (
  <Layout {...props}  >
      <ProfileConfrim />
  </Layout>
)


const Pass = (props) => (
  <Layout {...props}  hideTagHeader="NO" hideTagFooter="NO">
      <Password />
  </Layout>
)



// Top level component
const App = () => (
  <Router>
    <ScrollToTop>
        <div>
          <Route exact path="/" component={SearchPage}/>
          <Route exact path="/home/:search" component={HomePage}/>
          <Route path="/page/:activePage" component={HomePage}/>
          <Route path="/listing/:listingId" component={ListingDetailPage}/>
          <Route path="/create" component={CreateListingPage}/>
          <Route path="/managepanel" component={ManagePanelPage}/>
          <Route path="/hostorder" component={HostOrderPage}/>
          <Route exact path="/experience" component={experiencePage}/>
          <Route exact path="/all" component={all}/>
          <Route exact path="/Intro" component={Intro}/>
          <Route exact path="/experiencelist" component={experiencelist}/>
          <Route exact path="/Register" component={Register}/>
          <Route exact path="/VerifyID" component={VerifyID}/>
          <Route exact path="/help" component={HELPBOX}/>
          <Route exact path="/Receipt" component={Receipt}/>
          <Route exact path="/Confrim" component={Confrim}/>
          <Route exact path="/Password" component={Pass}/>
        </div>
    </ScrollToTop>
  </Router>
)

export default App
