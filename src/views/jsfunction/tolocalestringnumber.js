export const tolocalestringnumber = (number) => {
    return parseFloat(number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export const tolocalestringnumberzerodicimal = (number) => {
    return parseFloat(number).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
};

export const tolocalestringnumbermanydicimal = (number) => {
    return parseFloat(number).toLocaleString("en-US", {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
    });
};

export const stringcommatonumber = (text) => {
    let decimal = text.split(".")[1];
    let cutcomma = text.split(".")[0].split(",");
    let groupcal = "";
   
    // cutcomma.forEach((x) => {
    //     groupcal += x;
    // });
    
    groupcal = cutcomma.reduce((a, b) => a + b);

    groupcal = `${groupcal}.${decimal}`;
    //   alert(parseFloat(groupcal).toFixed(2));
    return parseFloat(groupcal).toFixed(2)


};
