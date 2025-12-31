import React from "react";
import Header from "../components/layout/Header";
import SubHeader from "../components/layout/SubHeader";
import TokenTable from "../components/token-table/TokenTable";
import ErrorBoundary from "../components/common/ErrorBoundary";
import Footer from "../components/layout/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white font-sans selection:bg-blue-500/30 flex flex-col h-screen overflow-hidden">
      <Header />

      <main className="flex-1 flex flex-col min-h-0 relative">
        <SubHeader />

        <div className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="mx-auto w-full max-w-7xl px-4 mt-4">
            <ErrorBoundary>
              <TokenTable />
            </ErrorBoundary>
          </div>
          <div className="h-10" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
