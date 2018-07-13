import React from 'react';
import ReactDOM from 'react-dom';
import Timestamp from 'react-timestamp';
import web3Service from '../services/web3-service';
import languageService from '../services/language-service';
import guestService from '../services/guest-service';
import houselistingService from '../services/houseinfolist-service';

class Reviews extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id:'',
      user:'',
      languagelist:{},
      selectedPictures:[],
      neighbourhoodlist:[],
      Comment:'',
      Accuracy:0, 
      Location:0,
      Communication:0,
      Check_in:0,
      Cleanliness:0,
      Value:0,
    };
    web3Service.loadWallet();
    languageService.language();
    this.Reviews   = this.Reviews.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.deletePictures = this.deletePictures.bind(this);
  }

  componentWillMount (){
    guestService.getGuesterInfo(window.address).then((data)=>{
      this.setState({ user:data.user});
    });

    guestService.getOrderState().then((data)=>{
      //console.log(data)
    });

    var windowUrl = window.location.href;
    var url = windowUrl.split("?");
    if(url.length >= 2){
      this.setState({state:this.state.id=url[1]})
    }

    this.setState({ languagelist:window.languagelist });
    //获取评论代码，comment为评论内容。
    houselistingService.getHouseComment(this.props.listingId)
    .then((data)=>{
      var accuracyStarNUM = 0;
      var locationStarNUM = 0;
      var communicationStarNUM = 0;
      var checkinStarNUM = 0;
      var cleanlinessStarNUM = 0;
      var valueStarNUM = 0;
          this.setState({neighbourhoodlist:data.data})
          if(data.data){
            for(var i=0;i<data.data.length;i++){
              if(data.data[i].accuracyStar == undefined || data.data[i].accuracyStar == null){
                data.data[i].accuracyStar = 0;
              }
              if(data.data[i].locationStar == undefined || data.data[i].locationStar == null){
                data.data[i].locationStar = 0;
              }
              if(data.data[i].communicationStar == undefined || data.data[i].communicationStar == null){
                data.data[i].communicationStar = 0;
              }
              if(data.data[i].checkinStar == undefined || data.data[i].checkinStar == null){
                data.data[i].checkinStar = 0;
              }
              if(data.data[i].cleanlinessStar == undefined || data.data[i].cleanlinessStar == null){
                data.data[i].cleanlinessStar = 0;
              }
              if(data.data[i].valueStar == undefined || data.data[i].valueStar == null){
                data.data[i].valueStar = 0;
              }
              
              accuracyStarNUM += Number(data.data[i].accuracyStar);
              locationStarNUM += Number(data.data[i].locationStar);
              communicationStarNUM += Number(data.data[i].communicationStar);
              checkinStarNUM += Number(data.data[i].checkinStar);
              cleanlinessStarNUM += Number(data.data[i].cleanlinessStar);
              valueStarNUM += Number(data.data[i].valueStar);
            }
            var ReviewsNUM = accuracyStarNUM/data.data.length+locationStarNUM/data.data.length+communicationStarNUM/data.data.length+checkinStarNUM/data.data.length+cleanlinessStarNUM/data.data.length+valueStarNUM/data.data.length;
            this.setState({
              ReviewsNUM:ReviewsNUM/6,
              accuracyStarNUM:accuracyStarNUM/data.data.length,
              locationStarNUM:locationStarNUM/data.data.length,
              communicationStarNUM:communicationStarNUM/data.data.length,
              checkinStarNUM:checkinStarNUM/data.data.length,
              cleanlinessStarNUM:cleanlinessStarNUM/data.data.length,
              valueStarNUM:valueStarNUM/data.data.length
            })

            this.props.onReviews(this.state.ReviewsNUM);
          }
    })

  }

  fileChangedHandler(event){
      event.preventDefault();
      
      var files = this.state.selectedPictures;
      let reader = new FileReader();
      let file = event.target.files[0];

      var imgsize = (file.size/1024).toFixed(2); 
      if(imgsize<600){
          reader.onloadend = () => {
            files.push({
              file: file,
              imagePreviewUrl: reader.result
            });
            this.setState({selectedPictures:files});
          }
        reader.readAsDataURL(file)
        this.setState({PicturesSize:''});
      }else{
        this.setState({PicturesSize:'The picture must not exceed 600KB'})
      }
      
  }

  deletePictures(index,e){
    this.setState({
          selectedPictures: this.state.selectedPictures.filter((elem, i) => index != i)
    });

  }

  Reviews(){
    var windowUrl = window.location.href;
    var url = windowUrl.split("?");
    if(this.state.Accuracy != 0 && this.state.Location != 0 && this.state.Communication != 0 && this.state.Check_in != 0 && this.state.Cleanliness != 0 && this.state.Value != 0 && this.state.Comment != ''){
      guestService.addComment(this.state.id,this.state.Comment,this.state.Accuracy,this.state.Location,this.state.Communication,this.state.Check_in,this.state.Cleanliness,this.state.Value).then((data)=>{
        window.location.href=url[0];
      });
    }else{
      //console.log(456)
    }
  }

  render() {
        const language = this.state.languagelist;
    return (
      <div>
      {this.state.neighbourhoodlist.length != 0 &&
        <div className="Comment">
            <div className="Reviews">
                <p>{this.state.neighbourhoodlist.length} {language.Reviews}</p>
                <div className="divxx">
                  {this.state.ReviewsNUM >= 0 && this.state.ReviewsNUM < 1 &&
                      <div className="divxx">
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 1 && this.state.ReviewsNUM < 2 &&
                      <div className="divxx">
                          <img src="../images/reviews1_5.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 2 && this.state.ReviewsNUM < 3 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 3 && this.state.ReviewsNUM < 4 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews1_5.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 4 && this.state.ReviewsNUM < 5 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 5 && this.state.ReviewsNUM < 6 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews1_5.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 6 && this.state.ReviewsNUM < 7 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 7 && this.state.ReviewsNUM < 8 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews1_5.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 8 && this.state.ReviewsNUM < 9 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 9 && this.state.ReviewsNUM < 10 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews1_5.png" alt="" />
                          <img src="../images/reviews1.png" alt="" />
                      </div>
                    }
                    {this.state.ReviewsNUM >= 10 &&
                      <div className="divxx">
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                          <img src="../images/reviews2.png" alt="" />
                      </div>
                    }
                </div>
                <div className="input-group">
                  <span className="input-group-btn">
                    <button className="btn btn-default" type="button">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                  <input type="text" className="form-control" placeholder={language.Search_Reviews} />
                </div>
            </div>

            <div className="ReviewsDiv">
                <ul>
                    <li>
                      <p>{language.Accuracy}</p>
                        {this.state.accuracyStarNUM >= 0 && this.state.accuracyStarNUM < 1 &&
                          <div className="divxx">
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 1 && this.state.accuracyStarNUM < 2 &&
                          <div className="divxx">
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 2 && this.state.accuracyStarNUM < 3 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 3 && this.state.accuracyStarNUM < 4 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 4 && this.state.accuracyStarNUM < 5 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 5 && this.state.accuracyStarNUM < 6 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 6 && this.state.accuracyStarNUM < 7 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 7 && this.state.accuracyStarNUM < 8 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 8 && this.state.accuracyStarNUM < 9 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 9 && this.state.accuracyStarNUM < 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.accuracyStarNUM >= 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                          </div>
                        }
                    </li>
                    <li>
                      <p>{language.Location}</p>
                      {this.state.locationStarNUM >= 0 && this.state.locationStarNUM < 1 &&
                          <div className="divxx">
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 1 && this.state.locationStarNUM < 2 &&
                          <div className="divxx">
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 2 && this.state.locationStarNUM < 3 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 3 && this.state.locationStarNUM < 4 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 4 && this.state.locationStarNUM < 5 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 5 && this.state.locationStarNUM < 6 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 6 && this.state.locationStarNUM < 7 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 7 && this.state.locationStarNUM < 8 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 8 && this.state.locationStarNUM < 9 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 9 && this.state.locationStarNUM < 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.locationStarNUM >= 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                          </div>
                        }
                    </li>
                    <li>
                      <p>{language.Communication}</p>
                      {this.state.communicationStarNUM >= 0 && this.state.communicationStarNUM < 1 &&
                          <div className="divxx">
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 1 && this.state.communicationStarNUM < 2 &&
                          <div className="divxx">
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 2 && this.state.communicationStarNUM < 3 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 3 && this.state.communicationStarNUM < 4 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 4 && this.state.communicationStarNUM < 5 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 5 && this.state.communicationStarNUM < 6 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 6 && this.state.communicationStarNUM < 7 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 7 && this.state.communicationStarNUM < 8 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 8 && this.state.communicationStarNUM < 9 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 9 && this.state.communicationStarNUM < 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.communicationStarNUM >= 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                          </div>
                        }
                    </li>
                    <li>
                      <p>{language.Check_in}</p>
                      {this.state.checkinStarNUM >= 0 && this.state.checkinStarNUM < 1 &&
                          <div className="divxx">
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 1 && this.state.checkinStarNUM < 2 &&
                          <div className="divxx">
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 2 && this.state.checkinStarNUM < 3 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 3 && this.state.checkinStarNUM < 4 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 4 && this.state.checkinStarNUM < 5 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 5 && this.state.checkinStarNUM < 6 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 6 && this.state.checkinStarNUM < 7 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 7 && this.state.checkinStarNUM < 8 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 8 && this.state.checkinStarNUM < 9 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 9 && this.state.checkinStarNUM < 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.checkinStarNUM >= 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                          </div>
                        }
                    </li>
                    <li>
                      <p>{language.Cleanliness}</p>
                      {this.state.cleanlinessStarNUM >= 0 && this.state.cleanlinessStarNUM < 1 &&
                          <div className="divxx">
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 1 && this.state.cleanlinessStarNUM < 2 &&
                          <div className="divxx">
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 2 && this.state.cleanlinessStarNUM < 3 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 3 && this.state.cleanlinessStarNUM < 4 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 4 && this.state.cleanlinessStarNUM < 5 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 5 && this.state.cleanlinessStarNUM < 6 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 6 && this.state.cleanlinessStarNUM < 7 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 7 && this.state.cleanlinessStarNUM < 8 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 8 && this.state.cleanlinessStarNUM < 9 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 9 && this.state.cleanlinessStarNUM < 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.cleanlinessStarNUM >= 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                          </div>
                        }
                    </li>
                    <li>
                      <p>{language.Value}</p>
                      {this.state.valueStarNUM >= 0 && this.state.valueStarNUM < 1 &&
                          <div className="divxx">
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 1 && this.state.valueStarNUM < 2 &&
                          <div className="divxx">
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 2 && this.state.valueStarNUM < 3 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 3 && this.state.valueStarNUM < 4 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 4 && this.state.valueStarNUM < 5 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 5 && this.state.valueStarNUM < 6 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 6 && this.state.valueStarNUM < 7 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 7 && this.state.valueStarNUM < 8 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 8 && this.state.valueStarNUM < 9 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 9 && this.state.valueStarNUM < 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews1_5.png" alt="" />
                              <img src="../images/reviews1.png" alt="" />
                          </div>
                        }
                        {this.state.valueStarNUM >= 10 &&
                          <div className="divxx">
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                              <img src="../images/reviews2.png" alt="" />
                          </div>
                        }
                    </li>
                </ul>
            </div>

            <div className="ReviewsGuest">
              <ul>
                {this.state.neighbourhoodlist.map(item => (
                  <li>
                      <div className="GuestName">
                          <div className="uesrimg">
                            <img src='/images/uesrimg.png' alt="" />
                          </div>
                          <div className="uesrtext">
                              <p>{this.state.user}</p>
                              <p><Timestamp time={item.from.substring(0,10)} format='date'/></p>
                          </div>
                      </div>
                      <p className="GuestDiv">{item.comment ? item.comment : language.This_user_has_no_comments }</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={this.state.id=="" ? "Wallet_Reviews hide" : "Wallet_Reviews show"}>
            <p>{language.Write_your_review}</p>
              <div className="box1">
                  <div className="userimg">
                    <img src="/images/uesrimg.png"/>
                  </div>
                  <div className="usertext">
                    <h4>{this.state.user}</h4>
                    <p>{language.Your_reviews_will_be_posted_on_publicly_on_the_web}. {language.Learn_more}</p>
                  </div>
              </div>

              <ul className="box2">
                  <li>
                    <p>{language.Accuracy}</p>
                    <div className="divxx">
                      <img src={this.state.Accuracy >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:1})} />
                      <img src={this.state.Accuracy >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:2})} />
                      <img src={this.state.Accuracy >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:3})} />
                      <img src={this.state.Accuracy >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:4})} />
                      <img src={this.state.Accuracy >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Accuracy:5})} />
                    </div>
                  </li>
                  <li>
                    <p>{language.Location}</p>
                    <div className="divxx">
                      <img src={this.state.Location >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:1})} />
                      <img src={this.state.Location >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:2})} />
                      <img src={this.state.Location >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:3})} />
                      <img src={this.state.Location >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:4})} />
                      <img src={this.state.Location >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Location:5})} />
                    </div>
                  </li>
                  <li>
                    <p>{language.Communication}</p>
                    <div className="divxx">
                      <img src={this.state.Communication >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:1})} />
                      <img src={this.state.Communication >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:2})} />
                      <img src={this.state.Communication >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:3})} />
                      <img src={this.state.Communication >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:4})} />
                      <img src={this.state.Communication >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Communication:5})} />
                    </div>
                  </li>
                  <li>
                    <p>{language.Check_in}</p>
                    <div className="divxx">
                      <img src={this.state.Check_in >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:1})} />
                      <img src={this.state.Check_in >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:2})} />
                      <img src={this.state.Check_in >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:3})} />
                      <img src={this.state.Check_in >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:4})} />
                      <img src={this.state.Check_in >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Check_in:5})} />
                    </div>
                  </li>
                  <li>
                    <p>{language.Cleanliness}</p>
                    <div className="divxx">
                      <img src={this.state.Cleanliness >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:1})} />
                      <img src={this.state.Cleanliness >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:2})} />
                      <img src={this.state.Cleanliness >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:3})} />
                      <img src={this.state.Cleanliness >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:4})} />
                      <img src={this.state.Cleanliness >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Cleanliness:5})} />
                    </div>
                  </li>
                  <li>
                    <p>{language.Value}</p>
                    <div className="divxx">
                      <img src={this.state.Value >= 1 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:1})} />
                      <img src={this.state.Value >= 2 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:2})} />
                      <img src={this.state.Value >= 3 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:3})} />
                      <img src={this.state.Value >= 4 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:4})} />
                      <img src={this.state.Value >= 5 ? "../images/reviews2.png" : "../images/reviews1.png"} alt="" onClick={(e)=>this.setState({Value:5})} />
                    </div>
                  </li>
              </ul>

              <textarea placeholder={language.Describe_your_experiece_here} onChange={(e)=>this.setState({Comment:e.target.value})}></textarea>

              <div className="photos">
                  {this.state.selectedPictures.map((file,index) => (
                    <div className="photosimg" >
                      <img className="img-thumbnail" src={file.imagePreviewUrl} />
                      <span  className="glyphicon glyphicon-trash" onClick={this.deletePictures.bind(this,index)} ></span>
                    </div>
                    ))
                   }
                 <div className="photosipt">
                    <img src="../images/reviews3.png" />
                    <input className="btn btn-default btn-lg bg-pink color-white Fileipt" type="file" onChange={(e)=>this.fileChangedHandler(e)}/>
                 </div>
              </div>
              <p className="textpink">{this.state.PicturesSize}</p>

              <button className="Right" onClick={this.Reviews}>{language.POST}</button>
            </div>
        </div>
      }

      {this.state.neighbourhoodlist.length == 0 &&
        <div className="L_box6">
            <h5>{language.No_Reviews}</h5>
        </div>
      }
      </div>  
    );
  }
}
export default Reviews
