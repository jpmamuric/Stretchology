class NpsForecastMap extends React.Component {
  state = {
    forecast:{}
  };

  propTypes = {
    np_url: React.PropTypes.string,
    init_lat: React.PropTypes.number,
    init_lng: React.PropTypes.number
  };

  markers = [];


  render() {
    return <div className="NpsForecastMap" ref="mapdiv">
    </div>
  }

  componentDidMount() {
    this.map = this.createMap()
    this.loadFeatures()
  }

  createMap() {
    let mapOptions = {
      zoom: 3,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapdiv, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.init_lat,
      this.props.init_lng
    )
  }

  loadFeatures() {
    let self = this
    let infoWindow = new google.maps.InfoWindow()
    axios.get(self.props.nps_source)
        .then(function(result) {
           for (let val of result.data.features) {
             let marker = self.createMarker(val, self.map)

             marker.addListener('click', function() {
                infoWindow.close()
                let title = this.title
                let infoContent = ""
                let getWeather = false


                // check to see if we already have the forecast for this marker
                if (title in self.state.forecast) {
                  console.log("title in state")
                  infoContent = title + "<br>" + self.state.forecast[title]
                }
                else  {
                  infoContent = title + "<br>Loading Current Weather..."
                  getWeather = true
                }
                infoWindow.setContent(infoContent)
                infoWindow.open(self.map, this)

                if (getWeather) {
                  self.getForecast(marker.position.lat(),marker.position.lng())
                  .then(function(result) {
                        infoWindow.setContent(title + "<br>" + result)
                        self.state.forecast[title] = result
                        console.log("added forecast to state for " + title)
                  })
                }

            });

              self.markers.push(marker)

              } // for
        }); //then
  }

  createMarker(val, map) {
     let pointval = new google.maps.LatLng(
       parseFloat(val['geometry']['coordinates'][1]),
       parseFloat(val['geometry']['coordinates'][0]));
     let titleText = val['properties']['title']
     let marker = new google.maps.Marker({
       position: pointval,
       map: map,
       title: titleText
     });

    return marker
  }

 getForecast(lat, lng) {
   let forecast_p = new Promise(
      function(resolve,reject) {
        let request_url="https://crossorigin.me/https://api.darksky.net/forecast/8266ff95ef9bbfccf0ea24c325818f31/"

        request_url = request_url +  lat + "," + lng
         axios.get(request_url)
          .then(function(result) {
            let content =  result.data.daily.summary
            resolve(content)
         });
      }); // function(success,fail)

     forecast_p.then(
      function(result) {
        return result
      }
     )
   return forecast_p
  }

}

let init_lng = -98.5795
let init_lat = 39.8282
let nps_url = "https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/react_nps/np.geojson"

ReactDOM.render(<NpsForecastMap init_lat={init_lat} init_lng={init_lng} nps_source={nps_url} />, document.getElementById('container'));
