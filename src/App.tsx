import { useEffect, useRef, useState } from 'react';
import ToggleButtonList from './ToggleButtonList';
import ToggledButtonList from './ToggledButtonList';
import MusinsaIcon from './MusinsaIcon';
import SearchInputBar from './SearchInputBar';
import Line from './Line';
import GoodsList from './GoodsList';
import StickyHeader from './StickyHeader';

function App() {
  const nextFetchingRef = useRef(null);
  const fetchingIndexRef = useRef(0);
  const mountRef = useRef(false);

  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const [isToggledSearchInputBar, setIsToggledSearchInputBar] = useState(false);
  const [toggledButtonList, setToggledButtonList] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    if (mountRef.current) {
      fetchGoodsList();
    } else {
      mountRef.current = true;
    }
  }, []);

  const fetchGoodsList = async () => {
    try {
      const response = await fetch(
        `https://static.msscdn.net/musinsaUI/homework/data/goods${fetchingIndexRef.current}.json`
      );
      const {
        data: { list },
      } = await response.json();
      setGoodsList([...goodsList, ...list]);
    } catch (e) {
      console.error(e);
      setGoodsList(goodsList);
    }
  };

  const removeToggledButton = (toggleButton?: string) => {
    if (!toggleButton) {
      setToggledButtonList([]);
      return;
    }

    setToggledButtonList(
      toggledButtonList.filter(
        (filterdButton) => filterdButton !== toggleButton
      )
    );
  };

  const handleToggleButton = (toggleButton: string) => {
    if (toggleButton === '검색') {
      setIsToggledSearchInputBar(!isToggledSearchInputBar);
    } else {
      if (toggledButtonList.includes(toggleButton)) {
        removeToggledButton(toggleButton);
      } else {
        setToggledButtonList([...toggledButtonList, toggleButton]);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (
        [entry]: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entry.isIntersecting) {
          if (fetchingIndexRef.current === 3) {
            observer.disconnect();
          } else {
            fetchingIndexRef.current += 1;
            fetchGoodsList();
          }
        }
      }
    );

    nextFetchingRef.current && observer.observe(nextFetchingRef.current);
    return () => observer && observer.disconnect();
  }, [goodsList]);

  return (
    <div className='w-[375px] mx-auto'>
      <StickyHeader>
        <MusinsaIcon />
        <ToggleButtonList
          toggleButtonList={['검색', '세일상품', '단독상품', '품절포함']}
          handleToggleButton={handleToggleButton}
          isToggledSearchInputBar={isToggledSearchInputBar}
          toggledButtonList={toggledButtonList}
        />
        <ToggledButtonList
          toggledButtonList={toggledButtonList}
          removeToggledButton={removeToggledButton}
        />
        {isToggledSearchInputBar && (
          <SearchInputBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        )}
      </StickyHeader>
      <Line />
      <GoodsList
        goodsList={goodsList}
        nextFetchingRef={nextFetchingRef}
        searchInput={searchInput}
        toggledButtonList={toggledButtonList}
      />
    </div>
  );
}

export default App;

export interface Goods {
  goodsNo: number;
  goodsName: string;
  price: number;
  brandName: string;
  imageUrl: string;
  linkUrl: string;
  brandLinkUrl: string;
  normalPrice: number;
  isSale: boolean;
  saleRate: number;
  isSoldOut: boolean;
  isExclusive: boolean;
}
