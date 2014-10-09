var request = require("request")


var url = "https://script.google.com/macros/s/AKfycbzM_a6r68CIfpX4bOh3UiYXoTYXrf8xQ448Mg1shrR67GibDGE/exec?spreadsheet=1PcZjEkJA5KoKpllsvm9oBFy6NakyQI7tWyg2gjUvczs&sheet=adapter"

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    }
})