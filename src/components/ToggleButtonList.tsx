import { Button } from '../type';
import cn from 'classnames';

interface TopggleButtonList {
  toggleButtonList: Button[];
  handleToggleButton: (value: Button) => void;
  isToggledSearchInputBar: boolean;
  toggledButtonList: Button[];
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
            onClick={() => handleToggleButton(toggleButton)}
            className={cn(
              'h-[35px] px-[15px] border border-solid rounded-[18px] border-[#EEEEEE]',
              {
                'flex items-center': isSearchToggleButton,
                'text-[#0078FF]': toggledButtonList.includes(toggleButton),
                'bg-[#0078FF] text-white':
                  isToggledSearchInputBar && isSearchToggleButton,
              }
            )}
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
