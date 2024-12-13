![header](https://capsule-render.vercel.app/api?type=venom&color=0:ff7f50,100:d50032&height=290&section=header&text=Netflix%20Clone&fontSize=90)

**Link :** https://jinkyeongk.github.io/netflix-react-app

## 프로젝트 소개
Netflix React App은 Netflix와 유사한 사용자 경험을 제공하는 React 기반의 웹 애플리케이션입니다. 
동적인 영화 목록을 관리하고, 사용자가 다양한 영화와 TV 프로그램을 탐색할 수 있도록 하는 것을 목표로 했습니다.

이 웹 애플리케이션은 Netflix의 Popular,Now Playing 등 영화,TV Show 목록과 상세 정보를 표시하며, 사용자가 각각의 콘텐츠를 클릭할 때 해당 콘텐츠에 대한 추가 정보를 제공하는 등, 실제 Netflix와 비슷한 방식으로 동작합니다. 영화와 TV 프로그램 목록은 TMDB API를 통해 실시간으로 받아오며, 각 영화에 대한 이미지와 정보는 API를 통해 동적으로 로딩됩니다.


### 기능
* 실시간 영화 목록: TMDB API를 사용하여 최신 영화와 인기 있는 TV 프로그램을 실시간으로 불러옵니다.
* 동적 검색: 사용자가 검색한 영화나 TV 프로그램을 실시간으로 검색할 수 있습니다.
* 세부 정보 보기: 각 영화나 TV 프로그램에 대한 상세 정보,평점 등 모달로 표시하여 사용자에게 풍부한 콘텐츠를 제공합니다.
* 트레일러, 티져 영상 재생: 유튜부에 업로드 되어있는 해당 콘텐츠의 영상을 볼 수 있습니다.

#### 1. list and slide
![2024-12-1210 44 49-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/b80f2186-89b0-45b6-9dbd-0600b9414f21)

**Description**

 slide를 재사용할 수 있도록 slide component 하나로 구현하였습니다.
 recoil를 이용하여 여러 주제의 slide list를 한 번에 렌더링될 수 있게 하였습니다. 

 **trouble shooting**
 1. 슬라이드 컨트롤 버튼을 빠르게 여러번 클릭하면 slider 애니메이션을 끝내기 전에 새로운 slider가 바로 render되는 Box들의 애니메이션이 줄줄이 연속되어 겹치며 render되는 버그를 발견하였습니다. slide에 useState를 사용하여 상태 값을 확인할 수 있게 leaving이라는 값을 정의하고, onExitComplete를 이용하여 leaving이 true면 버튼이 동작하지 않게 구현하였습니다.
 2. slider key값을 주지 않아 한 자리에 slider가 여러개 쌓이는 버그를 발견하고, key값을 전부 unique하게 주었습니다.

#### 2. Modal 
![2024-12-1210 50 55-ezgif com-speed](https://github.com/user-attachments/assets/2d517518-d143-4269-93e1-2a1c3fe44127)

**Description:**

Modal의 BigCover에 Hover시 useState값을 이용하여 구분하고, 유튜부에 트레일러나 티저가 있다면 변경된 후 자동 재생되도록 구현하였습니다. 
유튜부에 해당되는 콘텐츠가 없다면 Hover시에도 정적 이미지로 보여집니다.

#### 3. Search 
![2024-12-1210 55 33-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/b598e595-613e-4a03-beae-ee2c32dfefd0)

**Description:**

검색창에 엔터를 치면, history.push(React Router v5까지 지원)를 통해/search로 redirect됩니다. 
Movie,Tv shows, Person에 대해 차례대로 검색한 키워드에 대한 결과값이 슬라이드로 보여집니다. 

### 설치 및 실행
1. 이 저장소를 클론합니다.

``` 
git clone https://github.com/jinkyeongk/netflix-react-app.git
 ```
 
2. 필요한 패키지를 설치합니다.

``` 
npm install
 ```
 
 3. 애플리케이션을 실행합니다.
``` 
npm start
 ```
 ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&log) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)


### ● Data Structure

<img width="328" alt="스크린샷 2024-12-13 오전 10 27 30" src="https://github.com/user-attachments/assets/f71d3a63-194f-402e-8ece-195493681a54" />
