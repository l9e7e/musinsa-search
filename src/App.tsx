import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import NoResult from './NoResult';
import ToggleButtonSection from './ToggleButtonSection';
import ToggledButtonSection from './ToggledButtonSection';

function App() {
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const originGoodsList = useRef<Goods[]>([]);
  const goodsRef = useRef(null);
  const fetchingIndexRef = useRef(0);
  const [isToggledSearchButton, setIsToggledSearchButton] = useState(false);
  const [filterdButtonList, setFilteredButtonList] = useState<string[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');

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

  const removeToggledButton = (clickedFilteredButton: string) => {
    setFilteredButtonList(
      filterdButtonList.filter(
        (filterdButton) => filterdButton !== clickedFilteredButton
      )
    );
  };

  const handleToggleButton = (clickedFilteredButton: string) => {
    if (clickedFilteredButton === '검색') {
      setIsToggledSearchButton(!isToggledSearchButton);
    } else {
      if (filterdButtonList.includes(clickedFilteredButton)) {
        removeToggledButton(clickedFilteredButton);
      } else {
        setFilteredButtonList([...filterdButtonList, clickedFilteredButton]);
      }
    }
  };

  const handleSearch = (searchInputValue: string) => {
    setSearchInputValue(searchInputValue);

    const searchedGoodsList = originGoodsList.current.filter((goods) => {
      if (goods.goodsName.includes(searchInputValue)) {
        return goods;
      }
    });

    setGoodsList(searchedGoodsList);
  };

  useEffect(() => {
    fetchGoodsList();
  }, []);

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
        <div className='flex justify-center items-center h-[50px]'>
          <img className='!h-[16px]' src='/logo_musinsa.svg' />
        </div>
        <ToggleButtonSection
          toggleButtonList={['검색', '세일상품', '단독상품', '품절포함']}
          handleToggleButton={handleToggleButton}
        />
        <ToggledButtonSection
          filterdButtonList={filterdButtonList}
          removeToggledButton={removeToggledButton}
        />
        {isToggledSearchButton && (
          <div className='h-[80px] bg-[#F9F9F9] flex items-center'>
            <div className='h-[40px] bg-[#FFFFFF] flex items-center mx-[10px] w-full border border-solid border-[#CCCCCC]'>
              <img
                className='ml-[10px] mr-[4px] !h-[19px] !w-[19px]'
                src='/logo_search.png'
              />
              <input
                className='outline-none text-[16px] font-normal leading-[24px] placeholder:text-[#AAAAAA]'
                value={searchInputValue}
                onChange={(e) => handleSearch(e.currentTarget.value)}
                placeholder='상품명 검색'
              />
            </div>
          </div>
        )}
      </div>
      <div className='h-[10px] bg-[#F1F1F1]' />
      {goodsList.length === 0 && <NoResult />}
      {goodsList.length > 0 && (
        <div className='flex flex-wrap'>
          {goodsList.map((goods, index) => {
            return (
              <div key={index} className='basis-1/2' ref={goodsRef}>
                <div className='relative'>
                  <img
                    className='!h-[226px]'
                    src={goods.imageUrl}
                    onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = '/img_default.jpeg';
                    }}
                  />
                  {goods.isExclusive && (
                    <span className='text-[12px] font-normal leading-[18px] -tracking-[0.5px] absolute -bottom-[12px] left-[10px] text-white bg-[#18A286] px-[6px] py-[4px]'>
                      단독
                    </span>
                  )}
                </div>
                <div className='mx-[10px] mb-[20px]'>
                  <p className='text-[11px] font-normal leading-[16px] mt-[20px]'>
                    {goods.brandName}
                  </p>
                  <p className='mt-[8px] text-[14px] font-bold leading-[18px] line-clamp-2 break-all'>
                    {goods.goodsName}
                  </p>
                  <div className='mt-[4px] flex justify-between'>
                    <span className='text-[16px] font-medium leading-[24px]'>
                      {goods.price.toLocaleString()}원
                    </span>
                    <span className='text-[16px] font-medium leading-[24px] text-[#FF0000]'>
                      {goods.saleRate}%
                    </span>
                  </div>
                  <p className='text-[11px] font-normal leading-[12px] line-through text-[#AAAAAA]'>
                    {goods.normalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;

interface Goods {
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
