import axios, {Method} from 'axios';
import {NextApiHandler} from 'next';
import {getToken} from 'next-auth/jwt';
import https from 'https';
const RestRoute: NextApiHandler = async (req, res) => {
  const token = await getToken({req});
  const strapiPath = ((req.query?.strapiPath as string[]) || []).join('/');
  const config = {
    url: `${process.env.STRAPI_URL}/api/${strapiPath}`,
    method: req.method as Method,
    data: req.body || {},
    headers: {},
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  };
  if (token) {
    // Signed in
    config.headers = {Authorization: 'Bearer ' + token.accessToken};
  }
  console.log('axios request', config);
  try {
    const response = await axios(config);
    return res.status(response?.status || 200).send(response.data);
  } catch (e: any) {
    if (e?.code === 403) {
      // Token is expired
      console.log('expired token');
    }
    if (!axios.isAxiosError(e)) {
      console.error('axios error: ', e);
      return res.status(500).send({data: null, error: 'internal server error'});
    }
    console.error('not axios error: ', e?.message);
    return res.status(parseInt('' + e?.code, 10) || 400).send(
      {data: null, error: e?.message} || {
        data: null,
        error: 'Bad request',
      }
    );
  }
};
export default RestRoute;
