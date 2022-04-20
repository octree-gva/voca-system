import axios from 'axios';
import {NextApiHandler} from 'next';
import {getToken} from 'next-auth/jwt';

const GraphqlRoute: NextApiHandler = async (req, res) => {
  const token = await getToken({req});

  try {
    let headers = {};
    if (token && !!token?.accessToken)
      headers = {...headers, Authorization: 'Bearer ' + token.accessToken};
    if (process.env.NODE_ENV !== 'production') console.log(headers);
    const response = await axios.post(
      `${process.env.STRAPI_URL}/graphql`,
      req.body,
      {headers}
    );
    return res.status(response?.status || 200).send(response.data);
  } catch (e: any) {
    if (!e?.response) {
      // Server is not running
      console.log('Server is not running. 502 Bad Gateway');
      return res.status(502).send(
        {data: null, error: 'Bad Gateway'} || {
          data: null,
          error: 'Bad Gateway',
        }
      );
    }
    if (e?.response?.status === 403) {
      // Token is expired
      console.log('expired token');
    }
    return res.status(e?.response?.status || 400).send(
      {data: null, error: e?.response?.error} || {
        data: null,
        error: 'Bad request',
      }
    );
  }
};
export default GraphqlRoute;
