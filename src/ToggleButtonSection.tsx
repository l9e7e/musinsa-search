interface ToggleButtonSection {
  toggleButtonList: string[];
  handleToggleButton: (value: string) => void;
}

export default function ToggleButtonSection({
  toggleButtonList,
  handleToggleButton,
}: ToggleButtonSection) {
  return (
    <div className='flex items-center justify-center h-[55px] gap-[5px] mx-[7px]'>
      {toggleButtonList.map((toggleButton) => {
        const isSearchToggleButton = toggleButton === '검색';
        return (
          <button
            className={`${
              isSearchToggleButton ? `flex items-center ` : ''
            }h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]`}
            onClick={() => handleToggleButton(toggleButton)}
          >
            <span className='text-[14px] font-normal leading-[21px]'>
              {toggleButton}
            </span>
            {isSearchToggleButton && (
              <img
                className='ml-[6px] !h-[15px] !w-[15px]'
                src='/logo_search.png'
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
