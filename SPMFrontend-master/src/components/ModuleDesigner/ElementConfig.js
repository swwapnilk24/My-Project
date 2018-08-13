/**
 * Created by svs on 27/1/18.
 */
const cssProperties = {
  className: { defaultValue: '', options: ['table', 'table-striped', 'table-bordered', 'table-dark', 'thead-light', 'row'] },
  alignContent: { defaultValue: 'stretch', options: ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'initial', 'inherit'] },
  backgroundColor: { defaultValue: 'transparent', options: ['color', 'transparent', 'initial', 'inherit'] }
};

export const elementConfig = {
  div: {
    toolbar: {
      icon: 'fa fa-plus-circle',
      title: 'Div',
      description: 'Div'
    },
    data: {
      id: '',
      source: '',
      target: '',
      tag: 'div',
      type: 'div',
      isContainer: false,
      layout: {},
      props: {},
      styles: { className: '', style: { width: 70, height: 20 } },
      events: {},
      children: []
    },
    editor: {
      props: {},
      styles: {
        className: { label: 'class', control: 'input', data: {}, defaultValue: '' },
        width: { label: 'Width', control: 'input', data: {}, defaultValue: '' },
        height: { label: 'Height', control: 'input', data: {}, defaultValue: '' },
        backgroundColor: { label: 'backgroundColor', control: 'select', data: cssProperties.backgroundColor }
      },
      events: {}
    }
  },
  ContainerBox: {
    toolbar: {
      icon: 'fa fa-columns',
      title: 'Panel',
      description: 'Panel'
    },
    data: {
      id: '',
      source: '',
      target: '',
      tag: 'ContainerBox',
      type: 'ContainerBox',
      isContainer: true,
      layout: {},
      props: {},
      styles: { className: 'box', style: { width: 70, height: 20 } },
      events: {},
      children: []
    },
    editor: {
      props: {},
      styles: {
        className: { label: 'Class', control: 'input', data: { defaultValue: '' } },
        width: { label: 'Width', control: 'input', data: { defaultValue: '' } },
        height: { label: 'Height', control: 'input', data: { defaultValue: '' } },
        backgroundColor: { label: 'backgroundColor', control: 'select', data: cssProperties.backgroundColor }
      },
      events: {}
    }
  },
  label: {
    toolbar: {
      icon: 'fa fa-address-book',
      title: 'label',
      description: 'label'
    },
    data: {
      id: '',
      source: '',
      target: '',
      tag: 'label',
      type: 'label',
      isContainer: false,
      layout: {},
      props: {},
      styles: { className: '', style: { width: 70, height: 20 } },
      events: {},
      children: []
    },
    editor: {
      props: {},
      styles: {
        className: { label: 'class', control: 'input', data: {}, defaultValue: '' },
        width: { label: 'Width', control: 'input', data: {}, defaultValue: '' },
        height: { label: 'Height', control: 'input', data: {}, defaultValue: '' }
      },
      events: {}
    }
  },
  input: {
    toolbar: {
      icon: 'fa fa-pencil-square-o',
      title: 'Text',
      description: 'Text Box'
    },
    data: {
      id: '',
      source: '',
      target: '',
      tag: 'input',
      type: 'input',
      isContainer: false,
      layout: {},
      props: { type: 'text', value: '' },
      styles: { className: '', style: { width: 70, height: 20 } },
      events: {},
      children: []
    },
    editor: {
      props: {},
      styles: {
        className: { label: 'class', control: 'input', data: {}, defaultValue: '' },
        width: { label: 'Width', control: 'input', data: {}, defaultValue: '' },
        height: { label: 'Height', control: 'input', data: {}, defaultValue: '' }
      },
      events: {}
    }
  },
  button: {
    toolbar: {
      icon: 'fa fa-btc',
      title: 'Button',
      description: 'Button'
    },
    data: {
      id: '',
      source: '',
      target: '',
      tag: 'input',
      type: 'button',
      isContainer: false,
      layout: {},
      props: { type: 'button', value: '' },
      styles: { className: '', style: { width: 70, height: 20 } },
      events: {},
      children: []
    },
    editor: {
      props: {},
      styles: {
        className: { label: 'class', control: 'input', data: {}, defaultValue: '' },
        width: { label: 'Width', control: 'input', data: {}, defaultValue: '' },
        height: { label: 'Height', control: 'input', data: {}, defaultValue: '' }
      },
      events: {
        onClick: { label: 'On Click', control: 'input', data: { options: [], defaultValue: '' } },
        onHover: { label: 'On Hover', control: 'input', data: { options: [], defaultValue: '' } }
      }
    }
  },
  Table: {
    toolbar: {
      icon: 'fa fa-table',
      title: 'Table',
      description: 'Table'
    },
    data: {
      id: '',
      source: '',
      target: '',
      tag: 'Table',
      type: 'Table',
      isContainer: false,
      layout: {},
      props: {
        tableHeading: 'Heading',
        template: 'Basic',
        rows: [],
        columns: [],
        value: ''
      },
      styles: { className: 'table', style: { width: 350, height: 100 } },
      events: {},
      children: []
    },
    editor: {
      props: {
        tableHeading: { label: 'Heading', control: 'input', data: { options: [], defaultValue: 'Heading' } },
        template: { label: 'Template', control: 'select', data: { options: ['Basic', 'Dark', 'Light'], defaultValue: '' } },
        rows: { label: 'Rows', control: 'input', data: { options: [], defaultValue: 'Heading' } },
        columns: { label: 'Columns', control: 'input', data: { options: [], defaultValue: 'Heading' } }
      },
      styles: {
        className: { label: 'Class', control: 'multiSelect', data: cssProperties.className },
        width: { label: 'Width', control: 'input', data: {}, defaultValue: '' },
        height: { label: 'Height', control: 'input', data: {}, defaultValue: '' },
        backgroundColor: { label: 'Background Color', control: 'select', data: cssProperties.backgroundColor }
      },
      events: {}
    }
  },
  TableLight: {
    toolbar: {
      icon: 'fa fa-television',
      title: 'TableLight',
      description: 'TableLight'
    },
    data: {
      id: '',
      source: '',
      target: '',
      tag: 'TableLight',
      type: 'TableLight',
      isContainer: false,
      layout: {},
      props: {
        tableHeading: 'Table Light',
        template: 'Basic',
        rows: [],
        columns: [],
        value: ''
      },
      styles: { className: 'table', style: { width: 350, height: 100 } },
      events: {},
      children: []
    },
    editor: {
      props: {
        tableHeading: { label: 'Heading', control: 'input', data: { options: [], defaultValue: 'Heading' } },
        template: { label: 'Template', control: 'select', data: { options: ['Basic', 'Dark', 'Light'], defaultValue: '' } },
        rows: { label: 'Rows', control: 'input', data: { options: [], defaultValue: 'Heading' } },
        columns: { label: 'Columns', control: 'input', data: { options: [], defaultValue: 'Heading' } }
      },
      styles: {
        className: { label: 'Class', control: 'multiSelect', data: cssProperties.className },
        width: { label: 'Width', control: 'input', data: {}, defaultValue: '' },
        height: { label: 'Height', control: 'input', data: {}, defaultValue: '' },
        backgroundColor: { label: 'Background Color', control: 'select', data: cssProperties.backgroundColor }
      },
      events: {}
    }
  }
};
