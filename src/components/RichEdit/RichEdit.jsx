import React, { useState, useImperativeHandle, forwardRef, componentDidUpdate, useEffect  } from 'react';
import { Box } from '@material-ui/core';
import 'draft-js/dist/Draft.css';
import {Editor, EditorState, RichUtils, ContentBlock, Modifier, SelectionState, convertFromRaw, convertToRaw, genKey  } from 'draft-js';
import { richEditStyle } from './style';
import ToolbarButton from './ToolbarButton';
import {toolbarCommands} from './toolbarCommands';
import _ from 'lodash';

const RichEdit = forwardRef((props, ref) => {
    const classes = richEditStyle(props);
    const { id, name } = props;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [rawState, setRawState] = useState({});
    const [changeTimeout, setChangeTimeout] = useState({});
    let editor = {};

    const contentState = editorState.getCurrentContent();
    const currentStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    const handleOnChange = (state, raiseEvent = true) => {
        setEditorState(state);       
        const newRawState = convertToRaw(state.getCurrentContent());
        const stateChanged = !_.isEqual(rawState, newRawState);
        if(stateChanged){
            setRawState(newRawState); 
            if(raiseEvent && props.onChange){
              if(changeTimeout)
                clearTimeout(changeTimeout);
              setChangeTimeout(setTimeout(()=>{ props.onChange({target: { id: id, name: name, value: newRawState }}); }, 500));
            }
        }
    }

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
        handleOnChange(newState);
          return 'handled';
        }
        return 'not-handled';
      }

    const handleToolbarCommand = command => {
        switch(command){
            case toolbarCommands.BOLD:
            case toolbarCommands.ITALIC:
            case toolbarCommands.UNDERLINE:
                handleOnChange(RichUtils.toggleInlineStyle(editorState, command));
                break;
            case toolbarCommands.UL:
                handleOnChange(RichUtils.toggleBlockType(editorState, command));
                break;
        }
    }
    const focus = ()=>{
        editor.focus();
    }

    const isActive = command => {
        switch(command){
            case toolbarCommands.BOLD:
            case toolbarCommands.ITALIC:
            case toolbarCommands.UNDERLINE:
                return currentStyle.has(command)
            case toolbarCommands.UL:
                return command == blockType;
        }
    }

    useImperativeHandle(ref, () => ({
        addParagraph(text) {
          const newEditorState = insertBlock(editorState, text, 'after');
          handleOnChange(newEditorState);
        }
    }));

    const insertBlock = (editorState, text, direction) => {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const currentBlock = contentState.getBlockForKey(selection.getEndKey());
    
        const blockMap = contentState.getBlockMap();
        // Split the blocks
        const blocksBefore = blockMap.toSeq().takeUntil(function(v) {
          return v === currentBlock;
        });
        const blocksAfter = blockMap
          .toSeq()
          .skipUntil(function(v) {
            return v === currentBlock;
          })
          .rest();
        const newBlockKey = genKey();
        const newBlock = new ContentBlock({
          key: newBlockKey,
          type: currentBlock.type,
          text: text
          //characterList: List()
        });
        let newBlocks =
          direction === "before"
            ? [[newBlockKey, newBlock], [currentBlock.getKey(), currentBlock]]
            : [[currentBlock.getKey(), currentBlock], [newBlockKey, newBlock]];
        const newBlockMap = blocksBefore
          .concat(newBlocks, blocksAfter)
          .toOrderedMap();
        const newContentState = contentState.merge({
          blockMap: newBlockMap,
          selectionBefore: selection,
          selectionAfter: selection
        });
        let newEditorState = EditorState.push(editorState, newContentState, "insert-fragment");
        const newSelection = new SelectionState({
            anchorKey: newBlockKey,
            anchorOffset: newBlock.getLength(),
            focusKey: newBlockKey,
            focusOffset: newBlock.getLength(),
          })
        newEditorState = EditorState.forceSelection(newEditorState, newSelection);
        return newEditorState;
      }

    useEffect(() => {
        if(props.value && props.value.blocks && !_.isEqual(props.value, rawState)){
            handleOnChange(EditorState.createWithContent(convertFromRaw(props.value)), false);
        }
    }, [props.value]);

    return(	
        <Box className={classes.box}>
            <Box className={classes.editor} onClick={focus}>
                <Editor
                    editorState={editorState}
                    onChange={handleOnChange}
                    ref={(element) => { editor = element; }}
                    handleKeyCommand={handleKeyCommand}
                    placeholder={props.placeholder}
                />
            </Box>
            <Box className={classes.toolbar}>
                <ToolbarButton command={toolbarCommands.BOLD} onClick={handleToolbarCommand} active={isActive(toolbarCommands.BOLD)}></ToolbarButton>
                <ToolbarButton command={toolbarCommands.ITALIC} onClick={handleToolbarCommand} active={isActive(toolbarCommands.ITALIC)}></ToolbarButton>
                <ToolbarButton command={toolbarCommands.UNDERLINE} onClick={handleToolbarCommand} active={isActive(toolbarCommands.UNDERLINE)}></ToolbarButton>
                <ToolbarButton command={toolbarCommands.UL} onClick={handleToolbarCommand} active={isActive(toolbarCommands.UL)}></ToolbarButton>
            </Box>
        </Box>
    );
});
export default RichEdit;