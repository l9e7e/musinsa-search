import { Button } from '../type';

interface ToggledButtonList {
  toggledButtonList: Button[];
  handleToggledButton: (toggledButton?: Button) => void;
}

export default function ToggledButtonList({
  toggledButtonList,
  handleToggledButton,
}: ToggledButtonList) {
  return (
    <>
      {toggledButtonList.length > 0 && (
        <div className='h-[50px] flex items-center justify-between ml-[15px]'>
          <div className='flex gap-[5px]'>
            {toggledButtonList.map((toggledButton, index) => {
              return (
                <button
                  key={index}
                  className='flex items-center h-[26px] px-[10px] rounded-[4px] bg-[#0078FF] text-[#FFFFFF]'
                  onClick={() => handleToggledButton(toggledButton)}
                >
                  <span className='text-[12px] font-normal leading-[18px]'>
                    {toggledButton}
                  </span>
                  <img
                    className='ml-[6px] !h-[8px] !w-[8px]'
                    src='/icon_remove.png'
                  />
                </button>
              );
            })}
          </div>
          <div className='w-[50px] h-[50px] flex justify-center items-center'>
            <button onClick={() => handleToggledButton()}>
              <img src='/icon_refresh.png' className='!h-[24px] !w-[24px]' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
