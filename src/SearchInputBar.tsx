interface SearchInputBar {
  searchInput: string;
  handleSearchInput: (searchInput: string) => void;
}

export default function SearchInputBar({
  searchInput,
  handleSearchInput,
}: SearchInputBar) {
  return (
    <div className='h-[80px] bg-[#F9F9F9] flex items-center'>
      <div className='h-[40px] bg-[#FFFFFF] flex items-center mx-[10px] w-full border border-solid border-[#CCCCCC]'>
        <img
          className='ml-[10px] mr-[4px] !h-[19px] !w-[19px]'
          src='/logo_search.png'
        />
        <input
          className='outline-none text-[16px] font-normal leading-[24px] placeholder:text-[#AAAAAA]'
          value={searchInput}
          onChange={(e) => handleSearchInput(e.currentTarget.value)}
          placeholder='상품명 검색'
        />
      </div>
    </div>
  );
}
