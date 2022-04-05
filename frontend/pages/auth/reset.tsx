import { useState, useEffect } from "react";
import { ApolloError } from "@apollo/client";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import {makeStyles} from '@mui/styles';
import {Theme} from '@mui/system';
import { useResetMutation as useResetPasswordMutation} from "../../graphql/hooks";

const ResetPassPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation();
  const [error, setError] = useState<ApolloError | string>();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [sendResetPassword] = useResetPasswordMutation();

  useEffect(() => {
    if (window) {
      // eslint-disable-next-line
      const urlCode = window.location.search?.match(/(\?|&)code\=([^&]*)/)?.[2];
      setCode(urlCode);
    }
  }, []);

  const onClick = async () => {
    if (password !== passwordConfirmation) setError(t`auth.reset.invalidPassword`);

    try {
      await sendResetPassword({
        variables: { password, passwordConfirmation, code },
      });
      router.push("/auth/login?updated=ok");
    } catch (err) {
      console.error(err);
      setError(err);
    }
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) onClick();
  };

  return (
    <Container fixed={true} maxWidth={false} className={classes.container}>
      <Box width={400} maxWidth="100%" pb={28}>
        <Paper className={classes.paper} variant="outlined">
          <Box width={1} height={1} p={1}>
            <Box height={28} position="relative">
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                Voca.City
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6">{t`auth.reset.resetTitle`}</Typography>
          {error && <Typography color="error">{t`auth.reset.error`}</Typography>}
          {
            <Box
              display="flex"
              flexDirection="column"
              my={2}
            >
              <TextField
                label={t`login.password`}
                variant="outlined"
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                onKeyDown={onKeyDown}
                fullWidth
              />
              <TextField
                label={t`login.passwordVerif`}
                variant="outlined"
                margin="dense"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                type="password"
                onKeyDown={onKeyDown}
                fullWidth
              />
              <Button variant="contained" color="primary" onClick={onClick}>
                Envoyer
              </Button>
            </Box>
          }
          <Box mt={2}>
            <Link href="/auth/login">
              <MuiLink color="textSecondary">{t`login.goLogin`}</MuiLink>
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

export default ResetPassPage;
