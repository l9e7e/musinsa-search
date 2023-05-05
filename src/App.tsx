import { SyntheticEvent, useEffect, useRef, useState } from 'react';

function App() {
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const goodsRef = useRef(null);
  const fetchingIndexRef = useRef(0);
  const [isToggledSearchButton, setIsToggledSearchButton] = useState(false);
  const [filterdButtonList, setFilteredButtonList] = useState<string[]>([]);

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

  const removeFilteredButton = (clickedFilteredButton: string) => {
    setFilteredButtonList(
      filterdButtonList.filter(
        (filterdButton) => filterdButton !== clickedFilteredButton
      )
    );
  };

  const handleFilteredButtonList = (clickedFilteredButton: string) => {
    if (filterdButtonList.includes(clickedFilteredButton)) {
      removeFilteredButton(clickedFilteredButton);
    } else {
      setFilteredButtonList([...filterdButtonList, clickedFilteredButton]);
    }
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
            fetchingIndexRef.current = 0;
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
        <div className='flex items-center justify-center h-[55px] gap-[5px] mx-[7px]'>
          <button
            className='flex items-center h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'
            onClick={() => setIsToggledSearchButton(!isToggledSearchButton)}
          >
            <span className='text-[14px] font-normal leading-[21px]'>검색</span>
            <img
              className='ml-[6px] !h-[15px] !w-[15px]'
              src='/logo_search.png'
            />
          </button>
          <button
            className='h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'
            onClick={() => handleFilteredButtonList('세일상품')}
          >
            <span className='text-[14px] font-normal leading-[21px]'>
              세일상품
            </span>
          </button>
          <button
            className='h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'
            onClick={() => handleFilteredButtonList('단독상품')}
          >
            <span className='text-[14px] font-normal leading-[21px]'>
              단독상품
            </span>
          </button>
          <button
            className='h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'
            onClick={() => handleFilteredButtonList('품절포함')}
          >
            <span className='text-[14px] font-normal leading-[21px]'>
              품절포함
            </span>
          </button>
        </div>
        {filterdButtonList.length > 0 && (
          <div className='h-[50px] flex items-center justify-between ml-[15px]'>
            <div className='flex gap-[5px]'>
              {filterdButtonList.map((filterdButton) => {
                return (
                  <button
                    className='flex items-center h-[26px] px-[10px] rounded-[4px] bg-[#0078FF] text-[#FFFFFF]'
                    onClick={() => removeFilteredButton(filterdButton)}
                  >
                    <span className='text-[12px] font-normal leading-[18px]'>
                      {filterdButton}
                    </span>
                    <img
                      className='ml-[6px] !h-[15px] !w-[15px]'
                      src='/logo_search.png'
                    />
                  </button>
                );
              })}
            </div>
            <div className='w-[50px] h-[50px] bg-[#000000]' />
          </div>
        )}
        {isToggledSearchButton && (
          <div className='h-[80px] bg-[#F9F9F9] flex items-center'>
            <div className='h-[40px] bg-[#FFFFFF] flex items-center mx-[10px] w-full border border-solid border-[#CCCCCC]'>
              <img
                className='ml-[10px] mr-[4px] !h-[19px] !w-[19px]'
                src='/logo_search.png'
              />
              <input
                className='outline-none text-[16px] font-normal leading-[24px] placeholder:text-[#AAAAAA]'
                placeholder='상품명 검색'
              />
            </div>
          </div>
        )}
      </div>
      <div className='h-[10px] bg-[#F1F1F1]' />
      <div className='flex flex-wrap'>
        {goodsList.map((goods, index) => {
          if (!goods.isSoldOut) {
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
          }
        })}
      </div>
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
