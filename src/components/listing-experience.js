import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Listingexperience extends Component {

  constructor(props, context) {
    super(props);
      this.state = {
        experienceList:1,
        lists:[
          {img:"../images/detail-carousel.jpg",location:"Tokyo1",price:200},
          {img:"../images/detail-carousel.jpg",location:"Tokyo2",price:200},
          {img:"../images/detail-carousel.jpg",location:"Tokyo3",price:200},
          {img:"../images/detail-carousel.jpg",location:"Tokyo4",price:200},
          {img:"../images/detail-carousel.jpg",location:"Tokyo5",price:200}
        ],
      };

  }
  nextlist(e){
    this.setState({state: this.state.lists.push(this.state.lists[0])});
    this.setState({
        lists: this.state.lists.filter((elem, i) => 0 != i)
    });
  }
  prelist(e){
    this.setState({state: this.state.lists.unshift(this.state.lists[this.state.lists.length-1])});
    this.setState({
        lists: this.state.lists.filter((elem, i) => this.state.lists.length-1 != i)
    });
  }

  render() {
   
    return (

        <div className="container experience">
            <h2>Explore Experiences</h2>
            <div className="lunbo">
              <div className="pre glyphicon glyphicon-chevron-left" onClick={(e)=>this.prelist(e)}></div>
              <div className="content">
                  {this.state.lists.map((item,index) => (
                    <div className="lists">
                        <img src={item.img} />
                        <p>{item.location}</p>
                    </div>
                    ))
                  }
              </div>
              <div className="next glyphicon glyphicon-chevron-right" onClick={(e)=>this.nextlist(e)}></div>
            </div>
            <h2>All experiences</h2>
            <ul className="experiences_ul">
                <li>Tokyo</li>
                <li>Singapore</li>
                <li>Seoul</li>
                <li>Osaka</li>
                <li>Bangkok</li>
                <li>Show All (98+)</li>
            </ul>
            <div className={this.state.experienceList == 1 ? "show All_experiences" : "hide All_experiences"}>
                {this.state.lists.map((item,index) => (
                  <div className="col-sm-12 col-md-6 col-lg-3 listing-card">
                    <img className="photo" src={item.img} role="presentation" />
                    <div className="category">Entire place (0.5 beds)</div>
                    <div className="title">{item.location}</div>
                    <div className="price">
                        ￥{item.price} pps per night
                    </div>
                    <div className="divxx">
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <span>200</span> 
                    </div>
                  </div>
                  ))
                }
            </div>
            <div className={this.state.experienceList == 2 ? "show All_experiences" : "hide All_experiences"}>
              {this.state.lists.map((item,index) => (
                  <div className="col-sm-12 col-md-6 col-lg-3 listing-card">
                    <img className="photo" src={item.img} role="presentation" />
                    <div className="category">Entire place (0.5 beds)</div>
                    <div className="title">{item.location}</div>
                    <div className="price">
                        ￥{item.price} pps per night
                    </div>
                    <div className="divxx">
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <span>200</span> 
                    </div>
                  </div>
                  ))
                }
            </div>
            <div className={this.state.experienceList == 3 ? "show All_experiences" : "hide All_experiences"}>
              {this.state.lists.map((item,index) => (
                  <div className="col-sm-12 col-md-6 col-lg-3 listing-card">
                    <img className="photo" src={item.img} role="presentation" />
                    <div className="category">Entire place (0.5 beds)</div>
                    <div className="title">{item.location}</div>
                    <div className="price">
                        ￥{item.price} pps per night
                    </div>
                    <div className="divxx">
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <img src="../images/detail-xx01.png" alt="" />
                      <span>200</span> 
                    </div>
                  </div>
                  ))
                }
            </div>
            <div className="listspan">
              <span className={this.state.experienceList == 1 ? "active" : ""}  onClick={(e)=>this.setState({experienceList:1})}></span>
              <span className={this.state.experienceList == 2 ? "active" : ""}  onClick={(e)=>this.setState({experienceList:2})}></span>
              <span className={this.state.experienceList == 3 ? "active" : ""}  onClick={(e)=>this.setState({experienceList:3})}></span>
            </div>
        </div>

  
    )
  }
}

export default withRouter(Listingexperience)
