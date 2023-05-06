import { Button, Goods } from "./type";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const filterGoodsList = ({
  goodsList,
  toggledButtonList,
  searchInput,
}: {
  goodsList: Goods[];
  toggledButtonList: Button[];
  searchInput: string;
}) => {
  const isToggledSoldOut = toggledButtonList.includes('품절포함');
  const isToggledSale = toggledButtonList.includes('세일상품');
  const isToggledExclusive = toggledButtonList.includes('단독상품');

  let list: Goods[] = goodsList.filter((goods) => !goods.isSoldOut);

  if (isToggledSale) {
    list = goodsList.filter((goods) => goods.isSale);
  }

  if (isToggledExclusive) {
    list = goodsList.filter((goods) => goods.isExclusive);
  }

  if (isToggledSoldOut) {
    list = goodsList;
  }

  if (isToggledSale && isToggledExclusive) {
    list = goodsList.filter((goods) => goods.isSale && goods.isExclusive);
  }

  if (isToggledSale && isToggledSoldOut) {
    list = goodsList.filter((goods) => goods.isSale && goods.isSoldOut);
  }

  if (isToggledExclusive && isToggledSoldOut) {
    list = goodsList.filter((goods) => goods.isExclusive && goods.isSoldOut);
  }

  if (searchInput) {
    list = list.filter((goods) => goods.goodsName.includes(searchInput));
  }

  return list;
};
