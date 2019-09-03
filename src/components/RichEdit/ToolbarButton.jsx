import React from 'react';
import {toolbarCommands} from './toolbarCommands';
import { richEditStyle } from './style';
import IconButton from '@material-ui//core/IconButton';
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderlineIcon from '@material-ui/icons/FormatUnderlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const ToolbarButton = props => {
    const classes = richEditStyle(props);

    const handleMouseDown = e =>{
        e.preventDefault(); 
        props.onClick(props.command);
    }

    const renderIcon = () =>{
        switch(props.command){
            case toolbarCommands.BOLD: return <BoldIcon></BoldIcon>;
            case toolbarCommands.ITALIC: return <ItalicIcon></ItalicIcon>;
            case toolbarCommands.UNDERLINE: return <UnderlineIcon></UnderlineIcon>;
            case toolbarCommands.UL: return <FormatListBulletedIcon></FormatListBulletedIcon>;
        }
    }

    return(
        <IconButton className={classes.toolbarButton} onMouseDown={handleMouseDown}>
            { renderIcon() }
        </IconButton>
    );
};

export default ToolbarButton;
