import { useEffect, useRef, useState } from 'react';

import StickyHeader from './components/StickyHeader';
import MusinsaIcon from './components/MusinsaIcon';
import ToggleButtonList from './components/ToggleButtonList';
import ToggledButtonList from './components/ToggledButtonList';
import SearchInputBar from './components/SearchInputBar';
import DivdingLine from './components/DivdingLine';
import GoodsList from './components/GoodsList';
import Spinner from './components/Spinner';

import { Button, Goods } from './type';
import { TOGGLED_BUTTON_LIST } from './constant';
import { delay } from './function';

function App() {
  const ioRef = useRef(null);
  const fetchingIndexRef = useRef(0);

  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const [isToggledSearchInputBar, setIsToggledSearchInputBar] = useState(false);
  const [toggledButtonList, setToggledButtonList] = useState<Button[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const fetchGoodsList = async () => {
    setIsFetching(true);
    await delay(300);

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

  const handleToggledButton = (toggleButton?: Button) => {
    if (toggleButton === undefined) {
      setToggledButtonList([]);
      return;
    }

    setToggledButtonList(
      toggledButtonList.filter(
        (toggledButton) => toggledButton !== toggleButton
      )
    );
  };

  const handleToggleButton = (toggleButton: Button) => {
    if (toggleButton === '검색') {
      setIsToggledSearchInputBar(!isToggledSearchInputBar);
    } else {
      if (toggledButtonList.includes(toggleButton)) {
        handleToggledButton(toggleButton);
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
          // `fetchingIndexRef.current` === 4 is last
          if (fetchingIndexRef.current > 3) {
            observer.disconnect();
          } else {
            fetchGoodsList();
          }
        }
      }
    );

    ioRef.current && observer.observe(ioRef.current);
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
          handleToggledButton={handleToggledButton}
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
        searchInput={searchInput}
        toggledButtonList={toggledButtonList}
        isFetching={isFetching}
      />
      <div ref={ioRef} />
      {isFetching && <Spinner />}
    </div>
  );
}

export default App;
