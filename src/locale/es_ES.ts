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

'use strict';

import es_ES from 'antd/lib/locale-provider/es_ES';
export default {
  GsApp: {
    graphicalEditor: 'Editor gráfico',
    codeEditor: 'Editor de código'
  },
  GsBulkEditModals: {
    colorLabel: 'Seleccionar color',
    radiusLabel: 'Seleccionar radio',
    opacityLabel: 'Seleccionar transparencia',
    symbolLabel: 'Seleccionar simbolo',
    imageFieldLabel: 'Fuente',
    imageFieldTooltipLabel: 'Abrir galería'
  },
  GsRule: {
    removeRuleBtnText: 'Eliminar regla',
    scaleFieldTitle: 'Usar escala',
    filterFieldTitle: 'Usar filtro',
    nameFieldLabel: 'Nombre',
    nameFieldPlaceholder: 'Ingrese nombre'
  },
  GsStyle: {
    addRuleBtnText: 'Añadir regla',
    cloneRulesBtnText: 'Duplicar reglas',
    removeRulesBtnText: 'Eliminar reglas',
    nameFieldLabel: 'Nombre',
    nameFieldPlaceholder: 'Ingrese nombre',
    colorLabel: 'Seleccionar color',
    radiusLabel: 'Seleccionar radio',
    opacityLabel: 'Seleccionar transparencia',
    symbolLabel: 'Seleccionar simbolo',
    multiEditLabel: 'Editor múltiple',
    ruleGeneratorWindowBtnText: 'Clasificación'
  },
  GsStyleLoader: {
    label: 'Leer estilo: ',
    uploadButtonLabel: 'Cargar estilo'
  },
  GsDataLoader: {
    label: 'Leer datos: ',
    uploadButtonLabel: 'Cargar datos'
  },
  GsWfsParserInput: {
    requestButtonText: 'Obtener datos',
    urlLabel: 'Url',
    versionLabel: 'Versión',
    typeNameLabel: 'FeatureTypeName',
    featureIDLabel: 'FeatureID',
    propertyNameLabel: 'PropertyName',
    maxFeaturesLabel: 'MaxFeatures',
    fetchParamsLabel: 'fetchParams'
  },
  GsCodeEditor: {
    downloadButtonLabel: 'Guardar archivo',
    copyButtonLabel: 'Copiar al portapapeles',
    formatSelectLabel: 'Formato',
    styleCopied: 'Estilo copiado al portapapales!'
  },
  GsWellKnownNameEditor: {
    radiusLabel: 'Radio',
    fillOpacityLabel: 'Relleno-Transparencia',
    fillColorLabel: 'Fondo-Color',
    opacityLabel: 'Transparencia',
    strokeColorLabel: 'Trazo-Color',
    strokeWidthLabel: 'Trazo-Ancho',
    strokeOpacityLabel: 'Trazo-Transparencia',
    rotateLabel: 'Rotación'
  },
  GsFillEditor: {
    fillOpacityLabel: 'Relleno-Transparencia',
    outlineOpacityLabel: 'Trazo-Transparencia',
    opacityLabel: 'Transparencia',
    fillColorLabel: 'Relleno-Color',
    outlineColorLabel: 'Contorno-Color',
    outlineWidthLabel: 'Contorno-Ancho',
    outlineDasharrayLabel: 'Outline-Dasharray',
    graphicFillTypeLabel: 'Tipo gráfico de relleno'
  },
  GsIconEditor: {
    imageLabel: 'Fuente',
    sizeLabel: 'Tamaño',
    rotateLabel: 'Rotación',
    opacityLabel: 'Transparencia',
    iconTooltipLabel: 'Abrir galería'
  },
  GsLineEditor: {
    colorLabel: 'Color',
    widthLabel: 'Ancho',
    opacityLabel: 'Transparencia',
    dashLabel: 'Patrón de achurado',
    dashOffsetLabel: 'Dash Offset',
    capLabel: 'Cap',
    joinLabel: 'Join',
    graphicStrokeTypeLabel: 'Tipo de gráfico de trazado',
    graphicFillTypeLabel: 'Tipo de gráfico de relleno'
  },
  GsMarkEditor: {
    wellKnownNameFieldLabel: 'Simbolo'
  },
  GsTextEditor: {
    fontLabel: 'Fuente',
    templateFieldLabel: 'Plantilla',
    opacityLabel: 'Texto-Transparencia',
    colorLabel: 'Texto-Color',
    sizeLabel: 'Texto-Tamaño',
    offsetXLabel: 'Desplazamiento X',
    offsetYLabel: 'Desplazamiento Y',
    attributeComboPlaceholder: 'Seleccionar campo',
    rotateLabel: 'Rotación',
    haloColorLabel: 'Halo-Color',
    haloWidthLabel: 'Halo-Ancho',
    attributeNotFound: 'Campo no encontrado'
  },
  GsPropTextEditor: {
    propFieldLabel: 'Campo',
    opacityLabel: 'Texto-Transparencia',
    colorLabel: 'Texto-Color',
    sizeLabel: 'Texto-Tamaño',
    offsetXLabel: 'Desplazamiento X',
    offsetYLabel: 'Desplazamiento Y',
    attributeComboPlaceholder: 'Seleccionar campo',
    rotateLabel: 'Rotación',
    haloColorLabel: 'Halo-Color',
    haloWidthLabel: 'Halo-Width'
  },
  GsPreview: {
    openEditorText: 'Editor de simbología',
    closeEditorText: 'Cerrar editor'
  },
  GsColorField: {
    closeText: 'Cerrar',
    editText: 'Cambiar',
    chooseText: 'Elegir',
  },
  GsKindField: {
    symbolizerKinds: {
      Mark: 'Marcador',
      Fill: 'Relleno',
      Icon: 'Icono',
      Line: 'Línea',
      Text: 'Texto'
    }
  },
  GsGraphicTypeField: {
    Mark: 'Marcador',
    Icon: 'Icono'
  },
  GsScaleDenominator: {
    minScaleDenominatorLabelText: 'Escala Min.',
    maxScaleDenominatorLabelText: 'Escala Max.',
    minScaleDenominatorPlaceholderText: 'Ingrese escala min. (Opcional)',
    maxScaleDenominatorPlaceholderText: 'Ingrese escala max. (Opcionar)'
  },
  GsWellKnownNameField: {
    wellKnownNames: {
      Circle: 'Círculo',
      Square: 'Cuadrado',
      Triangle: 'Triangulo',
      Star: 'Estrella',
      Cross: 'Cruz',
      X: 'X'
    }
  },
  GsSymbolizerEditor: {
    kindFieldLabel: 'Tipo'
  },
  GsSymbolizerEditorWindow: {
    symbolizersEditor: 'Editor de simbología'
  },
  GsFilterEditorWindow: {
    filterEditor: 'Editor de filtro'
  },
  GsMultiEditor: {
    add: 'Añadir',
    remove: 'Eliminar'
  },
  GsUploadButton: {
    upload: 'Cargar'
  },
  GsFilterTree: {
    andDrpdwnLabel: 'AND-Filtro',
    orDrpdwnLabel: 'OR-Filtro',
    notDrpdwnLabel: 'NOT-Filtro',
    comparisonDrpdwnLabel: 'Comparación-Filtro',
    addFilterLabel: 'Añadir filtro',
    changeFilterLabel: 'Cambiar filtro',
    removeFilterLabel: 'Eliminar filtro',
    andFilterText: 'AND',
    orFilterText: 'OR',
    notFilterText: 'NOT'
  },
  GsRuleTable: {
    symbolizersColumnTitle: 'Simbolizador',
    nameColumnTitle: 'Nombre',
    filterColumnTitle: 'Filtro',
    minScaleColumnTitle: 'Escala Min.',
    maxScaleColumnTitle: 'Escala Max.',
    amountColumnTitle: 'Cantidad',
    duplicatesColumnTitle: 'Duplicados'
  },
  GsRules: {
    rulesTitle: 'Reglas',
    multiEdit: 'Seleccionar',
    addRule: 'Añadir',
    classification: 'Clasificación',
    remove: 'Eliminar',
    clone: 'Duplicar',
    edit: 'Cambiar',
    defaultRuleTitle: 'Sin título'
  },
  GsRuleReorderButtons: {
    ruleMoveUpTip: 'Mueve la regla una posición arriba',
    ruleMoveDownTip: 'Mueve la regla una posición hacia abajo'
  },
  GsRuleGenerator: {
    attribute: 'Atributo',
    generateButtonText: 'Clasificar',
    levelOfMeasurement: 'Nivel de medida',
    nominal: 'Nominal',
    ordinal: 'Ordinal',
    cardinal: 'Cardinal',
    numberOfRules: 'Número de clases',
    colorRamp: 'Rampa de color',
    colorSpace: 'Espacio de color',
    colorRampPlaceholder: 'Seleccionar…',
    colorRampMinClassesWarningPre: 'La rampa de color requiere al menos',
    colorRampMinClassesWarningPost: 'clases',
    symbolizer: 'Simbolizador',
    classification: 'Método de clasificación',
    classificationPlaceholder: 'Seleccionar…',
    preview: 'Avance de color',
    numberOfRulesViaKmeans: '…afectados por la clasificación k-Means.',
    allDistinctValues: 'Utilizar todos los valores distintos'
  },
  GsColorRampCombo: {
    colorRampPlaceholder: 'Seleccionar…'
  },
  GsColorSpaceCombo: {
    colorSpacePlaceholder: 'Seleccionar…'
  },
  GsClassificationCombo: {
    equalInterval: 'Equal Interval',
    quantile: 'Quantile ',
    logarithmic: 'Logarithmic',
    kmeans: 'k-Means'
  },
  GsRuleGeneratorWindow: {
    ruleGenerator: 'Clasificación'
  },
  GsIconSelectorWindow: {
    windowLabel: 'Seleccionar icono'
  },
  GsIconSelector: {
    librarySelectLabel: 'Seleccionar biblioteca'
  },
  GsSLDUnitsSelect: {
    symbolizerUnitsLabel: 'Unidades simbolizadoras',
    symbolizerUnitsPixel: 'Pixel',
    symbolizerUnitsMeter: 'Metro',
    symbolizerUnitsFoot: 'Escándalo'
  },
  ...es_ES
};
