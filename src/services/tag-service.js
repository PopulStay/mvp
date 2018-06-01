import axios from 'axios';

class TagService {
  static instance

  getCitytype(CityStorage,GuestStorage,Home_TypeStorage,PriceminStorage,PricemaxStorage){
    return new Promise((resolve, reject) => {
        axios.get(process.env.Server_Address+'HouseInformation?guests>'+GuestStorage
                                                          // +'&houseinfo.category='+Home_TypeStorage
                                                          // +'&price>='+PriceminStorage
                                                          // +'&price<='+PricemaxStorage
                                                          // +'&place='+CityStorage
                                                          )
        .then((response)=> {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  }

  const tagService = new TagService()

export default tagService
