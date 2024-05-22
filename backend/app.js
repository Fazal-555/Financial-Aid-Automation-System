const express = require('express');
const conn = require('./config');
const app = express();
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')

// ---- LOGIN ----

app.post('/signin',async (req, res) => {
    // res.send(req.rawHeaders[31]);
    const recvdata = JSON.parse(req.rawHeaders[31]);
    console.log("hello")
    conn.query(`select arn_num,password from studentdata where arn_num = ${recvdata['arn_num']} and password = '${recvdata['password']}'`,async (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            if (JSON.stringify(result) == '[]') {
                res.send(JSON.stringify([{ arn_num: 'false', password: 'false' }]))
            }
            else {
                const token = await jwt.sign({
                    arn_num:recvdata['arn_num'],
                    password:recvdata['password']
                },"iamperformingjwtauthenticationonourfaautomationsystem",{
                    expiresIn:"10 minutes"
                   });
                
                    console.log(token);

                res.send({result,token});
            }

        }
    })

});

app.post('/Student_Info', (req, res) => {
    const recvdata = JSON.parse(req.rawHeaders[31]);
    conn.query(`select * from registration_form_details where arn=${recvdata['arn_num']}`, (err2, data2) => {
        if (err2) {
            res.send(err2)
        }
        else {
            res.send(data2);
        }
    })
});

app.post('/regform_check', (req, res) => {
    // res.send(req.rawHeaders[31]);
    const recvdata = JSON.parse(req.rawHeaders[31]);
    conn.query(`select regform_check from studentdata where arn_num = ${recvdata['arn_num']}`, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })

});

app.post('/Profile_show', (req, res) => {
    const recvdata = JSON.parse(req.rawHeaders[31]);
    conn.query(`select check1,reg_end_check,fa_per_check from registration_form_details where arn=${recvdata['arn_num']}`, (err2, data2) => {
        if (err2) {
            res.send(err2)
        }
        else {
            conn.query("select fa_check from admindata where id=1", (err3, data3) => {
                if (err3) {
                    res.send(err3)
                }
                else {
                    data2 = [{ ...data2[0], ...data3[0] }]
                    // console.log(data2)
                    res.send(data2);
                }
            })
        }
    })
})

// ----- REGISTER------

app.post('/reg_data', (req, res) => {
    const recvdata = JSON.parse(req.rawHeaders[31]);
    let query = "UPDATE `registration_form_details` SET ";
    for (var i in recvdata) {
        if (i != 'arn' && i != 'path') {
            // console.log(recvdata[i]+typeof(recvdata[i])+"\n")
            if (recvdata[i] == '')
                query += `${i} = '',`;
            else
                query += `${i} = '${recvdata[i]}',`;
        }
    }
    let query1 = query.substring(0, query.length - 1);
    query1 += ` where arn=${recvdata['arn']}`;
    // console.log("\n\n"+query1);
    conn.query("Update `studentdata` set regform_check = " + `${recvdata['path']} where arn_num=${recvdata['arn']}`, (err1, result1) => {
        if (err1) {
            // console.log(err1)
            res.send(err1);
        }
        else {
            if (recvdata['path'] != '"false"') {
                // console.log("hello")
                conn.query(query1, (err, result) => {
                    if (err) {
                        // console.log("by",err)
                        res.send(err);
                    }
                    else {
                        // console.log(result)
                        res.send(JSON.stringify([{ success: 'true' }]));
                    }
                })
            }
            else {
                // console.log("hello ", result1)
                res.send(JSON.stringify([{ success: 'true' }]));
            }
        }
    })

})

app.post('/send1', (req, res) => {
    const recvdata = JSON.parse(req.rawHeaders[31]);
    conn.query("INSERT INTO registration_form_details set ?", recvdata, (err, result) => {
        if (err) {
            res.send();
        }
        else {
            res.send(JSON.stringify([{ success: 'true' }]));
        }
    })
})


// ----- Signning up//

app.post('/signup', (req, res) => {
    const recvdata = JSON.parse(req.rawHeaders[31]);
    conn.query(`select arn_num from studentdata where arn_num = ${recvdata['arn_num']}`, (err, result) => {
        if (err) {
            res.send(err);
        }

       
        else {
            if (JSON.stringify(result) == '[]') {
                conn.query("INSERT INTO studentdata set ?", recvdata, (err, result) => {
                    if (err) {
                        res.send(err);
                    }
                    
                    else {
                        conn.query("INSERT INTO `registration_form_details`(`arn`, `fath_cell_number`, `fath_cnic`, `fath_email`, `fath_employment`, `fath_employment_data`, `fath_name`, `fath_postal_address`, `fath_profession`, `fath_relation`, `fath_telephone`, `moth_cell_number`, `moth_cnic`, `moth_email`, `moth_employment`, `moth_employment_data`, `moth_name`, `moth_postal_address`, `moth_profession`, `moth_telephone`, `sibling_not_working`, `sibling_working`, `stu_cell_number`, `stu_cnic`, `stu_degree`, `stu_email`, `stu_name`, `stu_postal_address`, `Income_1_1`, `Income_1_2`, `Income_1_3`, `Income_1_4`, `Income_2_1`, `Income_2_2`, `Income_2_3`, `Income_2_4`, `Income_3_1`, `Income_3_2`, `Income_3_3`, `Income_3_4`, `Title_1_1`, `Title_1_2`, `Title_1_3`, `Title_1_4`, `Title_2_1`, `Title_2_2`, `Title_2_3`, `Title_2_4`, `Title_3_1`, `Title_3_2`, `Title_3_3`, `Title_3_4`, `assets`, `investments`, `properties`, `vechiles`, `electricity_expenses`, `gas_expenses`, `telephone_expenses`, `check1`, `reg_end_check`) VALUES (" + recvdata['arn_num'] + ",'','','','','[]','','','','','','','','','','[]','','','','','[]','[]','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','[]','[]','[]','[]','[]','[]','[]','1','1')", (err1, data1) => {
                            if (err1) {
                                console.log('not ok');
                                res.send(err1);
                            }
                            else {
                                console.log('ok')
                                res.send(JSON.stringify([{ success: 'true' }]));
                            }
                        })

                    }
                })
            }
            else {
                res.send(JSON.stringify([{ success: 'false' }]))
            }
        }
    })

});

app.get('/admin', (req, res) => {
    // res.send("send route");
    conn.query("select usr_name,password from admindata where id=1", (err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
        // res.send(req.rawHeaders[31]);
    })
}
);

app.post('/admindata', (req, res) => {
    // res.send("send route");
    const recvdata = JSON.parse(req.rawHeaders[31]);
    if (recvdata['dynamic'] === 1) {
        conn.query("select fa_check from admindata where id=1", (err, result) => {
            if (err) { res.send(err); }
            else { res.send(result); }
            // res.send(req.rawHeaders[31]);
        })
    }
    else if (recvdata['dynamic'] === 0) {
        console.log(recvdata)
        conn.query("UPDATE `admindata` SET fa_check = " + `${recvdata['fa_show']} where id=1`, (err, result) => {
            if (err) { res.send(err); }
            else { res.send({ fa_check: recvdata['fa_show'] }); }
        });
    }
}
);

app.post('/std_profile', (req, res) => {
    // res.send("send route");
    const recvdata = JSON.parse(req.rawHeaders[31]);
    conn.query(`select stu_cell_number,stu_cnic,stu_degree,stu_email,stu_name,stu_postal_address,fath_name from registration_form_details where arn=${recvdata['arn_num']}`, (err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
        // res.send(req.rawHeaders[31]);
    })
}
);

app.get('/Appsdata', (req, res) => {
    conn.query("select * from registration_form_details limit 40", (err, result) => {
        if (err) { res.send(err); }
        else {
            conn.query("select DISTINCT SUBSTRING(arn, 1, 2) as batch from registration_form_details", (err1, result1) => {
                if (err) { res.send(err); }
                else {
                    result1 = [result1, ...result]
                    res.send(result1);
                }
                // res.send(req.rawHeaders[31]);
            })
            // res.send(result);
        }
        // res.send(req.rawHeaders[31]);
    })
});

app.post('/Appsdepartment', (req, res) => {
    const depart_name = JSON.parse(req.rawHeaders[31]);

    if (depart_name["stu_degree"] != 'all') {
        conn.query(`select * from registration_form_details where stu_degree = '${depart_name["stu_degree"]}' limit 40`, (err, result) => {
            if (err) { res.send(err); }
            else { res.send(result); }
            // res.send(req.rawHeaders[31]);
        })
    }
    else {
        conn.query(`select * from registration_form_details limit 40`, (err, result) => {
            if (err) { res.send(err); }
            else { res.send(result); }
            // res.send(req.rawHeaders[31]);
        })
    }

});

app.post('/Appstatus', (req, res) => {
    const app_status = JSON.parse(req.rawHeaders[31]);
    let query = "";
    // console.log(app_status['fa_per_check'])
    if (app_status['fa_per_check'] == 1) {
        query = `select * from registration_form_details where fa_per_check > '${app_status["fa_per_check"]}' limit 40`;
    }
    else if (app_status['fa_per_check'] == 0) {
        query = `select * from registration_form_details where fa_per_check = '${app_status["fa_per_check"]}' limit 40`;
    }
    else {
        query = `select * from registration_form_details limit 40`;
    }
    conn.query(query, (err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
        // res.send(req.rawHeaders[31]);
    })

});

app.post('/Appsbatch', (req, res) => {
    const depart_name = JSON.parse(req.rawHeaders[31]);
    console.log(depart_name)
    if (depart_name["stu_batch"] != 5) {
        conn.query(`select * from registration_form_details where SUBSTRING(arn, 1, 2) = '${depart_name["stu_batch"]}' limit 40`, (err, result) => {
            if (err) { res.send(err); }
            else {
                res.send(result);
            }
            // res.send(req.rawHeaders[31]);
        })
    }
    else {
        conn.query(`select * from registration_form_details limit 40`, (err, result) => {
            if (err) { res.send(err); }
            else { res.send(result); }
            // res.send(req.rawHeaders[31]);
        })
    }

});

app.post('/Profile_update', (req, res) => {
    const recvdata = JSON.parse(req.rawHeaders[31]);
    // console.log(recvdata)
    let query1 = "UPDATE `studentdata` SET regform_check ='Registration_Form/RegForm'";
    query1 += ` where arn_num=${recvdata['arn_num']}`;
    conn.query(query1, (err1, result1) => {
        if (err1) {
            res.send([{ success: 'false' }]);
        }
        else {
            res.send([{ success: 'true' }])
        }
    })

})

app.post('/Fa_update', (req, res) => {
    const recvdata = JSON.parse(req.rawHeaders[31]);
    // console.log(recvdata)
    let query1 = "UPDATE `registration_form_details` SET fa_per_check = ";
    query1 += `${recvdata['fa_per_check']} where arn=${recvdata['arn_num']}`;
    conn.query(query1, (err1, result1) => {
        if (err1) {
            console.log(err1)
            res.send([{ success: 'false' }]);
        }
        else {
            res.send([{ success: 'true' }])
        }
    })

})

app.post('/reg_path', (req, res) => {
    // res.send("send route");
    const recvdata = JSON.parse(req.rawHeaders[31]);
    conn.query(`select regform_check from studentdata where arn_num=${recvdata['arn_num']}`, (err, result) => {
        if (err) { res.send(err); }
        else { res.send(result); }
        // res.send(req.rawHeaders[31]);
    })
}
);

app.post('/Profile_delete', (req, res) => {
    // res.send("send route");
    const recvdata = JSON.parse(req.rawHeaders[31]);

    conn.query(`delete from studentdata where arn_num=${recvdata['arn_num']}`, (err, result) => {
        if (err) { res.send([{ success: 'false' }]); }
        else {
            conn.query(`delete FROM registration_form_details WHERE arn = ${recvdata['arn_num']}`, (err1, result1) => {
                if (err1) {
                    res.send([{ success: 'false' }]);
                }
                else {
                    console.log("wao")
                    res.send([{ success: 'true' }])
                }
            })
        }
        // res.send(req.rawHeaders[31]);
    })
}
);


// 

// const createToken = async() => {


//     const userver = await jwt.verify(token, "iamperformingjwtauthenticationonourfaautomationsystem");
//     console.log(userver);

// }

// // function call, where i want to generate that token
// createToken();



app.listen(4000, () => {
    console.log("Server is listening at port 4000");
})