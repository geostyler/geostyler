import MarkEditor from './MarkEditor';
import TestUtil from '../../../Util/TestUtil';
import { MarkSymbolizer } from 'geostyler-style';

describe('MarkEditor', () => {

  let wrapper: any;
  let markstyle: any;
  beforeEach(() => {
    markstyle = TestUtil.getMarkStyle();
    wrapper = TestUtil.shallowRenderComponent(MarkEditor, {
      symbolizer: markstyle.rules[0].symbolizers[0]
    });
  });

  it('is defined', () => {
    expect(MarkEditor).toBeDefined();
  });

  it('renders correctly', () => {
    expect(wrapper).not.toBeUndefined();
  });

  it('calls props.onSymbolizerChange()', () => {
    let counter: number = 0;
    wrapper.setProps({
      onSymbolizerChange: ((symb: any) => counter++)
    });
    wrapper.instance().onSymbolizerChange(markstyle.rules[0].symbolizers[0]);
    expect(counter).toEqual(1);
  });

  it('gets the right default MarkSymbolizer', () => {
    expect.assertions(7);
    const circle: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Circle');
    const square: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Square');
    const triangle: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Triangle');
    const star: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Star');
    const cross: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Cross');
    const x: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('X');
    const wrongWkn: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('WrongWkn');

    expect(circle.wellKnownName).toEqual('Circle');
    expect(square.wellKnownName).toEqual('Square');
    expect(triangle.wellKnownName).toEqual('Triangle');
    expect(star.wellKnownName).toEqual('Star');
    expect(cross.wellKnownName).toEqual('Cross');
    expect(x.wellKnownName).toEqual('X');
    expect(wrongWkn.wellKnownName).toEqual('Circle');
  });
});
