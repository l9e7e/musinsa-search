import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import NoGoods from './NoGoods';
import ToggleButtonList from './ToggleButtonList';
import ToggledButtonList from './ToggledButtonList';
import MusinsaIcon from './MusinsaIcon';
import SearchInputBar from './SearchInputBar';
import Line from './Line';
import GoodsList from './GoodsList';

function App() {
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const originGoodsList = useRef<Goods[]>([]);
  const goodsRef = useRef(null);
  const fetchingIndexRef = useRef(0);
  const [isToggledSearchInputBar, setIsToggledSearchInputBar] = useState(false);
  const [toggledButtonList, setToggledButtonList] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const mountRef = useRef(false);

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
      originGoodsList.current = [...goodsList, ...list];
    } catch (e) {
      console.error(e);
      setGoodsList(goodsList);
      originGoodsList.current = goodsList;
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
      setToggledButtonList([]);
    } else {
      setIsToggledSearchInputBar(false);

      if (toggledButtonList.includes(toggleButton)) {
        removeToggledButton(toggleButton);
      } else {
        setToggledButtonList([...toggledButtonList, toggleButton]);
      }
    }
  };

  const handleSearchInput = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  useEffect(() => {
    setGoodsList(
      searchInput
        ? originGoodsList.current.filter((originGoods) => {
            if (originGoods.goodsName.includes(searchInput)) {
              return originGoods;
            }
          })
        : originGoodsList.current
    );
  }, [searchInput]);

  useEffect(() => {
    let goodsList: Goods[] = [];
  }, [toggledButtonList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !searchInput) {
            if (fetchingIndexRef.current === 3) {
              observer.disconnect();
            } else {
              fetchingIndexRef.current += 1;
              fetchGoodsList();
            }
          }
        });
      },
      {
        threshold: 1,
      }
    );

    goodsRef.current && observer.observe(goodsRef.current);
    return () => observer && observer.disconnect();
  }, [goodsList]);

  return (
    <div className='w-[375px] mx-auto'>
      <div className='sticky top-0 z-10 bg-white'>
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
            handleSearchInput={handleSearchInput}
          />
        )}
      </div>
      <Line />
      {goodsList.length === 0 && <NoGoods />}
      {goodsList.length > 0 && (
        <GoodsList
          goodsList={goodsList}
          goodsRef={goodsRef}
          isToggledSoldOut={toggledButtonList.includes('품절포함')}
        />
      )}
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
