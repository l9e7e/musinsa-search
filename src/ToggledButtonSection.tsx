interface ToggledButtonSection {
  filterdButtonList: string[];
  removeToggledButton: (button: string) => void;
}

export default function ToggledButtonSection({
  filterdButtonList,
  removeToggledButton,
}: ToggledButtonSection) {
  return (
    <>
      {filterdButtonList.length > 0 && (
        <div className='h-[50px] flex items-center justify-between ml-[15px]'>
          <div className='flex gap-[5px]'>
            {filterdButtonList.map((filterdButton) => {
              return (
                <button
                  className='flex items-center h-[26px] px-[10px] rounded-[4px] bg-[#0078FF] text-[#FFFFFF]'
                  onClick={() => removeToggledButton(filterdButton)}
                >
                  <span className='text-[12px] font-normal leading-[18px]'>
                    {filterdButton}
                  </span>
                  <img
                    className='ml-[6px] !h-[15px] !w-[15px]'
                    src='/logo_search.png'
                  />
                </button>
              );
            })}
          </div>
          <div className='w-[50px] h-[50px] bg-[#000000]' />
        </div>
      )}
    </>
  );
}
