/*!
  Copyright (c) 2018 terrestris GmbH & Co. KG
  Licensed under the BSD 2-Clause "Simplified" License, see
  https://github.com/terrestris/geostyler/blob/master/LICENSE
*/
import AttributeCombo from './Component/Filter/AttributeCombo/AttributeCombo';
import BoolFilterField from './Component/Filter/BoolFilterField/BoolFilterField';
import BulkEditModals from './Component/Symbolizer/BulkEditModals/BulkEditModals';
import CodeEditor from './Component/CodeEditor/CodeEditor';
import ColorField from './Component/Symbolizer/Field/ColorField/ColorField';
import ComparisonFilter from './Component/Filter/ComparisonFilter/ComparisonFilter';
import DataLoader from './Component/DataInput/DataLoader/DataLoader';
import DataProvider from './DataProvider/DataProvider';
import Editor from './Component/Symbolizer/Editor/Editor';
import FieldSet from './Component/FieldSet/FieldSet';
import FillEditor from './Component/Symbolizer/FillEditor/FillEditor';
import FilterEditorWindow from './Component/Filter/FilterEditorWindow/FilterEditorWindow';
import FontPicker from './Component/Symbolizer/Field/FontPicker/FontPicker';
import GraphicEditor from './Component/Symbolizer/GraphicEditor/GraphicEditor';
import GraphicTypeField from './Component/Symbolizer/Field/GraphicTypeField/GraphicTypeField';
import IconEditor from './Component/Symbolizer/IconEditor/IconEditor';
import IconSelector from './Component/Symbolizer/IconSelector/IconSelector';
import IconSelectorWindow from './Component/Symbolizer/IconSelectorWindow/IconSelectorWindow';
import ImageField from './Component/Symbolizer/Field/ImageField/ImageField';
import KindField from './Component/Symbolizer/Field/KindField/KindField';
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
import PropTextEditor from './Component/Symbolizer/PropTextEditor/PropTextEditor';
import RadiusField from './Component/Symbolizer/Field/RadiusField/RadiusField';
import RemoveButton from './Component/Rule/RemoveButton/RemoveButton';
import Renderer from './Component/Symbolizer/Renderer/Renderer';
import RotateField from './Component/Symbolizer/Field/RotateField/RotateField';
import Rule from './Component/Rule/Rule';
import ScaleDenominator from './Component/ScaleDenominator/ScaleDenominator';
import SizeField from './Component/Symbolizer/Field/SizeField/SizeField';
import SLDRenderer from './Component/Symbolizer/SLDRenderer/SLDRenderer';
import Style from './Component/Style/Style';
import StyleLoader from './Component/DataInput/StyleLoader/StyleLoader';
import SymbolizerEditorWindow from './Component/Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import TextEditor from './Component/Symbolizer/TextEditor/TextEditor';
import TextFilterField from './Component/Filter/TextFilterField/TextFilterField';
import TitleField from './Component/Rule/TitleField/TitleField';
import UploadButton from './Component/UploadButton/UploadButton';
import WellKnownNameEditor from './Component/Symbolizer/WellKnownNameEditor/WellKnownNameEditor';
import WellKnownNameField from './Component/Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import WidthField from './Component/Symbolizer/Field/WidthField/WidthField';
import RuleGeneratorWindow from './Component/RuleGenerator/RuleGeneratorWindow';
import RuleGenerator from './Component/RuleGenerator/RuleGenerator';
import { localize } from './Component/LocaleWrapper/LocaleWrapper';

import { LocaleProvider } from 'antd';

import de_DE from './locale/de_DE';
import en_US from './locale/en_US';
import es_ES from './locale/es_ES';
const locale = {
  de_DE,
  en_US,
  es_ES,
};

export {
  AttributeCombo,
  BoolFilterField,
  BulkEditModals,
  CodeEditor,
  ColorField,
  ComparisonFilter,
  DataLoader,
  DataProvider,
  Editor,
  FieldSet,
  FillEditor,
  FilterEditorWindow,
  FontPicker,
  GraphicEditor,
  GraphicTypeField,
  IconEditor,
  IconSelector,
  IconSelectorWindow,
  ImageField,
  KindField,
  LineCapField,
  LineDashField,
  LineEditor,
  LineJoinField,
  locale,
  LocaleProvider,
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
  PropTextEditor,
  RadiusField,
  RemoveButton,
  Renderer,
  RotateField,
  Rule,
  ScaleDenominator,
  SizeField,
  SLDRenderer,
  Style,
  StyleLoader,
  SymbolizerEditorWindow,
  TextEditor,
  TextFilterField,
  TitleField,
  UploadButton,
  WellKnownNameEditor,
  WellKnownNameField,
  RuleGeneratorWindow,
  RuleGenerator,
  WidthField
};
