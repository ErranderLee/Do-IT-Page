import React, { Dispatch, SetStateAction, useMemo } from "react";
import { BoardFooterContainer, BoardFooterItem } from "./styles";

const FOOTER_LIST_LENGTH = 5;

const Footer = ({
  pageNum,
  setPageNum,
  totalBoardContentLength,
}: {
  pageNum: number;
  setPageNum: Dispatch<SetStateAction<number>>;
  totalBoardContentLength: number;
}) => {
  const handleButtonClick = (e: any) => {
    //   const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e?.target?.closest("#target");
    if (!target) return;
    setPageNum(Number(target.getAttribute("data-idx")) - 1);
  };

  const totalList = useMemo(() => {
    return new Array(totalBoardContentLength).fill(1).map((_, idx) => idx);
  }, [totalBoardContentLength]);

  const arrList =
    pageNum < FOOTER_LIST_LENGTH
      ? totalList.filter((item) => item < 2 * FOOTER_LIST_LENGTH)
      : pageNum > totalBoardContentLength - FOOTER_LIST_LENGTH
      ? totalList.filter(
          (item) => item > totalBoardContentLength - 2 * FOOTER_LIST_LENGTH
        )
      : totalList.filter(
          (item) =>
            pageNum - FOOTER_LIST_LENGTH < Number(item) &&
            Number(item) < pageNum + FOOTER_LIST_LENGTH
        );

  return (
    <BoardFooterContainer onClick={handleButtonClick}>
      {arrList.map((item, idx) => (
        <BoardFooterItem
          key={item}
          id="target"
          data-idx={Number(item) + 1}
          style={{ color: item === pageNum ? "#d3d1d1" : "" }}
        >
          {item + 1}
        </BoardFooterItem>
      ))}
    </BoardFooterContainer>
  );
};

export default Footer;
