export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="text-gray-700 dark:text-gray-200 size-full">
      {children}
    </main>
  )
}
