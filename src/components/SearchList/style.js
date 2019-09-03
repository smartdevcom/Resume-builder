import { makeStyles } from '@material-ui/core';

export const searchListStyle = makeStyles({
    container: {
        backgroundColor: '#f7f7f7',
        borderRadius: 4    
    },
    resultContainer:{
        marginTop:12
    },
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
  addIcon: {
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

  person: { width: 65, height: 65, color: 'grey' },
});
