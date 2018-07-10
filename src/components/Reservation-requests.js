import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';

class ReservationRequests extends Component {

  constructor(props) {
    super(props)

    this.state={
  
    };

    web3service.loadWallet();

  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
        
  }


  render() {

        const language = this.state.languagelist;

    return (
      <div>
        {this.props.HelpDetailNUM == 1 &&
            <div className="HelpOne">
              <h4>Can I book on behalf of a friend or family member?</h4>
              <p>Transparency and trust are vital to the PopulStay experience. People rely on information in Airbnb profiles, reviews, and other</p> 
              <p>verifications when deciding whether to host or stay with someone.</p>
              <p>We require PopulStay reservations booked for personal travel to be booked by the person who's going to stay at the listing.</p>
              <p>Instead of making a reservation for someone else, consider referring them to Airbnb. You can refer them to PopulStay directly from your dashboard by clicking the <b>Invite Friends</b> button. When a referred friend or family member successfully completes a qualifying reservation, you’ll <span className="pinkColor">earn travel credit</span>.</p>
              <p>For business trips, PopulStay allows</p>
              <p>designated bookers at companies enrolled in PopulStay for Business to book trips on behalf of others. If you book travel for a company, <span className="pinkColor">read more</span>.</p>
            </div>
        }

        {this.props.HelpDetailNUM == 2 &&
            <div className="HelpTwo">
              <h4>Can I view a listing before I book?</h4>
              <p>We encourage all hosts and guests to complete their bookings through our website before meeting in person to best ensure their safety and privacy.</p> 
              <p>There are many ways to learn more about the listing and the host without seeing the property, including:</p>
              <ul>
                <li><p><span></span></p>Private messaging</li>
                <li><p><span></span></p>Profile verifications</li>
                <li><p><span></span></p>Reviews</li>
                <li><p><span></span></p>Verified photography</li>
              </ul>
              <p>Hosts also need to <span className="pinkColor">provide information about themselves</span> before accepting reservations on the site.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpDetailNUM == 3 &&
            <div className="HelpThree">
              <h4>How much time does a host have to respond to my reservation request?</h4>
              <p>Hosts have 24 hours to officially accept or decline <span className="pinkColor">reservation requests</span>. You'll be updated by email about the status of your request.</p> 
              <p>More than half of all reservation requests are accepted within one hour of being received. The vast majority of hosts reply within 12 hours.</p>
              <p>If a host <span className="pinkColor">confirms</span> your request, your payment is processed and collected by PopulStay in full. If a host declines your request or the request expires, we don't process your payment.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpDetailNUM == 4 &&
            <div className="HelpFour">
              <h4>How do I submit a reservation request?</h4>
              <p>If you’re ready to book a place on PopulStay, you can send a request to the host to <span className="pinkColor">book a reservation</span>. If you’re unsure about the listing or its availability, you can also send a message to the host.</p> 
              <p>To send a reservation request:</p>
              <ul>
                <li>1.<p>On a listing, click <b>Request to Book</b>.If you see <b>Instant Book</b>, the host is allowing you to book their place instantly.Your reservation will be automatically confirmed after step 4.</p></li>
                <li>2.<p>Review your reservation details to make sure everything is correct.</p></li>
                <li>3.<p>Add your payment information, including any coupon code you may have.</p></li>
                <li>4.<p>Agree to the policies and terms, including the host’s cancellation policy and house rules.</p></li>
                <li>5.<p>Wait for the host’s response. The host has 24 hours to reply, but most reply within a few hours.</p></li>
              </ul>
              <p>Some hosts require that you complete the <span className="pinkColor">Verified ID</span> process before confirming a reservation, which allows the host to get more information about who they’re hosting in their home.</p>
              <p>If your request is accepted, you’ll be charged in full for the reservation. If the host declines the request or doesn’t respond within 24 hours, no charge is made and you can try booking those dates with someone else.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpDetailNUM == 5 &&
            <div className="HelpFive">
              <h4>What happens if my reservation request is declined or expires?</h4>
              <p>If your reservation request is declined by the host or expires, meaning the host didn’t respond within 24 hours, no charge is made for the reservation and you’re free to book with another host.</p> 
              <p>We urge our hosts to keep their calendars up to date and respond to requests in a timely manner. But, sometimes situations come up that prevent this from happening.</p>
              <p>We recommend messaging several hosts before submitting a reservation request to ask about their availability and ask any other questions you have.</p>
              <p><b>Temporary authorizations</b></p>
              <p>Your payment method may be temporarily <span className="pinkColor">authorized</span> for a charge when you request a reservation, but this authorisation is voided and released back to the payment method if your request is declined or expires. We complete a charge only when a reservation request is confirmed.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpDetailNUM == 6 &&
            <div className="HelpSix">
              <h4>When am I charged for a reservation?</h4>
              <p>Your payment information is collected when you submit a reservation request. Once the host accepts your request, or if you book a reservation with <span className="pinkColor">Instant Book</span>, your payment method will be charged for the entire amount at that time.</p> 
              <p>Whether the reservation is two days or two months away, we hold the payment until 24 hours after check-in before giving it to the host. This hold gives both parties time to make sure that everything is as expected.</p>
              <p><b>Changing your payment method</b></p>
              <p>If you've requested to book a listing but the host hasn't responded yet, you can <span className="pinkColor">cancel your reservation request</span> and make another request with a different payment method.</p>
              <p>Once your reservation is confirmed, you can't change your payment method at this time.</p>
              <p><b>Long term reservations</b></p>
              <p>If you book a reservation for 28 nights or more, you’ll be charged a first month down payment when the reservation is confirmed. Then, the rest of the nights will be charged on a monthly basis.</p>
              <p><b>Security deposits</b></p>
              <p>If your listing requires a security deposit, you won’t be charged unless the host files a successful claim within 14 days of your checkout.</p>
              <p className="pinkColor">View this article in the Help Centre ›</p>
            </div>
        }

        {this.props.HelpDetailNUM == 7 &&
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
      </div>
    )
  }
}

export default ReservationRequests