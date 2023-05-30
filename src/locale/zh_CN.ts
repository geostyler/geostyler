/* eslint-disable @typescript-eslint/naming-convention */
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
import antd_zh_CN from 'antd/lib/locale/zh_CN';
import type GeoStylerLocale from './locale';

const zh_CN: GeoStylerLocale = {
  StyleFieldContainer: {
    nameFieldLabel: 'TODO(zh_CN):Name',
    nameFieldPlaceholder: 'TODO(zh_CN):Enter name',
    titleFieldLabel: 'TODO(zh_CN):Title',
    titleFieldPlaceholder: 'TODO(zh_CN):Enter title'
  },
  Editor: {
    kindFieldLabel: 'TODO(zh_CN):Kind'
  },
  RuleFieldContainer: {
    nameFieldLabel: 'TODO(zh_CN):Name',
    nameFieldPlaceholder: 'TODO(zh_CN):Enter name'
  },
  BulkEditModals: {
    colorLabel: '选择颜色',
    radiusLabel: '选择半径',
    opacityLabel: '选择不透明度',
    symbolLabel: '选择符号',
    imageFieldLabel: '来源',
    imageFieldTooltipLabel: '打开图库'
  },
  BulkEditor: {
    colorLabel: '选择颜色',
    radiusLabel: '选择半径',
    opacityLabel: '选择不透明度',
    symbolLabel: '选择符号',
    imageFieldLabel: '来源'
  },
  Rule: {
    removeRuleBtnText: '移除规则',
    scaleFieldTitle: '使用比例尺',
    filterFieldTitle: '使用过滤器',
    nameFieldLabel: '名称',
    nameFieldPlaceholder: '输入名称',
    attributeLabel: 'TODO(zh_CN):Attribute',
    attributePlaceholderString: 'TODO(zh_CN):Choose attribute',
    attributeValidationHelpString: 'TODO(zh_CN):Please choose an attribute',
    operatorLabel: 'TODO(zh_CN):Operator',
    operatorPlaceholderString: 'TODO(zh_CN):Choose operator',
    operatorValidationHelpString: 'TODO(zh_CN):Please choose an operator',
    valueLabel: 'TODO(zh_CN):Value',
    valuePlaceholder: 'TODO(zh_CN):Enter value',
    valueValidationHelpString: 'TODO(zh_CN):Please enter a value'
  },
  Style: {
    addRuleBtnText: '添加规则',
    cloneRulesBtnText: '克隆规则',
    removeRulesBtnText: '移除规则',
    nameFieldLabel: '名称',
    nameFieldPlaceholder: '输入名称',
    titleFieldLabel: 'TODO(zh_CN):Title',
    titleFieldPlaceholder: 'TODO(zh_CN):Enter Title',
    colorLabel: '选择颜色',
    radiusLabel: '选择半径',
    opacityLabel: '选择不透明度',
    symbolLabel: '选择符号',
    multiEditLabel: '同时编辑',
    ruleGeneratorWindowBtnText: '分类'
  },
  CardStyle: {
    styleTitle: 'TODO(zh_CN):Style',
    classificationTitle: 'TODO(zh_CN):Classification',
    multiEditTitle: 'TODO(zh_CN):Multi edit',
    symbolizerTitle: 'TODO(zh_CN):Symbolizer',
    filterTitle: 'TODO(zh_CN):Filters',
    iconLibrariesTitle: 'TODO(zh_CN):Gallery'
  },
  StyleOverview: {
    styleTitle: 'TODO(zh_CN):Style'
  },
  RuleOverview: {
    ruleTitle: 'TODO(zh_CN):Rule'
  },
  Symbolizers: {
    symbolizersTitle: 'TODO(zh_CN):Symbolizers',
    addSymbolizer: 'TODO(zh_CN):Add symbolizer',
    showAll: 'TODO(zh_CN):Show all',
    hide: 'TODO(zh_CN):Hide'
  },
  StyleLoader: {
    label: '加载样式: ',
    uploadButtonLabel: '上传样式'
  },
  DataLoader: {
    label: '加载数据: ',
    uploadButtonLabel: '上传数据'
  },
  WfsParserInput: {
    requestButtonText: '请求数据',
    urlLabel: 'Url',
    versionLabel: 'Version',
    typeNameLabel: 'FeatureTypeName',
    featureIDLabel: 'FeatureID',
    propertyNameLabel: 'PropertyName',
    maxFeaturesLabel: 'MaxFeatures',
    fetchParamsLabel: 'fetchParams',
    srsNameLabel: 'SrsName'
  },
  CodeEditor: {
    downloadButtonLabel: '另存为文件',
    copyButtonLabel: '拷贝到剪贴板',
    formatSelectLabel: '格式',
    styleCopied: '样式已拷贝到剪贴板！',
    writeFeedback: '写时的反馈',
    readFeedback: '阅读时的反馈'
  },
  ParserFeedback: {
    notSupported: '所用的分析器不支持',
    partiallySupported: '仅被使用的解析器部分支持'
  },
  WellKnownNameEditor: {
    fillColorLabel: '填充-颜色',
    fillOpacityLabel: '填充-不透明度',
    offsetXLabel: 'X 偏移',
    offsetYLabel: 'Y 偏移',
    opacityLabel: '不透明度',
    radiusLabel: '半径',
    rotateLabel: '旋转',
    strokeColorLabel: '描边-颜色',
    strokeOpacityLabel: '描边-不透明度',
    strokeWidthLabel: '描边-宽度',
  },
  FillEditor: {
    fillOpacityLabel: '填充-不透明度',
    outlineOpacityLabel: '描边-不透明度',
    opacityLabel: '不透明度',
    fillColorLabel: '填充-颜色',
    outlineColorLabel: '轮廓-颜色',
    outlineWidthLabel: '轮廓-宽度',
    outlineDasharrayLabel: '轮廓-点划样式',
    graphicFillTypeLabel: '填充样式'
  },
  IconEditor: {
    iconTooltipLabel: '打开图库',
    imageLabel: '来源',
    imagePlaceholder: 'URL到图标',
    offsetXLabel: 'X 偏移',
    offsetYLabel: 'Y 偏移',
    opacityLabel: '不透明度',
    rotateLabel: '旋转',
    sizeLabel: '尺寸',
  },
  MarkEditor: {
    wellKnownNameFieldLabel: '符号'
  },
  LineEditor: {
    colorLabel: '颜色',
    widthLabel: '宽度',
    opacityLabel: '不透明度',
    dashLabel: '虚线样式',
    perpendicularOffsetLabel: '垂直偏移',
    dashOffsetLabel: '偏移',
    capLabel: '端点',
    joinLabel: '角点',
    graphicStrokeTypeLabel: '画笔类型',
    graphicFillTypeLabel: '填充类型'
  },
  TextEditor: {
    fontLabel: '字体',
    templateFieldLabel: '模板',
    opacityLabel: '不透明度',
    colorLabel: '颜色',
    sizeLabel: '大小',
    offsetXLabel: 'X 偏移',
    offsetYLabel: 'Y 偏移',
    attributeComboPlaceholder: '选择字段',
    rotateLabel: '旋转',
    haloColorLabel: '光晕颜色',
    haloWidthLabel: '光晕宽度',
    attributeNotFound: '字段未找到'
  },
  PropTextEditor: {
    propFieldLabel: '字段',
    opacityLabel: '不透明度',
    fontLabel: 'TODO(zh_CN):Font',
    colorLabel: '颜色',
    sizeLabel: '大小',
    offsetXLabel: 'X 偏移',
    offsetYLabel: 'Y 偏移',
    attributeComboPlaceholder: '选择字段',
    rotateLabel: '旋转',
    haloColorLabel: '光晕颜色',
    haloWidthLabel: '光晕宽度'
  },
  RasterEditor: {
    opacityLabel: '不透明度',
    hueRotateLabel: '色调旋转',
    brightnessMinLabel: '最小亮度',
    brightnessMaxLabel: '最大亮度',
    saturationLabel: '饱和度',
    contrastLabel: '对比度',
    fadeDurationLabel: '淡入淡出时间',
    resamplingLabel: '重采样',
    contrastEnhancementLabel: '对比增强',
    gammaValueLabel: 'Gamma',
    colorMapLabel: '颜色映射',
    symbolizerLabel: '符号化',
    channelSelectionLabel: '通道选择'
  },
  RasterChannelEditor: {
    channelSelectionLabel: '编辑通道',
    redBandLabel: '红',
    greenBandLabel: '绿',
    blueBandLabel: '蓝',
    grayBandLabel: '灰',
    channelSelectionGrayLabel: '灰色',
    channelSelectionRgbLabel: 'RGB',
    titleLabel: '通道选择'
  },
  ColorMapEditor: {
    typeLabel: '类型',
    extendedLabel: '颜色深度',
    colorMapEntriesLabel: '颜色映射',
    titleLabel: '颜色映射表',
    nrOfClassesLabel: '分类数',
    colorRampLabel: '色带',
    colorLabel: '颜色',
    quantityLabel: '像素值',
    labelLabel: '图例',
    opacityLabel: '不透明度'
  },
  Preview: {
    openEditorText: '符号编辑',
    closeEditorText: '关闭编辑器'
  },
  ColorField: {
    chooseText: '选取'
  },
  KindField: {
    symbolizerKinds: {
      Mark: '点',
      Fill: '面',
      Icon: '图标',
      Line: '线',
      Text: '标注',
      Raster: '栅格'
    }
  },
  GraphicTypeField: {
    Mark: '点',
    Icon: '图标'
  },
  RgbChannelField: {
    redLabel: '红色波段',
    greenLabel: '绿色波段',
    blueLabel: '蓝色波段'
  },
  GrayChannelField: {
    grayLabel: '灰色波段'
  },
  ScaleDenominator: {
    minScaleDenominatorLabelText: '最小比例尺',
    maxScaleDenominatorLabelText: '最大比例尺',
    minScaleDenominatorPlaceholderText: '输入最小比例尺（可选）',
    maxScaleDenominatorPlaceholderText: '输入最大比例尺（可选）'
  },
  WellKnownNameField: {
    wellKnownNames: {
      Circle: '圆形',
      Square: '方块',
      Triangle: '三角形',
      Star: '星形',
      Cross: '十字',
      X: '叉'
    }
  },
  ColorMapEntryField: {
    colorLabel: '颜色',
    labelLabel: '图例',
    quantityLabel: '数值',
    opacityLabel: '不透明度'
  },
  ChannelField: {
    sourceChannelNameLabel: '通道名',
    contrastEnhancementTypeLabel: '对比增强',
    gammaValueLabel: 'Gamma'
  },
  ColorMapTypeField: {
    rampMapTypeLabel: '渐变',
    intervalsMapTypeLabel: '分级',
    valuesMapTypeLabel: '唯一值'
  },
  SymbolizerEditor: {
    kindFieldLabel: '类型',
    unknownSymbolizerText: 'TODO(zh_CN):Symbolizer unknown!'
  },
  SymbolizerEditorWindow: {
    symbolizersEditor: '符号编辑器'
  },
  FilterOverview: {
    filterTitle: 'TODO(zh_CN):Filters'
  },
  FilterEditorWindow: {
    filterEditor: '过滤器编辑器'
  },
  MultiEditor: {
    add: '添加',
    remove: '移除'
  },
  UploadButton: {
    upload: '上传'
  },
  FilterTree: {
    andDrpdwnLabel: 'AND',
    orDrpdwnLabel: 'OR',
    notDrpdwnLabel: 'NOT',
    comparisonDrpdwnLabel: 'Comparison',
    addFilterLabel: '添加过滤器',
    changeFilterLabel: '更改过滤器',
    removeFilterLabel: '移除过滤器',
    andFilterText: 'AND',
    orFilterText: 'OR',
    notFilterText: 'NOT'
  },
  RuleTable: {
    symbolizersColumnTitle: '符号',
    nameColumnTitle: '名称',
    filterColumnTitle: '过滤器',
    minScaleColumnTitle: '最小比例尺',
    maxScaleColumnTitle: '最大比例尺',
    amountColumnTitle: '数量',
    duplicatesColumnTitle: '副本'
  },
  Rules: {
    rulesTitle: 'TODO(zh_CN):Rules',
    multiEdit: 'TODO(zh_CN):Select',
    addRule: 'TODO(zh_CN):Add',
    classification: 'TODO(zh_CN):Classification',
    remove: 'TODO(zh_CN):Remove',
    clone: 'TODO(zh_CN):Clone',
    edit: 'TODO(zh_CN):Edit',
    defaultRuleTitle: 'TODO(zh_CN):Untitled'
  },
  RuleReorderButtons: {
    ruleMoveUpTip: '向上移动',
    ruleMoveDownTip: '向下移动'
  },
  RuleGenerator: {
    attribute: '属性',
    generateButtonText: '分类',
    levelOfMeasurement: '计量尺度',
    nominal: '标称数Nominal',
    ordinal: '序数Ordinal',
    cardinal: '基数Cardinal',
    numberOfRules: '分类数',
    colorRamp: '色带',
    colorSpace: '色彩空间',
    colorRampPlaceholder: '选择……',
    colorRampMinClassesWarningPre: '色带需要至少',
    colorRampMinClassesWarningPost: '类',
    symbolizer: 'Symbolizer',
    classification: '分类方法',
    classificationPlaceholder: '选择……',
    equalInterval: '相等间隔',
    preview: '颜色预览',
    numberOfRulesViaKmeans: '……被 k-Means 分类影响。',
    allDistinctValues: '使用所有不同的值'
  },
  ColorRampCombo: {
    colorRampPlaceholder: '选择……'
  },
  ColorSpaceCombo: {
    colorSpacePlaceholder: '选择……'
  },
  ClassificationCombo: {
    equalInterval: '等值间隔',
    quantile: '分位数',
    logarithmic: '对数',
    kmeans: 'k-Means'
  },
  RuleGeneratorWindow: {
    ruleGenerator: '分类'
  },
  IconSelectorWindow: {
    windowLabel: '选择图标'
  },
  IconSelector: {
    librarySelectLabel: '选择图标库'
  },
  SLDUnitsSelect: {
    symbolizerUnitsLabel: '符號單位',
    symbolizerUnitsPixel: '像素點',
    symbolizerUnitsMeter: '儀表',
    symbolizerUnitsFoot: '富斯'
  },
  AttributeCombo: {
    label: '属性',
    placeholder: '选择属性',
    help: '请选择一个属性'
  },
  TextFilterField: {
    label: '价值',
    placeholder: '输入文本值',
    help: '请输入一个文本'
  },
  NumberFilterField: {
    label: '价值',
    placeholder: '输入数字值',
    help: '请输入一个数字'
  },
  BoolFilterField: {
    label: '价值'
  },
  UnsupportedPropertiesUtil: {
    notSupported: '所选分析器不支持',
    partiallySupported: '只被选定的解析器部分支持'
  },
  FunctionNameCombo: {
    placeholder: '… 选择GeoStylerFunction'
  },
  ...antd_zh_CN
};

export default zh_CN;
