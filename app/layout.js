import "./globals.css";

export const metadata = {
  title: "Spring 2026 Deadline Dashboard",
  description: "Interactive semester dashboard for COS 240, COS 435, CLA, and IW deadlines."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
