export default function Spinner() {
  return (
    <img
      className='my-[20px] mx-auto animate-spin duration-100'
      src='/icon_loading.svg'
      style={{ animationDuration: '300ms' }}
    />
  );
}
