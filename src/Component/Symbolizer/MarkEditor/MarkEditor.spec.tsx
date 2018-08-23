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
    expect.assertions(15);
    const circle: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Circle');
    const square: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Square');
    const triangle: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Triangle');
    const star: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Star');
    const cross: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('Cross');
    const x: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('X');
    const slash: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('shape://slash');
    const backslash: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('shape://backslash');
    const vertline: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('shape://vertline');
    const horline: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('shape://horline');
    const plus: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('shape://plus');
    const times: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('shape://times');
    const carrow: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('shape://carrow');
    const oarrow: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer('shape://oarrow');
    const emptyWkn: MarkSymbolizer = wrapper.instance().getDefaultMarkSymbolizer();

    expect(circle.wellKnownName).toEqual('Circle');
    expect(square.wellKnownName).toEqual('Square');
    expect(triangle.wellKnownName).toEqual('Triangle');
    expect(star.wellKnownName).toEqual('Star');
    expect(cross.wellKnownName).toEqual('Cross');
    expect(x.wellKnownName).toEqual('X');
    expect(slash.wellKnownName).toEqual('shape://slash');
    expect(backslash.wellKnownName).toEqual('shape://backslash');
    expect(vertline.wellKnownName).toEqual('shape://vertline');
    expect(horline.wellKnownName).toEqual('shape://horline');
    expect(plus.wellKnownName).toEqual('shape://plus');
    expect(times.wellKnownName).toEqual('shape://times');
    expect(carrow.wellKnownName).toEqual('shape://carrow');
    expect(oarrow.wellKnownName).toEqual('shape://oarrow');
    expect(emptyWkn.wellKnownName).toEqual('Circle');
  });
});
