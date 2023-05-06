import { Ref, SyntheticEvent } from 'react';
import NoGoods from '../components/NoGoods';
import { Button, Goods } from '../type';
import Spinner from '../components/Spinner';
import { filterGoodsList } from '../function';

interface GoodsList {
  goodsList: Goods[];
  searchInput: string;
  toggledButtonList: Button[];
  isFetching: boolean;
}

export default function GoodsList({
  goodsList,
  searchInput,
  toggledButtonList,
  isFetching,
}: GoodsList) {
  const list = filterGoodsList({
    goodsList,
    toggledButtonList,
    searchInput,
  });

  return (
    <>
      <div className='flex flex-wrap'>
        {/* {list.length === 0 && !isFetching && <NoGoods />} */}
        {list.map((goods, index) => {
          return (
            <div key={index} className='basis-1/2'>
              <div className='relative'>
                {goods.isSoldOut && (
                  <div className='h-[226px] w-full absolute bg-white opacity-80 flex items-center justify-center'>
                    <span className='text-[20px] font-medium leading-[22px] text-[#777777]'>
                      SOLD OUT
                    </span>
                  </div>
                )}
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
    </>
  );
}
