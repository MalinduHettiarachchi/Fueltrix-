import React from 'react'
import Navbar from '../NavBarr/navbarr'
import '../Mainpage/mainpage.css'
import Partners from '../Partners/partners'
import Footer from '../Footer/footer'

function Mainpage() {
  return (
    <div className="mainpage">
      <Navbar />
      <div className="twoclomn">
        <div className="leftmp">
        <p className="fueltrix">Fueltrix</p>
        </div>
        <div className="rightmp">
        </div>
      </div>
      <div className="features-container">
      <div className="feature-card">
        <i className="fas fa-wifi feature-icon"></i> {/* FontAwesome Wi-Fi Icon */}
        <h3>Share with a Tap</h3>
        <p>
          Tap the LUXN card on your smartphone and instantly share your LUXN profile
          via near-field communication (NFC).
        </p>
      </div>
      <div className="feature-card">
        <i className="fas fa-mobile-alt feature-icon"></i> {/* FontAwesome Mobile Icon */}
        <h3>No App Required</h3>
        <p>
          LUXN profiles are directly viewed through a browser making LUXN compatible with all smartphones and tablets.
        </p>
      </div>
      <div className="feature-card">
        <i className="fas fa-share-alt feature-icon"></i> {/* FontAwesome Share Icon */}
        <h3>Unlimited Sharing</h3>
        <p>
          With a one-time purchase of a LUXN card, no monthly fees and enjoy a life full of seamless connections.
        </p>
      </div>
      <div className="feature-card">
        <i className="fas fa-user-edit feature-icon"></i> {/* FontAwesome Edit Icon */}
        <h3>Update Your Info</h3>
        <p>
          You can edit your info anytime. Also, you can customize the color of your profile, along with dark mode variations.
        </p>
      </div>
    </div>
    <Partners/>
    <Footer/>
    </div>
  )
}

export default Mainpage
