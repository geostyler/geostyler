import * as React from 'react';
import CompositionUtil from './CompositionUtil';

describe('CompositionUtil', () => {
  let dummyComponent;
  let dummyField;
  let dummyOnChange;
  let dummyValue;
  let dummyPath;
  let dummyDefaultElement;
  let dummyGlobalComponent;
  let dummyComposition;

  beforeEach(() => {
    dummyComponent = (<div/>);
    dummyGlobalComponent = (<br/>);
    dummyField = 'dummy';
    dummyOnChange = () => {};
    dummyValue = 1;
    dummyPath = 'dummyEditor.dummyField';
    dummyComposition = {
      dummyField: dummyGlobalComponent,
      dummyEditor: {
        dummyField: dummyComponent
      }
    };
    dummyDefaultElement = (<p/>);
  });


  describe('injectProperties', () => {
    it('injects properties into a component', () => {
      expect(dummyComponent.props).not.toHaveProperty('onChange');
      expect(dummyComponent.props).not.toHaveProperty(dummyField);

      const injected = CompositionUtil.injectProperties({
        component: dummyComponent,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue
      });

      expect(injected.props).toHaveProperty('onChange');
      expect(injected.props).toHaveProperty(dummyField);
      expect(injected.props[dummyField]).toEqual(dummyValue);
    });
  });

  describe('handleComposition', () => {
    it('returns default element if no composition was defined', () => {
      dummyComposition = {};
      const composition = CompositionUtil.handleComposition({
        composition: dummyComposition,
        path: dummyPath,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue,
        defaultElement: dummyDefaultElement
      });
      
      expect(composition).toBeDefined();
      expect(composition.type).toEqual(dummyDefaultElement.type);
      expect(composition.type).not.toEqual(dummyComponent.type);
      expect(composition.type).not.toEqual(dummyGlobalComponent.type);
    });

    it('prefers nested options over global options', () => {
      const composition = CompositionUtil.handleComposition({
        composition: dummyComposition,
        path: dummyPath,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue,
        defaultElement: dummyDefaultElement
      });

      expect(composition).toBeDefined();
      expect(composition.type).toEqual(dummyComponent.type);
      expect(composition.type).not.toEqual(dummyGlobalComponent.type);
      expect(composition.type).not.toEqual(dummyDefaultElement.type);
    });

    it('uses the global option if not nested option is defined', () => {
      delete dummyComposition.dummyEditor.dummyField;
      const composition = CompositionUtil.handleComposition({
        composition: dummyComposition,
        path: dummyPath,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue,
        defaultElement: dummyDefaultElement
      });

      expect(composition).toBeDefined();
      expect(composition.type).toEqual(dummyGlobalComponent.type);
      expect(composition.type).not.toEqual(dummyComponent.type);
      expect(composition.type).not.toEqual(dummyDefaultElement.type);
    });

    it('returns null if property is set to false', () => {
      dummyComposition.dummyEditor.dummyField = false;
      const composition = CompositionUtil.handleComposition({
        composition: dummyComposition,
        path: dummyPath,
        onChange: dummyOnChange,
        propName: dummyField,
        propValue: dummyValue,
        defaultElement: dummyDefaultElement
      });

      expect(composition).toBeDefined();
      expect(composition).toBeFalsy();

    });
  });
});
