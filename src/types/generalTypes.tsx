import React from "react";

export type referenceLink = {
  title: string;
  href: string;
  key?: number;
};

export interface footerLinks extends referenceLink {
  id?: number | string;
}

export interface footerSocialNetworkLinks extends referenceLink {
  id?: number | string;
  logo: string;
}

export interface HeaderLinks extends referenceLink {
  id?: number | string;
}

export interface IconProps {
  color?: string;
  width?: string;
  height?: string;
}

export type InputTextStateProp = string | number;

export enum InputTextTypeEnum {
  email = "email",
  text = "text",
  password = "password",
  tel = "tel",
  number = "number",
  url = "url",
}

export interface FetchDataResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  fetchData: (body?: object | null) => Promise<void>;
}
