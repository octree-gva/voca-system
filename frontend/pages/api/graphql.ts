import axios from 'axios';
import {NextApiHandler} from 'next';
import {getToken} from 'next-auth/jwt';

const GraphqlRoute: NextApiHandler = async (req, res) => {
  const token = await getToken({req});
  if (token) {
    // Signed in
    try {
      const response = await axios.post(
        `${process.env.STRAPI_URL}/graphql`,
        req.body,
        {
          headers: {Authorization: 'Bearer ' + token.accessToken},
        }
      );
      return res.status(response?.status || 200).send(response.data);
    } catch (e: any) {
      if (e?.response.status === 403) {
        // Token is expired
        console.log('expired token');
      }
      return res.status(e?.response.status || 400).send(
        {data: null, error: e?.response?.error} || {
          data: null,
          error: 'Bad request',
        }
      );
    }
  } else {
    // Not Signed in
    return res.status(401).send({data: null, error: 'Unauthorized'});
  }
};
export default GraphqlRoute;
