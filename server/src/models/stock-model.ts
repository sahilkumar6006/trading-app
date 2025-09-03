import mongoose from "mongoose";

interface IStock {
  symbol: string;
  companyName: string;
  iconUrl: string;
  lastDayTradedPrice: string;
  currentPrice: number;
  dayTimeSeries: number[];
  tenMinTimeSeries: number[];
}

const StockSchema = new mongoose.Schema<IStock>({
  symbol: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },

  lastDayTradedPrice: {
    type: String,
  },
  currentPrice: {
    type: Number,
  },
  dayTimeSeries: {
    type: [Object],
    default: [],
  },
  tenMinTimeSeries: {
    type: [Object],
    default: [],
  },
});

const Stock = mongoose.model<IStock>("Stock", StockSchema);

export default Stock;
