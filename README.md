# 개발 환경
- Node.js 14.16.0
- npm 6.14.11

<br />

# 사용 기술
- React 18.2.0
  - 데이터만 바꾸면 돼서 편하다.
  - 돔을 직점 건드리는 일이 적다.
- TypeScript 4.9.5
  - 자동 완성이 편하다.
  - api 구조 파악 용이하다.
- classnames 2.3.2
  - className의 조합이 직관적이다.
  - className 안의 조건 처리가 편하다.
- tailwindcss 3.3.2
  - 빠르게 개발할 수 있다.
  - class만 넣으면 동작한다.
  - class 이름이 직관적이다.
  - 많이 사용하는 형태의 스타일은 이미 만들어져 있다.

<br />

# 개발 서버 띄우기

### 프로젝트 가져오기
```bash
git clone https://github.com/l9e7e/search.git
```

### 의존성 설치
```bash
npm install
```

### 로컬 서버 실행
```bash
npm start
```

### 로컬 주소 (자동 실행)
```url
http://localhost:3000/
```

<br />

# 컴포넌트 구조
- App.tsx (프로젝트 컨테이너)
  - StikyHeader.tsx (고정 영역)
    - MusinsaIcon.tsx (무신사 아이콘 있는 헤더)
    - ToggleButtonList.tsx (검색, 세일상품, 단독상품, 품절포함 영역)
    - ToggledButtonList.tsx (ToggleButtonList.tsx 클릭하면 생기는 영역. Rest 버튼 포함)
    - SearchInputbar.tsx (검색 토글 버튼 누르면 나오는 영역. Input 포함)
  - DivdingLine.tsx (상품 리스트와 나누는 라인)
  - GoodsList.tsx (상품 리스트 영역)
    - NoGoods.tsx (검색 필터링 상푸 없을 때)
  - Spinner.tsx (api 호출 시에 나오는 스피너)
