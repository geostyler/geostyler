import FieldSet from './Component/FieldSet/FieldSet';
import AttributeCombo from './Component/Filter/AttributeCombo/AttributeCombo';
import BoolFilterField from './Component/Filter/BoolFilterField/BoolFilterField';
import ComparisonFilter from './Component/Filter/ComparisonFilter/ComparisonFilter';
import FilterEditorWindow from './Component/Filter/FilterEditorWindow/FilterEditorWindow';
import DataLoader from './Component/DataInput/DataLoader/DataLoader';
import DataProvider from './DataProvider/DataProvider';
import NumberFilterField from './Component/Filter/NumberFilterField/NumberFilterField';
import OperatorCombo from './Component/Filter/OperatorCombo/OperatorCombo';
import TextFilterField from './Component/Filter/TextFilterField/TextFilterField';
import NameField from './Component/NameField/NameField';
import RemoveButton from './Component/Rule/RemoveButton/RemoveButton';
import TitleField from './Component/Rule/TitleField/TitleField';
import Rule from './Component/Rule/Rule';
import MaxScaleDenominator from './Component/ScaleDenominator/MaxScaleDenominator';
import MinScaleDenominator from './Component/ScaleDenominator/MinScaleDenominator';
import ScaleDenominator from './Component/ScaleDenominator/ScaleDenominator';
import Preview from './Component/Symbolizer/Preview/Preview';
import SymbolizerEditorWindow from './Component/Symbolizer/SymbolizerEditorWindow/SymbolizerEditorWindow';
import MultiEditor from './Component/Symbolizer/MultiEditor/MultiEditor';
import LineEditor from './Component/Symbolizer/LineEditor/LineEditor';
import FillEditor from './Component/Symbolizer/FillEditor/FillEditor';
import TextEditor from './Component/Symbolizer/TextEditor/TextEditor';
import CodeEditor from './Component/CodeEditor/CodeEditor';
import PropTextEditor from './Component/Symbolizer/PropTextEditor/PropTextEditor';
import IconEditor from './Component/Symbolizer/IconEditor/IconEditor';
import GraphicEditor from './Component/Symbolizer/GraphicEditor/GraphicEditor';
import MarkEditor from './Component/Symbolizer/MarkEditor/MarkEditor';
import WellKnownNameEditor from './Component/Symbolizer/WellKnownNameEditor/WellKnownNameEditor';
import ColorField from './Component/Symbolizer/Field/ColorField/ColorField';
import ImageField from './Component/Symbolizer/Field/ImageField/ImageField';
import KindField from './Component/Symbolizer/Field/KindField/KindField';
import OffsetField from './Component/Symbolizer/Field/OffsetField/OffsetField';
import OpacityField from './Component/Symbolizer/Field/OpacityField/OpacityField';
import RadiusField from './Component/Symbolizer/Field/RadiusField/RadiusField';
import RotateField from './Component/Symbolizer/Field/RotateField/RotateField';
import SizeField from './Component/Symbolizer/Field/SizeField/SizeField';
import WellKnownNameField from './Component/Symbolizer/Field/WellKnownNameField/WellKnownNameField';
import WidthField from './Component/Symbolizer/Field/WidthField/WidthField';
import GraphicTypeField from './Component/Symbolizer/Field/GraphicTypeField/GraphicTypeField';
import LineCapField from './Component/Symbolizer/Field/LineCapField/LineCapField';
import LineJoinField from './Component/Symbolizer/Field/LineJoinField/LineJoinField';
import LineDashField from './Component/Symbolizer/Field/LineDashField/LineDashField';
import FontPicker from './Component/Symbolizer/Field/FontPicker/FontPicker';
import UploadButton from './Component/UploadButton/UploadButton';
import Style from './Component/Style/Style';
import StyleLoader from './Component/DataInput/StyleLoader/StyleLoader';
import { localize } from './Component/LocaleWrapper/LocaleWrapper';

import { LocaleProvider } from 'antd';

import de_DE from './locale/de_DE';
import en_US from './locale/en_US';
const locale = {
  de_DE,
  en_US
};

export {
  FieldSet,
  AttributeCombo,
  BoolFilterField,
  ComparisonFilter,
  FilterEditorWindow,
  NumberFilterField,
  OperatorCombo,
  TextFilterField,
  NameField,
  RemoveButton,
  TitleField,
  Rule,
  MaxScaleDenominator,
  MinScaleDenominator,
  ScaleDenominator,
  Preview,
  Editor,
  GraphicEditor,
  MarkEditor,
  MultiEditor,
  SymbolizerEditor,
  WellKnownNameEditor,
  ColorField,
  ImageField,
  KindField,
  OffsetField,
  OpacityField,
  RadiusField,
  RotateField,
  SizeField,
  WellKnownNameField,
  WidthField,
  GraphicTypeField,
  LineCapField,
  LineJoinField,
  LineDashField,
  FontPicker,
  UploadButton,
  IconEditor,
  LineEditor,
  FillEditor,
  TextEditor,
  PropTextEditor,
  Style,
  localize,
  locale,
  LocaleProvider,
  DataLoader,
  DataProvider,
  CodeEditor,
  StyleLoader
};
