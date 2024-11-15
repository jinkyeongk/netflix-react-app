module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',  // JSX를 Babel로 변환
    },
    testEnvironment: 'jsdom',  // React 테스트 환경 설정
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy', // CSS 모듈을 Mock 처리
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],  // jest-dom 추가 설정
  };