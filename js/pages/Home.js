import tpl from '../utils/avecTemplateHtml'
import {http_get} from '../utils/request'
import validator from '../../node_modules/validator/es/index'

export default tpl({
    template: 'home.html',
    data() {
        return {
            city: "",
            apiJson: "",
            clicked: true,
            rain: false,
            snow: false,
            nom: "",
            temp: "",
            tempRes: "",
            desCourte: "",
            icone: "",
            ventKmh: "",
            ventDir: "",
            fusHor: "",
            prePluie: "",
            preNeige: "",
            levSol: "",
            couchSol: "",
            errorMessage: null,
            isCold: false,
            isHot: false,
            isNormal: false,
            results: false,
            


        }
    },
    methods: {
        getWeather(e) {
            e.preventDefault()

            if (this.validation()) {
                this.displayWeather()
            }

        },

        validation() {
            // Validation

            let validation = true

            if (validator.isEmpty(this.city)){
                this.errorMessage = "Ca ne peut pas etre vide"
                validation = false
            }

            return validation
        },

        displayWeather() {
            http_get("http://api.openweathermap.org/data/2.5/weather?q=" + this.city + "&lang=fr&appid=92167ade5a3d03db0f1e05236dbbc568&units=metric").then(apiJson => {
               if (apiJson.cod == 404){
                   this.results = true;
                   return
                   
               }
                let weatherApi = apiJson;
                this.clicked = false
                this.nom = weatherApi.name

                this.temp = Math.round(weatherApi.main.temp)
                this.tempRes = Math.round(weatherApi.main.feels_like)
                this.desCourte = weatherApi.weather[0].description

                this.icone = "http://openweathermap.org/img/wn/" + weatherApi.weather[0].icon + "@2x.png"
                this.ventKmh = weatherApi.wind.speed

                // ------- degree to direction-------------//

                this.ventDir = weatherApi.wind.deg
                if (this.ventDir >= 337.5 || this.ventDir <=22.5){
                    this.ventDir = "N"
                }
                if (this.ventDir > 22.5 && this.ventDir <= 67.5){
                    this.ventDir = "NE"
                }
                if (this.ventDir > 67.5 && this.ventDir <= 112.5){
                    this.ventDir = "E"
                }
                if (this.ventDir > 112.5 && this.ventDir <= 157.5){
                    this.ventDir = "SE"
                }
                if (this.ventDir > 157.5 && this.ventDir <= 202.5){
                    this.ventDir = "S"
                }
                if (this.ventDir > 202.5 && this.ventDir <= 247.5){
                    this.ventDir = "SW"
                }
                if (this.ventDir > 247.5 && this.ventDir <= 292.5){
                    this.ventDir = "W"
                }
                if (this.ventDir > 292.5 && this.ventDir <= 337.5){
                    this.ventDir = "NW"
                }
            
                this.fusHor = weatherApi.timezone / 60 / 60

                // --------------- Conditional for weather conditions ------------
               
                if (weatherApi.weather[0].main == "Rain" && weatherApi.rain["1h"] !== "" ){
                    this.rain = true
                    this.prePluie = weatherApi.rain["1h"]
                }
              
                // ------------------------------------------------------


                let date = new Date(weatherApi.sys.sunrise * 1000)
                let hours = date.getHours()
                let minutes = "0" + date.getMinutes()

                this.levSol = hours + ':' + minutes.substr(-2)
                let date1 = new Date(weatherApi.sys.sunset * 1000)
                let hours1 = date1.getHours()
                let minutes1 = "0" + date1.getMinutes()

                this.couchSol = hours1 + ':' + minutes1.substr(-2)
            })
        }

       
        
    }
})