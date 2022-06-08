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
import fr_FR from 'antd/lib/locale-provider/fr_FR';
export default {
  GsApp: {
    graphicalEditor: 'Éditeur graphique',
    codeEditor: 'Éditeur de code'
  },
  GsBulkEditModals: {
    colorLabel: 'Sélectionner une couleur',
    radiusLabel: 'Sélectionner un rayon',
    opacityLabel: 'Sélectionner une opacité',
    symbolLabel: 'Sélectionner un symbole',
    imageFieldLabel: 'Source',
    imageFieldTooltipLabel: 'Ouvrir la galerie'
  },
  GsRule: {
    removeRuleBtnText: 'Supprimer une règle',
    scaleFieldTitle: 'Utiliser l\'échelle',
    filterFieldTitle: 'Utiliser le filtrage',
    nameFieldLabel: 'Nom',
    nameFieldPlaceholder: 'Donner un nom'
  },
  GsStyle: {
    addRuleBtnText: 'Ajouter une règle',
    cloneRulesBtnText: 'Dupliquer les règles',
    removeRulesBtnText: 'Supprimer les règles',
    nameFieldLabel: 'Nom',
    nameFieldPlaceholder: 'Donner un nom',
    colorLabel: 'Sélectionner une couleur',
    radiusLabel: 'Sélectionner un rayon',
    opacityLabel: 'Sélectionner une opacité',
    symbolLabel: 'Sélectionner un symbole',
    multiEditLabel: 'Édition multiple',
    ruleGeneratorWindowBtnText: 'Classification'
  },
  GsStyleLoader: {
    label: 'Charger un style : ',
    uploadButtonLabel: 'Charger un style'
  },
  GsDataLoader: {
    label: 'Charger des données : ',
    uploadButtonLabel: 'Charger des données'
  },
  GsWfsParserInput: {
    requestButtonText: 'Obtenir des données',
    urlLabel: 'Url',
    versionLabel: 'Version',
    typeNameLabel: 'FeatureTypeName',
    featureIDLabel: 'FeatureID',
    propertyNameLabel: 'PropertyName',
    maxFeaturesLabel: 'MaxFeatures',
    fetchParamsLabel: 'fetchParams'
  },
  GsCodeEditor: {
    downloadButtonLabel: 'Sauvegarder',
    copyButtonLabel: 'Copier dans le presse-papier',
    formatSelectLabel: 'Format',
    styleCopied: 'Style copié dans le presse-papier !'
  },
  GsWellKnownNameEditor: {
    radiusLabel: 'Rayon',
    fillOpacityLabel: 'Opacité du remplissage',
    fillColorLabel: 'Couleur du remplissage',
    opacityLabel: 'Opacité',
    strokeColorLabel: 'Couleur du contour',
    strokeWidthLabel: 'Épaisseur du contour',
    strokeOpacityLabel: 'Opacité du contour',
    rotateLabel: 'Rotation'
  },
  GsFillEditor: {
    opacityLabel: 'Opacité',
    fillOpacityLabel: 'Opacité du remplissage',
    outlineOpacityLabel: 'Opacité du contour',
    fillColorLabel: 'Couleur du remplissage',
    outlineColorLabel: 'Couleur du contour',
    outlineWidthLabel: 'Épaisseur du contour',
    outlineDasharrayLabel: 'Tireté ou pointillé du remplissage',
    graphicFillTypeLabel: 'Motif du remplissage'
  },
  GsIconEditor: {
    imageLabel: 'Source',
    sizeLabel: 'Taille',
    rotateLabel: 'Rotation',
    opacityLabel: 'Opacité',
    iconTooltipLabel: 'Ouvrir la galerie'
  },
  GsMarkEditor: {
    wellKnownNameFieldLabel: 'Symbole'
  },
  GsLineEditor: {
    colorLabel: 'Couleur',
    widthLabel: 'Épaisseur',
    opacityLabel: 'Opacité',
    dashLabel: 'Motif de tireté',
    dashOffsetLabel: 'Décalage du tireté',
    capLabel: 'Terminaison',
    joinLabel: 'Jointure',
    graphicStrokeTypeLabel: 'Type de tracé',
    graphicFillTypeLabel: 'Type de remplissage'
  },
  GsTextEditor: {
    fontLabel: 'Police',
    templateFieldLabel: 'Template',
    opacityLabel: 'Opacité du texte',
    colorLabel: 'Couleur du texte',
    sizeLabel: 'Taille du texte',
    offsetXLabel: 'Décalage horizontal',
    offsetYLabel: 'Décalage vertical',
    attributeComboPlaceholder: 'Sélectionner un champ',
    rotateLabel: 'Rotation',
    haloColorLabel: 'Couleur du halo',
    haloWidthLabel: 'Épaisseur du halo',
    attributeNotFound: 'Champ nom trouvé'
  },
  GsPropTextEditor: {
    propFieldLabel: 'Champ',
    opacityLabel: 'Opacité du texte',
    colorLabel: 'Couleur du texte',
    sizeLabel: 'Taille du texte',
    offsetXLabel: 'Décalage horizontal',
    offsetYLabel: 'Décalage vertical',
    attributeComboPlaceholder: 'Sélectionner un champ',
    rotateLabel: 'Rotation',
    haloColorLabel: 'Couleur du halo',
    haloWidthLabel: 'Épaisseur du halo'
  },
  GsRasterEditor: {
    opacityLabel: 'Opacité',
    hueRotateLabel: 'Teinte',
    brightnessMinLabel: 'Luminosité minimum',
    brightnessMaxLabel: 'Luminosité maximum',
    saturationLabel: 'Saturation',
    contrastLabel: 'Contraste',
    fadeDurationLabel: 'Durée de disparition',
    resamplingLabel: 'Rééchantillonnage',
    contrastEnhancementLabel: 'Amélioration du contraste',
    gammaValueLabel: 'Transparence (Gamma)',
    colorMapLabel: 'Color Map',
    symbolizerLabel: 'Symbolisation',
    channelSelectionLabel: 'Sélection des canaux'
  },
  GsRasterChannelEditor: {
    channelSelectionLabel: 'Modifier les canaux',
    redBandLabel: 'Rouge',
    greenBandLabel: 'Vert',
    blueBandLabel: 'Bleu',
    grayBandLabel: 'Gris',
    channelSelectionGrayLabel: 'Gris',
    channelSelectionRgbLabel: 'RVB',
    titleLabel: 'Sélection des canaux'
  },
  GsColorMapEditor: {
    typeLabel: 'Type',
    extendedLabel: 'Profondeur de couleur',
    colorMapEntriesLabel: 'Colormap',
    titleLabel: 'Color Map',
    nrOfClassesLabel: 'Nombre de classes',
    colorRampLabel: 'Palette de couleurs',
    colorLabel: 'Couleur',
    quantityLabel: 'Quantité',
    labelLabel: 'Étiquette',
    opacityLabel: 'Opacité'
  },
  GsPreview: {
    openEditorText: 'Modifier la symbolisation',
    closeEditorText: 'Fermer l\'éditeur'
  },
  GsColorField: {
    closeText: 'Fermer',
    editText: 'Modifier',
    chooseText: 'Choisir',
  },
  GsKindField: {
    symbolizerKinds: {
      Mark: 'Marqueur',
      Fill: 'Remplissage',
      Icon: 'Icône',
      Line: 'Ligne',
      Text: 'Texte',
      Raster: 'Image'
    }
  },
  GsGraphicTypeField: {
    Mark: 'Marqueur',
    Icon: 'Icône'
  },
  GsRgbChannelField: {
    redLabel: 'Canal rouge',
    greenLabel: 'Canal vert',
    blueLabel: 'Canal bleu'
  },
  GsGrayChannelField: {
    grayLabel: 'Canal gris'
  },
  GsScaleDenominator: {
    minScaleDenominatorLabelText: 'Échelle minimum',
    maxScaleDenominatorLabelText: 'Échelle maximum',
    minScaleDenominatorPlaceholderText: 'Saisir une échelle minimum (Facultatif)',
    maxScaleDenominatorPlaceholderText: 'Saisir une échelle maximum (Facultatif)'
  },
  GsWellKnownNameField: {
    wellKnownNames: {
      Circle: 'Cercle',
      Square: 'Carré',
      Triangle: 'Triangle',
      Star: 'Etoile',
      Cross: 'Croix',
      X: 'X'
    }
  },
  GsColorMapEntryField: {
    colorLabel: 'Couleur',
    labelLabel: 'Étiquette de légende',
    quantityLabel: 'Quantité',
    opacityLabel: 'Opacité'
  },
  GsChannelField: {
    sourceChannelNameLabel: 'Nom du canal',
    contrastEnhancementTypeLabel: 'Amélioration du contraste',
    gammaValueLabel: 'Transparence (Gamma)'
  },
  GsColorMapTypeField: {
    rampMapTypeLabel: 'Interpolé',
    intervalsMapTypeLabel: 'Intervalles',
    valuesMapTypeLabel: 'Valeurs'
  },
  GsSymbolizerEditor: {
    kindFieldLabel: 'Type'
  },
  GsSymbolizerEditorWindow: {
    symbolizersEditor: 'Éditeur de symbolisation'
  },
  GsFilterEditorWindow: {
    filterEditor: 'Éditeur de filtre'
  },
  GsMultiEditor: {
    add: 'Ajouter',
    remove: 'Supprimer'
  },
  GsUploadButton: {
    upload: 'Téléverser'
  },
  GsFilterTree: {
    andDrpdwnLabel: 'AND-Filter',
    orDrpdwnLabel: 'OR-Filter',
    notDrpdwnLabel: 'NOT-Filter',
    comparisonDrpdwnLabel: 'Comparison-Filter',
    addFilterLabel: 'Ajouter un filtre',
    changeFilterLabel: 'Modifier un filtre',
    removeFilterLabel: 'Supprimer un filtre',
    andFilterText: 'AND',
    orFilterText: 'OR',
    notFilterText: 'NOT'
  },
  GsRuleTable: {
    symbolizersColumnTitle: 'Symbolisations',
    nameColumnTitle: 'Nom',
    filterColumnTitle: 'Filtre',
    minScaleColumnTitle: 'Échelle minimum',
    maxScaleColumnTitle: 'Échelle maximum',
    amountColumnTitle: 'Nombre d\'objets concernés',
    duplicatesColumnTitle: 'Doublons'
  },
  GsRuleReorderButtons: {
    ruleMoveUpTip: 'Déplacer la règle vers le haut',
    ruleMoveDownTip: 'Déplacer la règle vers le bas'
  },
  GsRuleGenerator: {
    attribute: 'Attribute',
    generateButtonText: 'Classifier',
    levelOfMeasurement: 'Level of Measurement',
    nominal: 'Nominal',
    ordinal: 'Ordinal',
    cardinal: 'Cardinal',
    numberOfRules: 'Nombre de classes',
    colorRamp: 'Palette de couleurs',
    colorSpace: 'Espace colorimétrique',
    colorRampPlaceholder: 'Choisir…',
    colorRampMinClassesWarningPre: 'La palette de couleur a besoin d\'au moins',
    colorRampMinClassesWarningPost: 'classes',
    symbolizer: 'Symbolisation',
    classification: 'Méthode de classification',
    classificationPlaceholder: 'Choisir…',
    equalInterval: 'Intervalles égaux',
    preview: 'Prévisualisation',
    numberOfRulesViaKmeans: '…affecté par la classification en k-moyennes.',
    allDistinctValues: 'Utiliser toutes les valeurs distinctes'
  },
  GsColorRampCombo: {
    colorRampPlaceholder: 'Choisir…'
  },
  GsColorSpaceCombo: {
    colorSpacePlaceholder: 'Choisir…'
  },
  GsClassificationCombo: {
    equalInterval: 'Intervalles égaux',
    quantile: 'Quantile',
    logarithmic: 'Logarithmique',
    kmeans: 'k-moyennes'
  },
  GsRuleGeneratorWindow: {
    ruleGenerator: 'Classification'
  },
  GsIconSelectorWindow: {
    windowLabel: 'Sélectionner une icône'
  },
  GsIconSelector: {
    librarySelectLabel: 'Sélectionner une bibliothèque'
  },
  GsSLDUnitsSelect: {
    symbolizerUnitsLabel: 'Unités de symbolisation',
    symbolizerUnitsPixel: 'pixels',
    symbolizerUnitsMeter: 'mètres',
    symbolizerUnitsFoot: 'pieds'
  },
  ...fr_FR
};
