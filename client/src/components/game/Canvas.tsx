import React, { useEffect } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Canvas.css';

export const colors = ['#f44336', '#689f38', '#a5d6a7', '#2196f3', '#673ab7'];

const Canvas: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);
  const { editor, onReady } = useFabricJSEditor();

  // typescript null escape
  // todo: 정말 안좋은 방법인 듯
  if (!game || game.turn === undefined || game.isSpy === undefined)
    return <></>;

  const { name, users, turn, status } = game;
  const isMyTurn = status === 'drawing' && users[turn].name === name;

  useEffect(() => {
    if (editor) {
      // editor.canvas.setDimensions({
      //   width: canvasWrapper.current.clientWidth,
      //   height: canvasWrapper.current.clientHeight,
      // });
      editor.canvas.setDimensions({ width: 688, height: 565 });
    }
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.canvas.freeDrawingBrush.color = colors[turn];
      editor.canvas.isDrawingMode = isMyTurn;
    }
  }, [turn, editor]);

  return (
    <div className="canvas">
      {!isMyTurn && <div className="locked" />}
      <FabricJSCanvas onReady={onReady} />
    </div>
  );
};

export default Canvas;
