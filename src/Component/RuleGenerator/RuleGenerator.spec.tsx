import {
  RuleGenerator,
  RuleGeneratorProps
} from './RuleGenerator';
import TestUtil from '../../Util/TestUtil';
import { Data } from 'geostyler-data';

describe('RuleGenerator', () => {

  let wrapper: any;
  const dummyData: Data = TestUtil.getDummyGsData();

  beforeEach(() => {
    const props: RuleGeneratorProps = {
      internalDataDef: dummyData
    };
    wrapper = TestUtil.shallowRenderComponent(RuleGenerator, props);
  });

  it('is defined', () => {
    expect(RuleGenerator).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('handles onAttributeChange correctly', () => {
    expect(wrapper.state('attributeName')).toBeUndefined();
    wrapper.instance().onAttributeChange('bar');
    expect(wrapper.state('attributeName')).toEqual('bar');
    expect(wrapper.state('levelOfMeasurement')).toEqual('nominal');

    wrapper.instance().onAttributeChange('foo');
    expect(wrapper.state('attributeName')).toEqual('foo');
    expect(wrapper.state('levelOfMeasurement')).toEqual('cardinal');
  });

  it('handles onLevelOfMeasurementChange correctly', () => {
    const dummyNom = {target: {value: 'nominal'}};
    const dummyOrd = {target: {value: 'ordinal'}};
    const dummyCard = {target: {value: 'cardinal'}};

    wrapper.instance().onLevelOfMeasurementChange(dummyNom);
    expect(wrapper.state('levelOfMeasurement')).toEqual(dummyNom.target.value);

    wrapper.instance().onLevelOfMeasurementChange(dummyOrd);
    expect(wrapper.state('levelOfMeasurement')).toEqual(dummyOrd.target.value);

    wrapper.instance().onLevelOfMeasurementChange(dummyCard);
    expect(wrapper.state('levelOfMeasurement')).toEqual(dummyCard.target.value);
  });

  it('handles onClassificationChange correctly', () => {
    wrapper.instance().onClassificationChange('equalInterval');
    expect(wrapper.state('classificationMethod')).toEqual('equalInterval');

    wrapper.instance().onClassificationChange('quantile');
    expect(wrapper.state('classificationMethod')).toEqual('quantile');
  });

  it('handles onNumberChange correctly', () => {
    expect(wrapper.state('colorRamp')).toBeUndefined();
    wrapper.setState({colorRampName: 'spring'});
    wrapper.instance().onNumberChange(5);
    expect(wrapper.state('numberOfRules')).toBeCloseTo(5);
    expect(wrapper.state('colorRamp')).toBeDefined();

    wrapper.instance().onNumberChange(2);
    expect(wrapper.state('numberOfRules')).toBeCloseTo(2);
    expect(wrapper.state('colorRamp')).toBeUndefined();
  });

  it('handles onColorRampNameChange correctly', () => {
    expect(wrapper.state('colorRampName')).toBeUndefined();
    wrapper.instance().onColorRampNameChange('spring');
    expect(wrapper.state('colorRampName')).toEqual('spring');
  });

  it('handles onSymbolizerKindChange correctly', () => {
    expect(wrapper.state('symbolizerKind')).toEqual('Mark');
    wrapper.instance().onSymbolizerKindChange('Line');
    expect(wrapper.state('symbolizerKind')).toEqual('Line');
    expect(wrapper.state('wellKnownName')).toBeUndefined();

    wrapper.instance().onSymbolizerKindChange('Mark');
    expect(wrapper.state('symbolizerKind')).toEqual('Mark');
    expect(wrapper.state('wellKnownName')).toEqual('Circle');
  });

  it('handles onWellKnownNameFieldChange correctly', () => {
    expect(wrapper.state('wellKnownName')).toBeUndefined();
    wrapper.instance().onWellKnownNameFieldChange('Square');
    expect(wrapper.state('wellKnownName')).toEqual('Square');
  });
});
