const PageWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-full flex flex-col px-2 md:px-6 lg:px-12 xl:px-16 pb-24 mx-auto max-w-screen-2xl">
      {children}
    </div>
  );
};

export default PageWrapper;
