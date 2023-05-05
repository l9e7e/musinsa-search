function App() {
  return (
    <div>
      <div className='flex justify-center items-center h-[50px]'>
        <img className='!h-[16px]' src='/logo_musinsa.svg' />
      </div>
      <div className='flex items-center justify-center h-[55px] gap-[5px] mx-[7px]'>
        <button className='flex items-center h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]'>
          검색{' '}
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
    </div>
  );
}

export default App;
