import { ProviderRpcError } from "hardhat/types";

export const TX_ACTION_TYPES = {
  SEND_START: "SEND_START",
  SEND_ERROR: "SEND_ERROR",
  SEND_SUCCESS: "SEND_SUCCESS",
};

export type TXState = {
  loading: boolean;
  error: null | ProviderRpcError;
  message: string;
};

export const TX_INITIAL_STATE: TXState = {
  loading: false,
  error: null,
  message: "",
};

export function sendTipReducer(
  state: TXState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case TX_ACTION_TYPES.SEND_START:
      return {
        loading: true,
        error: null,
        message: action.payload,
      };
    case TX_ACTION_TYPES.SEND_ERROR:
      return {
        loading: false,
        error: action.payload,
        message: "",
      };
    case TX_ACTION_TYPES.SEND_SUCCESS:
      return {
        loading: true,
        error: null,
        message: action.payload,
      };
    default:
      return state;
  }
}
