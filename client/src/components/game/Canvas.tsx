import { fabric } from 'fabric';
import React, { useEffect } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './Canvas.css';

export const colors = ['#f44336', '#689f38', '#a5d6a7', '#2196f3', '#673ab7'];

interface Props {
  onDraw: (object: fabric.Path) => void;
  lastFabricObject: fabric.Path;
}

const Canvas: React.FC<Props> = ({ onDraw, lastFabricObject }) => {
  const game = useSelector((state: RootState) => state.game);
  const { editor, onReady } = useFabricJSEditor();

  // typescript null escape
  // todo: 정말 안좋은 방법인 듯
  if (!game || game.turn === undefined || game.isSpy === undefined)
    return <></>;

  const { name, users, turn, status } = game;
  const isMyTurn = status === 'drawing' && users[turn].name === name;

  useEffect(() => {
    editor?.canvas.setDimensions({ width: 688, height: 565 });
    editor?.canvas.on('object:added', (evt) => {
      if (isMyTurn) onDraw(evt.target as fabric.Path);
    });
    return () => {
      editor?.canvas.off('object:added');
    };
  }, [editor]);

  useEffect(() => {
    if (editor) {
      editor.canvas.freeDrawingBrush.color = colors[turn];
      editor.canvas.isDrawingMode = isMyTurn;
    }
  }, [turn, editor]);

  useEffect(() => {
    if (lastFabricObject) {
      editor?.canvas.add(
        new fabric.Path(lastFabricObject.path, lastFabricObject),
      );
    }
  }, [lastFabricObject]);

  return (
    <div className="canvas">
      {!isMyTurn && <div className="locked" />}
      <FabricJSCanvas onReady={onReady} />
    </div>
  );
};

export default Canvas;
