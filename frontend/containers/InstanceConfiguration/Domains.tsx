import Box from '@mui/system/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {useTheme} from '@mui/system';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import useToastStore from '../../stores/useToastStore';
import {InstanceSettingsPage} from '../../layouts/InstanceSettings';
import {useUpdateInstanceMutation} from '../../graphql/hooks';
import DomainLookup from './DomainLookup';

const Domains: InstanceSettingsPage = ({instance}) => {
  const {t} = useTranslation();
  const [editingCustomDomain, setEditingCustomDomain] = useState(false);
  const [customDomainValue, setCustomDomainValue] = useState(null);
  const addToast = useToastStore(s => s.addToast);
  const theme = useTheme();

  const [updateInstance] = useUpdateInstanceMutation({});

  const setDomain = async () => {
    try {
      await updateInstance({
        variables: {
          instanceUpdate: {customDomain: customDomainValue},
          id: instance.id as string,
        },
      });

      setEditingCustomDomain(false);
      addToast(t('domains.custom.updated'));
    } catch (e) {
      addToast(e.message);
    }
  };

  const builtinDomain = instance.attributes?.envName as string;
  const customDomain = instance.attributes?.customDomain
    ? instance.attributes?.customDomain
    : builtinDomain;

  return (
    <Box p={3}>
      <Typography variant="h3">{t('domains.title')}</Typography>
      <Typography variant="subtitle1">{t('domains.desc')}</Typography>
      {instance.attributes && (
        <>
          <Box p={1}>
            <Typography variant="h4">{t('domains.builtin')}</Typography>
            <Link
              href={`https://${builtinDomain}.voca.city`}
              target="_blank"
              sx={{color: theme.palette.accent.main, textDecoration: 'none'}}
            >
              {`${builtinDomain}.voca.city`}
            </Link>
          </Box>
          <Box p={1} position="relative">
            <Typography variant="h4">{t('domains.custom.title')}</Typography>
            <Link
              href={`https://${customDomain}`}
              target="_blank"
              sx={{color: theme.palette.accent.main, textDecoration: 'none'}}
            >
              {customDomain}
            </Link>
            <Button
              sx={{position: 'absolute', right: '8px', top: '8px'}}
              onClick={() => setEditingCustomDomain(true)}
            >
              {t('domains.custom.modify')}
            </Button>
            <Dialog
              open={editingCustomDomain}
              onClose={() => setEditingCustomDomain(false)}
              maxWidth="xs"
              fullWidth
            >
              <DialogContent sx={{textAlign: 'center'}}>
                <Typography variant="h4">
                  {t('domains.custom.set.title')}
                </Typography>
                <Typography variant="subtitle2" sx={{m: 3}}>
                  {t('domains.custom.set.subtitle')}
                </Typography>
                <TextField
                  variant="outlined"
                  value={customDomainValue}
                  onChange={e => setCustomDomainValue(e.target.value)}
                  label={t('domains.custom.set.label')}
                />
              </DialogContent>
              <DialogActions sx={{flexDirection: 'column'}}>
                <Button
                  variant="contained"
                  sx={{m: 1, px: 6}}
                  onClick={setDomain}
                >
                  {t('domains.custom.set.submit')}
                </Button>
                <Box m={1}>
                  {t('domains.custom.set.or')}
                  <Button variant="text" color="secondary">
                    {t('domains.custom.set.cancel')}
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          </Box>
        </>
      )}
      <Box p={1}>
        <Typography variant="h4">{t('domains.settings')}</Typography>
        <Typography variant="subtitle2">
          {t('domains.settings.desc')}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            p: 0,
            width: '100%',
            margin: {xs: '0', md: '28px auto'},
            border: '1px solid grey',
          }}
        >
          <Table>
            <TableHead>
              <TableCell sx={itemStyle}>{t('domains.custom.host')}</TableCell>
              <TableCell sx={itemStyle}>{t('domains.custom.type')}</TableCell>
              <TableCell sx={itemStyle}>
                {t('domains.custom.required')}
              </TableCell>
              <TableCell sx={itemStyle}>
                {t('domains.custom.current')}
              </TableCell>
            </TableHead>
            <TableBody>
              <TableCell sx={itemStyle}>@</TableCell>
              <TableCell sx={itemStyle}>A</TableCell>
              <TableCell sx={itemStyle}>{t('domains.required_ip')}</TableCell>
              <TableCell sx={itemStyle}>
                <DomainLookup instance={instance} />
              </TableCell>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const itemStyle = {p: '8px', border: '1px solid grey'};

export default Domains;
