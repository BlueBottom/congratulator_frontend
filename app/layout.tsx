import { Layout, Menu } from "antd";
import "./globals.css";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Link from "antd/es/typography/Link";

const items = [
  {key : "home", label : <Link href={"/"}>Home</Link>},
  {key : "birthdays", label : <Link href={"/birthdays"}>Birthdays</Link>},
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout style={{minHeight:"100vh"}}>
          <Header>
            <Menu theme="dark" mode="horizontal" items={items} style={{flex:1}}/>
          </Header>
          <Content style={{padding: "0 40px"}}>{children}</Content>
          <Footer style={{textAlign: "center"}}>Footer</Footer>
          </Layout>
        </body>
    </html>
  );
}