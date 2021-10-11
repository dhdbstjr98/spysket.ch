import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Room from './pages/Room';
import SpyLoading from './pages/SpyLoading';
import GameLoading from './pages/GameLoading';
import Word from './pages/Word';
import { colors } from './components/game/Canvas';

const App: React.FC = () => {
  const {
    size: { width, height },
    page,
    showContent,
  } = useSelector((state: RootState) => state.layout);

  // const dispatch = useAppDispatch();

  let Page;

  switch (page) {
    case 'lobby':
      Page = Lobby;
      break;
    case 'room':
      Page = Room;
      break;
    case 'game':
      Page = Game;
      break;
    case 'spy-loading':
      Page = SpyLoading;
      break;
    case 'word':
      Page = Word;
      break;
    case 'game-loading':
      Page = GameLoading;
      break;
    default:
      throw new Error('존재하지 않는 페이지');
  }

  const colorStyle = colors.reduce(
    (acc, color, turn) => ({
      ...acc,
      [`--turn-${turn}`]: color,
    }),
    {},
  );

  // useEffect(() => {
  //   dispatch(
  //     setGame({
  //       id: 'asdf',
  //       name: '오윤석',
  //       room: '테스트룸',
  //       users: [
  //         { name: '오윤석', ready: false },
  //         { name: '홍길동', ready: true },
  //         { name: '테스트', ready: false },
  //       ],
  //       status: 'waiting',
  //     }),
  //   );
  //   dispatch(loadGame());
  //   dispatch(
  //     setWords([
  //       {
  //         name: '칸쵸',
  //         count: 0,
  //       },
  //       {
  //         name: '노트북',
  //         count: 1,
  //       },
  //       {
  //         name: '경희대',
  //         count: 2,
  //       },
  //     ]),
  //   );
  //   dispatch(setWord('경희대'));
  //   dispatch(
  //     setUsers([
  //       {
  //         name: '오윤석',
  //         ready: true,
  //         point: 0,
  //       },
  //       {
  //         name: '홍길동',
  //         ready: true,
  //         point: 100,
  //       },
  //       {
  //         name: '테스트',
  //         ready: true,
  //         point: 300,
  //       },
  //       {
  //         name: '이름이정말정말긴유저',
  //         ready: true,
  //         point: 0,
  //       },
  //       {
  //         name: '뷁',
  //         ready: true,
  //         point: 0,
  //       },
  //     ]),
  //   );
  // }, []);

  // todo
  // 스파이 투표
  // vote 투표 이미지 넣어지도록?

  return (
    <>
      <div className="container" style={colorStyle}>
        <div className="main-box" style={{ width, height }}>
          {showContent ? <Page /> : ''}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
