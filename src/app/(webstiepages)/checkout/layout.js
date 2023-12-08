import Script from "next/script";

export const viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
};

export default function checkoutLayout({ children }) {
  return (
    <>
      <section>{children}</section>
      <Script
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`}
        crossorigin="anonymous"
      />
    </>
  );
}
