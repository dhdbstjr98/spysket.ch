import React, { useEffect, useRef } from 'react';
import './ProgressBar.css';

interface Props {
  time: number;
}

const ProgressBar: React.FC<Props> = ({ time }: Props) => {
  const progressBar = useRef<HTMLDivElement>(null);

  // todo : props인 time이 변할때마다 타이머 재설정을 하기 위해서
  // 부득이하게 dom을 직접 컨트롤함. 좋은 방법이 있다면 업데이트 필요
  useEffect(() => {
    if (progressBar.current) {
      progressBar.current.style.transitionDuration = '0s';
      progressBar.current.style.width = '100%';
      setTimeout(function () {
        if (progressBar.current) {
          progressBar.current.style.transitionDuration = `${time - 0.1}s`;
          progressBar.current.style.width = '0%';
        }
      }, 100);
    }
  }, [time]);

  return (
    <div className="progress-bar">
      <div className="progress-bar-inner" ref={progressBar} />
    </div>
  );
};

export default ProgressBar;
