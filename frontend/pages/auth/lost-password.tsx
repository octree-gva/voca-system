import { useState } from "react";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "next/link";
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/system';
import { useForgotMutation as useForgotPasswordMutation } from "../../graphql/hooks";
import { useTranslation } from "react-i18next";

const ForgotPassPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sendForgotPassword] = useForgotPasswordMutation();
  const { t } = useTranslation();

  const onClick = () => {
    if (!email) return setError(t`auth.forgot.invalidEmail`);
    sendForgotPassword({ variables: { email } });
    setSent(true);
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Box width={400} maxWidth="100%" pb={28}>
        <Paper className={classes.paper} variant="outlined">
          <Box width={1} height={1} p={1}>
            <Box height={28} position="relative">
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Voca.City
              </Typography>
            </Box>
          </Box>
          {error && <Typography color="error">{t`auth.forgot.error`}</Typography>}
          {sent ? (
            <Typography>{t`auth.forgot.submitted`}</Typography>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              my={2}
              mx="auto"
            >
              <Typography>{t`auth.forgot.heading`}</Typography>

              <TextField
                label={t`auth.forgot.email`}
                variant="outlined"
                margin="dense"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={onClick}>
                {t`auth.forgot.confirm`}
              </Button>
            </Box>
          )}
          <Box mt={2}>
            <Link href="/auth/login">
              <MuiLink color="textSecondary">{t`auth.forgot.goLogin`}</MuiLink>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  paper: {
    width: "100%",
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default ForgotPassPage;
