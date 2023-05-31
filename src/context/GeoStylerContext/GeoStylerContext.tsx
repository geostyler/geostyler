import { UnsupportedProperties } from 'geostyler-style';
import React, { useContext } from 'react';
import { ComparisonFilterProps } from '../../Component/Filter/ComparisonFilter/ComparisonFilter';
import type GeoStylerLocale from '../../locale/locale';
import {
} from '../../Component/Symbolizer/Field/ContrastEnhancementField/ContrastEnhancementField';
import { RendererProps } from '../../Component/Renderer/Renderer/Renderer';
import { FillEditorComposableProps } from '../../Component/Symbolizer/FillEditor/FillEditor';
import { IconEditorComposableProps } from '../../Component/Symbolizer/IconEditor/IconEditor';
import { LineEditorComposableProps } from '../../Component/Symbolizer/LineEditor/LineEditor';
import { MarkEditorComposableProps } from '../../Component/Symbolizer/MarkEditor/MarkEditor';
import { WellKnownNameEditorComposableProps } from '../../Component/Symbolizer/WellKnownNameEditor/WellKnownNameEditor';
import { TextEditorComposableProps } from '../../Component/Symbolizer/TextEditor/TextEditor';
import { RasterEditorComposableProps } from '../../Component/Symbolizer/RasterEditor/RasterEditor';
import { RasterChannelEditorComposableProps } from '../../Component/Symbolizer/RasterChannelEditor/RasterChannelEditor';
import { ColorMapEditorComposableProps } from '../../Component/Symbolizer/ColorMapEditor/ColorMapEditor';
import { RuleComposableProps } from '../../Component/RuleCard/RuleCard';

export type UnsupportedPropertiesContextOptions = {
  hideUnsupported?: boolean;
  locale?: GeoStylerLocale['UnsupportedPropertiesUtil'];
};

export type UnsupportedPropertiesContextType = {
  unsupportedProperties: UnsupportedProperties;
  options?: UnsupportedPropertiesContextOptions;
};

export type InputConfig<T> = {
  visibility?: boolean;
  default?: T;
};

export type CompositionContext = {
  FillEditor?: FillEditorComposableProps;
  IconEditor?: IconEditorComposableProps;
  LineEditor?: LineEditorComposableProps;
  MarkEditor?: MarkEditorComposableProps;
  WellKnownNameEditor?: WellKnownNameEditorComposableProps;
  TextEditor?: TextEditorComposableProps;
  RasterEditor?: RasterEditorComposableProps;
  RasterChannelEditor?: RasterChannelEditorComposableProps;
  ColorMapEditor?: ColorMapEditorComposableProps;
  ComparisonFilter?: Partial<ComparisonFilterProps>;
  Renderer?: Partial<Omit<RendererProps, 'onClick'>>;
  Rules?: {
    enableClassification?: boolean;
  };
  Rule?: RuleComposableProps;
};

export interface GeoStylerContextInterface {
  composition?: CompositionContext;
  locale?: GeoStylerLocale;
  unsupportedProperties?: UnsupportedPropertiesContextType;
};

export const GeoStylerContext = React.createContext<GeoStylerContextInterface>({});

export const useGeoStylerContext = (): GeoStylerContextInterface => {
  const ctx = useContext(GeoStylerContext);
  return structuredClone(ctx);
};

export const useGeoStylerComposition = <T extends keyof CompositionContext>(
  key: T): CompositionContext[T] => {
  const ctx = useContext(GeoStylerContext);

  if (!ctx.composition || !ctx.composition[key]) {
    return {} as CompositionContext[T];
  }
  return structuredClone(ctx.composition[key]);
};

export const useGeoStylerLocale = <T extends keyof GeoStylerLocale>(key: T): GeoStylerLocale[T] => {
  const ctx = useContext(GeoStylerContext);
  return structuredClone(ctx.locale[key]);
};

export const useGeoStylerUnsupportedProperties = (): any => {
  const ctx = useContext(GeoStylerContext);
  return structuredClone(ctx.unsupportedProperties);
};
