const request  = require('request')

const forecast = (latitude,longitude,callback)  =>{
    const url = 'http://api.weatherstack.com/current?access_key=5447134b4cecba0ecee65db2240c65c6&query='  + latitude + ',' + longitude +'&units=f'

  //   request ({ url:url,json:true },(error,response) => {
     
  //     if(error){
  //       callback('Unable to connect to Weather Api !',undefined)
  //     } else if(response.body.error) {
  //       callback('Unable to find location!',undefined)
  //     } else{
  //        callback(undefined,response.body.current.weather_descriptions[0] +". It is currently " + response.body.current.temperature +" degree out. It feels like " + response.body.current.feelslike + " degree out")
  //     }
  // })

  request ({ url,json:true },(error,{ body }) => {
     
    if(error){
      callback('Unable to connect to Weather Api !',undefined)
    } else if(body.error) {
      callback('Unable to find location!',undefined)
    } else{
       callback(undefined,body.current.weather_descriptions[0] +". It is currently " + body.current.temperature +" degree out. It feels like " + body.current.feelslike + " degree out")
    }
})
}

module.exports =forecast