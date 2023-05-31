import { ColorMapEntry, UnsupportedProperties } from 'geostyler-style';
import React, { useContext } from 'react';
import { ComparisonFilterProps } from '../../Component/Filter/ComparisonFilter/ComparisonFilter';
import { ColorFieldProps } from '../../Component/Symbolizer/Field/ColorField/ColorField';
import { OpacityFieldProps } from '../../Component/Symbolizer/Field/OpacityField/OpacityField';
import { WidthFieldProps } from '../../Component/Symbolizer/Field/WidthField/WidthField';
import { SizeFieldProps } from '../../Component/Symbolizer/Field/SizeField/SizeField';
import type GeoStylerLocale from '../../locale/locale';
import { OffsetFieldProps } from '../../Component/Symbolizer/Field/OffsetField/OffsetField';
import { RotateFieldProps } from '../../Component/Symbolizer/Field/RotateField/RotateField';
import { WellKnownNameFieldProps } from '../../Component/Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import { RadiusFieldProps } from '../../Component/Symbolizer/Field/RadiusField/RadiusField';
import { FontPickerProps } from '../../Component/Symbolizer/Field/FontPicker/FontPicker';
import {
  ContrastEnhancementFieldProps
} from '../../Component/Symbolizer/Field/ContrastEnhancementField/ContrastEnhancementField';
import { GammaFieldProps } from '../../Component/Symbolizer/Field/GammaField/GammaField';
import { RendererProps } from '../../Component/Renderer/Renderer/Renderer';
import { ChannelFieldProps } from '../../Component/Symbolizer/Field/ChannelField/ChannelField';
import { ColorMapTypeFieldProps } from '../../Component/Symbolizer/Field/ColorMapTypeField/ColorMapTypeField';
import { ColorRampComboProps } from '../../Component/RuleGenerator/ColorRampCombo/ColorRampCombo';
import { ExtendedFieldProps } from '../../Component/Symbolizer/Field/ExtendedField/ExtendedField';
import { FillEditorComposableProps } from '../../Component/Symbolizer/FillEditor/FillEditor';
import { IconEditorComposableProps } from '../../Component/Symbolizer/IconEditor/IconEditor';
import { LineEditorComposableProps } from '../../Component/Symbolizer/LineEditor/LineEditor';
import { MarkEditorComposableProps } from '../../Component/Symbolizer/MarkEditor/MarkEditor';

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
  WellKnownNameEditor?: {
    visibility?: boolean;
    radiusField?: InputConfig<RadiusFieldProps['radius']>;
    offsetXField?: InputConfig<OffsetFieldProps['offset']>;
    offsetYField?: InputConfig<OffsetFieldProps['offset']>;
    fillColorField?: InputConfig<ColorFieldProps['value']>;
    opacityField?: InputConfig<OpacityFieldProps['value']>;
    fillOpacityField?: InputConfig<OpacityFieldProps['value']>;
    strokeColorField?: InputConfig<ColorFieldProps['value']>;
    strokeWidthField?: InputConfig<WidthFieldProps['value']>;
    strokeOpacityField?: InputConfig<OpacityFieldProps['value']>;
    rotateField?: InputConfig<RotateFieldProps['rotate']>;
  };
  TextEditor?: {
    visibility?: boolean;
    templateField?: InputConfig<string>;
    colorField?: InputConfig<ColorFieldProps['value']>;
    // TODO add support for default values in FontPicker
    fontField?: Omit<InputConfig<FontPickerProps['font']>, 'default'>;
    opacityField?: InputConfig<OpacityFieldProps['value']>;
    sizeField?: InputConfig<SizeFieldProps['value']>;
    offsetXField?: InputConfig<OffsetFieldProps['offset']>;
    offsetYField?: InputConfig<OffsetFieldProps['offset']>;
    rotateField?: InputConfig<RotateFieldProps['rotate']>;
    haloColorField?: InputConfig<ColorFieldProps['value']>;
    haloWidthField?: InputConfig<WidthFieldProps['value']>;
  };
  RasterEditor?: {
    visibility?: boolean;
    opacityField?: InputConfig<OpacityFieldProps['value']>;
    // TODO add support for default values in ContrastEnhancementField
    contrastEnhancementField?: Omit<InputConfig<ContrastEnhancementFieldProps['contrastEnhancement']>, 'default'>;
    gammaValueField?: InputConfig<GammaFieldProps['gamma']>;
  };
  RasterChannelEditor?: {
    visibility?: boolean;
    channelSelectionField?: InputConfig<'rgb'|'gray'>;
    // TODO add support for default values in SourceChannelNameField
    sourceChannelNameField?: Omit<InputConfig<ChannelFieldProps['channel']['sourceChannelName']>, 'default'>;
    // TODO add support for default values in ContrastEnhancementField
    contrastEnhancementField?: Omit<InputConfig<ContrastEnhancementFieldProps['contrastEnhancement']>, 'default'>;
    gammaValueField?: InputConfig<GammaFieldProps['gamma']>;
  };
  ColorMapEditor?: {
    visibility?: boolean;
    // TODO add support for default values in ColorMapTypeField
    colorMapTypeField?: Omit<InputConfig<ColorMapTypeFieldProps['colorMapType']>, 'default'>;
    nrOfClassesField?: InputConfig<number>;
    // TODO add support for default values in ColorRampCombo
    colorRampComboField?: Omit<InputConfig<ColorRampComboProps['colorRamp']>, 'default'>;
    // TODO add support for default values in ExtendedField
    extendedField?: Omit<InputConfig<ExtendedFieldProps['extended']>, 'default'>;
    // TODO add support for default values in ColorMapTable
    colorMapTable?: Omit<InputConfig<ColorMapEntry[]>, 'default'>;
  };
  ComparisonFilter?: Partial<ComparisonFilterProps>;
  Renderer?: Partial<Omit<RendererProps, 'onClick'>>;
  Rules?: {
    enableClassification?: boolean;
  };
  Rule?: {
    amount?: {
      visibility?: boolean;
    };
    duplicate?: {
      visibility?: boolean;
    };
    maxScale?: {
      visibility?: boolean;
    };
    minScale?: {
      visibility?: boolean;
    };
    filter?: {
      visibility?: boolean;
    };
    name?: {
      visibility?: boolean;
    };
  };
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
  key: T): CompositionContext[T] | {} => {
  const ctx = useContext(GeoStylerContext);

  if (!ctx.composition || !ctx.composition[key]) {
    return {};
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
