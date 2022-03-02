import Image from 'next/image';
import Link from 'next/link';
import ButtonBase from '@mui/material/ButtonBase';
import {useTranslation} from 'react-i18next';

interface Props {
  width: number;
  height: number;
}

const Logo = (props: Props) => {
  const {width, height} = props;
  const {t} = useTranslation();

  return (
    <Link href="/" passHref>
      <ButtonBase focusRipple>
        <Image
          width={width}
          height={height}
          src="/logo.png"
          alt={t`metas.title`}
          unoptimized
          priority
        />
      </ButtonBase>
    </Link>
  );
};

export default Logo;
