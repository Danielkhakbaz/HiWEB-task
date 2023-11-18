import Navbar from "layout/navbar/navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col px-8 py-5">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
