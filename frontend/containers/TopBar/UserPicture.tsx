import Avatar from '@mui/material/Avatar';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';
import {useProfileQuery} from '../../graphql/hooks';
import getFirstLetter from '../../utils/getFirstLetter';

const UserPicture = () => {
  const {data} = useProfileQuery();

  if (!data?.me) {
      return <InsertEmoticonRoundedIcon />
  }
  const {firstName, lastName} = data?.me;

  const firstNameLetter = firstName ? getFirstLetter(firstName) : '';
  const lastNameLetter = lastName ? getFirstLetter(lastName) : '';

  return (
    <Avatar sx={{backgroundColor: theme => theme.palette.primary.main}}>
      {firstNameLetter}
      {lastNameLetter}
    </Avatar>
  );
};

export default UserPicture;
