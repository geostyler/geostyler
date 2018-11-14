'use strict';

import de_DE from 'antd/lib/locale-provider/de_DE';
export default {
    GsApp: {
        graphicalEditor: 'Graphischer Editor',
        codeEditor: 'Code Editor'
    },
    GsRule: {
        removeRuleBtnText: 'Regel entfernen',
        scaleFieldTitle: 'Maßstab verwenden',
        filterFieldTitle: 'Filter verwenden',
        nameFieldLabel: 'Name',
        nameFieldPlaceholder: 'Name eingeben',
        attributeLabel: 'Attribut',
        attributePlaceholderString: 'Attribut wählen',
        attributeValidationHelpString: 'Bitte wähle ein Attribut.',
        operatorLabel: 'Operator',
        operatorPlaceholderString: 'Operator wählen',
        operatorValidationHelpString: 'Bitte wähle einen Operator.',
        valueLabel: 'Wert',
        valuePlaceholder: 'Wert eingeben',
        valueValidationHelpString: 'Bitte gib einen Wert ein.'
    },
    GsStyle: {
        addRuleBtnText: 'Regel hinzufügen',
        removeRulesBtnText: 'Regeln entfernen',
        nameFieldLabel: 'Name',
        nameFieldPlaceholder: 'Name eingeben'
    },
    GsStyleLoader: {
        label: 'Stil laden: ',
        uploadButtonLabel: 'Stil hochladen'
    },
    GsDataLoader: {
        label: 'Daten laden: ',
        uploadButtonLabel: 'Daten hochladen'
    },
    GsCodeEditor: {
        downloadButtonLabel: 'Als Datei speichern',
        formatSelectLabel: 'Format'
    },
    GsWellKnownNameEditor: {
        radiusLabel: 'Radius',
        fillOpacityLabel: 'Fülldeckkraft',
        fillColorLabel: 'Füllfarbe',
        strokeColorLabel: 'Strichfarbe',
        strokeWidthLabel: 'Strichstärke',
        strokeOpacityLabel: 'Strichdeckkraft',
        rotateLabel: 'Drehung',
        haloColorLabel: 'Halofarbe',
        haloWidthLabel: 'Halobreite'
    },
    GsFillEditor: {
        fillOpacityLabel: 'Fülldeckkraft',
        fillColorLabel: 'Füllfarbe',
        outlineColorLabel: 'Randfarbe',
        outlineWidthLabel: 'Randbreite',
        outlineDasharrayLabel: 'Rand-Strichmuster',
        graphicFillTypeLabel: 'Graphic Fill Type'
    },
    GsIconEditor: {
        imageLabel: 'Quelle',
        sizeLabel: 'Größe',
        rotateLabel: 'Drehung',
        opacityLabel: 'Deckkraft'
    },
    GsLineEditor: {
        colorLabel: 'Farbe',
        widthLabel: 'Breite',
        opacityLabel: 'Deckkraft',
        dashLabel: 'Strichmuster',
        dashOffsetLabel: 'Strichmuster Versatz',
        capLabel: 'Verschluss',
        joinLabel: 'Verknüpfung',
        graphicStrokeTypeLabel: 'Graphic Stroke Type',
        graphicFillTypeLabel: 'Graphic Fill Type'
    },
    GsTextEditor: {
        templateFieldLabel: 'Textvorlage',
        opacityLabel: 'Deckkraft',
        colorLabel: 'Textfarbe',
        sizeLabel: 'Textgröße',
        offsetXLabel: 'Versatz X',
        offsetYLabel: 'Versatz Y',
        attributeComboPlaceholder: 'Feld wählen',
        rotateLabel: 'Drehung'
    },
    GsPropTextEditor: {
        propFieldLabel: 'Feld',
        opacityLabel: 'Deckkraft',
        colorLabel: 'Textfarbe',
        sizeLabel: 'Textgröße',
        offsetXLabel: 'Versatz X',
        offsetYLabel: 'Versatz Y',
        attributeComboPlaceholder: 'Feld wählen',
        rotateLabel: 'Drehung'
    },
    GsPreview: {
        openEditorText: 'Symbolisierung editieren',
        closeEditorText: 'Editor schließen'
    },
    GsColorField: {
        closeText: 'Schließen',
        editText: 'Ändern',
        chooseText: 'Wählen',
    },
    GsKindField: {
        label: 'Art',
        symbolizerKinds: {
            Mark: 'Punktsymbol',
            Fill: 'Füllung',
            Icon: 'Bilddatei',
            Line: 'Linie',
            Text: 'Text'
        }
    },
    GsGraphicTypeField: {
      Mark: 'Mark',
      Icon: 'Icon'
    },
    GsScaleDenominator: {
        minScaleDenominatorLabelText: 'Min. Maßstabszahl',
        maxScaleDenominatorLabelText: 'Max. Maßstabszahl',
        minScaleDenominatorPlaceholderText: 'Min. Maßstabszahl eingeben (Optional)',
        maxScaleDenominatorPlaceholderText: 'Max. Maßstabszahl eingeben (Optional)'
    },
    GsWellKnownNameField: {
        label: 'Symbol',
        wellKnownNames: {
          Circle: 'Kreis',
          Square: 'Quadrat',
          Triangle: 'Dreieck',
          Star: 'Stern',
          Cross: 'Kreuz',
          X: 'X'
        }
    },
    GsGraphicTypeField: {
        Mark: 'Punktsymbol',
        Icon: 'Bilddatei'
    },
    GsSymbolizerEditorWindow: {
      symbolizersEditor: 'Symbolisierungseditor'
    },
    GsFilterEditorWindow: {
      filterEditor: 'Filtereditor'
    },
    GsMultiEditor: {
      add: 'Hinzufügen',
      remove: 'Entfernen'
    },
    GsUploadButton: {
      upload: 'Upload'
    },
    GsRuleTable: {
      symbolizersColumnTitle: 'Symbolisierung',
      nameColumnTitle: 'Name',
      filterColumnTitle: 'Filter',
      minScaleColumnTitle: 'Min. Maßstab',
      maxScaleColumnTitle: 'Max. Maßstab'
    },
    GsRuleGenerator: {
      attribute: 'Attribute',
      generateButtonText: 'Regeln generiern',
      levelOfMeasurement: 'Skalenniveau',
      nominal: 'Nominal',
      ordinal: 'Ordinal',
      cardinal: 'Kardinal',
      numberOfRules: 'Regelanzahl',
      colorRamp: 'Color Ramp',
      colorRampPlaceholder: 'Auswählen…'
    },
    GsRuleGeneratorWindow: {
      ruleGenerator: 'Regelgenerator'
    },
    ...de_DE
};
