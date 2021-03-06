import Button from "@Atoms/Button/Login";
import { ADMIN_CATEGORY } from "@Constant/.";
import { SmallLoginButtonType } from "@Style/.";
import { AdminContainer, Title } from "./styles";

const AdminHeader = ({ category }: { category: number }) => {
  return (
    <AdminContainer>
      <Title>{ADMIN_CATEGORY[category]}</Title>
      <Button {...SmallLoginButtonType} title={"๋ก๊ทธ์์"} />
    </AdminContainer>
  );
};

export default AdminHeader;
