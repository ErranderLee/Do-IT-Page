import { Container, Text, Date } from "./style";
import { BoardContentType } from "@Type/.";

interface BasicBoardPreviewProps extends BoardContentType {
  type: string;
  idx: number;
}
const BasicBoardPreview = ({
  title,
  date,
  type,
  visitor,
  idx,
}: BasicBoardPreviewProps) => {
  return (
    <Container>
      <Text>
        {type !== "basic" && <span>{idx}</span>}
        {type === "basic" && "โข"}
        {title}
      </Text>
      <Date>{date}</Date>
      {type !== "basic" && (
        <>
          <Text>์กฐํ์</Text>
          <Text>{visitor}</Text>
        </>
      )}
    </Container>
  );
};

export default BasicBoardPreview;
