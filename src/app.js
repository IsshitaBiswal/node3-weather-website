const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app = express()

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname,'../public') //generated the path to public folder

// const viewsPath = path.join(__dirname,'../templates')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION 
app.set('view engine', 'hbs')
//we can now use handlebars to create dynamic pages

app.set('views', viewsPath )

hbs.registerPartials(partialsPath)

// SETUP STATIC DIRECTORY TO SERVE 
//configure express to serve that dicrectory 
app.use(express.static(publicDirectoryPath))  //static in someway configures our express application
//app.use() is a way to customize ur server

// app.get('',(req,res) => {
//     res.render('index')
// })

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Isshita'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:"About me",
        name:"Isshita"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helptext:'This is some helpful text',
        title:'help',
        name:"Isshita"
    })
})

// app.get('', (req,res) =>{
//     res.send('Hello Express!')
// })

// app.get('', (req,res) =>{
//     res.send('<h1>Weather<h1>')
// })

// app.get('/help', (req,res) =>{
//     res.send('Help Page')
// })

// we either provide  an object or an array a value to set
// app.get('/help', (req,res) =>{
//     res.send({
//         name:'Isshita',
//         age:21
//     })
// })

// app.get('/help', (req,res) =>{
//     res.send([{
//         name:'Isshita'
//     },{
//         name:'Lachi'
//     }])
// })
//now when we visit this page we will get a json response back .Express is gonna detect we have provided an object it will automatically gonna stringify json for us it will sent it to the requester

// app.get('/about', (req,res) =>{
//     res.send('About ')
// })

// app.get('/about', (req,res) =>{
//     res.send('<h1>About<h1> ')
// })
 
// app.get('/weather', (req,res) =>{
//     res.send('Your Weather')
// })

// app.get('/weather', (req,res) =>{
//     res.send({
//         forecast:'It is sunny',
//         location:'Barbil'
//     })
// })

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return  res.send({
             error:'You must provide an address!'
         })
     }
    geocode (req.query.address,(error,{ latitude, longitude, location} ={}) =>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData) =>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            // res.send({
            //     forecast:'It is sunny',
            //     location:'Barbil',
            //     address:req.query.address
            // })
        })
    })
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
       return  res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*', (req,res) =>{
    // res.send('Help article not found')
    res.render('404',{
        title:'404',
        name:'Isshita',
        errorMessage:'Help article  not found'
    })
})

app.get('*', (req,res) =>{
    // res.send('My 404 page')
    res.render('404',{
        title:'404',
        name:'Isshita',
        errorMessage:'Page not found'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})