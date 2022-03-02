import Head from 'next/head';
import {useTranslation} from 'react-i18next';

export type Metas = {
  title?: string;
  url?: string;
};

interface Props {
  metas?: Metas;
}

const Meta = (props: Props) => {
  const {metas} = props;
  const {t} = useTranslation();

  const siteName = t`metas.title`;
  const title = metas?.title ? metas.title : siteName;
  const description = t`metas.description`;
  const socialImage = '/logo.png';

  return (
    <Head>
      {/* General */}
      <title>{title}</title>
      <meta itemProp="name" content={siteName} />
      {metas?.url && <meta itemProp="url" content={metas.url} />}
      <meta itemProp="thumbnailUrl" content={socialImage} />
      <link rel="image_src" href={socialImage} />
      <meta itemProp="image" content={socialImage} />
      <meta name="description" content={description} />

      <meta
        name="viewport"
        content="initial-scale=1, minimum-scale=1, width=device-width"
      />

      {/* OpenGraph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      {metas?.url && <meta property="og:url" content={metas.url} />}
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:width" content="1500" />
      <meta property="og:image:height" content="843" />

      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={socialImage} />
      {metas?.url && <meta name="twitter:url" content={metas.url} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default Meta;
