interface ToggledButtonList {
  toggledButtonList: string[];
  removeToggledButton: (toggledButton?: string) => void;
}

export default function ToggledButtonList({
  toggledButtonList,
  removeToggledButton,
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
                  onClick={() => removeToggledButton(toggledButton)}
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
            <button onClick={() => removeToggledButton()}>
              <img src='/icon_refresh.png' className='!h-[32px] !w-[32px]' />
            </button>
          </div>
        </div>
      )}
    </>
  );
}