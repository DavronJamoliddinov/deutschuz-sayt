"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Joriy yil: statik HTML'da build yili, brauzerda — bugungi yil. */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
  return <>{year}</>;
}
