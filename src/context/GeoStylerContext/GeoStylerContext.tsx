import { Symbolizer, UnsupportedProperties, isSymbolizer } from 'geostyler-style';
import React, { useContext } from 'react';
import { ComparisonFilterComposableProps } from '../../Component/Filter/ComparisonFilter/ComparisonFilter';
import type GeoStylerLocale from '../../locale/locale';
import {
} from '../../Component/Symbolizer/Field/ContrastEnhancementField/ContrastEnhancementField';
import { RendererComposableProps } from '../../Component/Renderer/Renderer/Renderer';
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
import { RulesComposableProps } from '../../Component/Rules/Rules';
import { EditorComposableProps } from '../../Component/Symbolizer/Editor/Editor';
import { ChannelFieldComposableProps } from '../../Component/Symbolizer/Field/ChannelField/ChannelField';
import { RuleGeneratorComposableProps } from '../../Component/RuleGenerator/RuleGenerator';
import { StyleComposableProps } from '../../Component/Style/Style';
import UnsupportedPropertiesUtil, { SymbolizerName } from '../../Util/UnsupportedPropertiesUtil';
import en_US from '../../locale/en_US';
import { Data as GeoStylerData } from 'geostyler-data';
import { SLDRendererComposableProps } from '../../Component/Renderer/SLDRenderer/SLDRenderer';

export type InputConfig<T> = {
  visibility?: boolean;
  default?: T;
};

export type CompositionContext = {
  Editor?: EditorComposableProps;
  FillEditor?: FillEditorComposableProps;
  IconEditor?: IconEditorComposableProps;
  LineEditor?: LineEditorComposableProps;
  MarkEditor?: MarkEditorComposableProps;
  WellKnownNameEditor?: WellKnownNameEditorComposableProps;
  TextEditor?: TextEditorComposableProps;
  RasterEditor?: RasterEditorComposableProps;
  RasterChannelEditor?: RasterChannelEditorComposableProps;
  RuleGenerator?: RuleGeneratorComposableProps;
  ChannelField?: ChannelFieldComposableProps;
  ColorMapEditor?: ColorMapEditorComposableProps;
  ComparisonFilter?: ComparisonFilterComposableProps;
  Renderer?: RendererComposableProps;
  SLDRenderer?: SLDRendererComposableProps;
  Rules?: RulesComposableProps;
  Rule?: RuleComposableProps;
  Style?: StyleComposableProps;
};

export interface UnsupportedPropertiesContext extends UnsupportedProperties {
  options?: {
    hideUnsupported?: boolean;
    locale?: GeoStylerLocale['UnsupportedPropertiesUtil'];
  };
}

export interface GeoStylerContextInterface {
  composition?: CompositionContext;
  locale?: GeoStylerLocale;
  unsupportedProperties?: UnsupportedPropertiesContext;
  data?: GeoStylerData;
};

export const GeoStylerContext = React.createContext<GeoStylerContextInterface>({});

export const useGeoStylerContext = (): GeoStylerContextInterface => {
  const ctx = useContext(GeoStylerContext);
  return ctx;
};

export const useGeoStylerComposition = <T extends keyof CompositionContext>(
  key: T): CompositionContext[T] => {
  const ctx = useContext(GeoStylerContext);

  if (!ctx.composition || !ctx.composition[key]) {
    return {} as CompositionContext[T];
  }
  return ctx.composition[key];
};

export const useGeoStylerLocale = <T extends keyof GeoStylerLocale>(key: T): GeoStylerLocale[T] => {
  const ctx = useContext(GeoStylerContext);
  return ctx.locale ? ctx.locale[key] : en_US[key];
};

export const useGeoStylerData = (): GeoStylerData => {
  const ctx = useContext(GeoStylerContext);
  return ctx.data;
};

export const useGeoStylerUnsupportedProperties = <T extends Symbolizer>(symbolizer: T) => {
  const ctx = useContext(GeoStylerContext);

  if (!ctx.unsupportedProperties || !isSymbolizer(symbolizer)) {
    return {
      unsupportedProperties: ctx.unsupportedProperties,
      getFormItemSupportProps: (propName: keyof T) => ({})
    };
  }

  const getFormItemSupportProps = (propName: keyof T) => {
    const symbolizerName: SymbolizerName = `${symbolizer.kind}Symbolizer`;
    return UnsupportedPropertiesUtil.getFormItemSupportProps({
      propName,
      symbolizerName,
      context: ctx.unsupportedProperties
    });
  };

  return {
    unsupportedProperties: ctx.unsupportedProperties,
    getFormItemSupportProps
  };
};
