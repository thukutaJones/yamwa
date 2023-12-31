const axios = require("axios");

const getUsersNUm = async () => {
  const res = await axios.get("https://yamwabackend.onrender.com/api/me");

  console.log(res?.data?.users?.length);
};

getUsersNUm()
