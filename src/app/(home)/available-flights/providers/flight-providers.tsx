"use client";
import { Airplane, Flight } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  Suspense,
  useReducer,
} from "react";

interface FlightprovidersProps {
  children: ReactNode;
}

export enum FilterActionKind {
  ADD_PLANE = "ADD_PLANE",
  REMOVE_PLANE = "REMOVE_PLANE",
  SET_SEAT = "SEAT_SEAT",
}

type FilterState = {
  departure?: string | null;
  arrival?: string | null;
  date?: string | null;
  planeId: string;
  planeIds: string[];
  seat?: string | null;
};

type FilterAction = {
  type: FilterActionKind;
  payload: Omit<FilterState, "planeIds">; // Omit digunakan untuk membuat tipe baru dengan mengecualikan properti tertentu dari tipe yang sudah ada.
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  const { payload, type } = action;

  switch (type) {
    case FilterActionKind.ADD_PLANE:
      return {
        ...state,
        planeIds: [...state.planeIds, payload.planeId],
      };
    case FilterActionKind.REMOVE_PLANE:
      return {
        ...state,
        planeIds: state.planeIds.filter((item) => item !== payload.planeId),
      };
    case FilterActionKind.SET_SEAT:
      return {
        ...state,
        seat: payload.seat,
      };

    default:
      return state;
  }
}

export type FlightWithPlane = Flight & {
  plane: Airplane;
};

export type FContext = {
  flights: FlightWithPlane[] | undefined;
  isLoading: boolean;
  dispatch: Dispatch<FilterAction>;
  state: FilterState;
};

export const FlightContext = createContext<FContext | null>(null);

const Flightproviders: FC<FlightprovidersProps> = ({ children }) => {
  const search = useSearchParams();

  const params = {
    departure: search.get("departure"),
    arrival: search.get("arrival"),
    date: search.get("date"),
  };

  const [state, dispatch] = useReducer(filterReducer, {
    arrival: params.arrival,
    date: params.date,
    departure: params.departure,
    planeId: "",
    planeIds: [],
    seat: null,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["flight-list", state],
    queryFn: () =>
      axios.post("/api/flights", state).then((res) => res.data.data),
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlightContext.Provider
        value={{ flights: data, isLoading, dispatch, state }}
      >
        {children}
      </FlightContext.Provider>
    </Suspense>
  );
};

export default Flightproviders;
