import FullLayout from "./src/layouts/FullLayout";
import StyledJsxRegistry from './registry'

export const metadata = {
  title: "HushString | Dashboard ",
  description: "HushString admin dashboard page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <FullLayout>  <StyledJsxRegistry>{children}</StyledJsxRegistry></FullLayout>
      </body>
    </html>
  );
}
