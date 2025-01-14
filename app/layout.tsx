import "@/components/global.css";

// MAPS = Monitoring and Analyzing Processes System (Systém monitorování a analýzy procesů)

export const metadata = {
  title: "DCT MAPS",
  keywords: "monitoring, analyzing, process, system",
  description: "MAPS = Monitoring and Analyzing Processes System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
