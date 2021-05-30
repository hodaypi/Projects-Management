//express
const express = require('express')
const app = express()
app.use(express.static('public'))
const axios = require('axios')
const moment = require('moment')
////////////////////////////////////////
//env
const dotenv=require('dotenv')
dotenv.config()

//use cookie
var cookieParser = require('cookie-parser')
app.use(cookieParser())

//body parser
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')
const port = process.env.PORT || 3000

//mongoose
const mongoose = require ('mongoose')
//dbURI= 'mongodb+srv://Hodaya:hp1234@mhyhmcluster.d5gdr.mongodb.net/MHYHMdatabase?retryWrites=true&w=majority'
//connect to mongoDB
mongoose.connect(process.env.dbURI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then((result)=> {
     console.log('connected')
    })
    .catch ((err)=>console.log(err))

//routers

//app.use('/user',require('./route/api'))
app.use('/salary',require('./route/SalaryAPI'))
app.use('/attendanceReport',require('./route/AttendanceReportAPI'))
app.use('/companyEmployee',require('./route/CompanyEmployeeAPI'))
app.use('/contractorWorker',require('./route/ContractorWorkerAPI'))
app.use('/employer',require('./route/EmployerAPI'))
app.use('/employment',require('./route/EmploymentAPI'))
app.use('/errorReport',require('./route/ErrorReportsAPI'))
app.use('/vacation',require('./route/VacationAPI'))
app.use('/api',require('./route/api'))
///try
app.use('/auth',require('./route/authAPI'))
//error handling
app.use(function (err,req,res,next){
    res.status(422).send({error:err.message})
})
app.listen(port,()=>{console.log(`server is up and running at: http://127.0.0.1:${port}`)})



const Employment=require('./models/Employment')
async function updateEmploymentToday() {
    var date = new Date()
    date.setDate(date.getDate()-1)
    var date2 = new Date()
    date2.setDate(date.getDate()+2)
    var q = {
        workDate: {$gt: date, $lte: date2}
    }
    await Employment.updateMany(q, {$set: {status: 'Current'}}).then((result) => {
        console.log('updated successfully')
    }).catch(e=>{
        console.log(e)
    })
    var date2 = new Date()
    var q2={
        workDate:{$lt:date2}
    }
    await Employment.updateMany(q2, {$set: {status: 'Closed'}}).then((result) => {
        console.log('updated successfully')
    }).catch(e=>{
        console.log(e)
    })

}

/*--------------------------------GET HTMLS---------------------------------*/
//loginController(app)
app.get('/', (req, res)=>{
     updateEmploymentToday().then(z=>{
         res.render('HomeNavUser')
     })
})

app.get('/employeesFilters',((req, res) => {
    res.render('employeesFilters')
}))
app.get('/getBookedEmployeesToday',((req, res) => {
    res.render('getBookedEmployeesToday')
}))

app.get('/filterEmploymentsByBookingDate',((req, res) =>
{
    res.render('filterEmploymentsByBookingDate')

}))

app.get('/filterEmploymentsByBookingMonth',((req, res) =>
{
    res.render('filterEmploymentsByBookingMonth')

}))
app.get('/filterEmployeesByStatus',((req, res) =>
{
    res.render('filterEmployeesByStatus')

}))

app.get('/TotalhourWorkinMonth',((req, res) =>
{
    res.render('TotalhourWorkinMonth')

}))

app.get('/compareTwoMonthSalaries',((req, res) =>
{
    res.render('compareTwoMonthSalaries')

}))
app.get('/todaySalaryContractorWorker',((req, res) =>
{
    res.render('todaySalaryContractorWorker')

}))
app.get('/thisYearProfit',((req, res) =>
{
    res.render('thisYearProfit')

}))
app.get('/rangeOfSalaryByShifts',((req, res) =>
{
    res.render('rangeOfSalaryByShifts')

}))
app.get('/TodaySalary',((req, res) =>
{
    res.render('TodaySalary')

}))

app.get('/totalWageByMonth',((req, res) =>
{
    res.render('totalWageByMonth')

}))
app.get('/thisMonthSalary',((req, res) =>
{
    res.render('thisMonthSalary')

}))

app.get('/filterEmployeesByStatusFuture',((req, res) =>
{
    res.render('filterEmployeesByStatusFuture')
}))

app.get('/employerSearch',((req, res) =>
{
    res.render('employerSearch')
}))

app.get('/employerRegister',((req, res) =>
{
    res.render('employerRegister')
}))

app.get('/filterbycompanyName',((req, res) =>
{
    res.render('filterbycompanyName')

}))
app.get('/filterEmployeesByposition',((req, res) =>
{
    res.render('filterEmployeesByposition')
}))

app.get('/filterByfieldOfEmployment',((req, res) =>
{
    res.render('filterByfieldOfEmployment')
}))


app.get('/filterEmploymentsByemployerID',((req, res) =>
{
    res.render('filterEmploymentsByemployerID')
 
}))

app.get('/employerSearch',((req, res) =>
{
    res.render('employerSearch')
}))

app.get('/employmentsList',((req, res) =>
{
    res.render('employmentsList')
 }))

app.get('/getWageByMonth',((req, res) =>
{
    res.render('getWageByMonth')
}))

app.get('/AttandenceList',((req, res) =>
{
    res.render('AttandenceList')
}))
mongoose.set('useFindAndModify', false)