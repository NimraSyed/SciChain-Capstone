// utils/pinata.js
import axios from 'axios';

const pinataApiKey = 'YOUR_PINATA_API_KEY';
const pinataSecretApiKey = 'YOUR_PINATA_SECRET_API_KEY';

export const pinFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();
  data.append('file', file);

  const response = await axios.post(url, data, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });

  return response.data;
};
