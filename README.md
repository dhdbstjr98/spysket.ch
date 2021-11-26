# spysket.ch
보드게임 Telestrations을 웹게임 형태로 재해석한 프로젝트입니다.

[View Demo](https://spysket.ch)

![](https://user-images.githubusercontent.com/42272855/143605627-64f06523-28cc-495a-9b1f-ad1ba17ad1d3.png)

### Built With
- [yarn](https://github.com/yarnpkg/yarn)
- [typescript](https://github.com/microsoft/TypeScript)
- [create-react-app](https://github.com/facebook/create-react-app)
- [socket.io](https://github.com/socketio/socket.io)
- [redux-toolkit](https://github.com/reduxjs/redux-toolkit)
- [fabric.js](https://github.com/fabricjs/fabric.js)

### Directory Structure
```
├─ client
│  └─ src
│     ├─ components
│     ├─ pages
│     ├─ redux
│     ├─ socket
│     ├─ App.tsx
│     └─ index.tsx
└─ server
   └─ src
      ├─ emits
      ├─ events
      ├─ store
      ├─ utils
      └─ index.tsx
```

## Getting Started
별도의 설정 파일 없이 호스트가 하드코딩 되어있습니다.<br>
production 환경의 소켓 서버 변경을 위해서는 `App.tsx` 파일에서 `socketServer` 상수를 변경하시기 바랍니다.

### Installation
1. dependency 설치
서버, 클라이언트 모두 `yarn`을 통해 설치

2. 실행
서버, 클라이언트 모두 `yarn start`를 통해 실행

## Contributing
프로젝트에 기여하고 싶으신 분들은 우선 이슈 생성 후에 PR 올려주시기 바랍니다.

## Contact
[Issue](https://github.com/dhdbstjr98/spysket.ch/issues)
