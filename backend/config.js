const mysql=require('mysql');
const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'admin'
});

conn.connect((err)=>{
    if(err)
    {
        console.warn('Connection Error');
    }
    else
    {
        console.warn('Connection Successful');
    }
})

module.exports=conn;