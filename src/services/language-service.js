const localeList = {
  "en_US": require('../locale/en_US.js'),
  "zh_CN": require('../locale/zh_CN.js'),
};

class LanguageService {
    language(){
		window.localeList = localeList;
      	if(!localStorage.getItem('language') && !localStorage.getItem('Country')){
            window.languageActive = 'en_US';

            for (var item1 in localeList) {
                if(item1 == window.languageActive){
                    window.languagelist = localeList[item1];
                }
            }

            localStorage.setItem('Country','English');
            localStorage.setItem('Currency','USD');
            localStorage.setItem('Countryimg','../images/America.png');
            localStorage.setItem('language', window.languageActive);
        }else{
            window.languageActive = localStorage.getItem('language')
            for (var item2 in localeList) {
                if(item2 == window.languageActive){
                    window.languagelist = localeList[item2];
                }
            }
            localStorage.getItem('language');
            localStorage.getItem('Country');
            localStorage.getItem('Currency');
            localStorage.getItem('Countryimg');
        }

      
   }

}

  const languageService = new LanguageService()
export default languageService