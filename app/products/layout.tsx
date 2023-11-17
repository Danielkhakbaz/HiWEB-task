import Navbar from "layout/navbar/navbar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="min-h-screen flex flex-col px-8 py-5">
        <Navbar />
        {children}
      </main>
    </>
  );
};

export default Layout;
