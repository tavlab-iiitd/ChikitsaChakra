import Navbar from "./Navbar";

const PageWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-full flex flex-col px-2 md:px-6 lg:px-12 xl:px-16 pb-24 mx-auto max-w-screen-2xl">
      <Navbar className="-mx-2 md:-mx-6 lg:-mx-12 xl:-mx-16 px-2 md:px-6 lg:px-12 xl:px-16" />
      {children}
    </div>
  );
};

export default PageWrapper;
