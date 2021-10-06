/* eslint-disable camelcase */
/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
import AttributeCombo from './Component/Filter/AttributeCombo/AttributeCombo';
import BoolFilterField from './Component/Filter/BoolFilterField/BoolFilterField';
import BrightnessField from './Component/Symbolizer/Field/BrightnessField/BrightnessField';
import BulkEditModals from './Component/Symbolizer/BulkEditModals/BulkEditModals';
import ChannelField from './Component/Symbolizer/Field/ChannelField/ChannelField';
import ChannelSelectionField from './Component/Symbolizer/Field/ChannelSelectionField/ChannelSelectionField';
import CodeEditor from './Component/CodeEditor/CodeEditor';
import ColorField from './Component/Symbolizer/Field/ColorField/ColorField';
import ColorMapEditor from './Component/Symbolizer/ColorMapEditor/ColorMapEditor';
import ColorMapEntryField from './Component/Symbolizer/Field/ColorMapEntryField/ColorMapEntryField';
import ColorMapTypeField from './Component/Symbolizer/Field/ColorMapTypeField/ColorMapTypeField';
import ComparisonFilter from './Component/Filter/ComparisonFilter/ComparisonFilter';
import ContrastEnhancementField from './Component/Symbolizer/Field/ContrastEnhancementField/ContrastEnhancementField';
import ContrastField from './Component/Symbolizer/Field/ContrastField/ContrastField';
import DataLoader from './Component/DataInput/DataLoader/DataLoader';
import DataProvider from './DataProvider/DataProvider';
import Editor from './Component/Symbolizer/Editor/Editor';
import ExtendedField from './Component/Symbolizer/Field/ExtendedField/ExtendedField';
import FadeDurationField from './Component/Symbolizer/Field/FadeDurationField/FadeDurationField';
import FieldSet from './Component/FieldSet/FieldSet';
import FieldContainer from './Component/FieldContainer/FieldContainer';
import FillEditor from './Component/Symbolizer/FillEditor/FillEditor';
import FilterEditorWindow from './Component/Filter/FilterEditorWindow/FilterEditorWindow';
import FilterTree from './Component/Filter/FilterTree/FilterTree';
import FontPicker from './Component/Symbolizer/Field/FontPicker/FontPicker';
import GammaField from './Component/Symbolizer/Field/GammaField/GammaField';
import GraphicEditor from './Component/Symbolizer/GraphicEditor/GraphicEditor';
import GraphicTypeField from './Component/Symbolizer/Field/GraphicTypeField/GraphicTypeField';
import GrayChannelField from './Component/Symbolizer/Field/GrayChannelField/GrayChannelField';
import IconEditor from './Component/Symbolizer/IconEditor/IconEditor';
import IconSelector from './Component/Symbolizer/IconSelector/IconSelector';
import IconSelectorWindow from './Component/Symbolizer/IconSelectorWindow/IconSelectorWindow';
import ImageField from './Component/Symbolizer/Field/ImageField/ImageField';
import KindField from './Component/Symbolizer/Field/KindField/KindField';
import LegacyCodeEditor from './Component/Legacy/CodeEditor/CodeEditor';
import LineCapField from './Component/Symbolizer/Field/LineCapField/LineCapField';
import LineDashField from './Component/Symbolizer/Field/LineDashField/LineDashField';
import LineEditor from './Component/Symbolizer/LineEditor/LineEditor';
import LineJoinField from './Component/Symbolizer/Field/LineJoinField/LineJoinField';
import MarkEditor from './Component/Symbolizer/MarkEditor/MarkEditor';
import MaxScaleDenominator from './Component/ScaleDenominator/MaxScaleDenominator';
import MinScaleDenominator from './Component/ScaleDenominator/MinScaleDenominator';
import MultiEditor from './Component/Symbolizer/MultiEditor/MultiEditor';
import NameField from './Component/NameField/NameField';
import NumberFilterField from './Component/Filter/NumberFilterField/NumberFilterField';
import OffsetField from './Component/Symbolizer/Field/OffsetField/OffsetField';
import OpacityField from './Component/Symbolizer/Field/OpacityField/OpacityField';
import OperatorCombo from './Component/Filter/OperatorCombo/OperatorCombo';
import Preview from './Component/Symbolizer/Preview/Preview';
import PreviewMap from './Component/PreviewMap/PreviewMap';
import PropTextEditor from './Component/Symbolizer/PropTextEditor/PropTextEditor';
import RadiusField from './Component/Symbolizer/Field/RadiusField/RadiusField';
import RasterChannelEditor from './Component/Symbolizer/RasterChannelEditor/RasterChannelEditor';
import RasterEditor from './Component/Symbolizer/RasterEditor/RasterEditor';
import Removable from './Component/Removable/Removable';
import RemovableItem from './Component/Removable/RemovableItem/RemovableItem';
import RemoveButton from './Component/Rule/RemoveButton/RemoveButton';
import Renderer from './Component/Symbolizer/Renderer/Renderer';
import RgbChannelField from './Component/Symbolizer/Field/RgbChannelField/RgbChannelField';
import ResamplingField from './Component/Symbolizer/Field/ResamplingField/ResamplingField';
import RotateField from './Component/Symbolizer/Field/RotateField/RotateField';
import Rule from './Component/Rule/Rule';
import RuleCard from './Component/RuleCard/RuleCard';
import RuleFieldContainer from './Component/RuleFieldContainer/RuleFieldContainer';
import RuleGenerator from './Component/RuleGenerator/RuleGenerator';
import RuleGeneratorWindow from './Component/RuleGenerator/RuleGeneratorWindow';
import Rules from './Component/Rules/Rules';
import RuleTable from './Component/RuleTable/RuleTable';
import SaturationField from './Component/Symbolizer/Field/SaturationField/SaturationField';
import ScaleDenominator from './Component/ScaleDenominator/ScaleDenominator';
import Selectable from './Component/Selectable/Selectable';
import SelectableItem from './Component/Selectable/SelectableItem/SelectableItem';
import SizeField from './Component/Symbolizer/Field/SizeField/SizeField';
import SLDRenderer from './Component/Symbolizer/SLDRenderer/SLDRenderer';
import SourceChannelNameField from './Component/Symbolizer/Field/SourceChannelNameField/SourceChannelNameField';
import Style from './Component/Style/Style';
import StyleFieldContainer from './Component/StyleFieldContainer/StyleFieldContainer';
import StyleLoader from './Component/DataInput/StyleLoader/StyleLoader';
import SymbolizerEditorWindow from './Component/Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import TextEditor from './Component/Symbolizer/TextEditor/TextEditor';
import TextFilterField from './Component/Filter/TextFilterField/TextFilterField';
import UploadButton from './Component/UploadButton/UploadButton';
import WellKnownNameEditor from './Component/Symbolizer/WellKnownNameEditor/WellKnownNameEditor';
import WellKnownNameField from './Component/Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import WidthField from './Component/Symbolizer/Field/WidthField/WidthField';
import withDefaultsContext from './hoc/withDefaultsContext';
import { localize } from './Component/LocaleWrapper/LocaleWrapper';
import { CompositionContext } from './context/CompositionContext/CompositionContext';
import { DefaultValueContext } from './context/DefaultValueContext/DefaultValueContext';

import { ConfigProvider } from 'antd';

import de_DE from './locale/de_DE';
import en_US from './locale/en_US';
import es_ES from './locale/es_ES';
import zh_CN from './locale/zh_CN';
const locale = {
  de_DE,
  en_US,
  es_ES,
  zh_CN
};

export {
  AttributeCombo,
  BoolFilterField,
  BrightnessField,
  BulkEditModals,
  ChannelField,
  ChannelSelectionField,
  CodeEditor,
  ColorField,
  ColorMapEditor,
  ColorMapEntryField,
  ColorMapTypeField,
  ComparisonFilter,
  CompositionContext,
  ConfigProvider,
  ContrastEnhancementField,
  ContrastField,
  DataLoader,
  DataProvider,
  DefaultValueContext,
  Editor,
  ExtendedField,
  FadeDurationField,
  FieldContainer,
  FieldSet,
  FillEditor,
  FilterEditorWindow,
  FilterTree,
  FontPicker,
  GammaField,
  GraphicEditor,
  GraphicTypeField,
  GrayChannelField,
  IconEditor,
  IconSelector,
  IconSelectorWindow,
  ImageField,
  KindField,
  LegacyCodeEditor,
  LineCapField,
  LineDashField,
  LineEditor,
  LineJoinField,
  locale,
  localize,
  MarkEditor,
  MaxScaleDenominator,
  MinScaleDenominator,
  MultiEditor,
  NameField,
  NumberFilterField,
  OffsetField,
  OpacityField,
  OperatorCombo,
  Preview,
  PreviewMap,
  PropTextEditor,
  RadiusField,
  RasterChannelEditor,
  RasterEditor,
  RemoveButton,
  Removable,
  RemovableItem,
  Renderer,
  RgbChannelField,
  ResamplingField,
  RotateField,
  Rule,
  RuleCard,
  RuleFieldContainer,
  RuleGenerator,
  RuleGeneratorWindow,
  Rules,
  RuleTable,
  SaturationField,
  ScaleDenominator,
  Selectable,
  SelectableItem,
  SizeField,
  SLDRenderer,
  SourceChannelNameField,
  Style,
  StyleFieldContainer,
  StyleLoader,
  SymbolizerEditorWindow,
  TextEditor,
  TextFilterField,
  UploadButton,
  WellKnownNameEditor,
  WellKnownNameField,
  WidthField,
  withDefaultsContext
};
