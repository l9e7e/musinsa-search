import { useEffect, useRef, useState } from 'react';
import StickyHeader from './StickyHeader';
import MusinsaIcon from './MusinsaIcon';
import ToggleButtonList from './ToggleButtonList';
import ToggledButtonList from './ToggledButtonList';
import SearchInputBar from './SearchInputBar';
import DivdingLine from './DivdingLine';
import GoodsList from './GoodsList';
import { TOGGLED_BUTTON_LIST } from './constant';
import { Button, Goods } from './type';

function App() {
  const nextFetchingRef = useRef(null);
  const fetchingIndexRef = useRef(0);

  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const [isToggledSearchInputBar, setIsToggledSearchInputBar] = useState(false);
  const [toggledButtonList, setToggledButtonList] = useState<Button[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchGoodsList = async () => {
    setIsFetching(true);

    try {
      const response = await fetch(
        `https://static.msscdn.net/musinsaUI/homework/data/goods${fetchingIndexRef.current}.json`
      );

      const {
        data: { list },
      } = await response.json();

      fetchingIndexRef.current += 1;
      setGoodsList([...goodsList, ...list]);
    } catch (e) {
      console.error(e);
      setGoodsList(goodsList);
    } finally {
      setIsFetching(false);
    }
  };

  const removeToggledButton = (toggleButton?: Button) => {
    if (toggleButton === undefined) {
      setToggledButtonList([]);
      return;
    }

    setToggledButtonList(
      toggledButtonList.filter(
        (filterdButton) => filterdButton !== toggleButton
      )
    );
  };

  const handleToggleButton = (toggleButton: Button) => {
    if (toggleButton === '검색') {
      setIsToggledSearchInputBar(!isToggledSearchInputBar);
    } else {
      if (toggledButtonList.includes(toggleButton)) {
        removeToggledButton(toggleButton);
      } else {
        setToggledButtonList([...toggledButtonList, toggleButton]);
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (
        [entry]: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entry.isIntersecting && !searchInput) {
          if (fetchingIndexRef.current > 3) {
            observer.disconnect();
          } else {
            fetchGoodsList();
          }
        }
      }
    );

    nextFetchingRef.current && observer.observe(nextFetchingRef.current);
    return () => observer && observer.disconnect();
  }, [goodsList, searchInput]);

  return (
    <div className='w-[375px] mx-auto'>
      <StickyHeader>
        <MusinsaIcon />
        <ToggleButtonList
          toggleButtonList={TOGGLED_BUTTON_LIST}
          handleToggleButton={handleToggleButton}
          isToggledSearchInputBar={isToggledSearchInputBar}
          toggledButtonList={toggledButtonList}
        />
        <ToggledButtonList
          toggledButtonList={toggledButtonList}
          removeToggledButton={removeToggledButton}
        />
        {isToggledSearchInputBar && (
          <SearchInputBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        )}
      </StickyHeader>
      {(isToggledSearchInputBar || toggledButtonList.length > 0) && (
        <DivdingLine />
      )}
      <GoodsList
        goodsList={goodsList}
        nextFetchingRef={nextFetchingRef}
        searchInput={searchInput}
        toggledButtonList={toggledButtonList}
        isFetching={isFetching}
      />
    </div>
  );
}

export default App;
