const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=aa0f4a4893dd0d00278c1e9123ded633&query='+latitude+','+longitude+'&units=f';
    request({url:url,json:true},(error,response)=>{
       if(error){
           callback('Unable to connect to the services !',undefined)
       }else if(response.body.error){
            callback('Data not found !',undefined)
       }else{
           
        const result=response.body.current.weather_descriptions+' .Its currently '+ response.body.current.temperature +' degree(F) out and its feels like '+ response.body.current.feelslike +' degree(F) out here and humidity is '+response.body.current.humidity;
        callback(undefined,result);
    }
    })
}
module.exports=forecast