var http=require("http");
var fs=require("fs");
var qs=require("querystring");
//var EmpId;
var MongoClient=require('mongodb').MongoClient;


http.createServer(function(req,res)
{
    if(req.method=="GET")
    {
        res.end(`<!Doctype html>
        <html>
            <head>
                <title>Employee Details</title>
            </head>
            <body>
                <form action="/" method ="post">
                    <lable>EmpId</lable>
                    <input type="text" id="EmpId" name="EmpId" placeholder="Employee ID" required/>
                    <br/>
                    
                    <button>Get Details</button>
                </form>
            </body>
        </html>`);
    }
    else if(req.method=="POST")
    {
       
        var body="";
        req.on("data",function(chunk)
    {
        body+=chunk;
    
    });
    req.on("end",function()
    {
    var obj=qs.parse(body);
    console.log(obj.EmpId);
    EmpId=obj.EmpId;
   
    MongoClient.connect('mongodb://127.0.0.1:27017/website',function(err,db)
{
    if(err)
    {
        console.log(err);
    }
   
    db.collection('EmpProject').findOne({EmpId:EmpId},function(err,result)
    {
        if(err) throw err;    
        
           
        
       

         res.end(`<!Doctype html>
<html>
    <head>
        <title>Employee Details</title>
    </head>
    <body>
        <form action="/" method ="post">
            <lable>EmpId</lable>
            <input type="text" id="EmpId" name="EmpId" placeholder=${result.EmpId} required/>
            <br/>
            <lable>Name</lable>
            <input type="text" id="Name" name="Name" value=${result.Ename} required readonly/>
            <br/>
            <lable>Basic_Pay</lable>
            <input type="text" id="Basic_Pay" name="Basic_Pay" value=${result.BasicPay} required readonly/>
            <br/>
            <lable>NetPay</lable>
            <input type="text" id="NetPay" name="NetPay" value=${result.NetPay} required readonly/>
            <br/>
            <button>Get Details</button>
        </form>
    </body>
</html>`);

   
           
            
    });
   
    db.close();

   
   
});
  
   });
    
    }
}).listen(3000);



