export const encode = (idparameter) => {
    let round = 3;
    let dataencode = ""
    let getdata = "";
    for (let i = 0; i < round; i++) {
        if (i == 0) {
            dataencode = Buffer.from(idparameter.toString(), "utf8").toString("base64");
            getdata = dataencode
        } else {
            dataencode = Buffer.from(getdata.toString(), "utf8").toString("base64");
            getdata = dataencode
        };
    }
    return dataencode;
}
export const decode = (idparameter) => {
    let round = 3;
    let datadecode = ""
    let getdecode = "";
    for (let j = 0; j < round; j++) {
        if (j == 0) {
            datadecode = Buffer.from(idparameter.toString(), "base64").toString("utf8");
            getdecode = datadecode
        } else {
            datadecode = Buffer.from(getdecode.toString(), "base64").toString("utf8");
            getdecode = datadecode
        }
    }
    return datadecode;
}