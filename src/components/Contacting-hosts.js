import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';

class ReservationRequests extends Component {

  constructor(props) {
    super(props)

    web3service.loadWallet();
  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
  }


  render() {

        const language = this.state.languagelist;

    return (
      <div>

        {this.props.HelpContacting == 10 &&
            <div className="HelpTen">
              <h4>How do I view and send messages?</h4>
              <p>Messaging on PopulStay starts when a guest makes an <span className="pinkColor">inquiry</span> or <span className="pinkColor">reservation request</span>. Afterward, all messages related to that enquiry or reservation request will appear in your inbox.</p> 
              <p><b>To view or send a message</b></p>
              <ul className="ulone">
                <li>1.<p>On <span className="pinkColor">PopulStay.com</span>, go to your <span className="pinkColor">Messages</span></p></li>
                <li>2.<p>Select <b>Traveling</b> or <b>Hosting</b></p></li>
                <li>3.<p>Click on a message thread to view old messages or send a new one</p></li>
              </ul>
              <p>To read a message you deleted, click the dropdown menu above your messages and select <b>Archived</b></p>
              <p>If a message makes you feel uncomfortable or someone tries to get you to <span className="pinkColor">pay outside PopulStay</span>, click the <img src="/images/hongqi.png" /> flag icon next to it to let us know.</p>
              <p><b>Message Threads</b></p>
              <p>When you click on a message, you can view the conversation and also the following information:</p>
              <ul className="ultwo">
                <li><p><span></span></p><div>Host or guest profiles including number of reviews, verifications, and description.</div></li>
                <li><p><span></span></p><div>Reservation and payment details such as date of enquiry, number of guests, and price breakdown.Events such as reservation confirmation, pre-approvals, and special offers are notated in the timeline of the conversations.</div></li>
                <li><p><span></span></p><div>If any actions are needed from you, you’ll see the prompt at the top of the page, above the conversation. Guests can make booking enquiries or reservation requests, and hosts will be able to accept or decline requests.</div></li>
                <li><p><span></span></p><div>Hosts will see what the guest pays and what they will earn. They will also be able to see a snapshot of their calendar.</div></li>
              </ul>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpContacting == 11 &&
            <div className="HelpThree">
              <h4>Can hosts ask guests to sign a contract?</h4>
              <p>Yes. Some hosts require guests to sign contracts or rental agreements prior to check-in.</p> 
              <p><b>For hosts</b></p>
              <p>If you require guests to sign a contract, you must disclose the actual contract terms to them prior to booking. The easiest way to do this is to mention the contract in your listing's description, and include the terms in your message thread with the guest.</p>
              <p><b>For hosts</b></p>
              <p>Hosts may ask you to sign a contract, but they must disclose this requirement and its terms prior to booking.</p>
              <p>If you’re not comfortable with the contract, you may want to discuss your concerns with the host or look for another place to stay.</p>
              <p>If your host asks you to sign a contract that you weren’t notified about before you made the reservation, you can decline to sign the contract and ask your host to cancel your reservation instead.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpContacting == 12 &&
            <div className="HelpTwo">
              <h4>How do I book a place on PopulStay?</h4>
              <p>When you book a place on PopulStay, you’re making arrangements to stay in someone’s home. Each host has their own style of hospitality, starting with how they like to get to know their guests. Some hosts want to approve reservations, while others are comfortable letting you book their place instantly without waiting for approval.</p> 
              <p><b>1. Complete Your Profile</b></p>
              <p>In either case, it’s important to know that PopulStay is a community that relies on trust. Complete your profile before you request a reservation with a host, so they can know a little bit about you when they confirm. Your profile should include photos and verifications, especially because some hosts require guests to have a <span className="pinkColor">profile photo</span> or <span className="pinkColor">Verified ID</span> in order to book.</p>
              <p><b>2. Find the Right Place</b></p>
              <p>With over 800,000 unique listings around the world, you’ll want to make sure the place you choose has everything you need for a comfortable and memorable trip.</p>
              <p>When <span className="pinkColor">searching for a place</span>, make sure to include your dates and number of guests to get the most accurate pricing. Read reviews, descriptions, house rules, and amenities for each place to see if it’s the right fit for your trip. You can always <span className="pinkColor">contact the host</span> if you have any questions about their home.</p>
              <p><b>3. Book It!</b></p>
              <p>You’ve found the perfect place, and now it’s time to make it official. This is where the host’s preferred way of booking will determine how you’ll confirm your reservation.</p>
              <ul>
                <li><p><span></span></p><div><h6><b>Instant Book</b></h6>For hosts who don’t want to approve each reservation, you’ll see a button on their listing that says Instant Book. Like the name suggests, you can confirm a reservation at these places right away. Learn more about <span className="pinkColor">Instant Book</span>.</div></li>
                <li><p><span></span></p><div><h6><b>Request to Book</b></h6>Many hosts prefer to approve reservations before they’re final. In this case, you’ll see a button on their listing that says <b>Request to Book</b>. To submit a reservation request, you’ll need to enter your payment details.  Hosts have 24 hours to accept your request, and your reservation is automatically confirmed once they do. Learn more about <span className="pinkColor">submitting a reservation request</span>.</div></li>
                <li><p><span></span></p><div><h6><b>Pre-approvals and Special Offers</b></h6>If you decide to contact the host to ask questions before attempting to book, the host may respond to your message by inviting you to make a reservation with either a pre-approval or Special Offer. A pre-approval is an invitation to finish booking for the dates and number of guestsyou noted in your message. A Special Offer gives the host the opportunity to provide special pricing, dates, and other reservation details before you book. Learn more about <span className="pinkColor">booking a pre-approval or Special Offer</span>.</div></li>
              </ul>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpContacting == 13 &&
            <div className="HelpOne">
              <h4>Should I book if I have not heard back from the host?</h4>
              <p>Once you’ve found a listing for your trip, we recommend messaging the host to doublecheck the availability of the space for your dates.</p> 
              <p><b>Message the host before requesting</b></p>
              <p>Unless you have found an <span className="pinkColor">Instant Book</span> listing, you’ll have to request that the host accept your stay. It’s a good idea to message the host before requesting, since they can answer questions about their home, as well as let you know it’s available.</p>
              <p>To contact a host from the listing page, click Contact Host and ask the host any questions you have. Most hosts respond within a few hours. Keep in mind that you may be in different time zones or the host may not have Internet access at the moment.</p>
              <p>We recommend messaging several hosts before submitting a reservation request to ask about their availability and ask any other questions you have.</p>
              <p>The host isn’t responding</p>
              <p>If a host hasn't responded, consider reaching out to other hosts in the area. You can message as many hosts as you'd like, so it's up to them to respond to you in a timely fashion or risk losing their chance at having you as a guest.</p>
              <p>Sending multiple requests</p>
              <p>Unless you're planning on renting multiple locations for the same dates, make sure you don’t submit more than one reservation request at a time, as you may end up booking multiple reservations during the same time period.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpContacting == 14 &&
            <div className="HelpSix">
              <h4>What is a Superhost?</h4>
              <p><span className="pinkColor">Superhosts</span> are experienced hosts who provide a shining example for other hosts, and extraordinary experiences for their guests.</p> 
              <p>Once a host reaches Superhost status, a badge will automatically appear on their listing and profile to help you identify them.</p>
              <img src="" />
              <p>We check Superhosts’ activity four times a year, to ensure that the programme highlights the people who are most dedicated to providing outstanding hospitality.</p>
              <p>The Superhost <span className="pinkColor">Terms & Conditions</span> apply. PopulStay doesn't endorse or sponsor any host, including Superhosts, or their listings.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpContacting == 7 &&
            <div className="HelpSeven">
              <h4>Should I book if I have not heard back from the host?</h4>
              <p>Once you’ve found a listing for your trip, we recommend messaging the host to doublecheck the availability of the space for your dates.</p> 
              <p><b>Message the host before requesting</b></p>
              <p>Unless you have found an <span className="pinkColor">Instant Book</span> listing, you’ll have to request that the host accept your stay. It’s a good idea to message the host before requesting, since they can answer questions about their home, as well as let you know it’s available.</p>
              <p>To contact a host from the listing page, click <b>Contact Host</b> and ask the host any questions you have. Most hosts respond within a few hours. Keep in mind that you may be in different time zones or the host may not have Internet access at the moment.</p>
              <p><b>The host isn’t responding</b></p>
              <p>If a host hasn't responded, consider reaching out to other hosts in the area. You can message as many hosts as you'd like, so it's up to them to respond to you in a timely fashion or risk losing their chance at having you as a guest.</p>
              <p><b>Sending multiple requests</b></p>
              <p>Unless you're planning on renting multiple locations for the same dates, make sure you don’t submit more than one reservation request at a time, as you may end up booking multiple reservations during the same time period.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpContacting == 8 &&
            <div className="HelpEight">
              <h4>I'm a guest. How do I check the status of my reservation?</h4>
              <p>If you’ve submitted a reservation request with a host on PopulStay, a couple of things are required to confirm your reservation:</p> 
              <ul>
                <li><p><span></span></p>You must have added your payment information</li>
                <li><p><span></span></p>The host must accept your request (unless you sent a reservation request for a place with <span className="pinkColor">Instant Book</span> turned on, which will automatically accept the request)</li>
              </ul>
              <p>When a host accepts your request, you'll receive an email and, depending on your account notification settings, a text (SMS) and push notification from Airbnb. Your reservation request status will also change to <b>Accepted</b>.</p>
              <p>View your trips</p>
              <p>See what each reservation status means or learn how to make a reservation request.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }
      </div>
    )
  }
}

export default ReservationRequests