import { SyntheticEvent, useEffect, useState } from 'react';

function App() {
  const [goodsList, setGoodsList] = useState<Goods[]>([]);

  const fetchGoodsList = async () => {
    try {
      const response = await fetch(
        `https://static.msscdn.net/musinsaUI/homework/data/goods0.json`
      );
      const {
        data: { list },
      } = await response.json();

      setGoodsList(list);
    } catch (e) {
      console.error(e);
      setGoodsList([]);
    }
  };

  useEffect(() => {
    fetchGoodsList();
  }, []);

  console.log(goodsList);

  return (
    <div className='w-[375px] mx-auto'>
      <div className='flex justify-center items-center h-[50px]'>
        <img className='!h-[16px]' src='/logo_musinsa.svg' />
      </div>
      <div className='flex items-center justify-center h-[55px] gap-[5px] mx-[7px]'>
        <button className='flex items-center h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'>
          검색
          <img
            className='ml-[6px] !h-[15px] !w-[15px]'
            src='/logo_search.png'
          />
        </button>
        <button className='h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'>
          세일상품
        </button>
        <button className='h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'>
          단독상품
        </button>
        <button className='h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'>
          품절포함
        </button>
      </div>
      <div className='h-[50px] flex items-center ml-[15px]'>
        <div className='flex gap-[5px]'>
          <button className='flex items-center h-[26px] px-[10px] rounded-[4px] bg-[#0078FF] text-[#FFFFFF]'>
            스니커즈
            <img
              className='ml-[6px] !h-[15px] !w-[15px]'
              src='/logo_search.png'
            />
          </button>
          <button className='flex items-center h-[26px] px-[10px] rounded-[4px] bg-[#0078FF] text-[#FFFFFF]'>
            세일상품
            <img
              className='ml-[6px] !h-[15px] !w-[15px]'
              src='/logo_search.png'
            />
          </button>
          <button className='flex items-center h-[26px] px-[10px] rounded-[4px] bg-[#0078FF] text-[#FFFFFF]'>
            단독상품
            <img
              className='ml-[6px] !h-[15px] !w-[15px]'
              src='/logo_search.png'
            />
          </button>
        </div>
        <div className='w-[50px] h-[50px] bg-[#000000]' />
      </div>
      <div className='h-[80px] bg-[#F9F9F9] flex items-center'>
        <div className='h-[40px] bg-[#FFFFFF] flex items-center mx-[10px] w-full border border-solid border-[#CCCCCC]'>
          <img
            className='ml-[10px] mr-[4px] !h-[19px] !w-[19px]'
            src='/logo_search.png'
          />
          <input className='outline-none' placeholder='상품명 검색' />
        </div>
      </div>
      <div className='flex flex-wrap'>
        {goodsList.map((goods) => {
          return (
            <div className='basis-1/2'>
              <div className='relative'>
                <img
                  className='!h-[226px]'
                  src={goods.imageUrl}
                  onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.src = '/img_default.jpeg';
                  }}
                />
                {goods.isExclusive && (
                  <span className='absolute -bottom-[16px] left-[10px] text-white bg-[#18A286] px-[6px] py-[4px]'>
                    단독
                  </span>
                )}
              </div>
              <div className='mx-[10px]'>
                <div className='mt-[20px]'>{goods.brandName}</div>
                <div className='line-clamp-2 break-all'>{goods.goodsName}</div>
                <div className='flex justify-between'>
                  <span>{goods.price}</span>
                  <span>{goods.saleRate}</span>
                </div>
                <div>{goods.normalPrice}</div>
              </div>
            </div>
          );
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
