import { makeStyles } from '@material-ui/core';

export const skillsChildStyles = makeStyles({
  paper: {
    padding: 12,
    marginTop: 16,
    marginBottom: 32,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  wrapper: {
    padding: 20,
  },
  success: {
    color: 'teal',
    marginRight: 5,
  },
  panel: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  container: {
    marginTop: 32,
  },
  person: { width: 65, height: 65, color: 'grey' },
});
