import { UnsupportedProperties } from 'geostyler-style';
import { cloneDeep } from 'lodash';
import React, { useContext } from 'react';
import { ComparisonFilterProps } from '../../Component/Filter/ComparisonFilter/ComparisonFilter';
import { ColorFieldProps } from '../../Component/Symbolizer/Field/ColorField/ColorField';
import { LineDashFieldProps } from '../../Component/Symbolizer/Field/LineDashField/LineDashField';
import { OpacityFieldProps } from '../../Component/Symbolizer/Field/OpacityField/OpacityField';
import { ImageFieldProps } from '../../Component/Symbolizer/Field/ImageField/ImageField';
import { WidthFieldProps } from '../../Component/Symbolizer/Field/WidthField/WidthField';
import { SizeFieldProps } from '../../Component/Symbolizer/Field/SizeField/SizeField';
import { GeoStylerLocale } from '../../locale/locale';
import { OffsetFieldProps } from '../../Component/Symbolizer/Field/OffsetField/OffsetField';
import { RotateFieldProps } from '../../Component/Symbolizer/Field/RotateField/RotateField';
import { LineCapFieldProps } from '../../Component/Symbolizer/Field/LineCapField/LineCapField';
import { LineJoinFieldProps } from '../../Component/Symbolizer/Field/LineJoinField/LineJoinField';
import { WellKnownNameFieldProps } from '../../Component/Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import { RadiusFieldProps } from '../../Component/Symbolizer/Field/RadiusField/RadiusField';
import { FontPickerProps } from '../../Component/Symbolizer/Field/FontPicker/FontPicker';
import {
  ContrastEnhancementFieldProps
} from '../../Component/Symbolizer/Field/ContrastEnhancementField/ContrastEnhancementField';
import { GammaFieldProps } from '../../Component/Symbolizer/Field/GammaField/GammaField';
import { IconLibrary } from '../../Component/Symbolizer/IconSelector/IconSelector';
import { RendererProps } from '../../Component/Renderer/Renderer/Renderer';
import { ChannelFieldProps } from '../../Component/Symbolizer/Field/ChannelField/ChannelField';

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
  FillEditor?: {
    visibility?: boolean;
    fillColorField?: InputConfig<ColorFieldProps['color']>;
    fillOpacityField?: InputConfig<OpacityFieldProps['opacity']>;
    opacityField?: InputConfig<OpacityFieldProps['opacity']>;
    outlineOpacityField?: InputConfig<OpacityFieldProps['opacity']>;
    outlineColorField?: InputConfig<ColorFieldProps['color']>;
    // TODO add support for default values in LineDashField
    outlineDasharrayField?: Omit<InputConfig<LineDashFieldProps['dashArray']>, 'default'>;
    outlineWidthField?: InputConfig<WidthFieldProps['width']>;
    // TODO add support for graphicFill
  };
  IconEditor?: {
    visibility: boolean;
    // TODO add support for default values in ImageField
    imageField: Omit<InputConfig<ImageFieldProps['value']>, 'default'>;
    // TODO add support for default values in SizeField
    sizeField: Omit<InputConfig<SizeFieldProps['size']>, 'default'>;
    offsetXField?: InputConfig<OffsetFieldProps['offset']>;
    offsetYField?: InputConfig<OffsetFieldProps['offset']>;
    rotateField?: InputConfig<RotateFieldProps['rotate']>;
    opacityField?: InputConfig<OpacityFieldProps['opacity']>;
    iconLibraries?: IconLibrary[];
  };
  LineEditor?: {
    visibility?: boolean;
    colorField?: InputConfig<ColorFieldProps['color']>;
    widthField?: InputConfig<WidthFieldProps['width']>;
    perpendicularOffsetField?: InputConfig<OffsetFieldProps['offset']>;
    opacityField?: InputConfig<OpacityFieldProps['opacity']>;
    // TODO add support for default values in LineDashField
    lineDashField?: Omit<InputConfig<LineDashFieldProps['dashArray']>, 'default'>;
    dashOffsetField?: InputConfig<OffsetFieldProps['offset']>;
    // TODO add support for default values in LineCapField
    capField?: Omit<InputConfig<LineCapFieldProps['cap']>, 'default'>;
    // TODO add support for default values in LineJoinField
    joinField?: InputConfig<LineJoinFieldProps['join']>;
    // TODO add support for graphicStroke
    // TODO add support for graphicFill
  };
  MarkEditor?: {
    visibility?: boolean;
    // TODO add support for default values in WellKnownNameField
    wellKnownNameField?: Omit<InputConfig<WellKnownNameFieldProps['wellKnownName']>, 'default'>;
    // TODO add wellKnownNames property that specifies the supported WKNs
  };
  WellKnownNameEditor?: {
    visibility?: boolean;
    radiusField?: InputConfig<RadiusFieldProps['radius']>;
    offsetXField?: InputConfig<OffsetFieldProps['offset']>;
    offsetYField?: InputConfig<OffsetFieldProps['offset']>;
    fillColorField?: InputConfig<ColorFieldProps['color']>;
    opacityField?: InputConfig<OpacityFieldProps['opacity']>;
    fillOpacityField?: InputConfig<OpacityFieldProps['opacity']>;
    strokeColorField?: InputConfig<ColorFieldProps['color']>;
    strokeWidthField?: InputConfig<WidthFieldProps['width']>;
    strokeOpacityField?: InputConfig<OpacityFieldProps['opacity']>;
    rotateField?: InputConfig<RotateFieldProps['rotate']>;
  };
  TextEditor?: {
    visibility?: boolean;
    templateField?: InputConfig<string>;
    colorField?: InputConfig<ColorFieldProps['color']>;
    // TODO add support for default values in FontPicker
    fontField?: Omit<InputConfig<FontPickerProps['font']>, 'default'>;
    opacityField?: InputConfig<OpacityFieldProps['opacity']>;
    sizeField?: InputConfig<SizeFieldProps['size']>;
    offsetXField?: InputConfig<OffsetFieldProps['offset']>;
    offsetYField?: InputConfig<OffsetFieldProps['offset']>;
    rotateField?: InputConfig<RotateFieldProps['rotate']>;
    haloColorField?: InputConfig<ColorFieldProps['color']>;
    haloWidthField?: InputConfig<WidthFieldProps['width']>;
  };
  RasterEditor?: {
    visibility?: boolean;
    opacityField?: InputConfig<OpacityFieldProps['opacity']>;
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

export const useGeoStylerContext = (): any => {
  const ctx = useContext(GeoStylerContext);
  return cloneDeep(ctx);
};

export const useGeoStylerComposition = <T extends keyof CompositionContext>(
  key: T,
  fallback?: any
): CompositionContext[T] => {
  const ctx = useContext(GeoStylerContext);

  if (!ctx.composition || !ctx.composition[key]) {
    return fallback;
  }
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
