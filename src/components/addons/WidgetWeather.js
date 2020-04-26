import React, { Component } from 'react'
import { sys } from 'typescript';
// import M from '../../../node_modules/materialize-css/dist/js/materialize';
// import M from 'materialize-css'; or use M in window

class WidgetWeather extends Component {
   constructor (props) {
      super(props);
      this.myRef = React.createRef();
      this.state = {
         allData: undefined,
         city: "Kuala Lumpur",
         countryCode: undefined,
         temperature: undefined,
         weather: {
            title: undefined,
            description: undefined,
            icon: undefined
         }
      }
   }

   async componentDidMount() {
      const M = window.M;
      // console.log("tk it mounted",window);
      // M.AutoInit();

      //js way:
      // document.addEventListener('DOMContentLoaded', function() {
      //    let elems = document.querySelectorAll('.fixed-action-btn');
      //    let instances = M.FloatingActionButton.init(elems, {
      //       direction: 'left',
      //       hoverEnabled: false
      //     });
      //  });

      //react-way (using ref)
      M.FloatingActionButton.init(this.myInput, {
         direction: 'left',
         hoverEnabled: false
      });

      let options = {
         // inDuration: 300,
         // outDuration: 225,
         alignment: "right",
         coverTrigger: true,
         constrainWidth: false
      };

      let elems = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elems, options);


      const API_KEY = "test429736441cf3572838aa10530929f7cd";

      // calc kel to Celc method
      let toCelsius = (temp) => {
         let cel = Math.floor(temp - 273.15)
         return cel
      };

      //async await function
      try {
         const weather_resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}`)
         const weather_data = await weather_resp.json()
         console.log("tk did mount async way", weather_data);
         let data = weather_data //just for syntatic sugar 
         this.setState({
            allData: data,
            countryCode: data.sys.country,
            temperature: toCelsius(data.main.temp),
            weather: {
               id: data.weather[0].id,
               title: data.weather[0].main,
               description: data.weather[0].description,
               icon: data.weather[0].icon
            }
         })
         console.log("tk temp is", this.state.temperature);

         if (!weather_resp.ok) {
            console.log("tk weatherResp:", weather_resp.statusText); //"statusText" available when on fetch request
            throw Error(weather_resp.statusText);
         }
      } catch (error) {
         console.log("tk catch err ", error);
      }
   }

   render() {
      //api key here


      //fetch pure method
      // fetch(`http://api.openweathermap.org/data/2.5/weather?q=london&appid=${API_KEY}`)
      // .then(function(response){
      //    // console.log(response); 
      //    return response.json();
      // }).then(function(data){
      //    console.log("tk dta",data);
      // }).catch(function(error){
      //    console.log("Tk error",error);
      // });

      //fetch (arrow func)
      // fetch(`http://api.openweathermap.org/data/2.5/weather?q=london&appid=${API_KEY}`)
      // .then(response => response.json())
      // .then(data => console.log(data))
      // .catch((error) => {
      //    console.log("There was an error", error);
      // });

      //async await function (trigger method)
      // async function AsyGetWeather(place) { 
      //    const weather_response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}`);
      //    const weather_json = await weather_response.json();
      //    console.log("tk fn asyn way", weather_json);
      // }
      // AsyGetWeather("africa");

      return (
         <ul>
            <WeatherCard />
         </ul>
      )
   }
}

export default WidgetWeather;


const WeatherCard = () => {
   return (
      <div className="card-wrapper right">
         <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>W</a>
         {/* <!-- Dropdown Structure --> */}
         <ul id='dropdown1' className='dropdown-content'>
            <div className="small weather-widget">
               <div className="card blue-grey darken-1 m-0">
                  <div className="card-content white-text">
                     <div className="top-row">
                        <div className="top-left">4:15px</div>
                        <div className="top-right">right</div>
                     </div>
                     <div className="card-title center-align">Icon</div>
                     <div className="card-title center-align">37<span>&#176;</span></div>
                     <div className="card-title text-location center-align ">Kuala Lumpur,&nbsp;<span>MY</span></div>
                  </div>
               </div>
            </div>
         </ul>
      </div>
   )
}

