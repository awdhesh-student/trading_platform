import React from "react";
import SubHeaderBottom from "../components/layout/SubHeaderBottom";
import TokenTable from "../components/token-table/TokenTable";
import ErrorBoundary from "../components/common/ErrorBoundary";

export default function Page() {
  return (
    <>
      <SubHeaderBottom />

      <div className="flex-1 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="mx-auto w-full max-w-[1920px] px-4 mt-4">
          <ErrorBoundary>
            <TokenTable />
          </ErrorBoundary>
        </div>
        <div className="h-10" />
      </div>
    </>
  );
}
