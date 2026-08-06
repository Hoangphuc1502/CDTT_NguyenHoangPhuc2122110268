import "./globals.css";
import LayoutProvider from "../components/LayoutProvider";

export const metadata = {
  title: "Sport Shop",
  description: "Website bán dụng cụ thể thao",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}