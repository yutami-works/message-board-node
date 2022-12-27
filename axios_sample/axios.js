const axios = require('axios');

const main = async () => {
    const res = await axios.get("https://zipcloud.ibsnet.co.jp/api/search?zipcode=7830060");
    console.log(res.data);
}

main();
