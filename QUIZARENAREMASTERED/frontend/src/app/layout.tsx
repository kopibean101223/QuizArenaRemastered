import '../styles/globals.css';

export const metadata = {
  title: 'Thesis Project',
  description: 'Multiplayer Real-time AI Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
