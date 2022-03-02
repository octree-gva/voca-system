import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {
  label?: string;
  inline?: boolean;
}

const Loader = (props: Props) => {
  const {label, inline = false} = props;

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      py={inline ? 0 : 14}
    >
      <CircularProgress />
      {label && (
        <Typography variant="overline" sx={{mt: 2}}>
          {label}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
