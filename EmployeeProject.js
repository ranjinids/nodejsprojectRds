var http=require("http");
//var fs=require("fs");
var qs=require("querystring");
var grosspay;

var MongoClient=require('mongodb').MongoClient;


http.createServer(function(req,res)
{
    if(req.method=="GET")
    {
        res.end(`<!Doctype html>
        <html>
            <head>
                <title>Employee Information</title>
            </head>
            <body>
            <centre>
                <form action="/" method ="post">
                    <li><lable>Emp ID</lable>
                    <input type="text" id="Eid" name="Eid" placeholder="enter emp id" required/></li>
                    <br/>
                    <li>
                    <lable>Emp Name</lable>
                    <input type="text" id="Ename" name="Ename"/></li>
                    <br/>
                    <li>
                    <lable>Basic pay</lable>
                    <input type="text" id="Bpay" name="Bpay"/></li>
                    <br/>
                    <button>submit</button>
                </form>
            </centre>   
            </body>
        </html>`);

    }
    else if(req.method=="POST")
    {
       
        var body="";
        req.on("data",function(chunk)
    {
        body+=chunk;
        //console.log(data);
    });
    req.on("end",function()
    {
    var obj=qs.parse(body);
    console.log(obj.Basicpay);

    Eid=parseInt(obj.Eid);
    Ename=obj.Ename;
    
    Bpay=parseFloat(obj.Bpay);
    if(obj.Bpay>=50000)
    {
        grosspay=Bpay+(0.4)*Bpay;
        Netpay=grosspay-1000;
    }else
    {
        grosspay=Bpay+(0.3)*Bpay;
        Netpay=grosspay-1000;
    }
    
 
    res.end(`<!Doctype html>
    <html>
        <head>
            <title>Temperature convertion</title>
        </head>
        <body>
        
            <form action="/" method ="post">
            <li><lable>Emp ID</lable>
            <input type="text" id="Eid" name="Eid" placeholder="${Eid}" required/></li>
            <br/>

            <li><lable>Emp Name</lable>
            <input type="text" id="Ename" name="Ename" placeholder="${Ename}"  required /></li>
            <br/>
            <li>
            <lable>Basic pay</lable>
            <input type="text" id="Bpay" name="Bpay" placeholder="${Bpay}" required /></li>
            <br/>
            <li>
            <lable>Net Pay</lable>
            <input type="text" id="Npay" name="Npay" value="${Netpay}" readonly/></li>
           
            </form>
        
        </body>
    </html>`);

    MongoClient.connect('mongodb://127.0.0.1:27017/website',function(err,db)
{
    if(err)
    {
        console.log(err);
    }
    var insertdoc = [{ EmpId:Eid,Ename:Ename,BasicPay:Bpay,NetPay:Netpay}];
    db.collection('EmpProject').insertMany(insertdoc,function(err,result)
    {
        if(err) throw err;
        {
        console.log("document inserted sucessfully");
        }
    });
       
    db.close();
    
});

    //res.end("fahren = "+fahren.toString()+" celsius= "+celcius.toString());
    });
    
    }
}).listen(3000);






