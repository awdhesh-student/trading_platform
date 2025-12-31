import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Tab = "new" | "final" | "migrated";

export type FilterState = {
  keywords: string;
  exclude: string;
  minAge: number | "";
  maxAge: number | "";
  ageUnit: "m" | "h" | "d";
  minHolders: number | "";
  maxHolders: number | "";
  dexPaid: boolean;
  // Audit
  minInsider: number | "";
  maxInsider: number | "";
  minBundlers: number | "";
  maxBundlers: number | "";
  minPro: number | "";
  maxPro: number | "";
  minVisitors: number | "";
  maxVisitors: number | "";
  // Metrics
  minLiquidity: number | "";
  maxLiquidity: number | "";
  minVolume: number | "";
  maxVolume: number | "";
  minMarketCap: number | "";
  maxMarketCap: number | "";
};

const initialState = {
  activeTab: "new" as Tab,
  filters: {
    keywords: "",
    exclude: "",
    minAge: "",
    maxAge: "",
    ageUnit: "m",
    minHolders: "",
    maxHolders: "",
    dexPaid: false,
    minInsider: "",
    maxInsider: "",
    minBundlers: "",
    maxBundlers: "",
    minPro: "",
    maxPro: "",
    minVisitors: "",
    maxVisitors: "",
    minLiquidity: "",
    maxLiquidity: "",
    minVolume: "",
    maxVolume: "",
    minMarketCap: "",
    maxMarketCap: "",
  } as FilterState,
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTab(state, action: PayloadAction<Tab>) {
      state.activeTab = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.filters = action.payload;
    },
  },
});

export const { setTab, setFilters } = tableSlice.actions;
export default tableSlice.reducer;
