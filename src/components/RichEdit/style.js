import { makeStyles } from '@material-ui/core';

export const richEditStyle = makeStyles({
    box:{
      backgroundColor: '#f7f7f7',
      borderRadius: 2
    },

    editor: {
        border: '1px solid #ddd',
        cursor: 'text',
        padding: 16,
        borderRadius: 2,
        marginBottom: 2,
        height: props => props.height - 52,
        overflow: 'auto'
      },
    
    toolbar: {
      height: 52,
      margin: 2
    },

    toolbarButton: {
      borderRadius: 2,
      backgroundColor: props => props.active ? '#ddd' : 'transparent'
    },
});