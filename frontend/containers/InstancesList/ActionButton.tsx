import Button from '@mui/material/Button';

const ActionButton: React.FC = ({children}) => (
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
