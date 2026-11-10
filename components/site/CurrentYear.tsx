"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getServerYear = () => null;

/**
 * Toont altijd het actuele jaar, ook als de pagina statisch is gebouwd.
 * Het jaar wordt in de browser ingevuld, zodat er geen verouderd bouwjaar blijft staan.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);
  return <span>{year ?? ""}</span>;
}
