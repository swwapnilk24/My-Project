/**
 * @file Organisation Component.
 * @author Mahesh
 */
import React from 'react';
import go from 'gojs';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import './Organisation.scss';
import { recalculateBudget, addEmployee, updateEmployee, removeEmployee, addNewEmployee } from '../../actions/OrgchartAction';
import { OrgChart } from '../../actions/ActionType';
import DataGrid from './DataGrid';
import { bandDetails } from '../../actions/PlansAction';

const goObj = go.GraphObject.make;
const rawData = [];

class Organisation extends React.Component {
  constructor(props) {
    super(props);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.closeBudgetModalForm = this.closeBudgetModalForm.bind(this);
    this.budgetModalFormLoad = this.budgetModalFormLoad.bind(this);
    this.closeAddEmployeeFormDetails = this.closeAddEmployeeFormDetails.bind(this);
    this.addEmployeeModalFormLoad = this.addEmployeeModalFormLoad.bind(this);
    this.addEmployeeSubmit = this.addEmployeeSubmit.bind(this);
    this.state = { bandsData: [], myModel: null, myDiagram: null, data: rawData, volume: 100, selectedOption: 'master', meritVolume: 80, ltiVolume: 90, addEmployeeModalForm: false, budgetDetailsModalForm: false, parentEmpId: '' };
  }

  componentWillMount() {
    this.props.dispatch(recalculateBudget(this.state.volume));
    this.props.dispatch(bandDetails());
    this.state.data = this.props.budgets;
  }
  componentDidMount() {
    this.renderCanvas();
    this.setViewType(this.props.viewType);
  }
  componentWillReceiveProps(nextProps) {
    this.state.data = nextProps.budgets;
    this.reloadCanvas();
    this.setViewType(nextProps.viewType);
    if (nextProps.bandsData !== undefined) {
      console.log(nextProps.bandsData.data, 'nextProps.bandsData.data');
      this.setState({ bandsData: nextProps.bandsData.data });
    }
  }
  componentWillUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      const model = this.state.myModel;
      const diagram = this.state.myDiagram;
      model.nodeDataArray = this.state.data;//this.props.data;
      diagram.model = model;
      this.setState({ myModel: model, myDiagram: diagram, value: 10 });
    }
  }
  setViewType(viewType) {
    if (viewType === 'chart') {
      document.getElementById('chartview').style.display = 'block';
      document.getElementById('tableview').style.display = 'none';
      document.getElementById('masterSlider').style.backgroundColor = 'White';
    } else {
      document.getElementById('chartview').style.display = 'none';
      document.getElementById('tableview').style.display = 'block';
      document.getElementById('masterSlider').style.backgroundColor = 'transparent';
    }
  }
  getResourceById(id) {
    let name = '';
    this.data.map((budget, index) => {
      if (id === budget.key) {
        name = budget.name;
      }
      return index;
    });
    return name;
  }
  reloadCanvas() {
    const model = this.state.myModel;
    const diagram = this.state.myDiagram;
    model.nodeDataArray = this.state.data;//this.props.data;
    diagram.model = model;
    this.setState({ myModel: model, myDiagram: diagram });
  }
  budgetModalFormLoad(dataObj) {
    const employeeid = document.getElementById('employeeId');
    employeeid.innerHTML = `<input name='' id="employee_id" type="hidden" className="form-control" value='${dataObj.key}' />`;//`${dataObj.name}`;
    const employeeName = document.getElementById('employeeName');
    employeeName.innerHTML = `<input name='' id="employee_name" type="text" className="form-control" value='${dataObj.name}' />`;//`${dataObj.name}`;
    const employeeAbs = document.getElementById('employeeAbs');
    employeeAbs.innerHTML = `<input name='' id="employee_abs" type="text" className="form-control" value='${dataObj.ABS}' />`;
  }
  closeBudgetModalForm() {
    this.setState({ budgetDetailsModalForm: false });
  }
  handleSubmit() {
    const employeeId = document.getElementById('employee_id');
    const employeeAbs = document.getElementById('employee_abs');
    const employeeName = document.getElementById('employee_name');
    const obj = { name: employeeName.value, abs: employeeAbs.value };
    this.props.dispatch(updateEmployee(employeeId.value, obj));
    this.closeBudgetModalForm();
  }
  // Add employee modal form
  addEmployeeModalFormLoad(dataObj) {
    console.log(dataObj);
    this.setState({ parentEmpId: dataObj.employeeid });
    // employeeTarget.innerHTML = `<input name='' id="employee_target" type="text" className="form-control" value='${dataObj.target}' />`;
  }
  // Submit Addemployee Form
  addEmployeeSubmit() {
    const addEmpFrmName = document.forms.addEmployeeForm;
    const empName = addEmpFrmName.txtEmployeeName.value;
    const empTitle = addEmpFrmName.txtJobTitle.value;
    const empABS = addEmpFrmName.txtEmployeeABS.value;
    // const empSTI = addEmpFrmName.txtEmployeeSTI.value;
    // const empLTI = addEmpFrmName.txtEmployeeLTI.value;
    const empBand = addEmpFrmName.txtEmployeeBand.value;
    // const addEmpArr = [];
    // name, abs, target, budget, title, parent, parentName, merit, ipf, bpf, cpf, performance
    // addEmpArr.push({ name: empName, jobtitle: empTitle, band: empBand, profile_picture: '' });
    this.props.dispatch(addNewEmployee({ name: empName, jobtitle: empTitle, band: empBand, profile_picture: '' }, { currentsalary: empABS, managerId: this.state.parentEmpId }));
    console.log('empName -', empName, 'empTitle - ', empTitle, 'empABS -', empABS, 'empBand', empBand);
    this.setState({
      addEmployeeModalForm: false
    });
  }
  // Close Add employee modal form
  closeAddEmployeeFormDetails() {
    this.setState({ addEmployeeModalForm: false });
  }
  // handleOnChange = (value) => {
  //   this.volume = value;
  // }
  handleChangeStart = () => {
    console.log('Change event started');
  };
  handleChange = sliderValue => {
    this.setState({
      volume: sliderValue
    });
  };
  handleChangeComplete = () => {
    this.props.dispatch({ type: OrgChart.CALCULATE_BUDGET, sliderData: this.state.volume });
  };
  // Handle merit slider change
  handleMeritChangeStart = () => {
    console.log('Merit slider change value started');
  };
  handleMeritChange = meritSliderValue => {
    this.setState({
      meritVolume: meritSliderValue
    });
  };
  handleMeritChangeComplete = () => {
    this.props.dispatch({ type: OrgChart.CALCULATE_BUDGET, meritSliderData: this.state.meritVolume });
  }
  // Handle LTI slider change
  handleLTIChangeStart = () => {
    console.log('LTI slider change value started');
  };
  handleMeritChange = ltiSliderValue => {
    this.setState({
      ltiVolume: ltiSliderValue
    });
  };
  handleLTIChangeComplete = () => {
    this.props.dispatch({ type: OrgChart.CALCULATE_BUDGET, ltiSliderData: this.state.ltiVolume });
  };
  // onChange={this.handleOptionChange}
  renderCanvas() {
    function FlatTreeLayout() {
      go.TreeLayout.call(this);  // call base constructor
    }
    go.Diagram.inherit(FlatTreeLayout, go.TreeLayout);

    // This assumes the TreeLayout.angle is 90 -- growing downward
    /** @override */
    FlatTreeLayout.prototype.commitLayout = function () {
      go.TreeLayout.prototype.commitLayout.call(this);  // call base method first
      // find maximum Y position of all Nodes
      let y = -Infinity;
      this.network.vertexes.each((v) => {
        y = Math.max(y, v.node.position.y);
      });
      // move down all leaf nodes to that Y position, but keeping their X position
      this.network.vertexes.each((v) => {
        const node = v.node;
        if (node.isTreeLeaf) {
          node.position = new go.Point(node.position.x, y);
        }
      });
    };

    const model = goObj(go.TreeModel);
    let diagram = null;

    let nodeIdCounter = -1; // use a sequence to guarantee key uniqueness as we add/remove/modify nodes

    // This function is used to find a suitable ID when modifying/creating nodes.
    // We used the counter combined with findNodeDataForKey to ensure uniqueness.
    const getNextKey = () => {
      let key = nodeIdCounter;
      while (diagram.model.findNodeDataForKey(key) !== null) {
        key = nodeIdCounter;
        nodeIdCounter -= 1;
      }
      return key;
    };

    diagram = goObj(go.Diagram, this.goJsDiv, {
      initialContentAlignment: go.Spot.Center,
      maxSelectionCount: 1, // users can select only one part at a time
      validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
      'clickCreatingTool.archetypeNodeData': {}, // allow double-click in background to create a new node
      'clickCreatingTool.insertPart': (loc) => {  // customize the data for the new node
        this.archetypeNodeData = {
          key: getNextKey(), // assign the key based on the number of nodes
          name: '(new employee)',
          title: '(job title)',
          parentName: '',
          budget: ''
        };
        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
      },
      layout:
        goObj(go.TreeLayout,
          {
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal,
            // properties for most of the tree:
            angle: 90,
            layerSpacing: 35,
            // properties for the 'last parents':
            alternateAngle: 90,
            alternateLayerSpacing: 35,
            alternateAlignment: go.TreeLayout.AlignmentBus,
            alternateNodeSpacing: 20
          }),
      'undoManager.isEnabled': true // enable undo & redo
    });

    diagram.addDiagramListener('Modified', (e) => {
      console.log(e);
      const button = document.getElementById('SaveButton');
      if (button) button.disabled = !diagram.isModified;
      const idx = document.title.indexOf('*');
      if (diagram.isModified) {
        if (idx < 0) document.title += '*';
      } else if (idx >= 0) {
        document.title = document.title.substr(0, idx);
      }
    });

    // manage boss info manually when a node or link is deleted from the diagram
    diagram.addDiagramListener('SelectionDeleting', (e) => {
      const part = e.subject.first(); // e.subject is the myDiagram.selection collection,
                                    // so we'll get the first since we know we only have one selection
      diagram.startTransaction('clear boss');
      if (part instanceof go.Node) {
        const it = part.findTreeChildrenNodes(); // find all child nodes
        while (it.next()) { // now iterate through them and clear out the boss information
          const child = it.value;
          const bossText = child.findObject('boss'); // since the boss TextBlock is named, we can access it by name
          if (bossText === null) return;
          bossText.text = '';
        }
      } else if (part instanceof go.Link) {
        const child = part.toNode;
        const bossText = child.findObject('boss'); // since the boss TextBlock is named, we can access it by name
        if (bossText === null) return;
        bossText.text = '';
      }
      diagram.commitTransaction('clear boss');
    });

    const levelColors = ['#AC193D', '#2672EC', '#8C0095', '#5133AB', '#008299', '#D24726', '#008A00', '#094AB2'];

    // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
    diagram.layout.commitNodes = () => {
      go.TreeLayout.prototype.commitNodes.call(diagram.layout);  // do the standard behavior
      // then go through all of the vertexes and set their corresponding node's Shape.fill
      // to a brush dependent on the TreeVertex.level value
      diagram.layout.network.vertexes.each((v) => {
        if (v.node) {
          const level = v.level % (levelColors.length);
          const color = levelColors[level];
          const shape = v.node.findObject('SHAPE');
          if (shape) shape.fill = goObj(go.Brush, 'Linear', { 0: color, 1: go.Brush.lightenBy(color, 0.05), start: go.Spot.Left, end: go.Spot.Right });
        }
      });
    };


    // when a node is double-clicked, add a child to it
    const nodeDoubleClick = (e, obj) => {
      const clicked = obj.part;
      if (clicked !== null) {
        const thisemp = clicked.data;
        this.props.dispatch(addEmployee(thisemp.key));
      }
    };

    // this is used to determine feedback during drags
    const mayWorkFor = (node1, node2) => {
      if (!(node1 instanceof go.Node)) return false;  // must be a Node
      if (node1 === node2) return false;  // cannot work for yourself
      if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
      return true;
    };


    // This function provides a common style for most of the TextBlocks.
    // Some of these values may be overridden in a particular TextBlock.
    const textStyle = { font: '9pt  Segoe UI,sans-serif', stroke: 'white' };
    // This converter is used by the Picture.
    const findHeadShot = (key) => {
      if (key < 0 || key > 16) return 'images/HSnopic.png'; // There are only 16 images on the server
      //return `images/HS${key}.png`;
      return 'assets/images/icons/avatar-man.png';
    };

    /*eslint no-underscore-dangle: [2, { "allow": ["foo_", "_prevFill"] }]*/
    // define the Node template
    diagram.nodeTemplate =
      goObj(go.Node, 'Auto',
        { doubleClick: nodeDoubleClick },
        { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
          mouseDragEnter: (e, node, prev) => {
            console.log('Prev', node.Zd, prev);
            const diag = node.diagram;
            const selnode = diag.selection.first();
            if (!mayWorkFor(selnode, node)) return;
            const shape = node.findObject('SHAPE');
            if (shape) {
              shape._prevFill = shape.fill;  // remember the original brush
              shape.fill = 'darkred';
            }
          },
          mouseDragLeave: (e, node, next) => {
            console.log('next 1', node.Zd, next);
            const shape = node.findObject('SHAPE');
            if (shape && shape._prevFill) {
              shape.fill = shape._prevFill;  // restore the original brush
            }
          },
          mouseDrop: (e, node) => {
            const diag = node.diagram;
            console.log('selnode change', node.Zd);
            const selnode = diag.selection.first();
            console.log('selnode', selnode.Zd);  // assume just one Node in selection
            this.props.dispatch({ type: 'CHANGE_EMPLOYEE', parentNodeData: node.Zd, selChildNodeData: selnode.Zd });
            if (mayWorkFor(selnode, node)) {
              // find any existing link into the selected node
              const link = selnode.findTreeParentLink();
              if (link !== null) {  // reconnect any existing link
                link.fromNode = node;
              } else {  // else create a new link
                diag.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
              }
            }
          }
        },
        // for sorting, have the Node.text be the data.name
        new go.Binding('text', 'name'),
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected
        new go.Binding('layerName', 'isSelected', (sel) => (sel ? 'Foreground' : '')).ofObject(),
        // define the node's outer shape
        goObj(go.Shape, 'Rectangle',
          {
            name: 'SHAPE',
            fill: 'white',
            stroke: null,
            // set the port properties:
            portId: '',
            fromLinkable: true,
            toLinkable: true,
            cursor: 'pointer'
          }),
        goObj(go.Panel, 'Horizontal',
          goObj(go.Picture,
            {
              name: 'Picture',
              desiredSize: new go.Size(60, 70),
              margin: new go.Margin(0, 8, 0, 8)
            },
            new go.Binding('source', 'key', findHeadShot)),
          // define the panel where the text will appear
          goObj(go.Panel, 'Table',
            {
              maxSize: new go.Size(350, 1099),
              margin: new go.Margin(6, 10, 6, 3),
              defaultAlignment: go.Spot.Left
            },
            goObj(go.RowColumnDefinition, { column: 2, width: 4 }),
            goObj(go.TextBlock, textStyle,  // the name
              {
                row: 0,
                column: 0,
                font: '12pt Segoe UI,sans-serif'
              },
              new go.Binding('text', 'name').makeTwoWay()),
            goObj(go.TextBlock, textStyle,  // the name
              {
                row: 0,
                column: 1,
                font: '8pt Segoe UI,sans-serif',
                margin: new go.Margin(6, 0, 0, 6)
              },
              new go.Binding('text', 'title').makeTwoWay()),
            goObj(go.TextBlock, '-----------------------------', textStyle,
              { row: 2, column: 0, columnSpan: 5 }),
            goObj(go.TextBlock, 'Merit Budget', textStyle,
              { row: 3, column: 0, width: 50 }),
            goObj(go.TextBlock, textStyle,
              { row: 4, column: 0, width: 50, text: 'row 2\ncol 0' },
              new go.Binding('text', 'MeritBudget').makeTwoWay()),
            goObj(go.TextBlock, 'STI Budget', textStyle,
                { row: 3, column: 1, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 4, column: 1, width: 50, text: 'row 2\ncol 1' },
              new go.Binding('text', 'StiBudget').makeTwoWay()),
            goObj(go.TextBlock, 'LTI Budget', textStyle,
              { row: 3, column: 3, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 4, column: 3, width: 50, text: 'row 2\ncol 3' },
              new go.Binding('text', 'LtiBudget').makeTwoWay()),
              // test
              goObj(go.TextBlock, '-----------------------------', textStyle,
              { row: 5, column: 0, columnSpan: 5 }),
              goObj(go.TextBlock, 'IPF ', textStyle,
              { row: 6, column: 0, width: 50 }),
            goObj(go.TextBlock, textStyle,
              { row: 7, column: 0, width: 50, text: 'row 4\ncol 0' },
              new go.Binding('text', 'IPF').makeTwoWay()),
            goObj(go.TextBlock, 'BPF', textStyle,
                { row: 6, column: 1, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 7, column: 1, width: 50, text: 'row 4\ncol 1' },
              new go.Binding('text', 'BPF').makeTwoWay()),
            goObj(go.TextBlock, 'CPF', textStyle,
              { row: 6, column: 3, width: 50 }),
            goObj(go.TextBlock, textStyle,
                { row: 7, column: 3, width: 50, text: 'row 4\ncol 3' },
              new go.Binding('text', 'CPF').makeTwoWay())
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node

    // the context menu allows users to make a position vacant,
    // remove a role and reassign the subtree, or remove a department
    diagram.nodeTemplate.contextMenu =
      goObj(go.Adornment, 'Vertical',
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Vacate Position'),
          {
            click: (e, obj) => {
              const node = obj.part.adornedPart;
              if (node !== null) {
                const thisemp = node.data;
                diagram.startTransaction('vacate');
                // update the key, name, and comments
                diagram.model.setKeyForNodeData(thisemp, getNextKey());
                diagram.model.setDataProperty(thisemp, 'name', '(Vacant)');
                diagram.model.setDataProperty(thisemp, 'comments', '');
                diagram.commitTransaction('vacate');
              }
            }
          }
        ),
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Remove Employee'),
          {
            click: (e, obj) => {
              // reparent the subtree to this node's boss, then remove the node
              const node = obj.part.adornedPart;
              if (node !== null) {
                diagram.startTransaction('reparent remove');
                const chl = node.findTreeChildrenNodes();
                // iterate through the children and set their parent key to our selected node's parent key
                while (chl.next()) {
                  const emp = chl.value;
                  diagram.model.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key);
                }
                // and now remove the selected node itself
                diagram.model.removeNodeData(node.data);
                console.log('bugin', node.data);
                this.props.dispatch(removeEmployee(node.data.key));
                diagram.commitTransaction('reparent remove');
              }
            }
          }
        ),
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Remove Department'),
          {
            click: (e, obj) => {
              // remove the whole subtree, including the node itself
              const node = obj.part.adornedPart;
              if (node !== null) {
                diagram.startTransaction('remove dept');
                diagram.removeParts(node.findTreeParts());
                diagram.commitTransaction('remove dept');
              }
            }
          }
        ),
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Edit Employee'),
          {
            click: (e, obj) => {
              const node = obj.part.adornedPart;
              console.log('node', node);
              console.log('Tree Parts', node.Zd.key);
              console.log('Data', this.state.data);
              this.setState({ budgetDetailsModalForm: true });
              this.budgetModalFormLoad(node.Zd);
            }
          }
        ),
        goObj('ContextMenuButton',
          goObj(go.TextBlock, 'Add Employee'),
          {
            click: (e, obj) => {
              const node = obj.part.adornedPart;
              console.log('node', node);
              console.log('Tree Parts', node.Zd.key);
              console.log('Data', this.state.data);
              this.setState({ addEmployeeModalForm: true });
              this.addEmployeeModalFormLoad(node.Zd);
            }
          }
        )
      );

    // define the Link template
    diagram.linkTemplate =
      goObj(go.Link, go.Link.Orthogonal,
        { corner: 5, relinkableFrom: true, relinkableTo: true },
        goObj(go.Shape, { strokeWidth: 4, stroke: '#00a4a4' }));  // the link shape


    this.setState({ myModel: model, myDiagram: diagram },
      () => {
        model.nodeDataArray = this.state.data;//this.props.data;
        diagram.model = model;
        this.setState({ myModel: model, myDiagram: diagram });
      }
    );
  }

  render() {
    console.log(this.state.data, 'this.state.data');
    const styles = {
      overlay: {
        position: 'fixed',
        top: 50,
        left: 380,
        right: 380,
        bottom: 50
      },
      content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
      }
    };
    const gridOptions = [{
      name: 'Name',
      key: 'name'
    }, {
      name: 'Job Title',
      key: 'title'
    }, {
      name: 'ABS',
      key: 'ABS'
    },
    {
      key: 'MeritBudget',
      name: 'Merit Budget'
    },
    {
      name: 'STI Budget',
      key: 'StiBudget'
    },
    {
      name: 'LTI Budget',
      key: 'LtiBudget'
    }];
    let ChartView = '';
    let TableView = '';
    ChartView = <div id="chartview"><div ref={(goJsDiv) => { this.goJsDiv = goJsDiv; }} style={{ height: '600px', backgroundColor: '#FFFFFF' }} /></div>;
    TableView = <div id="tableview"><DataGrid expanded={this.props.master_table_expanded} current_view={'master'} hierarchy={this.props.orgHierarchy} columns={gridOptions} data={this.state.data} /></div>;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="slider" id="masterSlider">&nbsp;</div>
            {ChartView}
            {TableView}
          </div>
          <Modal
            isOpen={this.state.budgetDetailsModalForm}
            style={styles}
            contentLabel="Modal"
          >
            <div className="card card-success">
              <div className="card-header">
                Budget Management
                <button type="button" id="close" onClick={this.closeBudgetModalForm} className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="card-footer">
                <form name="budgetDetailsForm">
                  <label htmlFor="employeeId" id="employeeId" />
                  <div className="form-group">
                    <label htmlFor="managerName">Name</label>
                    <span className="modal-input">:&nbsp;<label htmlFor="managerName" id="employeeName" /></span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="employeeAbs">Employee ABS</label>
                    <span className="modal-input">:&nbsp;<label htmlFor="employeeAbs" id="employeeAbs" /></span>
                    {/* <input type="text" name="jobTitle" id="jobTitle" className="form-control" /> */}
                    {/* <label htmlFor="managerBudget" id="managerBudget" /> */}
                  </div>
                  <div className="form-group">
                    <input type="button" onClick={() => this.handleSubmit()} value="submit" className="form-control btn-primary" />
                  </div>
                </form>
              </div>
            </div>
          </Modal>
          <Modal
            isOpen={this.state.addEmployeeModalForm}
            style={styles}
            contentLabel="Modal"
          >
            <div className="card card-success">
              <div className="card-header">
                Add Employee
                <button type="button" id="close" onClick={this.closeAddEmployeeFormDetails} className="close" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="card-footer">
                <form name="addEmployeeForm">
                  <div>
                    <label className="custom-label">Employee Name</label>
                    <input type="text" name="txtEmployeeName" className="entry-input" />&nbsp;
                  </div>
                  <div>
                    <label className="custom-label">Job Title</label>
                    <input type="text" name="txtJobTitle" className="entry-input" />&nbsp;
                  </div>
                  <div>
                    <label className="custom-label">ABS</label>
                    <input type="text" name="txtEmployeeABS" className="entry-input" />&nbsp;
                  </div>
                  {/* <div>
                    <label className="custom-label">STI</label>
                    <input type="text" name="txtEmployeeSTI" className="entry-input" />&nbsp;
                  </div>
                  <div>
                    <label className="custom-label">LTI</label>
                    <input type="text" name="txtEmployeeLTI" className="entry-input" />&nbsp;
                  </div> */}
                  <div>
                    <label className="custom-label">Band</label>
                    <select name="txtEmployeeBand" className="custom-select">
                      <option value="">Select</option>
                      {
                        this.state.bandsData.map((band) =>
                          <option value={band.id}>{band.bandName}</option>
                        )
                      }
                    </select> &nbsp;
                    {/* <input type="text" name="txtEmployeeBand" className="entry-input" />&nbsp; */}
                  </div>
                  <div className="form-group">
                    <input type="button" onClick={() => this.addEmployeeSubmit()} value="submit" className="form-control btn-primary" />
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
function MapStateToProps(state) {
  return {
    budgets: state.OrgchartReducer.formattedBudget,
    orgHierarchy: state.OrgchartReducer.org_hierarchy,
    master_table_expanded: state.OrgchartReducer.merit_table_expanded,
    bandsData: state.plansReducer.bandsData
  };
}

export default connect(MapStateToProps)(Organisation);
