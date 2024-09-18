// get user input of cityName
function checkUserCityName(cityName){
    let userCityNameEntered = true;

    if (cityName.length === 0){
        userCityNameEntered = false;
    } else {
        userCityNameEntered = true;
    }

    return userCityNameEntered;
}

describe("check user city name input", () => {

    test('user has NOT entered the city name', () => {
        expect(checkUserCityName("")).toBeFalsy();    
    });
    test('user has entered the city name', () => {
        expect(checkUserCityName("New York")).toBeTruthy();    
    });
  })
