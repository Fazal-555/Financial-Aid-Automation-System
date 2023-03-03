export const stu_info = async (setStu_data, Setparsecheck) => {
    const res = await fetch('/Student_Info',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({ arn_num: sessionStorage.getItem('ARN') })
            }
        }
    )
    await res.json().then((data) => {
        setStu_data(data[0]);
        Setparsecheck(1);
    });
}

export const admin_info = async (setadm_data, path, Setparsecheck, setBatch, setFa_show, setLoad) => {
    const res3 = await fetch('/admindata', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({ dynamic: 1 })
        }
    }
    )
    await res3.json().then((res3) => {
        setFa_show(res3[0]['fa_check'])
        setLoad(0);
    }
    )
    const res = await fetch(path);
    await res.json().then((data) => {
        setadm_data(data);
        let arraydata = [5];
        data[0].forEach(element => {
            arraydata = [...arraydata, Number(element['batch'])]
            // console.log(arraydata)
        });
        setBatch(arraydata);
        Setparsecheck(1);
    });

}

export const search = async (param, setdata) => {
    // console.log(param)
    if (param) {
        const res = await fetch('/Student_Info',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    body: JSON.stringify({ arn_num: param })
                }
            }
        )
        await res.json().then((data) => {
            if (data)
                setdata(data);
        });
    }

}

export const Stu_department = async (target, setDepartment, setData1) => {
    const targetdept = target;
    if (target === 'BA') {
        target = "BBA";
    }
    else if (target !== 'all') {
        target = "BS" + target
    }
    const res = await fetch('/Appsdepartment', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({ stu_degree: target })
        }
    });
    await res.json().then((data) => {
        setData1(data);
    });
    setDepartment(targetdept);
}

export const Stu_batch = async (target, setBatch1, setData1) => {
    const res = await fetch('/Appsbatch', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({ stu_batch: target })
        }
    });
    await res.json().then((data) => {
        setData1(data);
    });
    setBatch1(target);
}

export const reg_path_check = async (check, navigate) => {
    const path = await fetch('/reg_path',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                body: JSON.stringify({ arn_num: sessionStorage.getItem('ARN') })
            }
        }
    )
    await path.json().then(data => {
        if (check !== data[0]['regform_check']) {
            // console.log(data[0]['regform_check'])
            if (data[0]['regform_check'] === 'false') {
                navigate("/Registration_Form");
            }
            else {
                navigate("/" + data[0]['regform_check']);
                console.log("hello")
            }
            // console.log("/"+data[0]['regform_check'])
        }
    })

}

export const Stu_app_status = async (target, setStat, setData1) => {

    const res = await fetch('/Appstatus', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            body: JSON.stringify({ fa_per_check: target })
        }
    });
    await res.json().then((data) => {
        // console.log(data)
        setData1(data);
    });
    setStat(target);
}