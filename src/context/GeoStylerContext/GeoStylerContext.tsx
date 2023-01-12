import { UnsupportedProperties } from 'geostyler-style';
import { cloneDeep } from 'lodash';
import React, { useContext } from 'react';
import { GeoStylerLocale } from '../../locale/locale';

export type UnsupportedPropertiesContextOptions = {
  hideUnsupported?: boolean;
  locale?: GeoStylerLocale['UnsupportedPropertiesUtil'];
};

export type UnsupportedPropertiesContextType = {
  unsupportedProperties: UnsupportedProperties;
  options?: UnsupportedPropertiesContextOptions;
};

export type InputConfig<T extends number | string | boolean> = {
  visibility?: boolean;
  default?: T;
};

export type CompositionContext = {
  FillEditor?: {
    visibility?: boolean;
    fillColorField?: InputConfig<string>;
    fillOpacityField?: InputConfig<number>;
    opacityField?: InputConfig<number>;
    outlineOpacityField?: InputConfig<number>;
    outlineColorField?: InputConfig<string>;
    outlineDasharrayField?: InputConfig<any>;
    outlineWidthField?: InputConfig<number>;
  };
  IconEditor?: {
    visibility: boolean;
    imageField: InputConfig<string>;
  };
  LineEditor?: any;
  MarkEditor?: any;
  TextEditor?: any;
  GraphicEditor?: any;
  RasterEditor?: any; // TODO: JS
  ComparisonFilter?: any;
  Renderer?: {
    rendererType: 'SLD' | 'OpenLayers';
    wmsBaseUrl: string;
    layer: string;
    rasterLayer?: string;
    additionalHeaders?: any;
    wmsParams?: any;
  };
  Rule?: {
    amount: InputConfig<number>;
    duplicate: InputConfig<number>;
    maxScale: InputConfig<number>;
    minScale: InputConfig<number>;
    name: InputConfig<string>;
  };
};

export interface GeoStylerContextInterface {
  composition?: CompositionContext;
  locale?: GeoStylerLocale;
  unsupportedProperties?: UnsupportedPropertiesContextType;
};

export const GeoStylerContext = React.createContext<GeoStylerContextInterface>({});

export const useGeoStylerContext = (): any => {
  const ctx = useContext(GeoStylerContext);
  return cloneDeep(ctx);
};

export const useGeoStylerComposition = <T extends keyof CompositionContext>(key: T): CompositionContext[T] => {
  const ctx = useContext(GeoStylerContext);
  return cloneDeep(ctx.composition[key]);
};

export const useGeoStylerLocale = <T extends keyof GeoStylerLocale>(key: T): GeoStylerLocale[T] => {
  const ctx = useContext(GeoStylerContext);
  return cloneDeep(ctx.locale[key]);
};

export const useGeoStylerUnsupportedProperties = (): any => {
  const ctx = useContext(GeoStylerContext);
  return cloneDeep(ctx.unsupportedProperties);
};
