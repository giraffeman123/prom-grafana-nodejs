// regular expression that checks if ipv6 contains segment of ipv4
function getIpv4(ipv6){    
    if(ipv6 !== null){
        const exp = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
        let result = ipv6.match(exp);    
        console.log(result);
        return result !== null ? result[0] : null;
    }else   
        return null;
}

module.exports = {
    getIpv4,
};