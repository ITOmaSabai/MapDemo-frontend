import React, { useRef } from 'react';
import Fab from '@mui/material/Fab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ScrollToBottomButton() {
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div style={{position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)'}}>
        <Fab size="small" color="secondary" aria-label="scroll down" onClick={scrollToBottom} variant='"outlined'>
          <ExpandMoreIcon />
        </Fab>
      </div>
      <div ref={bottomRef} /> {/* 画面の最下部 */}
    </>
  );
}