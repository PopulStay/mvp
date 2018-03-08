import React from 'react'

const Footer = (props) => {
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="row align-items-center h-100">
            <div className="col-2">
              <img src="/images/logo.svg" height="130" alt="PopulStay" />
            </div>
            <div className="col-2">
              <p>Become a Host</p>
              <p>About PopulStay</p>
              <p>Help Center</p>
            </div>
            <div className="col-8">
              <div className="float-right">
                <div>
                  <select>
                    <option value="English" selected>English</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>
                <div>
                  <select>
                    <option value="PPS" selected>PPS</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="JPY">JPY</option>
                    <option value="SGD">SGD</option>
                    <option value="AUD">AUD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center h-100">
            <div className="col-4">
              &copy; 2018 PopulStay, Inc.
            </div>
            <div className="col-8">
              <div className="float-right">
                <img src="/images/facebook.svg" height="40" alt="Facebook" />
                <img src="/images/youtube.svg" height="40" alt="Youtube" />
                <img src="/images/instagram.svg" height="40" alt="Instagram" />
                <img src="/images/telegram.svg" height="40" alt="Telegram" />
                <img src="/images/twitter.svg" height="40" alt="Twitter" />
                <img src="/images/reddit.svg" height="40" alt="Reddit" />
                <img src="/images/wechat.svg" height="40" alt="Wechat" />
                <img src="/images/weibo.svg" height="40" alt="Weibo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
