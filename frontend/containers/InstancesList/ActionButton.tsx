import Button from '@mui/material/Button';

interface Props {
  children: React.ReactChildren
}

const ActionButton = ({children} : Props) => (
  <Button
    sx={{
      fontWeight: 'bold',
      textTransform: 'initial',
      color: ({
        palette: {
          primary: {light},
        },
      }) => light,
    }}
    component="a"
  >
    {children}
  </Button>
);

export default ActionButton;
