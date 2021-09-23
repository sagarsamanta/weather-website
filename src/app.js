const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { response } = require('express')

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

const port=process.env.PORT || 3000;

app.get('',(req,res)=>{
    // res.locals.title='Index page now' // local for each individual render page
    res.render('index',{
        title:'Weather page',
        name:'sagar samanta'
    })
})
app.get('/about',(req,res)=>{
    // res.locals.title='About page now'
    res.render('about',{
        title:'about page',
        name:'sagar samanta'
    })       
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return  res.send({
            error:'Please send the address !'
        })
    } 
   const address=req.query.address
//    geocode(address,(error,data)=>{ //
   geocode(address,(error,{latitude,longitude,location}={})=>{  // we can use object destrucure method and if object value is undefine then here we set defalut value is empty object {}
       if(error){
           return res.send({
               error:error
           })
       }       
    //    const latitude=data.latitude;
    //    const longitude=data.longitude;
    //    const location=data.location
       forecast(latitude,longitude,(error,response)=>{
           if(error){
               return res.send({
                   error:error
               })
           }
           res.send({
               forecast:response,
               location:location,
               address:address
            })
       })
       
   })
        
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            Error:"Plese send an search area.!"
        })
    }
    res.send({
        search:req.query.search
    })
})
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:' sagar samanta'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error 404',
        name:'sagar',
        errorMessage:'Help artical not found'
    })
})
app.get('*',(req,res)=>{
  res.render('404',{
      title:'Page 404',
      errorMessage:'Page not found',
      name:'sagar'
  })
})


app.listen(port,()=>{
    console.log('server listining at port '+port)
})