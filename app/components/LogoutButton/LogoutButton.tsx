import {Button, ButtonProps} from '@mui/material';
import {signOut} from 'next-auth/react';

export type LogoutButtonProps = Omit<ButtonProps, 'onClick'>;
const LogoutButton = (props: LogoutButtonProps) => {
  return <Button onClick={() => signOut()} {...props} />;
};
export default LogoutButton;
