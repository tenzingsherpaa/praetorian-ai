import "./globals.css";

export const metadata = {
  title: "Pome — YC-Style Demo",
  description: "Send your agent. We harden it against prompt injection, data exfiltration, and tool abuse."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
