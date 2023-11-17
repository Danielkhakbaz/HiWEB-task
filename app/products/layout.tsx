import Navbar from "layout/navbar/navbar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="px-8 py-4">
        <Navbar />
        {children}
      </main>
    </>
  );
};

export default Layout;
