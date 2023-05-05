interface TopggleButtonList {
  toggleButtonList: string[];
  handleToggleButton: (value: string) => void;
  isToggledSearchInputBar: boolean;
  toggledButtonList: string[];
}

export default function TopggleButtonList({
  toggleButtonList,
  handleToggleButton,
  isToggledSearchInputBar,
  toggledButtonList,
}: TopggleButtonList) {
  return (
    <div className='flex items-center justify-center h-[55px] gap-[5px] mx-[7px]'>
      {toggleButtonList.map((toggleButton, index) => {
        const isSearchToggleButton = toggleButton === '검색';
        return (
          <button
            key={index}
            className={`${
              isSearchToggleButton ? `flex items-center ` : ''
            }h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]${
              (isToggledSearchInputBar && isSearchToggleButton) ||
              toggledButtonList.includes(toggleButton)
                ? ' text-[#0078FF]'
                : ''
            }`}
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
