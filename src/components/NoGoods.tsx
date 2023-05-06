export default function NoGoods() {
  return (
    <div className='flex flex-col items-center justify-center absolute inset-0'>
      <img src='/icon_no_goods.svg' className='!h-[90px] !w-[90px]' />
      <p className='text-[14px] font-normal leading-[21px] text-[#AAAAAA]'>
        검색 결과 없음
      </p>
    </div>
  );
}
